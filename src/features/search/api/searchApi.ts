import axios from 'axios';

/**
 * 키워드로 유저를 검색합니다.
 * @param keyword - 검색할 키워드
 * @returns 검색된 유저 목록
 */
export async function searchUsers(keyword: string) {
  const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/user/searchuser`, {
    params: { keyword },
  });
  return data;
}
