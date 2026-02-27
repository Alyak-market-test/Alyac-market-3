import { getToken } from '@/entities/auth/lib/token';

export async function uploadImages(files: File[]): Promise<string[]> {
  const formData = new FormData();
  files.forEach((file) => formData.append('image', file));

  const res = await fetch('http://localhost:3000/api/image/uploadfiles', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    body: formData,
  });

  if (!res.ok) throw new Error('이미지 업로드 실패');

  const data = await res.json();
  return data.map((item: { filename: string }) => item.filename);
}
