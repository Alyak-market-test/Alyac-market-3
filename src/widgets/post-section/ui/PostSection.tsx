import { useNavigate } from 'react-router-dom';

import { type Post } from '@/entities/post';
import { PostAlbumIcon, PostListIcon } from '@/shared/icons';
import { NoneImage } from '@/shared/icons';
import { imageUrl } from '@/shared/lib';

interface PostSectionProps {
  posts: Post[];
  viewMode: 'list' | 'grid';
  onViewModeChange: (mode: 'list' | 'grid') => void;
  isMyProfile?: boolean;
  renderPost: (post: Post) => React.ReactNode;
}

export function PostSection({ posts, viewMode, onViewModeChange, renderPost }: PostSectionProps) {
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
          <div>{posts.map((post) => renderPost(post))}</div>
        ) : (
          <div className="mb-10 grid grid-cols-3 gap-2 p-4">
            {posts.map((post) => {
              const firstImage = post.image?.trim().split(',').filter(Boolean)[0];
              return (
                <div
                  key={post.id}
                  onClick={() => navigate(`/post/${post.id}`)}
                  className="flex aspect-square cursor-pointer items-center justify-center overflow-hidden bg-(--bg-post-grid)"
                >
                  {firstImage ? (
                    <img
                      src={imageUrl(firstImage)}
                      alt="post-image"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <NoneImage color="var(--color-muted-foreground)" size={25} />
                      <p className="p-1 text-center text-xs text-(--color-muted-foreground)">
                        이미지 없음
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>
    </>
  );
}
