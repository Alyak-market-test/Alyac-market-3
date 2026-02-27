import { SearchHistory } from './SearchHistory';

interface SearchHistorySectionProps {
  history: string[];
  onSelect: (word: string) => void;
  onRemove: (word: string) => void;
}

export function SearchHistorySection({ history, onSelect, onRemove }: SearchHistorySectionProps) {
  if (history.length === 0) {
    return (
      <div className="flex items-center justify-center py-64">
        <p className="text-muted-foreground text-sm">계정을 검색해보세요.</p>
      </div>
    );
  }

  return <SearchHistory history={history} onSelect={onSelect} onRemove={onRemove} />;
}
