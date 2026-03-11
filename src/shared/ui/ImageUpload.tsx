import { useEffect, useRef, useState } from 'react';

interface ImageUploadProps {
  onPreviewChange?: (urls: string[]) => void;
  onFileSelect: (files: File[]) => void;
  maxFiles?: number;
  currentCount?: number;
  inputRef?: React.RefObject<HTMLInputElement>;
  isUploading?: boolean;
  showPreview?: boolean;
}

export function ImageUpload({
  onPreviewChange,
  onFileSelect,
  maxFiles = 3,
  currentCount = 0,
  inputRef: externalRef,
  isUploading = false,
  showPreview = false,
}: ImageUploadProps) {
  const [previews, setPreviews] = useState<string[]>([]);
  const internalRef = useRef<HTMLInputElement>(null);
  const inputRef = externalRef ?? internalRef;

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

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileSelect}
        disabled={isUploading}
        className="hidden"
      />

      {showPreview && (
        <>
          {isUploading && <div>업로드 중...</div>}
          <div className="preview-container">
            {previews.map((url, index) => (
              <img key={index} src={url} alt={`Preview ${index}`} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
