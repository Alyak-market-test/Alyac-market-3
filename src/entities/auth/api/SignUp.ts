import { api } from '@/shared/api/instance';

import type { SignUpRequest, SignUpResponse } from '../model/types';

export const signUp = async (data: SignUpRequest): Promise<SignUpResponse> => {
  const response = await api.post('/user', {
    user: {
      email: data.email,
      password: data.password,
      username: data.username,
      accountname: data.accountname,
      intro: data.intro || '',
      image: data.image || '',
    },
  });
  return response.data;
};
