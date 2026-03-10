import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { updatePost } from '@/entities/post';
import { uploadImages } from '@/features/post/post-add/model/UploadImages';

export function usePostEditSubmit(postId: string) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    mutate,
    isPending,
    error: mutationError,
  } = useMutation({
    mutationFn: async ({
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
        const filenames = await uploadImages(imageFiles);
        imageString = [...existingImages, ...filenames].join(',');
      }
      return updatePost({ postId, content, imageString });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userPosts'] });
      queryClient.invalidateQueries({ queryKey: ['post', postId] });
      navigate(-1);
    },
  });

  return { mutate, isLoading: isPending, mutationError };
}
