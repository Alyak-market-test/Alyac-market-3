import { useEffect, useRef, useState } from 'react';

import { useUploadFiles } from '@/entities/image';

interface ImageUploadProps {
  onUploadComplete: (urls: string[]) => void;
  onPreviewChange?: (urls: string[]) => void;
  maxFiles?: number;
  currentCount?: number;
  inputRef?: React.RefObject<HTMLInputElement>;
}

export function ImageUpload({
  onUploadComplete,
  onPreviewChange,
  maxFiles = 3,
  currentCount = 0,
  inputRef: externalRef,
}: ImageUploadProps) {
  const [previews, setPreviews] = useState<string[]>([]);
  const uploadMutation = useUploadFiles();
  const internalRef = useRef<HTMLInputElement>(null);
  const inputRef = externalRef ?? internalRef;

  useEffect(() => {
    return () => {
      previews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previews]);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    if (currentCount + files.length > maxFiles) {
      alert(`최대 ${maxFiles}개까지 업로드 가능합니다. (현재 ${currentCount}개 등록됨)`);
      return;
    }

    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setPreviews(previewUrls);
    onPreviewChange?.(previewUrls);

    uploadMutation.mutate(files, {
      onSuccess: (data) => {
        const urls = data.map((item) => item.filename);
        onUploadComplete(urls);
      },
      onError: (error) => {
        alert('업로드 실패: ' + error.message);
        setPreviews([]);
        onPreviewChange?.([]);
      },
    });
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileSelect}
        disabled={uploadMutation.isPending}
        className="hidden"
      />
    </div>
  );
}
