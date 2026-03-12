import { useQueryClient } from '@tanstack/react-query';

import { usePostProduct } from '@/entities/product';

export function useAddProduct() {
  const queryClient = useQueryClient();
  const { mutate: postMutate, isPending } = usePostProduct();

  const mutate = (
    payload: Parameters<typeof postMutate>[0],
    callbacks?: { onSuccess?: () => void; onError?: () => void },
  ) => {
    postMutate(payload, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['products'] });
        callbacks?.onSuccess?.();
      },
      onError: () => callbacks?.onError?.(),
    });
  };

  return { mutate, isPending };
}
