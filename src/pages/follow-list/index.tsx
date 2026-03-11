import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

import { useFollowList } from '@/entities/profile';
import { useToggleFollow } from '@/features/follow';
import { Button, TopBasicNav } from '@/shared';
import { AvatarImage } from '@/shared/icons';
import { getTokenUserInfo } from '@/shared/lib';

export function FollowListPage() {
  const { accountname } = useParams();
  const [searchParams] = useSearchParams();
  const myAccountname = getTokenUserInfo()?.accountname;
  const tab = searchParams.get('tab') as 'followers' | 'followings';
  const navigate = useNavigate();

  const { data: list = [], isLoading } = useFollowList(accountname!, tab);
  const { mutate: toggleFollow } = useToggleFollow(accountname!, tab);

  if (isLoading) {
    return (
      <div className="bg-background flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground text-sm">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-background mx-auto flex min-h-screen flex-col">
      <TopBasicNav
        onBack={() => navigate(-1)}
        title={tab === 'followings' ? 'Followings' : 'Followers'}
      />

      <ul className="flex flex-col divide-y">
        {list.map((user) => (
          <li key={user.accountname} className="flex items-center justify-between px-4 py-3">
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
