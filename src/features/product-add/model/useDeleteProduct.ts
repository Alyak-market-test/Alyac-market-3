import { useState } from 'react';

import { deleteProduct } from '@/entities/product';

interface Callbacks {
  onSuccess?: () => void;
  onError?: () => void;
}

export function useDeleteProduct() {
  const [isPending, setIsPending] = useState(false);

  const mutate = async (productId: string, callbacks?: Callbacks) => {
    setIsPending(true);
    try {
      await deleteProduct(productId);
      callbacks?.onSuccess?.();
    } catch {
      callbacks?.onError?.();
    } finally {
      setIsPending(false);
    }
  };

  return { mutate, isPending };
}
