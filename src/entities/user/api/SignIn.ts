import { api } from '@/shared/api/instance';

import type { SignInRequest, SignInResponse } from '../model/types';

export const signIn = async (data: SignInRequest): Promise<SignInResponse> => {
  const response = await api.post('/user/signin', {
    user: {
      email: data.email,
      password: data.password,
    },
  });
  return response.data;
};
