import { Navigate, Outlet } from 'react-router-dom';

import { getToken } from '@/entities/user';

export function RequireGuest() {
  if (getToken()) {
    return <Navigate to="/feed" replace />;
  }

  return <Outlet />;
}
