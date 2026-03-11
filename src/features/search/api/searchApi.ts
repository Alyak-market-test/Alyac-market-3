import axios from 'axios';

export async function searchUsers(keyword: string) {
  const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/user/searchuser`, {
    params: { keyword },
  });
  return data;
}
