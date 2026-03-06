import { useQuery } from '@tanstack/react-query';

import { getMyProfile } from '@/entities/profile';

import { getToken } from '../lib/Token';

export function useUser() {
  return useQuery({
    queryKey: ['me'],
    queryFn: () => getMyProfile().then((data) => data.user),
    enabled: !!getToken(),
  });
}
