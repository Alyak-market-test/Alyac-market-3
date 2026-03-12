import { useMutation } from '@tanstack/react-query';

import { uploadFiles } from '../api/ImgaeAPI';

export const useUploadFiles = () => {
  return useMutation({
    mutationFn: uploadFiles,
  });
};
