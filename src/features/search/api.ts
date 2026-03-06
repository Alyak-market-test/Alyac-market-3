import axios from 'axios';

export interface User {
  _id: string;
  username: string;
  accountname: string;
  intro: string;
  image: string;
}

export async function searchUsers(keyword: string): Promise<User[]> {
  const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/user/searchuser`, {
    params: { keyword },
  });
  return data;
}
