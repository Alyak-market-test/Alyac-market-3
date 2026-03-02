import { useEffect, useState } from 'react';

import { followUser, unfollowUser } from '@/entities/follow';
import type { FollowState } from '@/entities/follow';

export const useFollow = (accountname: string, initialState: FollowState) => {
  const [isFollowing, setIsFollowing] = useState(initialState.isFollowing);
  const [followerCount, setFollowerCount] = useState(initialState.followerCount);
  const [loading, setLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if ((!initialized && initialState.followerCount !== 0) || initialState.isFollowing) {
      setIsFollowing(initialState.isFollowing);
      setFollowerCount(initialState.followerCount);
      setInitialized(true);
    }
  }, [initialized, initialState.isFollowing, initialState.followerCount]);

  const toggleFollow = async () => {
    if (loading) return;
    console.log('toggleFollw==========');
    const prev = { isFollowing, followerCount };

    setIsFollowing(!isFollowing);
    setFollowerCount((prev) => (isFollowing ? prev - 1 : prev + 1));
    setLoading(true);

    try {
      await (isFollowing ? unfollowUser(accountname) : followUser(accountname));
    } catch {
      setIsFollowing(prev.isFollowing);
      setFollowerCount(prev.followerCount);
    } finally {
      setLoading(false);
    }
  };

  return { isFollowing, followerCount, loading, toggleFollow };
};
