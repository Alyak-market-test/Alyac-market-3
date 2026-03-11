import { usePostEdit } from '@/features/post';
import { PostFormPage } from '@/features/post/ui/PostFormPage';

export function PostEditPage() {
  const postEdit = usePostEdit();
  return <PostFormPage mode="edit" {...postEdit} />;
}
