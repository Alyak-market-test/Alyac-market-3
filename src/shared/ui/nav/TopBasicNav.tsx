import { ArrowLeftIcon } from '@/shared/ui/icons/ArrowLeftIcon';
import { MoreVerticalIcon } from '@/shared/ui/icons/MoreVerticalIcon';

interface TopBasicNavProps {
  title?: string;
  onBack: () => void;
  onMore?: () => void;
}

export function TopBasicNav({ title, onBack, onMore }: TopBasicNavProps) {
  return (
    <header className="flex h-14 items-center justify-between border-b bg-white px-4">
      <button onClick={onBack}>
        <ArrowLeftIcon />
      </button>

      {title && <span className="text-base font-medium">{title}</span>}

      {onMore ? (
        <button onClick={onMore}>
          <MoreVerticalIcon />
        </button>
      ) : (
        <div className="w-6" />
      )}
    </header>
  );
}
