import uploadApi from '@/shared/api/uploadApi';

export interface UploadResponse {
  filename: string;
}

export const uploadFiles = async (files: File[]): Promise<UploadResponse[]> => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append('image', file);
  });

  const response = await uploadApi.post('/image/uploadfiles', formData, {});

  return response.data;
};
