import { useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { useForm, useWatch } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

import {
  useCreateComment,
  useDeletePost,
  useGetComments,
  useGetPost,
  useToggleHeart,
} from '@/entities/post';
import { useUser } from '@/entities/user';
import { CommentInput, CommentList } from '@/features/comment';
import { PostActions, PostAuthor, PostHeader, PostImages, PostMenuDropdown } from '@/features/post';
import { ROUTES } from '@/shared';
import { PageStateScreen } from '@/shared/ui';

interface CommentFormValues {
  comment: string;
}

export function PostDetailPage() {
  const queryClient = useQueryClient();
  const { post_id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  const { data: post, isLoading: isPostLoading } = useGetPost(post_id!);
  const { data: comments = [] } = useGetComments(post_id!);
  const { mutate: heart } = useToggleHeart(post_id!);
  const { mutate: submitComment } = useCreateComment(post_id!);
  const { mutate: deletePost } = useDeletePost();

  const { data: user } = useUser();

  const isMyPost = !!user && !!post && user.accountname === post.author.accountname;

  const { register, handleSubmit, reset, control } = useForm<CommentFormValues>({
    defaultValues: { comment: '' },
  });

  const commentValue = useWatch({ control, name: 'comment' });

  const onCommentSubmit = handleSubmit(({ comment }) => {
    submitComment({ postId: post_id!, content: comment });
    reset();
  });

  const handleBack = () => {
    if (location.state?.from === 'feed') {
      navigate(-1);
    } else {
      navigate(`/profile/${post?.author.accountname}`);
    }
  };

  const handleDelete = () => {
    setShowMenu(false);
    deletePost(post_id!, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['userPosts'] });
        queryClient.invalidateQueries({ queryKey: ['posts'] });
        navigate(-1);
      },
    });
  };

  if (isPostLoading) {
    return <PageStateScreen message="게시글을 불러오는 중..." />;
  }

  if (!post) {
    return <PageStateScreen variant="error" message="게시물을 찾을 수 없어요." />;
  }

  return (
    <div className="bg-background flex h-screen flex-col">
      <PostHeader onBack={handleBack} onMore={() => setShowMenu(true)} />
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-24">
        <PostAuthor
          image={post.author.image}
          username={post.author.username}
          accountname={post.author.accountname}
        />
        <p className="text-foreground mb-3 text-sm whitespace-pre-wrap">{post.content}</p>
        <PostImages images={post.image} />
        <PostActions
          hearted={post.hearted}
          heartCount={post.heartCount}
          commentCount={post.commentCount}
          onHeart={() => heart(post.hearted)}
        />
        <hr className="mb-4" />
        <CommentList comments={comments} />
      </div>
      <CommentInput
        profileImage={user?.image ?? ''}
        value={commentValue}
        inputProps={register('comment')}
        onSubmit={onCommentSubmit}
      />
      {showMenu && (
        <PostMenuDropdown
          isMyPost={isMyPost}
          onEdit={() => {
            navigate(ROUTES.POST.EDIT(post_id!));
            setShowMenu(false);
          }}
          onDelete={handleDelete}
          onReport={() => {
            toast.success('신고가 접수되었습니다.');
            setShowMenu(false);
          }}
          onClose={() => setShowMenu(false)}
        />
      )}
    </div>
  );
}
