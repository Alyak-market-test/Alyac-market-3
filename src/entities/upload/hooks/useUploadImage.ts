import { useCallback, useState } from 'react';

import { uploadImage } from '../api/UploadFiles';

interface UseUploadImageReturn {
  isUploading: boolean;
  upload: (file: File) => Promise<string>;
}

export function useUploadImage(): UseUploadImageReturn {
  const [isUploading, setIsUploading] = useState(false);

  const upload = useCallback(async (file: File): Promise<string> => {
    setIsUploading(true);
    try {
      return await uploadImage(file);
    } finally {
      setIsUploading(false);
    }
  }, []);

  return { isUploading, upload };
}
