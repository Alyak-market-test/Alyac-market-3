import { useEffect, useState } from 'react';

import { useLocation } from 'react-router-dom';

import { getTokenUserInfo } from '@/entities/auth';
import { getMyProfile, getYourProfile } from '@/entities/profile';
import type { ProfileView } from '@/entities/profile';

export function useProfile(accountname?: string) {
  const myAccountname = getTokenUserInfo()?.accountname;
  const isMyProfile = !accountname || accountname === myAccountname;
  const location = useLocation();

  const [user, setUser] = useState<ProfileView>({
    username: '',
    accountname: '',
    followers: 0,
    followings: 0,
    image: '',
    intro: '',
    isFollowing: false,
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (isMyProfile) {
        const data = await getMyProfile();
        console.log(data.user);
        setUser({
          username: data.user.username,
          accountname: data.user.accountname,
          followers: data.user.follower.length,
          followings: data.user.following.length,
          image: data.user.image,
          intro: data.user.intro,
          isFollowing: false,
        });
      } else {
        const data = await getYourProfile(accountname!);
        setUser({
          username: data.profile.username,
          accountname: data.profile.accountname,
          followers: data.profile.follower.length,
          followings: data.profile.following.length,
          image: data.profile.image,
          intro: data.profile.intro,
          isFollowing: data.profile.isfollow,
        });
      }
    };

    fetchProfile();
  }, [accountname, isMyProfile, location.state?.refresh]);

  return { user, isMyProfile };
}
