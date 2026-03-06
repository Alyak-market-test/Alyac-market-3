import { useInfiniteQuery } from '@tanstack/react-query';

import { getPosts } from '../api/getPosts';

const LIMIT = 10;

export function useGetPosts() {
  return useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: ({ pageParam = 0 }) => getPosts({ skip: pageParam, limit: LIMIT }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < LIMIT) return undefined;
      return allPages.length * LIMIT;
    },
  });
}
