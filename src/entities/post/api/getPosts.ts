import { api } from '@/shared/api/instance';

import type { Post } from '../model/Types';

export async function getPosts({
  skip = 0,
  limit = 10,
}: { skip?: number; limit?: number } = {}): Promise<Post[]> {
  const response = await api.get('/post/feed', { params: { skip, limit } });
  return response.data.posts;
}
