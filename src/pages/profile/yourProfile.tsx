import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { Button, TopBasicNav } from '@/shared';
import { ChatIcon } from '@/shared/icons';
import PostAlbumIcon from '@/shared/icons/PostAlbumIcon';
import PostListIcon from '@/shared/icons/PostListIcon';
import { ShareIcon } from '@/shared/icons/ShareIcon';
import { UploadImage } from '@/shared/ui/UploadImage';

// 임시 더미 데이터 - 나중에 API 연동 시 교체
const DUMMY_YOUR_PROFILE = {
  name: 'your name',
  username: '@test_user',
  followers: 4,
  followings: 2,
  image: null, // null이면 기본 이모지 표시
  intro: 'introduction text',
};
// 게시물이 없을 때
const DUMMY_YOUR_POSTS: { id: number; content: string; likes: number; comments: number }[] = [];
// 게시물이 있을 때
// const DUMMY_POSTS = [
//   { id: 1, content: '게시글 작성 테스트', likes: 0, comments: 1 },
// ];

export function YourProfilePage() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <div className="relative mx-auto flex min-h-screen flex-col bg-white">
      <TopBasicNav onBack={() => navigate(-1)} />
      {/* 프로필 정보 */}
      <section className="flex flex-col items-center px-4 py-6">
        <div className="mb-4 flex items-center gap-12">
          {/* 팔로워 */}
          <div className="flex flex-col items-center">
            <span className="text-xl font-bold">{DUMMY_YOUR_PROFILE.followers}</span>
            <span className="text-sm text-gray-500">Followers</span>
          </div>

          {/* 아바타 - 프로필 이미지 */}
          <UploadImage
            src={DUMMY_YOUR_PROFILE.image}
            alt={DUMMY_YOUR_PROFILE.username}
            size="xl"
            iconSize="md"
          />

          {/* 팔로잉 */}
          <div className="flex flex-col items-center">
            <span className="text-xl font-bold">{DUMMY_YOUR_PROFILE.followings}</span>
            <span className="text-sm text-gray-500">Followings</span>
          </div>
        </div>

        {/* 이름 & 아이디 */}
        <p className="text-base font-semibold">{DUMMY_YOUR_PROFILE.name}</p>
        <p className="mb-2 text-sm text-gray-400">{DUMMY_YOUR_PROFILE.username}</p>
        <p className="text-sm">{DUMMY_YOUR_PROFILE.intro}</p>
      </section>

      {/* BUTTON - 메세지, 팔로우, 공유 */}
      <div className="flex w-full items-center justify-center gap-3">
        <button className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-gray-300 text-gray-700 transition hover:bg-gray-50">
          <ChatIcon className="h-5 w-5 text-gray-700" />
        </button>
        <Button
          variant={isFollowing ? 'activ' : 'primary'}
          size="M"
          onClick={() => setIsFollowing(!isFollowing)}
        >
          {isFollowing ? '언팔로우' : '팔로우'}
        </Button>
        <button className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-gray-300 text-gray-700 transition hover:bg-gray-50">
          <ShareIcon className="h-5 w-5 text-gray-700" />
        </button>
      </div>

      {/* post list-album */}
      <div className="mt-6 flex items-center justify-end border-t border-b">
        <div className="mt-4 mb-4">
          <PostListIcon isActive={viewMode === 'list'} onClick={() => setViewMode('list')} />
        </div>
        <div className="mr-3 ml-1">
          <PostAlbumIcon isActive={viewMode === 'grid'} onClick={() => setViewMode('grid')} />
        </div>
      </div>

      {/* 게시물 목록 */}
      <main className="flex-1">
        {DUMMY_YOUR_POSTS.length === 0 ? (
          // 게시물 없을 때
          <div className="flex h-full items-center justify-center py-32">
            <p className="text-sm text-gray-900">작성한 게시물이 없습니다</p>
          </div>
        ) : viewMode === 'list' ? (
          // 리스트 뷰
          <div className="divide-y divide-gray-100">
            {DUMMY_YOUR_POSTS.map((post) => (
              <div key={post.id} className="px-4 py-4">
                <p className="text-sm">{post.content}</p>
              </div>
            ))}
          </div>
        ) : (
          // 그리드 뷰
          <div className="grid grid-cols-3 gap-0.5 p-0.5">
            {DUMMY_YOUR_POSTS.map((post) => (
              <div
                key={post.id}
                className="flex aspect-square items-center justify-center p-2 text-center text-xs text-gray-900"
              >
                {post.content}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
