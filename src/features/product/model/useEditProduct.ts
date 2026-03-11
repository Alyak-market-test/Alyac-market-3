import { useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { putProduct } from '@/entities/product';
import type { ProductPayload } from '@/entities/product';

interface Callbacks {
  onSuccess?: () => void;
  onError?: () => void;
}

export function useEditProduct() {
  const [isPending, setIsPending] = useState(false);
  const queryClient = useQueryClient();

  const mutate = async (productId: string, payload: ProductPayload, callbacks?: Callbacks) => {
    setIsPending(true);
    try {
      await putProduct(productId, payload);
      queryClient.invalidateQueries({ queryKey: ['products'] });
      callbacks?.onSuccess?.();
    } catch {
      callbacks?.onError?.();
    } finally {
      setIsPending(false);
    }
  };

  return { mutate, isPending };
}
