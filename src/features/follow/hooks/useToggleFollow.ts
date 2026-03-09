import { useMutation, useQueryClient } from '@tanstack/react-query';

import { followUser, unfollowUser } from '@/entities/follow';
import type { FollowUser } from '@/entities/follow';

export function useToggleFollow(accountname: string, tab: 'followers' | 'followings') {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      targetAccountname,
      currentlyFollowing,
    }: {
      targetAccountname: string;
      currentlyFollowing: boolean;
    }) => (currentlyFollowing ? unfollowUser(targetAccountname) : followUser(targetAccountname)),

    onMutate: ({ targetAccountname, currentlyFollowing }) => {
      queryClient.setQueryData<FollowUser[]>(
        ['followList', accountname, tab],
        (prev) =>
          prev?.map((u) =>
            u.accountname === targetAccountname ? { ...u, isFollowing: !currentlyFollowing } : u,
          ) ?? [],
      );
    },

    onSuccess: (_data, { targetAccountname }) => {
      queryClient.invalidateQueries({ queryKey: ['profile', accountname] });
      queryClient.invalidateQueries({ queryKey: ['profile', targetAccountname] });
      queryClient.invalidateQueries({ queryKey: ['followList', accountname] });
      queryClient.invalidateQueries({ queryKey: ['myProfile'] });
    },

    onError: (_error, { targetAccountname, currentlyFollowing }) => {
      queryClient.setQueryData<FollowUser[]>(
        ['followList', accountname, tab],
        (prev) =>
          prev?.map((u) =>
            u.accountname === targetAccountname ? { ...u, isFollowing: currentlyFollowing } : u,
          ) ?? [],
      );
    },
  });
}
