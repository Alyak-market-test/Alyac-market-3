import { useState } from 'react';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';

import { type Product, getProducts } from '@/entities/product';
import { useAuth } from '@/features/auth';
import { useFollow } from '@/features/follow';
import {
  MyButtons,
  PostSection,
  ProductSection,
  ProfileInfo,
  ProfileStats,
  YourButtons,
  useProfile,
} from '@/features/profile';
import { ThemeToggle, TopBasicNav } from '@/shared';
import { MoreVerticalIcon } from '@/shared/icons';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui';

export function ProfilePage() {
  const { accountname } = useParams();
  const { user, isMyProfile } = useProfile(accountname);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const post: [] = [];

  // 팔로우 상태 통합 관리
  const { isFollowing, followerCount, loading, toggleFollow } = useFollow(user.accountname, {
    isFollowing: user.isFollowing,
    followerCount: user.followers,
  });

  const queryClient = useQueryClient();
  const { data: products = [], isLoading: isProductsLoading } = useQuery({
    queryKey: ['products', user.accountname],
    queryFn: () => getProducts(user.accountname),
    enabled: !!user.accountname,
  });

  const handleDeleteSuccess = (productId: string) => {
    queryClient.setQueryData<Product[]>(['products', user.accountname], (prev) =>
      prev ? prev.filter((p) => p.id !== productId) : [],
    );
  };

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
          // initialState 대신 useFollow 상태를 직접 전달
          <YourButtons isFollowing={isFollowing} loading={loading} onToggleFollow={toggleFollow} />
        )}
      </div>

      <ProductSection
        products={products}
        isLoading={isProductsLoading}
        isMyProfile={isMyProfile}
        onDeleteSuccess={handleDeleteSuccess}
      />

      <PostSection posts={post} viewMode={viewMode} onViewModeChange={setViewMode} />
    </div>
  );
}
