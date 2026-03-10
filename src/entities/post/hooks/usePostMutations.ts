import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { createComment, createPost, deletePost, toggleHeart } from '../api/postApi';

// 1. 게시글 작성
export function useCreatePost() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: createPost,
    onSuccess: (postId) => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['userPosts'] });
      navigate(`/post/${postId}`);
    },
  });
}

// 2. 게시글 삭제 (✅ 이 부분을 수정하세요)
export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      // 삭제 성공 시 피드와 프로필 목록을 모두 새로고침
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['userPosts'] });

      // navigate(-1)을 삭제하여 페이지 이동을 막습니다.
    },
  });
}

// 3. 좋아요 토글
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

// 4. 댓글 작성
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
