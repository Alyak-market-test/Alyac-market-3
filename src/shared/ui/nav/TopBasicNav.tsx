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
    <header className="bg-background fixed top-0 right-0 left-0 z-50">
      <nav className="flex h-14 items-center justify-between border-b px-4">
        <button onClick={onBack}>
          <ArrowLeftIcon />
        </button>

        {title && <span className="text-base font-bold">{title}</span>}

        {moreSlot ??
          (onMore ? (
            <button onClick={onMore}>
              <MoreVerticalIcon />
            </button>
          ) : (
            <div className="w-6" />
          ))}
      </nav>
    </header>
  );
}
