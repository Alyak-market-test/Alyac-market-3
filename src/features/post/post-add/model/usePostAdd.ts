import { usePostForm } from './usePostForm';
import { usePostImages } from './usePostImages';
import { usePostSubmit } from './usePostSubmit';

export function usePostAdd() {
  const { imageFiles, previews, handleImageChange, handleRemoveImage } = usePostImages();
  const { register, handleSubmit, errors, contentValue } = usePostForm();
  const { mutate, isLoading, mutationError } = usePostSubmit();

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
