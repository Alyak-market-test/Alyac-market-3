import { api } from '@/shared/api/instance';

export const getMyProfile = async () => {
  const response = await api.get('/user/myinfo');
  return response.data;
};
