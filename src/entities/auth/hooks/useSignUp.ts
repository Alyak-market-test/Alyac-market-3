import { useMutation } from '@tanstack/react-query';

import { signUp } from '../api/signup';

export function useSignUp() {
  return useMutation({
    mutationFn: signUp,
  });
}
