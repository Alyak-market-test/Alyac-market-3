import { useEffect } from 'react';

import { useForm } from 'react-hook-form';

export interface PostAddFormValues {
  content: string;
}

export function usePostForm(defaultContent?: string) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<PostAddFormValues>({
    defaultValues: { content: '' },
  });

  const contentValue = watch('content');

  // 기존 내용 불러왔을 때 폼에 세팅
  useEffect(() => {
    if (defaultContent) {
      reset({ content: defaultContent });
    }
  }, [defaultContent]);

  return { register, handleSubmit, errors, contentValue };
}
