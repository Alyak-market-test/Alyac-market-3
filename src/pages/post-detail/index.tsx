import { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { api } from '@/shared/api/instance';
import {
  ArrowLeftIcon,
  CommentIcon,
  HeartIcon,
  MoreVerticalIcon,
  UploadImage,
} from '@/shared/icons';

interface Post {
  id: string;
  content: string;
  image: string;
  heartCount: number;
  hearted: boolean;
  commentCount: number;
  author: {
    username: string;
    accountname: string;
    image: string;
  };
}

interface Comment {
  id: string;
  content: string;
  author: {
    username: string;
    image: string;
  };
  createdAt: string;
}

export function PostDetailPage() {
  const { post_id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentInput, setCommentInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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

    setPost({
      ...post,
      hearted: !post.hearted,
      heartCount: post.hearted ? post.heartCount - 1 : post.heartCount + 1,
    });

    try {
      await api.post(`/post/${post_id}/heart`);
    } catch (e) {
      setPost({ ...post });
      console.error(e);
    }
  };

  if (isLoading) return <div className="flex h-screen items-center justify-center">로딩중...</div>;
  if (!post)
    return <div className="flex h-screen items-center justify-center">게시물을 찾을 수 없어요</div>;

  return (
    <div className="bg-background flex h-screen flex-col">
      {/* 상단 네비 */}
      <header className="flex h-14 items-center justify-between border-b px-4">
        <button onClick={() => navigate(-1)}>
          <ArrowLeftIcon />
        </button>
        <button>
          <MoreVerticalIcon />
        </button>
      </header>

      {/* 본문 */}
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-24">
        {/* 작성자 */}
        <div className="mb-3 flex items-center gap-3">
          <UploadImage src={post.author.image} size="sm" />
          <div>
            <p className="text-foreground text-sm font-semibold">{post.author.username}</p>
            <p className="text-muted-foreground text-xs">@{post.author.accountname}</p>
          </div>
        </div>

        {/* 내용 */}
        <p className="text-foreground mb-3 text-sm">{post.content}</p>

        {/* 이미지 */}
        {post.image && (
          <div className="mb-3 flex flex-col gap-2">
            {post.image.split(',').map((img, i) => (
              <img key={i} src={img} alt={`post-${i}`} className="w-full rounded-lg object-cover" />
            ))}
          </div>
        )}

        {/* 좋아요 / 댓글 수 */}
        <div className="mb-4 flex items-center gap-4">
          <button onClick={handleHeart} className="flex items-center gap-1">
            <HeartIcon filled={post.hearted} />
            <span className="text-muted-foreground text-xs">{post.heartCount}</span>
          </button>
          <div className="flex items-center gap-1">
            <CommentIcon />
            <span className="text-muted-foreground text-xs">{post.commentCount}</span>
          </div>
        </div>

        <hr className="mb-4" />

        {/* 댓글 목록 */}
        <div className="flex flex-col gap-4">
          {comments.length === 0 ? (
            <p className="text-muted-foreground text-center text-sm">아직 댓글이 없습니다</p>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="flex gap-3">
                <UploadImage src={comment.author.image} size="sm" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-foreground text-sm font-semibold">
                      {comment.author.username}
                    </span>
                    <span className="text-muted-foreground text-xs">
                      {new Date(comment.createdAt).toLocaleDateString('ko-KR')}
                    </span>
                  </div>
                  <p className="text-foreground text-sm">{comment.content}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      {/* 댓글 입력창 */}
      <div className="fixed right-0 bottom-0 left-0 flex items-center gap-3 border-t bg-white px-4 py-3">
        <UploadImage src={post.author.image} size="sm" />

        <div className="flex flex-1 items-center gap-2 rounded-full bg-gray-100 px-4 py-2">
          <input
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            placeholder="댓글 입력하기..."
            className="flex-1 bg-transparent text-sm text-gray-500 outline-none placeholder:text-gray-400"
            onKeyDown={(e) => e.key === 'Enter' && handleCommentSubmit()}
          />
          <button
            onClick={handleCommentSubmit}
            disabled={!commentInput.trim()}
            className="text-sm font-semibold text-gray-400 disabled:opacity-40"
          >
            게시
          </button>
        </div>
      </div>
    </div>
  );
}
