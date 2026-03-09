import { CommentIcon, HeartIcon } from '@/shared/icons';

interface PostActionsProps {
  hearted: boolean;
  heartCount: number;
  commentCount: number;
  onHeart: () => void;
}

export function PostActions({ hearted, heartCount, commentCount, onHeart }: PostActionsProps) {
  return (
    <div className="mb-4 flex items-center gap-4">
      <button onClick={onHeart} className="flex items-center gap-1">
        <HeartIcon filled={hearted} />
        <span className="text-muted-foreground text-xs">{heartCount}</span>
      </button>
      <div className="flex items-center gap-1">
        <CommentIcon />
        <span className="text-muted-foreground text-xs">{commentCount}</span>
      </div>
    </div>
  );
}
