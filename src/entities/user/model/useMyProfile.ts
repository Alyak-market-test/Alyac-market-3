import { useQuery } from '@tanstack/react-query';

import { getMyProfile } from '../api/ProfileApi';

export function useMyProfile() {
  return useQuery({
    queryKey: ['myProfile'],
    queryFn: getMyProfile,
    staleTime: 1000 * 60 * 5, // 5분간 캐시 유지
  });
}
