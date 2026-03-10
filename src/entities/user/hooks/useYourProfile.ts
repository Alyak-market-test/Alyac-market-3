import { useQuery } from '@tanstack/react-query';

import { getYourProfile } from '../api/ProfileApi';
import { mapYourProfile } from '../model/Mappers';
import type { ProfileView } from '../model/ProfileTypes';

export function useYourProfile(accountname: string) {
  return useQuery<ProfileView>({
    queryKey: ['profile', accountname],
    queryFn: () => getYourProfile(accountname).then(mapYourProfile),
    enabled: !!accountname,
  });
}
