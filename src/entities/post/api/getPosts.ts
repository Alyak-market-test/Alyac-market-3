import { api } from '@/shared/api/instance';

import type { Post } from '../model/Types';

export async function getPosts(): Promise<Post[]> {
  const response = await api.get('/post/feed');
  return response.data.posts;
}
