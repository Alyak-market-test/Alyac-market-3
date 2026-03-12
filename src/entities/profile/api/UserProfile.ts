import { api } from '@/shared/api';

/**
 * 특정 사용자의 프로필 정보 조회
 * @param accountname - 조회할 사용자의 계정명
 * @returns 사용자 프로필 데이터
 * @throws 존재하지 않는 계정명이거나 서버 오류 시
 */
export const getYourProfile = async (accountname: string) => {
  const response = await api.get(`/profile/${accountname}`);
  return response.data;
};
