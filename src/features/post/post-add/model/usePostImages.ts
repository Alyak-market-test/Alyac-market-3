import { useState } from 'react';

export function usePostImages(initialImages: string[] = []) {
  const [removedIndexes, setRemovedIndexes] = useState<number[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [newPreviews, setNewPreviews] = useState<string[]>([]);

  const existingImages = initialImages.filter((_, i) => !removedIndexes.includes(i));
  const previews = [...existingImages, ...newPreviews];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    setImageFiles((prev) => [...prev, ...files]);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPreviews((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (index: number) => {
    if (index < existingImages.length) {
      const originalIndex = initialImages.indexOf(existingImages[index]);
      setRemovedIndexes((prev) => [...prev, originalIndex]);
    } else {
      const newIndex = index - existingImages.length;
      setImageFiles((prev) => prev.filter((_, i) => i !== newIndex));
      setNewPreviews((prev) => prev.filter((_, i) => i !== newIndex));
    }
  };

  return {
    imageFiles,
    previews,
    handleImageChange,
    handleRemoveImage,
  };
}
