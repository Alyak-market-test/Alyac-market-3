import { useEffect, useRef } from 'react';

import { useNavigate } from 'react-router-dom';

import { useGetPosts } from '@/entities/post';
import { useMyProfile } from '@/entities/user';
import { ROUTES, TopMainNav } from '@/shared';
import { LogoGrayIcon } from '@/shared/icons';
import { ThemeToggle } from '@/shared/lib/theme/ThemeToggle';
import { BottomNav } from '@/widgets/bottom-nav';
import { PostCard } from '@/widgets/post-card';

export function FeedPage() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetPosts();
  const { data: currentUser } = useMyProfile();
  const navigate = useNavigate();
  const observerRef = useRef<HTMLDivElement>(null);

  const posts = data?.pages.flatMap((page) => page) ?? [];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );

    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="flex min-h-screen flex-col pt-14">
      <TopMainNav onSearch={() => navigate(ROUTES.SEARCH)} />
      <div className="flex justify-end px-4 py-2">
        <ThemeToggle />
      </div>
      <main className="flex-1 overflow-y-auto pb-16">
        {posts.length > 0 ? (
          <>
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                isMyPost={currentUser?.accountname === post.author.accountname}
              />
            ))}
            <div ref={observerRef} className="h-4" />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4 pt-32">
            <LogoGrayIcon width={65} height={103} />
            <p className="text-muted-foreground text-sm">유저를 검색해 팔로우 해보세요!</p>
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
