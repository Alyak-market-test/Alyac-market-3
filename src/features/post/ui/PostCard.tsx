import type { ReactNode } from 'react';

import type { Post } from '@/entities/post';

interface PostCardProps {
  post: Post;
  moreIcon: ReactNode;
  heartIcon: ReactNode;
  commentIcon: ReactNode;
  onMoreClick: () => void;
  onHeartClick: () => void;
  onCommentClick: () => void;
}
export function PostCard({
  post,
  moreIcon,
  heartIcon,
  commentIcon,
  onMoreClick,
  onHeartClick,
  onCommentClick,
}: PostCardProps) {
  return (
    <div className="border-b border-gray-100 px-4 py-4">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-200">
            <img
              src={post.author.image}
              alt={post.author.username}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-900">{post.author.username}</span>
            <span className="text-xs text-gray-400">@ {post.author.accountname}</span>
          </div>
        </div>
        <button onClick={onMoreClick}>{moreIcon}</button>
      </div>
      {/* 본문 */}
      <p className="mt-3 text-sm text-gray-800">{post.content}</p>

      {/* 이미지 */}
      {post.image && (
        <div className="mt-3 overflow-hidden rounded-lg">
          <img src={post.image} alt="post" className="w-full object-cover" />
        </div>
      )}
      {/* 푸터 */}
      <div className="mt-3 flex items-center gap-4">
        <button onClick={onHeartClick} className="flex items-center gap-1">
          {heartIcon}
          <span className="text-xs text-gray-500">{post.heartCount}</span>
        </button>
        <button onClick={onCommentClick} className="flex items-center gap-1">
          {commentIcon}
          <span className="text-xs text-gray-500">{post.commentCount}</span>
        </button>
      </div>
      <span className="mt-2 block text-xs text-gray-400">{post.createdAt}</span>
    </div>
  );
}
