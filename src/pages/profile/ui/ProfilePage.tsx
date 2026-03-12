import { useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { useGetUserPosts } from '@/entities/post';
import { useAuth } from '@/features/auth';
import { useFollow } from '@/features/follow';
import { MyButtons, ProfileInfo, ProfileStats, YourButtons, useProfile } from '@/features/profile';
import { FollowButton, ThemeToggle, TopBasicNav } from '@/shared';
import { MoreVerticalIcon } from '@/shared/icons';
import { PageStateScreen, Popover, PopoverContent, PopoverTrigger } from '@/shared/ui';
import { PostCard } from '@/widgets/post-card';
import { PostSection } from '@/widgets/post-section';
import { ProductSection } from '@/widgets/product-section';

export function ProfilePage() {
  const { accountname } = useParams();
  const { user, isMyProfile, isLoading: isUserLoading } = useProfile(accountname);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const { data: posts = [] } = useGetUserPosts(user.accountname);

  const { isFollowing, followerCount, loading, toggleFollow } = useFollow(user.accountname, {
    isFollowing: user.isFollowing,
    followerCount: user.followers,
  });

  if (isUserLoading) {
    return <PageStateScreen message="Loading..." />;
  }

  return (
    <div className="bg-background mx-auto my-15 flex min-h-screen flex-col">
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
            accountname={user.accountname}
            followers={isMyProfile ? user.followers : followerCount}
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

      <div className="-mt-4 -mb-2">
        {isMyProfile ? (
          <MyButtons />
        ) : (
          <YourButtons
            followButton={
              <FollowButton isFollowing={isFollowing} loading={loading} onToggle={toggleFollow} />
            }
          />
        )}
      </div>

      <ProductSection accountname={user.accountname} isMyProfile={isMyProfile} />

      <PostSection
        posts={posts}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        isMyProfile={isMyProfile}
        renderPost={(post) => <PostCard key={post.id} post={post} isMyPost={isMyProfile} />}
      />
    </div>
  );
}
