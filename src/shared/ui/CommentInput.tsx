import { UploadImage } from '@/shared/icons';

interface CommentInputProps {
  profileImage: string;
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

export function CommentInput({ profileImage, value, onChange, onSubmit }: CommentInputProps) {
  return (
    <div className="fixed right-0 bottom-0 left-0 flex items-center gap-3 border-t bg-white px-4 py-3">
      <UploadImage src={profileImage} size="sm" />
      <div className="flex flex-1 items-center gap-2 rounded-full bg-gray-100 px-4 py-2">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="댓글 입력하기..."
          className="flex-1 bg-transparent text-sm text-gray-500 outline-none placeholder:text-gray-400"
          onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
        />
        <button
          onClick={onSubmit}
          disabled={!value.trim()}
          className="text-sm font-semibold text-gray-400 disabled:opacity-40"
        >
          게시
        </button>
      </div>
    </div>
  );
}
