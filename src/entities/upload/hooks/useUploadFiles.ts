import { useMutation } from '@tanstack/react-query';

import { uploadFiles } from '../api/UploadFiles';

export const useUploadFiles = () => {
  return useMutation({
    mutationFn: uploadFiles,
  });
};
