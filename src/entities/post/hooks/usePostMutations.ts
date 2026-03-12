import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { createComment, createPost, deletePost, toggleHeart, updatePost } from '../api/postApi';

// 1. 게시글 작성
export function useCreatePost() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: createPost,
    onSuccess: (postId) => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['userPosts'] });
      navigate(`/post/${postId}`, { state: { from: 'post-add' } });
    },
  });
}

// 2. 게시글 수정
export function useUpdatePost() {
  return useMutation({ mutationFn: updatePost });
}

// 3. 게시글 삭제
export function useDeletePost() {
  return useMutation({ mutationFn: deletePost });
}

// 4. 좋아요 토글
export function useToggleHeart(postId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => toggleHeart(postId),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['post', postId] });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['userPosts'] });
    },
  });
}

// 5. 댓글 작성
export function useCreateComment(postId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
      queryClient.invalidateQueries({ queryKey: ['post', postId] });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}
