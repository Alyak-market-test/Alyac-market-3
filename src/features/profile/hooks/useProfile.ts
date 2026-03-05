import { useEffect, useState } from 'react';

import { getTokenUserInfo } from '@/entities/auth';
import { getMyProfile, getYourProfile } from '@/entities/profile';
import type { ProfileView } from '@/entities/profile';

export function useProfile(accountname?: string) {
  const myAccountname = getTokenUserInfo()?.accountname;
  const isMyProfile = !accountname || accountname === myAccountname;

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
      console.log('fetchProfile 호출됨'); // ← 여기
      if (isMyProfile) {
        const data = await getMyProfile();
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
        console.log(data.profile); // 여기서 isfollow 키 확인
      }
    };

    fetchProfile();
  }, [accountname, isMyProfile]);

  return { user, isMyProfile };
}
