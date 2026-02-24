import { useQuery } from '@tanstack/react-query';

import { getPosts } from '../api/getPosts';

export function useGetPosts() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  });
}
