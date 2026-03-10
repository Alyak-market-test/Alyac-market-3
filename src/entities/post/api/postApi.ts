import { uploadImages } from '@/features/post/post-add/model/UploadImages';
import { api } from '@/shared/api/instance';

import type { Comment, Post } from '../model/Types';

// 게시글 작성
export async function createPost({
  content,
  imageFiles,
}: {
  content: string;
  imageFiles: File[];
}): Promise<string> {
  let imageString = '';
  if (imageFiles.length > 0) {
    const filenames = await uploadImages(imageFiles);
    imageString = filenames.join(',');
  }
  const response = await api.post('/post', {
    post: { content, image: imageString },
  });
  return response.data.post.id;
}

// 게시글 상세 조회
export async function getPost(postId: string): Promise<Post> {
  const res = await api.get(`/post/${postId}`);
  return res.data.post;
}

// 게시글 삭제
export async function deletePost(postId: string): Promise<void> {
  await api.delete(`/post/${postId}`);
}

// 좋아요 토글
export async function toggleHeart(postId: string): Promise<void> {
  await api.post(`/post/${postId}/heart`);
}

// 댓글 조회
export async function getComments(postId: string): Promise<Comment[]> {
  const res = await api.get(`/post/${postId}/comments`);
  return res.data.comment ?? [];
}

// 댓글 작성
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
// 유저 게시글 목록 조회
export async function getUserPosts(accountname: string): Promise<Post[]> {
  const res = await api.get(`/post/${accountname}/userpost`);
  return res.data.post ?? [];
}
// 게시글 수정
export async function updatePost({
  postId,
  content,
  imageFiles,
}: {
  postId: string;
  content: string;
  imageFiles: File[];
}): Promise<void> {
  let imageString = '';
  if (imageFiles.length > 0) {
    const filenames = await uploadImages(imageFiles);
    imageString = filenames.join(',');
  }
  await api.put(`/post/${postId}`, {
    post: { content, image: imageString },
  });
}
