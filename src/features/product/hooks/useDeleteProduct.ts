import { useQueryClient } from '@tanstack/react-query';

import { useDeleteProduct as useDeleteProductEntity } from '@/entities/product';

export function useDeleteProduct() {
  const queryClient = useQueryClient();
  const { mutate: deleteMutate, isPending } = useDeleteProductEntity();

  const mutate = (
    productId: string,
    callbacks?: { onSuccess?: () => void; onError?: () => void },
  ) => {
    deleteMutate(productId, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['products'] });
        callbacks?.onSuccess?.();
      },
      onError: () => callbacks?.onError?.(),
    });
  };

  return { mutate, isPending };
}
