import { useState } from 'react';

import { useForm, useWatch } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import {
  useCreateComment,
  useDeletePost,
  useGetComments,
  useGetPost,
  useToggleHeart,
} from '@/entities/post';
import { PostActions, PostAuthor, PostHeader, PostImages, PostMenuDropdown } from '@/features/post';
import { CommentInput, CommentList } from '@/shared/ui';

interface CommentFormValues {
  comment: string;
}

export function PostDetailPage() {
  const { post_id } = useParams();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const { data: post, isLoading: isPostLoading } = useGetPost(post_id!);
  const { data: comments = [] } = useGetComments(post_id!);
  const { mutate: heart } = useToggleHeart(post_id!);
  const { mutate: submitComment } = useCreateComment(post_id!);
  const { mutate: deletePost } = useDeletePost();

  const { register, handleSubmit, reset, control } = useForm<CommentFormValues>({
    defaultValues: { comment: '' },
  });

  const commentValue = useWatch({ control, name: 'comment' });

  const onCommentSubmit = handleSubmit(({ comment }) => {
    submitComment({ postId: post_id!, content: comment });
    reset();
  });

  if (isPostLoading)
    return <div className="flex h-screen items-center justify-center">로딩중...</div>;

  if (!post)
    return <div className="flex h-screen items-center justify-center">게시물을 찾을 수 없어요</div>;

  return (
    <div className="bg-background flex h-screen flex-col">
      <PostHeader
        onBack={() => navigate(`/profile/${post.author.accountname}`)}
        onMore={() => setShowMenu(true)}
      />
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-24">
        <PostAuthor
          image={post.author.image}
          username={post.author.username}
          accountname={post.author.accountname}
        />
        <p className="text-foreground mb-3 text-sm">{post.content}</p>
        <PostImages images={post.image} />
        <PostActions
          hearted={post.hearted}
          heartCount={post.heartCount}
          commentCount={post.commentCount}
          onHeart={() => heart()}
        />
        <hr className="mb-4" />
        <CommentList comments={comments} />
      </div>
      <CommentInput
        profileImage={post.author.image}
        value={commentValue}
        inputProps={register('comment')}
        onSubmit={onCommentSubmit}
      />
      {showMenu && (
        <PostMenuDropdown
          onClose={() => setShowMenu(false)}
          onReport={() => {
            alert('신고가 접수되었습니다.');
            setShowMenu(false);
          }}
          onDelete={() => deletePost(post_id!)}
        />
      )}
    </div>
  );
}
