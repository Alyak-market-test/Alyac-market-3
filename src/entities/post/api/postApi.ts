import { api } from '@/shared/api/instance';

import type { Comment, Post } from '../model/Types';

/**
 * 게시글을 작성합니다.
 * @param content - 게시글 내용
 * @param imageString - 이미지 경로 (쉼표로 구분, 기본값: 빈 문자열)
 * @returns 생성된 게시글 ID
 */
export async function createPost({
  content,
  imageString = '',
}: {
  content: string;
  imageString?: string;
}): Promise<string> {
  const response = await api.post('/post', {
    post: { content, image: imageString },
  });
  return response.data.post.id;
}

/**
 * 게시글 상세 정보를 조회합니다.
 * @param postId - 조회할 게시글 ID
 * @returns 게시글 상세 정보
 */
export async function getPost(postId: string): Promise<Post> {
  const res = await api.get(`/post/${postId}`);
  return res.data.post;
}

/**
 * 게시글을 삭제합니다.
 * @param postId - 삭제할 게시글 ID
 */
export async function deletePost(postId: string): Promise<void> {
  await api.delete(`/post/${postId}`);
}

// 좋아요 토글 (hearted: 현재 좋아요 상태 - true면 취소, false면 추가)
export async function toggleHeart(postId: string, hearted: boolean): Promise<void> {
  if (hearted) {
    await api.delete(`/post/${postId}/heart`);
  } else {
    await api.post(`/post/${postId}/heart`);
  }
}

/**
 * 게시글의 댓글 목록을 조회합니다.
 * @param postId - 댓글을 조회할 게시글 ID
 * @returns 댓글 목록
 */
export async function getComments(postId: string): Promise<Comment[]> {
  const res = await api.get(`/post/${postId}/comments`);
  return res.data.comment ?? [];
}

/**
 * 게시글에 댓글을 작성합니다.
 * @param postId - 댓글을 작성할 게시글 ID
 * @param content - 댓글 내용
 * @returns 작성된 댓글 정보
 */
export async function createComment({
  postId,
  content,
}: {
  postId: string;
  content: string;
}): Promise<Comment> {
  const res = await api.post(`/post/${postId}/comments`, {
    comment: { content },
  });
  return res.data.comment;
}

/**
 * 특정 유저의 게시글 목록을 조회합니다.
 * @param accountname - 조회할 유저의 계정명
 * @returns 게시글 목록
 */
export async function getUserPosts(accountname: string): Promise<Post[]> {
  const res = await api.get(`/post/${accountname}/userpost`);
  return res.data.post ?? [];
}

/**
 * 게시글을 수정합니다.
 * @param postId - 수정할 게시글 ID
 * @param content - 수정할 게시글 내용
 * @param imageString - 수정할 이미지 경로 (쉼표로 구분)
 */
export async function updatePost({
  postId,
  content,
  imageString,
}: {
  postId: string;
  content: string;
  imageString: string;
}): Promise<void> {
  await api.put(`/post/${postId}`, {
    post: { content, image: imageString },
  });
}
