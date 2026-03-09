import { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import type { Comment, Post } from '@/entities/post';
import { api } from '@/shared/api/instance';
import {
  CommentInput,
  CommentList,
  PostActions,
  PostAuthor,
  PostHeader,
  PostImages,
  PostMenuDropdown,
} from '@/shared/ui';

export function PostDetailPage() {
  const { post_id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentInput, setCommentInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (!post_id) return;
    const fetchData = async () => {
      try {
        const [postRes, commentRes] = await Promise.all([
          api.get(`/post/${post_id}`),
          api.get(`/post/${post_id}/comments`),
        ]);
        setPost(postRes.data.post);
        setComments(commentRes.data.comment ?? []);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [post_id]);

  const handleCommentSubmit = async () => {
    if (!commentInput.trim()) return;
    try {
      const res = await api.post(`/post/${post_id}/comments`, {
        comment: { content: commentInput },
      });
      setComments((prev) => [...prev, res.data.comment]);
      setCommentInput('');

      setPost((prev) => (prev ? { ...prev, commentCount: prev.commentCount + 1 } : prev));
    } catch (e) {
      console.error(e);
    }
  };

  const handleHeart = async () => {
    if (!post) return;
    const prevPost = post;

    setPost({
      ...post,
      hearted: !post.hearted,
      heartCount: post.hearted ? post.heartCount - 1 : post.heartCount + 1,
    });

    try {
      await api.post(`/post/${post_id}/heart`);
    } catch (e) {
      setPost(prevPost);
      console.error(e);
    }
  };

  if (isLoading) return <div className="flex h-screen items-center justify-center">로딩중...</div>;
  if (!post)
    return <div className="flex h-screen items-center justify-center">게시물을 찾을 수 없어요</div>;

  return (
    <div className="bg-background flex h-screen flex-col">
      {/* 상단 네비 */}
      <PostHeader onBack={() => navigate(-1)} onMore={() => setShowMenu(true)} />

      {/* 본문 */}
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-24">
        {/* 작성자 */}
        <PostAuthor
          image={post.author.image}
          username={post.author.username}
          accountname={post.author.accountname}
        />
        {/* 내용 */}
        <p className="text-foreground mb-3 text-sm">{post.content}</p>

        {/* 이미지 */}
        <PostImages images={post.image} />
        {/* 좋아요 / 댓글 수 */}
        <PostActions
          hearted={post.hearted}
          heartCount={post.heartCount}
          commentCount={post.commentCount}
          onHeart={handleHeart}
        />
        <hr className="mb-4" />
        {/* 댓글 목록 */}
        <CommentList comments={comments} />
      </div>
      {/* 댓글 입력창 */}
      <CommentInput
        profileImage={post.author.image}
        value={commentInput}
        onChange={setCommentInput}
        onSubmit={handleCommentSubmit}
      />
      {showMenu && (
        <PostMenuDropdown
          onClose={() => setShowMenu(false)}
          onReport={() => {
            alert('신고가 접수되었습니다.');
            setShowMenu(false);
          }}
          onDelete={async () => {
            await api.delete(`/post/${post_id}`);
            navigate(-1);
          }}
        />
      )}
    </div>
  );
}
