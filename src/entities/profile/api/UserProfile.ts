import { api } from '@/shared/api';

export const getYourProfile = async (accountname: string) => {
  const response = await api.get(`/profile/${accountname}`);
  return response.data;
};

// TODO :
// swagger에 맞게 get user profile만 profile 폴더에 두고 나머지는 user에 지정
// 혹은 user/prorileapi에 같이 지정
