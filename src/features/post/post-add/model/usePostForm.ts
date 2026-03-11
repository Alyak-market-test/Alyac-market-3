import { useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const postSchema = z.object({
  content: z.string().min(1, '내용을 입력해주세요').max(2200, '2200자 이하로 입력해주세요'),
});

export type PostAddFormValues = z.infer<typeof postSchema>;

export function usePostForm(defaultContent?: string) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<PostAddFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: { content: '' },
  });

  const contentValue = watch('content');

  useEffect(() => {
    if (defaultContent) {
      reset({ content: defaultContent });
    }
  }, [defaultContent]);

  return { register, handleSubmit, errors, contentValue };
}
