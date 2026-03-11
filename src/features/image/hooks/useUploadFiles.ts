import { useMutation } from '@tanstack/react-query';

import { uploadFiles } from '@/entities/image';

export const useUploadFiles = () => {
  return useMutation({
    mutationFn: uploadFiles,
  });
};
