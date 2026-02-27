interface SearchHistoryProps {
  history: string[];
  onSelect: (keyword: string) => void;
  onRemove: (keyword: string) => void;
}

export function SearchHistory({ history, onSelect, onRemove }: SearchHistoryProps) {
  return (
    <div className="flex flex-col">
      <p className="text-muted-foreground px-4 py-2 text-xs font-semibold">최근 검색어</p>
      {history.map((item) => (
        <div
          key={item}
          className="hover:bg-accent flex cursor-pointer items-center justify-between px-4 py-3"
          onClick={() => onSelect(item)}
        >
          <span className="text-sm">{item}</span>
          <button
            className="text-muted-foreground hover:text-foreground"
            onClick={(e) => {
              e.stopPropagation();
              onRemove(item);
            }}
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
