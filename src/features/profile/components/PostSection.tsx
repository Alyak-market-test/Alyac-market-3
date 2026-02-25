// 게시글 뷰모드(리스트/그리드) 컴포넌트
// components/PostSection.tsx
import PostAlbumIcon from '@/shared/icons/PostAlbumIcon';
import PostListIcon from '@/shared/icons/PostListIcon';

interface PostSectionProps {
  posts: { id: number; content: string }[];
  viewMode: 'list' | 'grid';
  onViewModeChange: (mode: 'list' | 'grid') => void;
}

export function PostSection({ posts, viewMode, onViewModeChange }: PostSectionProps) {
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
            <p className="text-sm text-gray-900">작성한 게시물이 없습니다</p>
          </div>
        ) : viewMode === 'list' ? (
          <div className="divide-y divide-gray-100">
            {posts.map((post) => (
              <div key={post.id} className="px-4 py-4">
                <p className="text-sm">{post.content}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-0.5 p-0.5">
            {posts.map((post) => (
              <div
                key={post.id}
                className="flex aspect-square items-center justify-center p-2 text-center text-xs"
              >
                {post.content}
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
