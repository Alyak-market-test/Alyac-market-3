import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { updatePost } from '@/entities/post';

export function usePostEditSubmit(postId: string) {
  const navigate = useNavigate();

  const {
    mutate,
    isPending,
    error: mutationError,
  } = useMutation({
    mutationFn: ({ content, imageFiles }: { content: string; imageFiles: File[] }) =>
      updatePost({ postId, content, imageFiles }),
    onSuccess: () => navigate(-1),
  });

  return { mutate, isLoading: isPending, mutationError };
}
