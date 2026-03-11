import { useMutation } from '@tanstack/react-query';

import { createComment, createPost, deletePost, toggleHeart, updatePost } from '../api/postApi';

export function useCreatePost() {
  return useMutation({ mutationFn: createPost });
}

export function useUpdatePost() {
  return useMutation({ mutationFn: updatePost });
}

export function useDeletePost() {
  return useMutation({ mutationFn: deletePost });
}

export function useToggleHeart(postId: string) {
  return useMutation({ mutationFn: () => toggleHeart(postId) });
}

export function useCreateComment() {
  return useMutation({ mutationFn: createComment });
}
