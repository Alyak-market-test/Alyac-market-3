import { useMutation } from '@tanstack/react-query';

import { signIn } from '../api/signin';
import { saveToken } from '../lib/token';

export const useSignIn = () => {
  return useMutation({
    mutationFn: signIn,
    onSuccess: (data) => {
      saveToken(data.user.accessToken, data.user.refreshToken);
    },
  });
};
