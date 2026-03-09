// API 응답을 ProfileView 모델로 변환
import type { Profile } from './ProfileTypes';
import type { ProfileView } from './ProfileTypes';

interface MyProfileResponse {
  user: Profile;
}

interface YourProfileResponse {
  profile: Profile;
}

export function mapMyProfile(data: MyProfileResponse): ProfileView {
  return {
    username: data.user.username,
    accountname: data.user.accountname,
    followers: data.user.follower.length,
    followings: data.user.following.length,
    image: data.user.image,
    intro: data.user.intro,
    isFollowing: false,
  };
}

export function mapYourProfile(data: YourProfileResponse): ProfileView {
  return {
    username: data.profile.username,
    accountname: data.profile.accountname,
    followers: data.profile.follower.length,
    followings: data.profile.following.length,
    image: data.profile.image,
    intro: data.profile.intro,
    isFollowing: data.profile.isfollow,
  };
}
