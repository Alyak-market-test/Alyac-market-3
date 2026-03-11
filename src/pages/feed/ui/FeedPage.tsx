import { useEffect, useRef } from 'react';

import { useNavigate } from 'react-router-dom';

import { useGetPosts } from '@/entities/post';
import { useMyProfile } from '@/entities/user';
import { FeedEmptyState } from '@/features/post';
import { ROUTES, TopMainNav } from '@/shared';
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
          <FeedEmptyState />
        )}
      </main>
      <BottomNav />
    </div>
  );
}
