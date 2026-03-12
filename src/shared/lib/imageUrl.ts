export const imageUrl = (path: string | undefined): string => {
  if (!path) return '/default-image.png';
  if (path.startsWith('http')) return path;

  // 오염된 데이터 처리: "uploadFiles/https://..." 형태
  const cleaned = path.replace(/^uploadFiles\//, '');
  if (cleaned.startsWith('http')) return cleaned;

  const baseUrl = import.meta.env.VITE_IMAGE_BASE_URL;
  const normalizedPath = cleaned.replace('uploadFiles##', 'uploadFiles/').replace(/\\/g, '/');

  const withPrefix = normalizedPath.startsWith('uploadFiles/')
    ? normalizedPath
    : `uploadFiles/${normalizedPath}`;

  return `${baseUrl}/${withPrefix}`;
};

// 사용 예시
// import { imageUrl } from '@/shared/lib';
// <img src={imageUrl(user.image)} alt={user.username} />
