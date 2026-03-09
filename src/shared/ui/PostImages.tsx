interface PostImagesProps {
  images: string;
}

export function PostImages({ images }: PostImagesProps) {
  if (!images) return null;

  return (
    <div className="mb-3 flex flex-col gap-2">
      {images.split(',').map((img, i) => (
        <img key={i} src={img} alt={`post-${i}`} className="w-full rounded-lg object-cover" />
      ))}
    </div>
  );
}
