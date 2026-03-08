import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';

import { getTokenUserInfo } from '@/entities/auth';
import { getMyProfile, getYourProfile, mapMyProfile, mapYourProfile } from '@/entities/profile';
import type { ProfileView } from '@/entities/profile';

const DEFAULT_PROFILE: ProfileView = {
  username: '',
  accountname: '',
  followers: 0,
  followings: 0,
  image: '',
  intro: '',
  isFollowing: false,
};

export function useProfile(accountname?: string) {
  const myAccountname = getTokenUserInfo()?.accountname;
  const isMyProfile = !accountname || accountname === myAccountname;
  const location = useLocation();

  const { data: user = DEFAULT_PROFILE } = useQuery({
    queryKey: isMyProfile
      ? ['profile', 'my', location.state?.refresh]
      : ['profile', accountname, location.state?.refresh],
    queryFn: async () => {
      if (isMyProfile) {
        return mapMyProfile(await getMyProfile());
      }
      return mapYourProfile(await getYourProfile(accountname!));
    },
  });

  return { user, isMyProfile };
}
