import { useMutation } from '@tanstack/react-query';

import { putProduct } from '../api/ProductApi';
import type { ProductPayload } from '../model/ProductTypes';

export function usePutProduct() {
  return useMutation({
    mutationFn: ({ productId, payload }: { productId: string; payload: ProductPayload }) =>
      putProduct(productId, payload),
  });
}
