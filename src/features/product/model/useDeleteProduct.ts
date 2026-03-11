import { useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { deleteProduct } from '@/entities/product';

interface Callbacks {
  onSuccess?: () => void;
  onError?: () => void;
}

export function useDeleteProduct() {
  const [isPending, setIsPending] = useState(false);
  const queryClient = useQueryClient();

  const mutate = async (productId: string, callbacks?: Callbacks) => {
    setIsPending(true);
    try {
      await deleteProduct(productId);
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
