import { useSearchUsersQuery } from '@/entities/user';
import { useDebounce } from '@/shared/lib';

export function useSearchUsers(keyword: string) {
  const debouncedKeyword = useDebounce(keyword, 500);

  const { data, isLoading } = useSearchUsersQuery(debouncedKeyword);

  return {
    users: data ?? [],
    isLoading,
  };
}
