import { useParams } from 'react-router-dom';

import { useGetPost } from '@/entities/post';

import { usePostEditSubmit } from './usePostEditSubmit';
import { usePostForm } from './usePostForm';
import { usePostImages } from './usePostImages';

export function usePostEdit() {
  const { postId } = useParams<{ postId: string }>();

  // 기존 게시물 데이터 불러오기
  const { data: post } = useGetPost(postId!);

  const { imageFiles, previews, handleImageChange, handleRemoveImage } = usePostImages();
  const { register, handleSubmit, errors, contentValue } = usePostForm(post?.content);
  const { mutate, isLoading, mutationError } = usePostEditSubmit(postId!);

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
