import { useMyProfile, useYourProfile } from '@/entities/user';
import type { ProfileView } from '@/entities/user';

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
  const { data: myProfile, isLoading: isMyLoading } = useMyProfile();
  const { data: yourProfile, isLoading: isYourLoading } = useYourProfile(accountname ?? '');

  const isMyProfile = myProfile?.accountname === accountname || !accountname;

  const user: ProfileView = (() => {
    if (!myProfile) return EMPTY_USER;
    if (!accountname) return myProfile;
    if (!yourProfile) return EMPTY_USER;
    return yourProfile;
  })();

  return {
    user,
    isMyProfile,
    isLoading: isMyLoading || (!!accountname && isYourLoading),
  };
}
