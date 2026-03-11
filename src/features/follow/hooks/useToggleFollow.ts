import { useMutation, useQueryClient } from '@tanstack/react-query';

import { type FollowUser, useFollowUser, useUnfollowUser } from '@/entities/profile';

export function useToggleFollow(accountname: string, tab: 'followers' | 'followings') {
  const queryClient = useQueryClient();
  const { mutateAsync: follow } = useFollowUser();
  const { mutateAsync: unfollow } = useUnfollowUser();

  return useMutation({
    mutationFn: ({
      targetAccountname,
      currentlyFollowing,
    }: {
      targetAccountname: string;
      currentlyFollowing: boolean;
    }) => (currentlyFollowing ? unfollow(targetAccountname) : follow(targetAccountname)),

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
