import { DefaultImage } from '@/shared/icons';

import type { AvatarSize } from '../lib';

interface AvatarImageProps {
  src?: string | null;
  alt?: string;
  size?: AvatarSize;
  iconSize?: AvatarSize;
  className?: string;
}

const sizeMap: Record<AvatarSize, string> = {
  sm: 'h-10 w-10',
  md: 'h-16 w-16',
  lg: 'h-18 w-18',
  xl: 'h-24 w-24',
  xxl: 'w-32 h-32',
};

export function AvatarImage({
  src,
  alt = '프로필 이미지',
  size = 'md',
  iconSize = size,
  className = '',
}: AvatarImageProps) {
  return (
    <div className={`overflow-hidden rounded-full bg-gray-100 ${sizeMap[size]} ${className}`}>
      {src && src.trim() !== '' ? (
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      ) : (
        <DefaultImage size={iconSize} />
      )}
    </div>
  );
}
