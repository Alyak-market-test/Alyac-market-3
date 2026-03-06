import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';

import { getTokenUserInfo } from '@/entities/auth';
import { getMyProfile, getYourProfile } from '@/entities/profile';
import type { ProfileView } from '@/entities/profile';

export function useProfile(accountname?: string) {
  const myAccountname = getTokenUserInfo()?.accountname;
  const isMyProfile = !accountname || accountname === myAccountname;
  const location = useLocation();

  const {
    data: user = {
      username: '',
      accountname: '',
      followers: 0,
      followings: 0,
      image: '',
      intro: '',
      isFollowing: false,
    } as ProfileView,
  } = useQuery({
    queryKey: isMyProfile
      ? ['profile', 'my', location.state?.refresh]
      : ['profile', accountname, location.state?.refresh],
    queryFn: async () => {
      if (isMyProfile) {
        const data = await getMyProfile();
        return {
          username: data.user.username,
          accountname: data.user.accountname,
          followers: data.user.follower.length,
          followings: data.user.following.length,
          image: data.user.image,
          intro: data.user.intro,
          isFollowing: false,
        } as ProfileView;
      } else {
        const data = await getYourProfile(accountname!);
        return {
          username: data.profile.username,
          accountname: data.profile.accountname,
          followers: data.profile.follower.length,
          followings: data.profile.following.length,
          image: data.profile.image,
          intro: data.profile.intro,
          isFollowing: data.profile.isfollow,
        } as ProfileView;
      }
    },
  });

  return { user, isMyProfile };
}
