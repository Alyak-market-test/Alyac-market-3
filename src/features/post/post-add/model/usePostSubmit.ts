import { useUploadFiles } from '@/entities/image';
import { useCreatePost } from '@/entities/post';

export function usePostSubmit() {
  const { mutate: createPost, isPending, error: mutationError } = useCreatePost();
  const { mutateAsync: uploadFiles } = useUploadFiles();

  const mutate = async ({ content, imageFiles }: { content: string; imageFiles: File[] }) => {
    let imageString = '';
    if (imageFiles.length > 0) {
      const results = await uploadFiles(imageFiles);
      imageString = results.map((r) => r.path).join(',');
    }
    createPost({ content, imageString });
  };

  return { mutate, isLoading: isPending, mutationError };
}
