import { Navigate, Outlet } from 'react-router-dom';

import { getToken } from '@/entities/auth';

export function RequireGuest() {
  if (getToken()) {
    return <Navigate to="/feed" replace />;
  }

  return <Outlet />;
}
