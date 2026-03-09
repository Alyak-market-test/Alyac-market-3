import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { createComment, createPost, deletePost, toggleHeart } from '../api/postApi';
import type { Comment, Post } from '../model/Types';

// 게시글 작성
export function useCreatePost() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: createPost,
    onSuccess: (postId) => {
      navigate(`/post/${postId}`);
    },
  });
}

// 게시글 삭제
export function useDeletePost() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      navigate(-1);
    },
  });
}

// 좋아요 토글 (낙관적 업데이트)
export function useToggleHeart(postId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => toggleHeart(postId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['post', postId] });
      const previousPost = queryClient.getQueryData<Post>(['post', postId]);
      queryClient.setQueryData<Post>(['post', postId], (prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          hearted: !prev.hearted,
          heartCount: prev.hearted ? prev.heartCount - 1 : prev.heartCount + 1,
        };
      });
      return { previousPost };
    },
    onError: (_err, _vars, context) => {
      if (context?.previousPost) {
        queryClient.setQueryData(['post', postId], context.previousPost);
      }
    },
  });
}

// 댓글 작성
export function useCreateComment(postId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createComment,
    onSuccess: (newComment) => {
      queryClient.setQueryData<Comment[]>(['comments', postId], (prev = []) => [
        ...prev,
        newComment,
      ]);
      queryClient.setQueryData<Post>(['post', postId], (prev) =>
        prev ? { ...prev, commentCount: prev.commentCount + 1 } : prev,
      );
    },
  });
}
