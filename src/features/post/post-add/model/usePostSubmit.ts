import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { useUploadFiles } from '@/entities/image';
import { useCreatePost } from '@/entities/post';

export function usePostSubmit(accountname: string) {
  const { mutate: createPost, isPending, error: mutationError } = useCreatePost();
  const { mutateAsync: uploadFiles } = useUploadFiles();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutate = async ({ content, imageFiles }: { content: string; imageFiles: File[] }) => {
    let imageString = '';
    if (imageFiles.length > 0) {
      const results = await uploadFiles(imageFiles);
      imageString = results.map((r) => r.path).join(',');
    }
    createPost(
      { content, imageString },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['posts'] });
          queryClient.invalidateQueries({ queryKey: ['userPosts'] });
          navigate(`/profile/${accountname}`);
        },
      },
    );
  };

  return { mutate, isLoading: isPending, mutationError };
}
