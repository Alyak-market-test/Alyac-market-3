import { type InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { createComment, createPost, deletePost, toggleHeart, updatePost } from '../api/postApi';
import type { Post } from '../model/Types';

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
    mutationFn: (hearted: boolean) => toggleHeart(postId, hearted),

    // 클릭 즉시 캐시를 낙관적으로 업데이트
    onMutate: async () => {
      // 진행 중인 refetch 취소 (경쟁 조건 방지)
      await queryClient.cancelQueries({ queryKey: ['posts'] });
      await queryClient.cancelQueries({ queryKey: ['post', postId] });
      await queryClient.cancelQueries({ queryKey: ['userPosts'] });

      // 현재 캐시 스냅샷 저장 (실패 시 롤백용)
      const previousPosts = queryClient.getQueryData<InfiniteData<Post[]>>(['posts']);
      const previousPost = queryClient.getQueryData<Post>(['post', postId]);
      const previousUserPosts = queryClient.getQueryData<Post[]>(['userPosts']);

      const updatePost = (p: Post) =>
        p.id === postId
          ? {
              ...p,
              hearted: !p.hearted,
              heartCount: p.hearted ? p.heartCount - 1 : p.heartCount + 1,
            }
          : p;

      // 피드(InfiniteQuery) 캐시 즉시 업데이트
      queryClient.setQueryData<InfiniteData<Post[]>>(['posts'], (old) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page) => page.map(updatePost)),
        };
      });

      // 단일 게시글 캐시 즉시 업데이트 (PostDetailPage용)
      queryClient.setQueryData<Post>(['post', postId], (old) => {
        if (!old) return old;
        return updatePost(old);
      });

      // 유저 게시글 캐시 즉시 업데이트 (프로필 페이지용)
      queryClient.setQueryData<Post[]>(['userPosts'], (old) => {
        if (!old) return old;
        return old.map(updatePost);
      });

      return { previousPosts, previousPost, previousUserPosts };
    },

    // 실패 시 롤백
    onError: (_err, _vars, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(['posts'], context.previousPosts);
      }
      if (context?.previousPost) {
        queryClient.setQueryData(['post', postId], context.previousPost);
      }
      if (context?.previousUserPosts) {
        queryClient.setQueryData(['userPosts'], context.previousUserPosts);
      }
    },

    // 성공/실패 모두 최종 서버 데이터로 동기화
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
