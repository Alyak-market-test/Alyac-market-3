interface CommentInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  profileImage?: string;
}

export function CommentInput({ value, onChange, onSubmit, profileImage }: CommentInputProps) {
  return (
    <div className="bg-background flex items-center gap-3 border-t px-4 py-3">
      <div className="bg-muted h-8 w-8 shrink-0 overflow-hidden rounded-full">
        {profileImage ? (
          <img src={profileImage} alt="프로필" className="h-full w-full object-cover" />
        ) : (
          <div className="bg-muted h-full w-full" />
        )}
      </div>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="댓글 입력하기..."
        className="text-foreground placeholder:text-muted-foreground flex-1 text-sm outline-none"
      />

      <button
        onClick={onSubmit}
        disabled={!value.trim()}
        className="disabled:text-muted-foreground text-sm font-medium text-[#11CC27]"
      >
        게시
      </button>
    </div>
  );
}
