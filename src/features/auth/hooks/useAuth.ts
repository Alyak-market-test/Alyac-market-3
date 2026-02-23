import { useNavigate } from 'react-router-dom';

import { getToken, removeToken } from '@/entities/auth';

export function useAuth() {
  const navigate = useNavigate();

  const logout = () => {
    removeToken();
    navigate('/signin');
  };

  const isAuthenticated = () => {
    return !!getToken();
  };

  return { logout, isAuthenticated };
}
