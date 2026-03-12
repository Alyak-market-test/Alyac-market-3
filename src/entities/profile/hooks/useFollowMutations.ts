import { useMutation } from '@tanstack/react-query';

import { followUser, unfollowUser } from '../api/FollowApi';

export function useFollowUser() {
  return useMutation({ mutationFn: followUser });
}

export function useUnfollowUser() {
  return useMutation({ mutationFn: unfollowUser });
}
