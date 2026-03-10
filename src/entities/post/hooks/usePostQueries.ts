import { useQuery } from '@tanstack/react-query';

import { getComments, getPost, getUserPosts } from '../api/postApi';

// 게시글 상세 조회
export function useGetPost(postId: string) {
  return useQuery({
    queryKey: ['post', postId],
    queryFn: () => getPost(postId),
    enabled: !!postId,
  });
}

// 댓글 조회
export function useGetComments(postId: string) {
  return useQuery({
    queryKey: ['comments', postId],
    queryFn: () => getComments(postId),
    enabled: !!postId,
  });
}

// 유저 게시글 목록 조회
export function useGetUserPosts(accountname: string) {
  return useQuery({
    queryKey: ['userPosts', accountname],
    queryFn: () => getUserPosts(accountname),
    enabled: !!accountname,
  });
}
