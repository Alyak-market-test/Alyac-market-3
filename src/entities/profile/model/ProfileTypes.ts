export interface Profile {
  _id: string;
  username: string;
  accountname: string;
  intro: string;
  image: string;
  isFollowing: boolean;
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
