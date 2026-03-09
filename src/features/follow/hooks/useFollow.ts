import { useReducer, useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { followUser, unfollowUser } from '@/entities/profile';
import type { FollowState } from '@/entities/profile';

type Action =
  | { type: 'TOGGLE_OPTIMISTIC'; currentlyFollowing: boolean }
  | { type: 'ROLLBACK'; prev: FollowState }
  | { type: 'SYNC'; payload: FollowState };

function followReducer(_state: FollowState, action: Action): FollowState {
  switch (action.type) {
    case 'TOGGLE_OPTIMISTIC':
      return {
        isFollowing: !action.currentlyFollowing,
        followerCount: action.currentlyFollowing
          ? _state.followerCount - 1
          : _state.followerCount + 1,
      };
    case 'ROLLBACK':
      return action.prev;
    case 'SYNC':
      return action.payload;
  }
}

export const useFollow = (accountname: string, initialState: FollowState) => {
  const [prevAccountname, setPrevAccountname] = useState('');
  const [state, dispatch] = useReducer(followReducer, initialState);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (currentlyFollowing: boolean) =>
      currentlyFollowing ? unfollowUser(accountname) : followUser(accountname),

    onMutate: (currentlyFollowing) => {
      const prev = state;
      dispatch({ type: 'TOGGLE_OPTIMISTIC', currentlyFollowing });
      return { prev };
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', accountname] });
      queryClient.invalidateQueries({ queryKey: ['myProfile'] });
    },

    onError: (_error, _variables, context) => {
      if (context?.prev) {
        dispatch({ type: 'ROLLBACK', prev: context.prev });
      }
    },
  });

  // accountname 변경 시 항상 SYNC
  // mutation 중이 아닐 때 initialState가 바뀐 경우도 SYNC (invalidate 후 새 데이터 반영)
  if (
    prevAccountname !== accountname ||
    (!isPending &&
      (initialState.isFollowing !== state.isFollowing ||
        initialState.followerCount !== state.followerCount))
  ) {
    setPrevAccountname(accountname);
    dispatch({ type: 'SYNC', payload: initialState });
  }

  const toggleFollow = () => {
    if (isPending) return;
    mutate(state.isFollowing);
  };

  return {
    isFollowing: state.isFollowing,
    followerCount: state.followerCount,
    loading: isPending,
    toggleFollow,
  };
};
