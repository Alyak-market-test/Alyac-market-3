interface CommentInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  profileImage?: string;
}

export function CommentInput({ value, onChange, onSubmit, profileImage }: CommentInputProps) {
  return (
    <div className="flex items-center gap-3 border-t bg-white px-4 py-3">
      <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full bg-gray-100">
        {profileImage ? (
          <img src={profileImage} alt="프로필" className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full bg-gray-200" />
        )}
      </div>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="댓글 입력하기..."
        className="flex-1 text-sm text-gray-700 outline-none placeholder:text-gray-400"
      />

      <button
        onClick={onSubmit}
        disabled={!value.trim()}
        className="text-sm font-medium text-[#11CC27] disabled:text-gray-300"
      >
        게시
      </button>
    </div>
  );
}
