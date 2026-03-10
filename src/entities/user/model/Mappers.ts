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
    followers: profile.follower.length,
    followings: profile.following.length,
    image: profile.image,
    intro: profile.intro,
    isFollowing,
  };
}
