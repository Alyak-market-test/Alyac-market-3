import type { Comment } from '@/entities/post';
import { AvatarImage } from '@/shared/icons';

interface CommentListProps {
  comments: Comment[];
}

export function CommentList({ comments }: CommentListProps) {
  return (
    <div className="flex flex-col gap-4">
      {comments.length === 0 ? (
        <p className="text-muted-foreground text-center text-sm">아직 댓글이 없습니다</p>
      ) : (
        comments.map((comment) => (
          <div key={comment.id} className="flex gap-3">
            <AvatarImage src={comment.author.image} size="sm" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-foreground text-sm font-semibold">
                  {comment.author.username}
                </span>
                <span className="text-muted-foreground text-xs">
                  {new Date(comment.createdAt).toLocaleDateString('ko-KR', {
                    timeZone: 'Asia/Seoul',
                  })}
                </span>
              </div>
              <p className="text-foreground text-sm">{comment.content}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
