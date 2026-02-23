import { ArrowLeftIcon } from '@/shared/ui/icons/ArrowLeftIcon';

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
    <header className="gap3 px4 flex h-14 items-center border-b bg-white">
      <button onClick={onBack}>
        <ArrowLeftIcon />
      </button>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 text-sm text-gray-700 outline-none placeholder:text-gray-400"
      />
    </header>
  );
}
