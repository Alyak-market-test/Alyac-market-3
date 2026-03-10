import { api } from '@/shared/api/instance';

import type {
  MyProfileResponse,
  UpdateProfileRequest,
  YourProfileResponse,
} from '../model/ProfileTypes';

export const getMyProfile = async (): Promise<MyProfileResponse> => {
  // accountname 가져오기
  const meResponse = await api.get('/user/myinfo');
  const accountname = meResponse.data.user.accountname;
  // 전체 프로필 (intro 포함) 가져오기
  const profileResponse = await api.get(`/profile/${accountname}`);
  // MyProfileResponse 형태로 맞춰서 반환
  return { user: profileResponse.data.profile };
};

export const getYourProfile = async (accountname: string): Promise<YourProfileResponse> => {
  const response = await api.get(`/profile/${accountname}`);
  return response.data;
};

export const updateProfile = async (
  profileData: UpdateProfileRequest,
): Promise<MyProfileResponse> => {
  const response = await api.put('/user', { user: profileData });
  return response.data;
};
