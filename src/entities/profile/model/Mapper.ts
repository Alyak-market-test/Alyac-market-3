export const mapFollowUser = (u: {
  accountname: string;
  username: string;
  image: string;
  isfollow: boolean;
}) => ({
  accountname: u.accountname,
  username: u.username,
  image: u.image,
  isFollowing: u.isfollow,
});
