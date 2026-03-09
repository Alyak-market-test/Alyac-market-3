import { useQuery } from '@tanstack/react-query';

import { getYourProfile, mapMyProfile, mapYourProfile, useMyProfile } from '@/entities/profile';
import type { ProfileView } from '@/entities/profile';

const EMPTY_USER: ProfileView = {
  accountname: '',
  username: '',
  image: '',
  intro: '',
  followers: 0,
  followings: 0,
  isFollowing: false,
};

interface UseProfileReturn {
  user: ProfileView;
  isMyProfile: boolean;
  isLoading: boolean;
}

export function useProfile(accountname?: string): UseProfileReturn {
  const { data: myData, isLoading: isMyLoading } = useMyProfile();

  const { data: yourData, isLoading: isYourLoading } = useQuery({
    queryKey: ['profile', accountname],
    queryFn: () => getYourProfile(accountname!),
    enabled: !!accountname, // accountname 있을 때만 호출
  });

  const isMyProfile = myData?.user.accountname === accountname || !accountname;

  const user = (() => {
    if (!myData) return EMPTY_USER;
    if (!accountname) return mapMyProfile(myData);
    if (!yourData) return EMPTY_USER;
    return mapYourProfile(yourData);
  })();

  return {
    user,
    isMyProfile,
    isLoading: isMyLoading || (!!accountname && isYourLoading),
  };
}
