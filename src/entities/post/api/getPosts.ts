import { api } from '@/shared/api/instance';

import type { Post } from '../model/types';

export async function getPosts(): Promise<Post[]> {
  const response = await api.get('/post');
  return response.data;
}
