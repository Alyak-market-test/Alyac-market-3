import { useRef } from 'react';

import { useUploadImage } from '@/entities/upload';

const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const MAX_FILE_SIZE_MB = 5;

interface UseAvatarUploadReturn {
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  isUploading: boolean;
  openFilePicker: () => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
}

interface UseAvatarUploadOptions {
  onUpload: (imageUrl: string) => void;
  onError?: (message: string) => void;
}

export function useAvatarUpload({
  onUpload,
  onError,
}: UseAvatarUploadOptions): UseAvatarUploadReturn {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { isUploading, upload } = useUploadImage();

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      onError?.('JPG, PNG, WEBP, GIF 형식만 업로드할 수 있어요.');
      return;
    }

    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      onError?.(`이미지는 ${MAX_FILE_SIZE_MB}MB 이하만 업로드할 수 있어요.`);
      return;
    }

    try {
      const imageUrl = await upload(file);
      onUpload(imageUrl);
    } catch {
      onError?.('이미지 업로드에 실패했어요. 다시 시도해주세요.');
    }

    // 같은 파일 재선택 가능하도록 초기화
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return { fileInputRef, isUploading, openFilePicker, handleFileChange };
}
