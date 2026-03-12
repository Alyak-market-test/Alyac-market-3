import { uploadApi } from '@/shared/api';
import { imageUrl } from '@/shared/lib';

import type { UploadResponse } from '../model/ImgTypes';

// 다중 업로드
export const uploadFiles = async (files: File[]): Promise<UploadResponse[]> => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append('image', file);
  });

  const response = await uploadApi.post<UploadResponse[]>('/image/uploadfiles', formData, {});
  return response.data;
};

// 단일 업로드 -> 전체 URL 반환
export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('image', file);

  const response = await uploadApi.post<UploadResponse>('/image/uploadfile', formData, {});
  return imageUrl(response.data.filename);
};
