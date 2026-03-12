import { useUser } from '@/entities/user';

import { usePostForm } from './usePostForm';
import { usePostImages } from './usePostImages';
import { usePostSubmit } from './usePostSubmit';

export function usePostAdd() {
  const { data: user } = useUser();
  const { imageFiles, previews, handleImageChange, handleRemoveImage } = usePostImages();
  const { register, handleSubmit, errors, contentValue } = usePostForm();
  const { mutate, isLoading, mutationError } = usePostSubmit(user?.accountname ?? '');

  const onSubmit = handleSubmit((formValues) => {
    mutate({ content: formValues.content, imageFiles });
  });

  return {
    register,
    errors,
    contentValue,
    previews,
    isLoading,
    mutationError,
    handleImageChange,
    handleRemoveImage,
    onSubmit,
  };
}
