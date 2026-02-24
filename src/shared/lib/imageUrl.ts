export const imageUrl = (path: string | undefined): string => {
  if (!path) return '/default-image.png';

  const baseUrl = import.meta.env.VITE_IMAGE_BASE_URL;
  return `${baseUrl}${path}`;
};

// 사용 예시
// import { imageUrl } from '@/shared/lib';
// <img src={imageUrl(user.image)} alt={user.username} />
