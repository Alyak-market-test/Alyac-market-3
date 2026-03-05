import { api } from '@/shared/api';

export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('image', file);

  const { data } = await api.post('/image/uploadfile', formData);
  return data.filename;
}
