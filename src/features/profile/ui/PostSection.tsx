import { useNavigate } from 'react-router-dom';

import { type Post } from '@/entities/post';
import { PostCard } from '@/features/post';
import { PostAlbumIcon, PostListIcon } from '@/shared/icons';

interface PostSectionProps {
  posts: Post[];
  viewMode: 'list' | 'grid';
  onViewModeChange: (mode: 'list' | 'grid') => void;
  isMyProfile?: boolean;
}

export function PostSection({
  posts,
  viewMode,
  onViewModeChange,
  isMyProfile = false,
}: PostSectionProps) {
  const navigate = useNavigate();

  return (
    <>
      <div className="mt-6 flex items-center justify-end border-t border-b">
        <div className="mt-4 mb-4">
          <PostListIcon isActive={viewMode === 'list'} onClick={() => onViewModeChange('list')} />
        </div>
        <div className="mr-3 ml-1">
          <PostAlbumIcon isActive={viewMode === 'grid'} onClick={() => onViewModeChange('grid')} />
        </div>
      </div>
      <main className="flex-1">
        {posts.length === 0 ? (
          <div className="flex h-full items-center justify-center py-32">
            <p className="text-foreground text-sm">작성한 게시물이 없습니다</p>
          </div>
        ) : viewMode === 'list' ? (
          <div>
            {posts.map((post) => (
              <PostCard key={post.id} post={post} isMyPost={isMyProfile} />
            ))}
          </div>
        ) : (
          <div className="mb-10 grid grid-cols-3 gap-2 p-4">
            {posts.map((post) => (
              <div
                key={post.id}
                onClick={() => navigate(`/post/${post.id}`)}
                className="flex aspect-square cursor-pointer items-center justify-center overflow-hidden bg-gray-100"
              >
                {post.image ? (
                  <img src={post.image} alt="post-image" className="h-full w-full object-cover" />
                ) : (
                  <p className="p-1 text-center text-xs">이미지가 없음</p>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
