import { useState } from 'react';

import { useMutation } from '@tanstack/react-query';

import { followUser, unfollowUser } from '@/entities/follow';
import type { FollowState } from '@/entities/follow';

export const useFollow = (accountname: string, initialState: FollowState) => {
  const [prevAccountname, setPrevAccountname] = useState('');
  const [isFollowing, setIsFollowing] = useState(initialState.isFollowing);
  const [followerCount, setFollowerCount] = useState(initialState.followerCount);

  // accountname이 빈 문자열 → 실제 값으로 바뀌는 시점에 한 번만 동기화
  // React 공식 권장 패턴: 렌더 중 이전 props와 비교해서 state 조정
  if (accountname && prevAccountname !== accountname) {
    setPrevAccountname(accountname);
    setIsFollowing(initialState.isFollowing);
    setFollowerCount(initialState.followerCount);
  }

  const { mutate, isPending } = useMutation({
    mutationFn: (currentlyFollowing: boolean) =>
      currentlyFollowing ? unfollowUser(accountname) : followUser(accountname),

    onMutate: (currentlyFollowing) => {
      const prev = { isFollowing, followerCount };
      setIsFollowing(!currentlyFollowing);
      setFollowerCount((c) => (currentlyFollowing ? c - 1 : c + 1));
      return { prev };
    },

    onError: (_error, _variables, context) => {
      if (context?.prev) {
        setIsFollowing(context.prev.isFollowing);
        setFollowerCount(context.prev.followerCount);
      }
    },
  });

  const toggleFollow = () => {
    if (isPending) return;
    mutate(isFollowing);
  };

  return { isFollowing, followerCount, loading: isPending, toggleFollow };
};
