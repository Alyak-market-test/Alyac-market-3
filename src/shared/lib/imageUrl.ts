export const imageUrl = (path: string | undefined): string => {
  if (!path) return '/default-image.png';
  if (path.startsWith('http')) return path;

  const baseUrl = import.meta.env.VITE_IMAGE_BASE_URL;
  const normalizedPath = path.replace('uploadFiles##', 'uploadFiles/').replace(/\\/g, '/');
  return `${baseUrl}/${normalizedPath}`;
};

// 사용 예시
// import { imageUrl } from '@/shared/lib';
// <img src={imageUrl(user.image)} alt={user.username} />
