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

export function ProfilePage() {
  const { accountname } = useParams();
  const { user, isMyProfile } = useProfile(accountname);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const post: [] = []; // TODO: 게시글 데이터 API 연동

  // ✅ useFollow를 ProfilePage로 끌어올림 (팔로우 상태 통합 관리)
  const { isFollowing, followerCount, loading, toggleFollow } = useFollow(user.accountname, {
    isFollowing: user.isFollowing,
    followerCount: user.followers,
  });

  // ✅ useEffect + useState → useQuery로 교체
  const queryClient = useQueryClient();
  const { data: products = [], isLoading: isProductsLoading } = useQuery({
    queryKey: ['products', user.accountname],
    queryFn: () => getProducts(user.accountname),
    enabled: isMyProfile && !!user.accountname,
  });

  // ✅ setProducts 직접 변경 → queryClient로 교체
  const handleDeleteSuccess = (productId: string) => {
    queryClient.setQueryData<Product[]>(['products', user.accountname], (prev) =>
      prev ? prev.filter((p) => p.id !== productId) : [],
    );
  };

  return (
    <div className="bg-background mx-auto flex min-h-screen flex-col">
      <TopBasicNav onBack={() => navigate(-1)} onMore={() => setShowLogoutModal(true)} />

      {/* 공통 - 프로필 정보 */}
      <section className="flex flex-col items-center px-4 py-6">
        {/* 팔로우 정보 */}
        <div className="flex items-center">
          <ProfileStats
            accountname={user.accountname}
            followers={isMyProfile ? user.followers : followerCount}
            image={user.image}
            followings={user.followings}
            username={user.username}
          />
        </div>
        {/* 계정 프로필 */}
        <ProfileInfo
          image={user.image}
          username={user.username}
          accountname={user.accountname}
          intro={user.intro}
        />
      </section>

      {/* buttons - my or your */}
      {isMyProfile ? (
        <>
          <MyButtons />
          <ProductSection
            products={products}
            isLoading={isProductsLoading}
            onDeleteSuccess={handleDeleteSuccess}
          />
        </>
      ) : (
        // ✅ initialState 대신 useFollow 상태를 직접 전달
        <YourButtons isFollowing={isFollowing} loading={loading} onToggleFollow={toggleFollow} />
      )}

      {/* post - list or album */}
      <PostSection posts={post} viewMode={viewMode} onViewModeChange={setViewMode} />

      {showLogoutModal && (
        <div className="fixed inset-0 z-50" onClick={() => setShowLogoutModal(false)}>
          <div
            className="bg-background absolute top-14 right-4 w-44 rounded-xl shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
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
          </div>
        </div>
      )}
    </div>
  );
}
