import { useQuery } from '@tanstack/react-query';

import { getMyProfile } from '../api/ProfileApi';
import { getToken } from '../lib/Token';

export function useUser() {
  return useQuery({
    queryKey: ['me'],
    queryFn: () => getMyProfile().then((data) => data.user),
    enabled: !!getToken(),
  });
}
