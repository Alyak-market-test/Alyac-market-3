import { Outlet } from 'react-router-dom';

import { BottomNav } from '@/widgets/bottom-nav';

export function RootLayout() {
  return (
    <div className="pb-16">
      <Outlet />
      <BottomNav />
    </div>
  );
}
