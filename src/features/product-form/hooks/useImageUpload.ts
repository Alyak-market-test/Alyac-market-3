import { useEffect, useRef, useState } from 'react';

interface UseImageUploadProps {
  onPreviewChange?: (urls: string[]) => void;
  onFileSelect: (files: File[]) => void;
  maxFiles?: number;
  currentCount?: number;
}

export function useImageUpload({
  onPreviewChange,
  onFileSelect,
  maxFiles = 3,
  currentCount = 0,
}: UseImageUploadProps) {
  const [previews, setPreviews] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      previews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previews]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    if (currentCount + files.length > maxFiles) {
      alert(`최대 ${maxFiles}개까지 업로드 가능합니다. (현재 ${currentCount}개 등록됨)`);
      return;
    }

    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setPreviews(previewUrls);
    onPreviewChange?.(previewUrls);
    onFileSelect(files);
  };

  return { inputRef, previews, handleFileSelect };
}
