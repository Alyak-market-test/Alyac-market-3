interface SearchHistoryProps {
  history: string[];
  onSelect: (keyword: string) => void;
  onRemove: (keyword: string) => void;
}

export function SearchHistory({ history, onSelect, onRemove }: SearchHistoryProps) {
  if (history.length === 0) return null;

  return (
    <div className="flex flex-col">
      <p className="px-4 py-2 text-xs font-semibold text-gray-400">최근 검색어</p>
      {history.map((item) => (
        <div
          key={item}
          className="flex cursor-pointer items-center justify-between px-4 py-3 hover:bg-gray-50"
        >
          <span className="text-sm" onClick={() => onSelect(item)}>
            {item}
          </span>
          <button className="text-gray-300 hover:text-gray-500" onClick={() => onRemove(item)}>
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
