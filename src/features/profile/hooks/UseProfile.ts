import { useEffect, useState } from 'react';

import { getTokenUserInfo } from '@/entities/auth';
import { getMyProfile } from '@/shared/api/profile';
import { getYourProfile } from '@/shared/api/profile';

interface ProfileUser {
  username: string;
  accountname: string;
  followers: number;
  followings: number;
  image: string;
  intro: string;
}

export function useProfile(accountname?: string) {
  const myAccountname = getTokenUserInfo()?.accountname;
  const isMyProfile = !accountname || accountname === myAccountname;

  const [user, setUser] = useState<ProfileUser>({
    username: '',
    accountname: '',
    followers: 0,
    followings: 0,
    image: '',
    intro: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (isMyProfile) {
        const data = await getMyProfile();
        setUser({
          username: data.user.username,
          accountname: data.user.accountname,
          followers: data.user.follower.length,
          followings: data.user.following.length,
          image: data.user.image,
          intro: data.user.intro,
        });
      } else {
        const data = await getYourProfile(accountname!);
        setUser({
          username: data.user.username,
          accountname: data.user.accountname,
          followers: data.user.follower.length,
          followings: data.user.following.length,
          image: data.user.image,
          intro: data.user.intro,
        });
      }
    };

    fetchProfile();
  }, [accountname, isMyProfile]);

  return { user, isMyProfile };
}
