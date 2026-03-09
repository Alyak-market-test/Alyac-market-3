import { useQuery } from '@tanstack/react-query';

import { searchUsers } from '../api/SearchUsers';

export function useSearchUsersQuery(keyword: string) {
  return useQuery({
    queryKey: ['users', keyword],
    queryFn: () => searchUsers(keyword),
    enabled: !!keyword,
  });
}
