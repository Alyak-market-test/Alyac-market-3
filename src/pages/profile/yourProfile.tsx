import { useState } from 'react';

import PostAlbumIcon from '@/shared/icons/PostAlbumIcon';
import PostListIcon from '@/shared/icons/PostListIcon';
import { UploadImage } from '@/shared/ui/UploadImage';

// 임시 더미 데이터 - 나중에 API 연동 시 교체
const DUMMY_YOUR_PROFILE = {
  name: 'your name',
  username: '@test_user',
  followers: 4,
  followings: 2,
  image: null, // null이면 기본 이모지 표시
};
// 게시물이 없을 때
const DUMMY_YOUR_POSTS: { id: number; content: string; likes: number; comments: number }[] = [];
// 게시물이 있을 때
// const DUMMY_POSTS = [
//   { id: 1, content: '게시글 작성 테스트', likes: 0, comments: 1 },
// ];

export function YourProfilePage() {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  return (
    <div className="relative mx-auto flex min-h-screen flex-col bg-white">
      {/* 프로필 정보 */}
      <section className="flex flex-col items-center px-4 py-6">
        <div className="mb-4 flex items-center gap-12">
          {/* 팔로워 */}
          <div className="flex flex-col items-center">
            <span className="text-xl font-bold">{DUMMY_YOUR_PROFILE.followers}</span>
            <span className="text-sm text-gray-500">Followers</span>
          </div>

          {/* 아바타 - 프로필 이미지 */}
          <UploadImage src={DUMMY_YOUR_PROFILE.image} alt={DUMMY_YOUR_PROFILE.username} size="lg" />

          {/* 팔로잉 */}
          <div className="flex flex-col items-center">
            <span className="text-xl font-bold">{DUMMY_YOUR_PROFILE.followings}</span>
            <span className="text-sm text-gray-500">Followings</span>
          </div>
        </div>

        {/* 이름 & 아이디 */}
        <p className="text-base font-semibold">{DUMMY_YOUR_PROFILE.name}</p>
        <p className="text-sm text-gray-400">{DUMMY_YOUR_PROFILE.username}</p>
      </section>

      {/* BUTTON - 팔로우, 메세지, 공유 */}
      <div className="mt-4 flex w-full gap-3">
        <button>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.5 9.58336C17.5029 10.6832 17.2459 11.7683 16.75 12.75C16.162 13.9265 15.2581 14.916 14.1395 15.6078C13.021 16.2995 11.7319 16.6662 10.4167 16.6667C9.31678 16.6696 8.23176 16.4126 7.25 15.9167L2.5 17.5L4.08333 12.75C3.58744 11.7683 3.33047 10.6832 3.33333 9.58336C3.33384 8.26815 3.70051 6.97907 4.39227 5.86048C5.08402 4.7419 6.07355 3.838 7.25 3.25002C8.23176 2.75413 9.31678 2.49716 10.4167 2.50002H10.8333C12.5703 2.59585 14.2109 3.32899 15.4409 4.55907C16.671 5.78915 17.4042 7.42973 17.5 9.16669V9.58336Z"
              stroke="#767676"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
        <button className="flex-1 rounded-full border border-gray-300 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50">
          팔로우
        </button>
        <button>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14 6.66663C15.3807 6.66663 16.5 5.54734 16.5 4.16663C16.5 2.78591 15.3807 1.66663 14 1.66663C12.6193 1.66663 11.5 2.78591 11.5 4.16663C11.5 5.54734 12.6193 6.66663 14 6.66663Z"
              stroke="#767676"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M4 12.5C5.38071 12.5 6.5 11.3807 6.5 10C6.5 8.61929 5.38071 7.5 4 7.5C2.61929 7.5 1.5 8.61929 1.5 10C1.5 11.3807 2.61929 12.5 4 12.5Z"
              stroke="#767676"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M14 18.3334C15.3807 18.3334 16.5 17.2141 16.5 15.8334C16.5 14.4527 15.3807 13.3334 14 13.3334C12.6193 13.3334 11.5 14.4527 11.5 15.8334C11.5 17.2141 12.6193 18.3334 14 18.3334Z"
              stroke="#767676"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M6.1582 11.2583L11.8499 14.575"
              stroke="#767676"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M11.8415 5.42505L6.1582 8.74172"
              stroke="#767676"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
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
