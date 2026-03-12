import { usePostEdit } from '@/features/post';
import { PostFormPage } from '@/features/post';

export function PostEditPage() {
  const postEdit = usePostEdit();
  return <PostFormPage mode="edit" {...postEdit} />;
}
