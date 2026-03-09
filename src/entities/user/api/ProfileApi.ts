import { api } from '@/shared/api/instance';

export const getMyProfile = async () => {
  const response = await api.get('/user/myinfo');
  return response.data;
};
export const getYourProfile = async (accountname: string) => {
  const response = await api.get(`/profile/${accountname}`);
  return response.data;
};
export const updateProfile = async (profileData: {
  username: string;
  accountname: string;
  intro: string;
  image: string | null;
}) => {
  const response = await api.put('/user', { user: profileData });
  return response.data;
};
