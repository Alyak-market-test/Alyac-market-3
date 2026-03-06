import { api } from '@/shared/api/instance';

export interface User {
  _id: string;
  username: string;
  accountname: string;
  intro: string;
  image: string;
}

export async function searchUsers(keyword: string): Promise<User[]> {
  const { data } = await api.get('/user/searchuser', {
    params: { keyword },
  });
  return data;
}
