import { Outlet } from 'react-router-dom';

import { Toaster } from '@/shared/ui/sonner';
import { BottomNav } from '@/widgets/bottom-nav';

export function RootLayout() {
  return (
    <div className="pb-16">
      <Outlet />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 1500,
          style: {
            background: 'var(--color-background)',
            color: 'var(--destructive)',
            border: '1px solid var(--color-border)',
          },
        }}
      />
      <BottomNav />
    </div>
  );
}
