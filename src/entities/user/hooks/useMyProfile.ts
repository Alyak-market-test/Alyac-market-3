import { useQuery } from '@tanstack/react-query';

import { getMyProfile } from '../api/ProfileApi';
import { mapMyProfile } from '../model/Mappers';
import type { ProfileView } from '../model/ProfileTypes';

export function useMyProfile() {
  return useQuery({
    queryKey: ['myProfile'],
    queryFn: getMyProfile,
    select: (data): ProfileView => mapMyProfile(data), // 여기가 핵심
    staleTime: 1000 * 60 * 5,
  });
}
