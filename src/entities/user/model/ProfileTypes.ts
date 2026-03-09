export interface Profile {
  _id: string;
  username: string;
  accountname: string;
  intro: string;
  image: string;
  isfollow: boolean;
  follower: { _id: string }[];
  following: { _id: string }[];
}

export interface ProfileView {
  username: string;
  accountname: string;
  followers: number;
  followings: number;
  image: string;
  intro: string;
  isFollowing: boolean;
}

export interface MyProfileResponse {
  user: Profile;
}

export interface YourProfileResponse {
  profile: Profile;
}

export interface UpdateProfileRequest {
  username: string;
  accountname: string;
  intro: string;
  image: string | null;
}
