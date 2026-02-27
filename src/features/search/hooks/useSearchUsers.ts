import { useQuery } from '@tanstack/react-query';

import { searchUsers } from '../api';

export function useSearchUsers(keyword: string) {
  const { data: users = [], isLoading } = useQuery({
    queryKey: ['users', keyword],
    queryFn: () => searchUsers(keyword),
    enabled: !!keyword,
  });

  return { users, isLoading };
}
