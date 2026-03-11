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
          style: {
            background: 'hsl(var(--color-background))',
            color: 'hsl(var(--color-foreground))',
            border: 'hsl(var(--color-border))',
          },
        }}
      />
      <BottomNav />
    </div>
  );
}
