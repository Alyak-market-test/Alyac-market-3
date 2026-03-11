import { useParams } from 'react-router-dom';

import { useGetPost } from '@/entities/post';
import { imageUrl } from '@/shared/lib';

import { usePostEditSubmit } from './usePostEditSubmit';
import { usePostForm } from './usePostForm';
import { usePostImages } from './usePostImages';

export function usePostEdit() {
  const { postId } = useParams<{ postId: string }>();

  const { data: post } = useGetPost(postId!);

  const existingImageUrls = post?.image ? post.image.split(',').filter(Boolean).map(imageUrl) : [];
  const existingImagePaths = post?.image ? post.image.split(',').filter(Boolean) : [];

  const { imageFiles, previews, remainingExistingPaths, handleImageChange, handleRemoveImage } =
    usePostImages(existingImageUrls, existingImagePaths);

  const { register, handleSubmit, errors, contentValue } = usePostForm(post?.content);
  const { mutate, isLoading, mutationError } = usePostEditSubmit(postId!);

  const onSubmit = handleSubmit((formValues) => {
    mutate({
      content: formValues.content,
      imageFiles,
      existingImages: remainingExistingPaths, // 삭제된 이미지가 제외된 목록
    });
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
