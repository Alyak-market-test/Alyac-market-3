import { useCreatePost } from '@/entities/post';

export function usePostSubmit() {
  const { mutate, isPending, error: mutationError } = useCreatePost();
  return { mutate, isLoading: isPending, mutationError };
}
