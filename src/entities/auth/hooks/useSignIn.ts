import { useMutation } from '@tanstack/react-query';

import { signIn } from '../api/SignIn';
import { saveToken } from '../lib/Token';

export const useSignIn = () => {
  return useMutation({
    mutationFn: signIn,
    onSuccess: (data) => {
      saveToken(data.user.accessToken, data.user.refreshToken);
    },
  });
};
