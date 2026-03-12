import type { MyProfileResponse, Profile, ProfileView, YourProfileResponse } from './ProfileTypes';

export function mapMyProfile(data: MyProfileResponse): ProfileView {
  return mapProfileToView(data.user, false);
}

export function mapYourProfile(data: YourProfileResponse): ProfileView {
  return mapProfileToView(data.profile, data.profile.isfollow);
}

function mapProfileToView(profile: Profile, isFollowing: boolean): ProfileView {
  return {
    username: profile.username,
    accountname: profile.accountname,
    followers: profile.follower?.length ?? 0, // 방어적 처리
    followings: profile.following?.length ?? 0,
    image: profile.image,
    intro: profile.intro,
    isFollowing,
  };
}
