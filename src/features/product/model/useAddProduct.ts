import { useState } from 'react';

import { postProduct } from '@/entities/product';
import type { ProductPayload } from '@/entities/product';

interface Callbacks {
  onSuccess?: () => void;
  onError?: () => void;
}

export function useAddProduct() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = async (payload: ProductPayload, callbacks?: Callbacks) => {
    setIsPending(true);
    setError(null);
    try {
      await postProduct(payload);
      callbacks?.onSuccess?.(); // 성공 시 navigate(-1) 호출됨
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
