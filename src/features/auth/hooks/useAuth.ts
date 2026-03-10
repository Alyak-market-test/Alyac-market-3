import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { getToken, removeToken } from '@/entities/user';

export function useAuth() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const logout = () => {
    removeToken();
    queryClient.clear();
    navigate('/');
  };

  const isAuthenticated = () => {
    return !!getToken();
  };

  return { logout, isAuthenticated };
}
