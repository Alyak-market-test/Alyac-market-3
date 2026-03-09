import { ArrowLeftIcon, MoreVerticalIcon } from '@/shared/icons';

interface PostHeaderProps {
  onBack: () => void;
  onMore: () => void;
}

export function PostHeader({ onBack, onMore }: PostHeaderProps) {
  return (
    <header className="flex h-14 items-center justify-between border-b px-4">
      <button onClick={onBack}>
        <ArrowLeftIcon />
      </button>
      <button onClick={onMore}>
        <MoreVerticalIcon />
      </button>
    </header>
  );
}
