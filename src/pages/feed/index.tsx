import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useGetPosts } from '@/entities/post';
import { PostCard } from '@/features/post';
import { ROUTES, TopMainNav } from '@/shared';
import { CommentIcon, HeartIcon, LogoGrayIcon, MoreVerticalIcon } from '@/shared/icons';
import { ThemeToggle } from '@/shared/lib/theme/ThemeToggle';
import { BottomNav } from '@/widgets/bottom-nav';

export function FeedPage() {
  const { data: posts } = useGetPosts();
  const navigate = useNavigate();
  const [heartedIds, setHeartedIds] = useState<Set<string>>(new Set());

  const toggleHeart = (id: string) => {
    setHeartedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };
  // 임시로 다크모드 아이콘 32~34줄
  return (
    <div className="flex min-h-screen flex-col">
      <TopMainNav onSearch={() => navigate(ROUTES.SEARCH)} />
      <div className="flex justify-end px-4 py-2">
        <ThemeToggle />
      </div>
      <main className="flex-1 overflow-y-auto pb-16">
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              moreIcon={<MoreVerticalIcon />}
              heartIcon={<HeartIcon filled={heartedIds.has(post.id)} />}
              commentIcon={<CommentIcon />}
              onMoreClick={() => {}}
              onHeartClick={() => toggleHeart(post.id)}
              onCommentClick={() => {}}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center gap-4 pt-32">
            <LogoGrayIcon width={65} height={103} />
            <p className="text-sm text-gray-500">유저를 검색해 팔로우 해보세요!</p>
            <button
              onClick={() => navigate(ROUTES.SEARCH)}
              className="rounded-full bg-green-500 px-6 py-2 text-sm text-white"
            >
              검색하기
            </button>
          </div>
        )}
      </main>
      <BottomNav />
    </div>
  );
}
