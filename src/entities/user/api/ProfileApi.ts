import { api } from '@/shared/api/instance';

import type {
  MyProfileResponse,
  UpdateProfileRequest,
  YourProfileResponse,
} from '../model/ProfileTypes';

export const getMyProfile = async (): Promise<MyProfileResponse> => {
  const response = await api.get('/user/myinfo');
  return response.data;
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
