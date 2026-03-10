import { api } from '@/shared/api';

/**
 * 특정 사용자 팔로우
 * @param accountname - 팔로우할 사용자의 계정명
 * @returns 팔로우 결과 응답
 * @throws 이미 팔로우 중이거나 존재하지 않는 계정 또는 서버오류 시
 */
export const followUser = (accountname: string) => api.post(`/profile/${accountname}/follow`);

/**
 * 특정 사용자 언팔로우
 * @param accountname - 언팔로우할 사용자의 계정명
 * @returns 언팔로우 결과 응답
 * @throws 팔로우 관계가 없거나 존재하지 않는 계정 또는 서버 오류 시
 */
export const unfollowUser = (accountname: string) => api.delete(`/profile/${accountname}/unfollow`);

/**
 * 특정 사용자의 팔로워 목록 조회
 * @param accountname - 팔로워 목록을 조회할 사용자의 계정명
 * @returns 팔로워 사용자 목록
 * @throws 존재하지 않는 계정명이거나 서버 오류 시
 */
export const getFollowers = async (accountname: string) => {
  const response = await api.get(`/profile/${accountname}/follower`);
  return response.data;
};

/**
 * 특정 사용자의 팔로잉 목록 조회
 * @param accountname - 팔로잉 목록을 조회할 사용자의 계정명
 * @returns 팔로잉 사용자 목록
 * @throws 존재하지 않는 계정명이거나 서버 오류 시
 */
export const getFollowings = async (accountname: string) => {
  const response = await api.get(`/profile/${accountname}/following`);
  return response.data;
};
