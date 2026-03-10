export * from './hooks/useGetPosts';
export * from './model/Types';
export * from './model/Types';
export { getPosts } from './api/getPosts';
export {
  getPost,
  createPost,
  deletePost,
  toggleHeart,
  getComments,
  createComment,
  getUserPosts,
} from './api/postApi';

export { useGetPosts } from './hooks/useGetPosts';
export { useGetPost, useGetComments, useGetUserPosts } from './hooks/usePostQueries';
export {
  useCreatePost,
  useDeletePost,
  useToggleHeart,
  useCreateComment,
} from './hooks/usePostMutations';

export type { Post, Comment } from './model/Types';
