import { useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { type Post, useDeletePost, useToggleHeart } from '@/entities/post';
import { AvatarImage, ROUTES } from '@/shared';
import { CommentIcon, HeartIcon, MoreVerticalIcon } from '@/shared/icons';
import { imageUrl } from '@/shared/lib';
import { DeleteConfirmModal } from '@/shared/ui';

interface PostCardProps {
  post: Post;
  isMyPost?: boolean;
  onReport?: () => void;
}

export function PostCard({ post, isMyPost = false, onReport }: PostCardProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isHearted, setIsHearted] = useState(post.hearted);
  const [heartCount, setHeartCount] = useState(post.heartCount);
  const { mutate: toggleHeart } = useToggleHeart(post.id);
  const { mutate: deletePost } = useDeletePost();

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
    setMenuOpen(false);
  };

  const handleDeleteConfirm = () => {
    deletePost(post.id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['posts'] });
        queryClient.invalidateQueries({ queryKey: ['userPosts'] });
        toast.success('게시글이 삭제되었습니다');
        setShowDeleteModal(false);
      },
    });
  };

  return (
    <div className="border-border border-b px-4 py-4">
      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-muted h-10 w-10 shrink-0 overflow-hidden rounded-full">
            <AvatarImage
              src={post.author.image ? imageUrl(post.author.image) : ''}
              alt={post.author.username}
              size="sm"
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
            <div className="bg-background absolute top-8 right-0 z-50 w-44 rounded-xl shadow-lg">
              {isMyPost ? (
                <>
                  <button
                    className="text-foreground hover:bg-muted w-full cursor-pointer rounded-t-xl border-b px-4 py-3 text-left text-sm transition-colors"
                    onClick={() => {
                      navigate(ROUTES.POST.EDIT(post.id));
                      setMenuOpen(false);
                    }}
                  >
                    수정하기
                  </button>
                  <button
                    className="hover:bg-muted w-full cursor-pointer rounded-b-xl px-4 py-3 text-left text-sm text-red-500 transition-colors"
                    onClick={handleDeleteClick}
                  >
                    삭제하기
                  </button>
                </>
              ) : (
                <button
                  className="text-foreground hover:bg-muted w-full cursor-pointer rounded-xl px-4 py-3 text-left text-sm transition-colors"
                  onClick={() => {
                    onReport?.();
                    toast.success('신고가 접수되었습니다');
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

      <p className="text-foreground mt-3 text-sm whitespace-pre-wrap">{post.content}</p>

      {post.image && (
        <div className="mt-3 flex gap-2 overflow-x-auto">
          {post.image.split(',').map((img, i) => (
            <div key={i} className="h-48 w-full shrink-0">
              <img
                src={imageUrl(img)}
                alt={`post-${i}`}
                className="h-full w-full rounded-lg object-cover"
              />
            </div>
          ))}
        </div>
      )}

      <div className="mt-3 flex items-center gap-4">
        <button
          onClick={() => {
            setIsHearted(!isHearted);
            setHeartCount(isHearted ? heartCount - 1 : heartCount + 1);
            toggleHeart(isHearted);
          }}
          className="flex cursor-pointer items-center gap-1"
        >
          <HeartIcon filled={isHearted} />
          <span className="text-muted-foreground text-xs">{heartCount}</span>
        </button>
        <button
          onClick={() => navigate(ROUTES.POST.DETAIL(post.id), { state: { from: 'feed' } })}
          className="flex cursor-pointer items-center gap-1"
        >
          <CommentIcon />
          <span className="text-muted-foreground text-xs">{post.commentCount}</span>
        </button>
      </div>
      <span className="text-muted-foreground mt-2 block text-xs">{post.createdAt}</span>

      {showDeleteModal && (
        <DeleteConfirmModal
          message="게시글을 삭제할까요?"
          onConfirm={handleDeleteConfirm}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
}
