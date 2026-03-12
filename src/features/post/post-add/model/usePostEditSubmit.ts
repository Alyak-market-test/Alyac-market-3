import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { useUploadFiles } from '@/entities/image';
import { useUpdatePost } from '@/entities/post';

export function usePostEditSubmit(postId: string) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutateAsync: uploadFiles } = useUploadFiles();
  const { mutate: updatePost, isPending, error: mutationError } = useUpdatePost();

  const mutate = async ({
    content,
    imageFiles,
    existingImages,
  }: {
    content: string;
    imageFiles: File[];
    existingImages: string[];
  }) => {
    let imageString = existingImages.join(',');
    if (imageFiles.length > 0) {
      const results = await uploadFiles(imageFiles);
      imageString = [...existingImages, ...results.map((r) => r.path)].join(',');
    }
    updatePost(
      { postId, content, imageString },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['userPosts'] });
          queryClient.invalidateQueries({ queryKey: ['post', postId] });
          navigate(-1);
        },
      },
    );
  };

  return { mutate, isLoading: isPending, mutationError };
}
