import { useQueryClient } from '@tanstack/react-query';

import { usePutProduct } from '@/entities/product';
import type { ProductPayload } from '@/entities/product';

export function useEditProduct() {
  const queryClient = useQueryClient();
  const { mutate: putMutate, isPending } = usePutProduct();

  const mutate = (
    productId: string,
    payload: ProductPayload,
    callbacks?: { onSuccess?: () => void; onError?: () => void },
  ) => {
    putMutate(
      { productId, payload },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['products'] });
          callbacks?.onSuccess?.();
        },
        onError: () => callbacks?.onError?.(),
      },
    );
  };

  return { mutate, isPending };
}
