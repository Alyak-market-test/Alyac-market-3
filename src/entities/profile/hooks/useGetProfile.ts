import { useQuery } from '@tanstack/react-query';

import { getYourProfile } from '../api/UserProfile';

export function useGetProfile(accountname: string) {
  return useQuery({
    queryKey: ['profile', accountname],
    queryFn: () => getYourProfile(accountname),
    enabled: !!accountname,
  });
}
