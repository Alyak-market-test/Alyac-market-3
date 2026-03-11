import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateProfile } from '../api/ProfileApi';

export const profileQueryKeys = {
  my: ['myProfile'] as const,
  profile: (accountname: string) => ['profile', accountname] as const,
};

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: (_, variables) => {
      queryClient.refetchQueries({ queryKey: profileQueryKeys.my });
      queryClient.refetchQueries({
        queryKey: profileQueryKeys.profile(variables.accountname),
      });
    },
  });
}
