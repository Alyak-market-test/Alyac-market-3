import { useMutation } from '@tanstack/react-query';

import { uploadFiles } from '../api/UploadingFiles';

export const useUploadFiles = () => {
  return useMutation({
    mutationFn: uploadFiles,
  });
};
