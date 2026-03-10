import { useQuery } from '@tanstack/react-query';

import { getFollowers, getFollowings } from '../api/FollowApi';
import type { FollowUser } from '../model/FollowTypes';

export function useFollowList(accountname: string, tab: 'followers' | 'followings') {
  return useQuery<FollowUser[]>({
    queryKey: ['followList', accountname, tab],
    queryFn: async () => {
      const data =
        tab === 'followings' ? await getFollowings(accountname) : await getFollowers(accountname);

      const rawList = data.following ?? data.follower ?? [];

      return rawList.map(
        (u: { accountname: string; username: string; image: string; isfollow: boolean }) => ({
          accountname: u.accountname,
          username: u.username,
          image: u.image,
          isFollowing: u.isfollow,
        }),
      );
    },
    enabled: !!accountname,
    staleTime: 0,
  });
}
