import { useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { useAuth } from '@/features/auth';
import {
  MyButtons,
  PostSection,
  ProfileInfo,
  ProfileStats,
  YourButtons,
  useProfile,
} from '@/features/profile';
import { ThemeToggle, TopBasicNav } from '@/shared';
import { MoreVerticalIcon } from '@/shared/icons';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';

export function ProfilePage() {
  const { accountname } = useParams();
  const { user, isMyProfile } = useProfile(accountname);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const post: [] = [];

  return (
    <div className="bg-background mx-auto flex min-h-screen flex-col">
      <Popover>
        <TopBasicNav
          onBack={() => navigate(-1)}
          moreSlot={
            <PopoverTrigger asChild>
              <button>
                <MoreVerticalIcon />
              </button>
            </PopoverTrigger>
          }
        />
        <PopoverContent align="end" className="w-52 p-0">
          <button className="text-foreground w-full px-4 py-3 text-left text-sm">
            설정 및 개인정보
          </button>
          <div className="flex items-center justify-between px-4 py-2">
            <span className="text-foreground text-sm">테마</span>
            <ThemeToggle />
          </div>
          <button onClick={logout} className="text-foreground w-full px-4 py-3 text-left text-sm">
            로그아웃
          </button>
        </PopoverContent>
      </Popover>

      <section className="flex flex-col items-center px-4 py-6">
        <div className="flex items-center">
          <ProfileStats
            followers={user.followers}
            image={user.image}
            followings={user.followings}
            username={user.username}
          />
        </div>
        <ProfileInfo
          image={user.image}
          username={user.username}
          accountname={user.accountname}
          intro={user.intro}
        />
      </section>

      {isMyProfile ? (
        <MyButtons />
      ) : (
        <YourButtons
          accountname={user.accountname}
          initialIsFollowing={user.isFollowing}
          initialFollowerCount={user.followers}
        />
      )}

      <PostSection posts={post} viewMode={viewMode} onViewModeChange={setViewMode} />
    </div>
  );
}
