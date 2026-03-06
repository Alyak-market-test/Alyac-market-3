import type { ReactNode } from 'react';

import { ArrowLeftIcon } from '@/shared/icons/ArrowLeftIcon';
import { MoreVerticalIcon } from '@/shared/icons/MoreVerticalIcon';

interface TopBasicNavProps {
  title?: string;
  onBack: () => void;
  onMore?: () => void;
  moreSlot?: ReactNode;
}

export function TopBasicNav({ title, onBack, onMore, moreSlot }: TopBasicNavProps) {
  return (
    <header className="bg-background flex h-14 items-center justify-between border-b px-4">
      <button onClick={onBack}>
        <ArrowLeftIcon />
      </button>

      {title && <span className="text-base font-medium">{title}</span>}

      {moreSlot ??
        (onMore ? (
          <button onClick={onMore}>
            <MoreVerticalIcon />
          </button>
        ) : (
          <div className="w-6" />
        ))}
    </header>
  );
}
