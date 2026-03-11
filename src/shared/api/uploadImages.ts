import { uploadApi } from '@/shared/api/UploadApi';

export async function uploadImages(files: File[]): Promise<string[]> {
  const formData = new FormData();
  files.forEach((file) => formData.append('image', file));

  const res = await uploadApi.post('/image/uploadfiles', formData);

  return res.data.map((item: { filename: string }) => item.filename);
}
