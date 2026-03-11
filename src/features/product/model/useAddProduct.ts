// ✅ after
import { useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { postProduct } from '@/entities/product';
import type { ProductPayload } from '@/entities/product';

interface Callbacks {
  onSuccess?: () => void;
  onError?: () => void;
}

export function useAddProduct() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const mutate = async (payload: ProductPayload, callbacks?: Callbacks) => {
    setIsPending(true);
    setError(null);
    try {
      await postProduct(payload);
      queryClient.invalidateQueries({ queryKey: ['products'] });
      callbacks?.onSuccess?.();
    } catch (e) {
      const message = e instanceof Error ? e.message : '오류가 발생했습니다.';
      setError(message);
      callbacks?.onError?.();
    } finally {
      setIsPending(false);
    }
  };

  return { mutate, isPending, error };
}
