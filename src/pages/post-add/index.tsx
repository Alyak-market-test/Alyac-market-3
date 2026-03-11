import { usePostAdd } from '@/features/post';
import { PostFormPage } from '@/features/post/ui/PostFormPage';

export function PostAddPage() {
  const postAdd = usePostAdd();
  return <PostFormPage mode="add" {...postAdd} />;
}
