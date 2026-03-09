export interface FollowState {
  isFollowing: boolean;
  followerCount: number;
}

export interface FollowRequest {
  accountname: string;
}

export interface FollowUser {
  accountname: string;
  username: string;
  image: string;
  isFollowing: boolean;
}
