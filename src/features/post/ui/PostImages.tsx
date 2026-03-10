import { imageUrl } from '@/shared/lib';

const BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;

interface PostImagesProps {
  images: string;
}

export function PostImages({ images }: PostImagesProps) {
  if (!images) return null;

  return (
    <div className="mb-3 flex flex-col gap-2">
      {images.split(',').map((img, i) => {
        const formattedPath = img.includes('##') ? img.replace('##', '/') : img;

        return (
          <img
            key={i}
            src={imageUrl(img)}
            alt={`post-${i}`}
            className="w-full rounded-lg object-cover"
            onLoad={() => console.log('성공:', `${BASE_URL}/${formattedPath}`)}
            onError={() => console.error('실패:', `${BASE_URL}/${formattedPath}`)}
          />
        );
      })}
    </div>
  );
}
