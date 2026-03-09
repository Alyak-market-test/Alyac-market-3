import { useForm } from 'react-hook-form';

export interface PostAddFormValues {
  content: string;
}

export function usePostForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PostAddFormValues>({
    defaultValues: { content: '' },
  });

  const contentValue = watch('content');

  return { register, handleSubmit, errors, contentValue };
}
