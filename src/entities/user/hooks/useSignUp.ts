import { useMutation } from '@tanstack/react-query';

import { signUp } from '../api/SignUp';

export function useSignUp() {
  return useMutation({
    mutationFn: signUp,
  });
}
