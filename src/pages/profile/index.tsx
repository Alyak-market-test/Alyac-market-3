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

// 게시물이 없을 때
// const DUMMY_POSTS: { id: number; content: string; likes: number; comments: number }[] = [];
// 게시물이 있을 때
// const DUMMY_POSTS = [
//   { id: 1, content: '게시글 작성 테스트', likes: 0, comments: 1 },
// ];

export function ProfilePage() {
  const { accountname } = useParams();
  const { user, isMyProfile } = useProfile(accountname);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const post: [] = []; // TODO: 게시글 데이터 API 연동

  return (
    <div className="bg-background mx-auto flex min-h-screen flex-col">
      <TopBasicNav onBack={() => navigate(-1)} onMore={() => setShowLogoutModal(true)} />

      {/* 공통 - 프로필 정보 */}
      <section className="flex flex-col items-center px-4 py-6">
        {/* 팔로우 정보 */}
        <div className="flex items-center">
          <ProfileStats
            followers={user.followers}
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
        <MyButtons />
      ) : (
        <YourButtons
          accountname={user.accountname}
          initialIsFollowing={user.isFollowing}
          initialFollowerCount={user.followers}
        />
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
