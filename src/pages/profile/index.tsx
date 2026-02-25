import { useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { MyButtons } from '@/features/profile/components/MyButtons';
import { PostSection } from '@/features/profile/components/PostSection';
import { ProfileInfo } from '@/features/profile/components/ProfileInfo';
import { ProfileStats } from '@/features/profile/components/ProfileStats';
import { YourButtons } from '@/features/profile/components/YourButtons';
import { useProfile } from '@/features/profile/hooks/UseProfile';
import { TopBasicNav } from '@/shared/ui/nav/TopBasicNav';

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
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const post: [] = []; // TODO: 게시글 데이터 API 연동

  return (
    <div className="mx-auto flex min-h-screen flex-col bg-white">
      <TopBasicNav onBack={() => navigate(-1)} />

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
      {isMyProfile ? <MyButtons /> : <YourButtons />}

      {/* post - list or album */}
      <PostSection posts={post} viewMode={viewMode} onViewModeChange={setViewMode} />
    </div>
  );
}
