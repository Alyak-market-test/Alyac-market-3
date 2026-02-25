import { ArrowLeftIcon } from '@/shared/icons/ArrowLeftIcon';
import { MoreVerticalIcon } from '@/shared/icons/MoreVerticalIcon';

interface TopChatNavProps {
  title: string;
  onBack: () => void;
  onMore?: () => void;
}

export function TopChatNav({ title, onBack, onMore }: TopChatNavProps) {
  return (
    <header className="bg-background flex h-14 items-center justify-between border-b px-4">
      <button onClick={onBack}>
        <ArrowLeftIcon />
      </button>

      <span className="text-base font-medium">{title}</span>

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
