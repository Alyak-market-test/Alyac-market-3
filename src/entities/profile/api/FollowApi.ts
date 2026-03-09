// 팔로우 API
import { api } from '@/shared/api';

export const followUser = (accountname: string) => api.post(`/profile/${accountname}/follow`);
export const unfollowUser = (accountname: string) => api.delete(`/profile/${accountname}/unfollow`);

export const getFollowers = async (accountname: string) => {
  const response = await api.get(`/profile/${accountname}/follower`);
  return response.data;
};

export const getFollowings = async (accountname: string) => {
  const response = await api.get(`/profile/${accountname}/following`);
  return response.data;
};
