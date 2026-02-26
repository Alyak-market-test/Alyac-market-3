// 팔로우 API
import { api } from '@/shared/api/instance';

export const followUser = (accountname: string) => api.post(`/profile/${accountname}/follow`);

export const unfollowUser = (accountname: string) => api.delete(`/profile/${accountname}/unfollow`);
