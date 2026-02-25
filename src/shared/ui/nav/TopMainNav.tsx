import { SearchIcon } from '@/shared/icons/SearchIcon';

interface TopMainNavProps {
  onSearch: () => void;
}

export function TopMainNav({ onSearch }: TopMainNavProps) {
  return (
    <header className="bg-background flex h-14 items-center justify-between border-b px-4">
      <span className="text-lg font-semibold">알약마켓 피드</span>

      <button onClick={onSearch}>
        <SearchIcon />
      </button>
    </header>
  );
}
