import { ArrowLeftIcon } from '@/shared/icons/ArrowLeftIcon';

interface TopSearchNavProps {
  value: string;
  onChange: (value: string) => void;
  onBack: () => void;
  placeholder?: string;
}

export function TopSearchNav({
  value,
  onChange,
  onBack,
  placeholder = '계정 검색',
}: TopSearchNavProps) {
  return (
    <header className="gap3 px4 bg-background flex h-14 items-center border-b">
      <button onClick={onBack}>
        <ArrowLeftIcon />
      </button>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="text-foreground placeholder:text-muted-foreground flex-1 text-sm outline-none"
      />
    </header>
  );
}
