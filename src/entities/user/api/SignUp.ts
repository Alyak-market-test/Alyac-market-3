import { api } from '@/shared/api/instance';

export interface SignUpRequest {
  email: string;
  password: string;
  username: string;
  accountname: string;
  intro?: string;
  image?: string;
}

export interface SignUpResponse {
  message: string;
  user: {
    _id: string;
    username: string;
    email: string;
    accountname: string;
    intro: string;
    image: string;
  };
}

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
