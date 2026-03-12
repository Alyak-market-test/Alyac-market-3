import { type UseFormRegisterReturn } from 'react-hook-form';

import { AvatarImage } from '@/shared';

interface CommentInputProps {
  profileImage: string;
  value: string;
  onSubmit: () => void;
  inputProps?: UseFormRegisterReturn;
}

export function CommentInput({ profileImage, value, onSubmit, inputProps }: CommentInputProps) {
  return (
    <div className="bg-background fixed right-0 bottom-0 left-0 flex items-center gap-3 border-t px-4 py-3">
      <AvatarImage src={profileImage} size="sm" />
      <div className="bg-muted flex flex-1 items-center gap-2 rounded-full px-4 py-2">
        <input
          {...inputProps}
          placeholder="댓글 입력하기..."
          className="text-foreground placeholder:text-muted-foreground flex-1 bg-transparent text-sm outline-none"
          onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
        />
        <button
          onClick={onSubmit}
          disabled={!value.trim()}
          className="text-muted-foreground text-sm font-semibold disabled:opacity-40"
        >
          게시
        </button>
      </div>
    </div>
  );
}
