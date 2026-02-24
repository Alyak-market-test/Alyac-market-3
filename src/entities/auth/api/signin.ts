import { api } from '@/shared/api/instance';

export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignInResponse {
  user: {
    accessToken: string;
    refreshToken: string;
    accountname: string;
    username: string;
  };
}

export const signIn = async (data: SignInRequest): Promise<SignInResponse> => {
  const response = await api.post('/user/signin', {
    user: {
      email: data.email,
      password: data.password,
    },
  });
  return response.data;
};
