interface PostMenuDropdownProps {
  onReport: () => void;
  onDelete: () => void;
  onClose: () => void;
}

export function PostMenuDropdown({ onReport, onDelete, onClose }: PostMenuDropdownProps) {
  return (
    <div className="fixed inset-0 z-50" onClick={onClose}>
      <div className="bg-background absolute top-14 right-4 w-44 rounded-xl shadow-lg">
        <button
          className="text-foreground w-full border-b px-4 py-3 text-left text-sm"
          onClick={onReport}
        >
          신고하기
        </button>
        <button className="text-foreground w-full px-4 py-3 text-left text-sm" onClick={onDelete}>
          삭제
        </button>
      </div>
    </div>
  );
}
