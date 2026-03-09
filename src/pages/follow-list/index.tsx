// 팔로우 목록
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

import { followUser, getFollowers, getFollowings, unfollowUser } from '@/entities/profile';
import type { FollowUser } from '@/entities/profile';
import { getTokenUserInfo } from '@/entities/user';
import { Button, TopBasicNav } from '@/shared';
import { AvatarImage } from '@/shared/icons';

export function FollowListPage() {
  const { accountname } = useParams();
  const [searchParams] = useSearchParams();
  const myAccountname = getTokenUserInfo()?.accountname;
  const tab = searchParams.get('tab') as 'followers' | 'followings';
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const isFollowings = tab === 'followings';

  const { data: list = [] } = useQuery<FollowUser[]>({
    queryKey: ['followList', accountname, tab],
    queryFn: async () => {
      const data = isFollowings
        ? await getFollowings(accountname!)
        : await getFollowers(accountname!);

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
  });

  const { mutate: toggleFollow } = useMutation({
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

    onSuccess: () => {
      // 프로필 페이지 쿼리 무효화 -> 뒤로가기 시 최신 데이터 반영
      queryClient.invalidateQueries({ queryKey: ['profile', accountname] });
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

  return (
    <div className="bg-background mx-auto flex min-h-screen flex-col">
      <TopBasicNav onBack={() => navigate(-1)} title={isFollowings ? 'Followings' : 'Followers'} />

      <ul className="flex flex-col divide-y">
        {list.map((user) => (
          <li key={user.accountname} className="flex items-center justify-between px-4 py-3">
            {/* 프로필 이미지 + 이름 */}
            <div
              className="flex cursor-pointer items-center gap-3"
              onClick={() => navigate(`/profile/${user.accountname}`)}
            >
              <AvatarImage src={user.image} alt={user.username} size="sm" iconSize="sm" />
              <div className="flex flex-col">
                <span className="text-sm font-semibold">{user.username}</span>
                <span className="text-muted-foreground text-xs">@{user.accountname}</span>
              </div>
            </div>

            {user.accountname !== myAccountname && (
              <Button
                type="button"
                variant={user.isFollowing ? 'activ' : 'primary'}
                size="M"
                onClick={() =>
                  toggleFollow({
                    targetAccountname: user.accountname,
                    currentlyFollowing: user.isFollowing,
                  })
                }
              >
                {user.isFollowing ? '취소' : '팔로우'}
              </Button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
