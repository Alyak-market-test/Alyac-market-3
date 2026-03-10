import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { type Post, useDeletePost, useToggleHeart } from '@/entities/post';
import { CommentIcon, HeartIcon, MoreVerticalIcon } from '@/shared/icons';

interface PostCardProps {
  post: Post;
  isMyPost?: boolean;
  onReport?: () => void;
}

export function PostCard({ post, isMyPost = false, onReport }: PostCardProps) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const { mutate: toggleHeart } = useToggleHeart(post.id);
  const { mutate: deletePost } = useDeletePost();

  // ✅ 삭제 핸들러 함수를 따로 만들면 코드가 더 깔끔해집니다.
  const handleDelete = () => {
    if (window.confirm('게시글을 삭제하시겠습니까?')) {
      deletePost(post.id);
      setMenuOpen(false); // 삭제 시작 시 메뉴를 닫습니다.
    }
  };

  return (
    <div className="border-border border-b px-4 py-4">
      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-muted h-10 w-10 shrink-0 overflow-hidden rounded-full">
            <img
              src={post.author.image || '/default-avatar.png'}
              alt={post.author.username}
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.src = '/default-avatar.png';
              }}
            />
          </div>
          <div className="flex flex-col">
            <span className="text-foreground text-sm font-medium">{post.author.username}</span>
            <span className="text-muted-foreground text-xs">@{post.author.accountname}</span>
          </div>
        </div>

        <button onClick={() => setMenuOpen((prev) => !prev)}>
          <MoreVerticalIcon />
        </button>

        {menuOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
            <div className="absolute top-8 right-0 z-50 w-44 rounded-xl bg-white shadow-lg">
              {isMyPost ? (
                <>
                  <button
                    className="w-full border-b px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => {
                      navigate(`/post/${post.id}/edit`);
                      setMenuOpen(false);
                    }}
                  >
                    수정하기
                  </button>
                  <button
                    className="w-full px-4 py-3 text-left text-sm text-red-600 hover:bg-gray-50"
                    onClick={handleDelete} // ✅ 위에서 만든 핸들러 연결
                  >
                    삭제하기
                  </button>
                </>
              ) : (
                <button
                  className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50"
                  onClick={() => {
                    onReport?.();
                    setMenuOpen(false);
                  }}
                >
                  신고하기
                </button>
              )}
            </div>
          </>
        )}
      </div>

      <p className="text-foreground mt-3 text-sm">{post.content}</p>

      {post.image && (
        <div className="mt-3 overflow-hidden rounded-lg">
          <img src={post.image} alt="post" className="w-full object-cover" />
        </div>
      )}

      <div className="mt-3 flex items-center gap-4">
        <button onClick={() => toggleHeart()} className="flex items-center gap-1">
          <HeartIcon filled={post.hearted} />
          <span className="text-muted-foreground text-xs">{post.heartCount}</span>
        </button>
        <button onClick={() => navigate(`/post/${post.id}`)} className="flex items-center gap-1">
          <CommentIcon />
          <span className="text-muted-foreground text-xs">{post.commentCount}</span>
        </button>
      </div>
      <span className="text-muted-foreground mt-2 block text-xs">{post.createdAt}</span>
    </div>
  );
}
