import { uploadApi } from '@/shared/api';

export interface UploadResponse {
  filename: string;
  path: string;
  destination: string;
  originalname: string;
  size: number;
}

// 다중 업로드
export const uploadFiles = async (files: File[]): Promise<UploadResponse[]> => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append('image', file);
  });

  const response = await uploadApi.post('/image/uploadfiles', formData, {});
  return response.data;
};

// 단일 업로드 -> 전체 URL 반환
export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('image', file);

  const response = await uploadApi.post<UploadResponse>('/image/uploadfile', formData, {});
  const { filename } = response.data;

  if (filename.startsWith('http')) {
    return filename;
  }
  return `${import.meta.env.VITE_IMAGE_BASE_URL}/uploadFiles/${filename}`;
};
