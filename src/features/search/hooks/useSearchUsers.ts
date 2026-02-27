import { useQuery } from '@tanstack/react-query';

import { useDebounce } from '@/shared/lib/hooks/useDebounce';

import { searchUsers } from '../api';

export function useSearchUsers(keyword: string) {
  const debouncedKeyword = useDebounce(keyword, 500);

  const { data: users = [], isLoading } = useQuery({
    queryKey: ['users', debouncedKeyword],
    queryFn: () => searchUsers(debouncedKeyword),
    enabled: !!debouncedKeyword,
  });

  return { users, isLoading };
}
