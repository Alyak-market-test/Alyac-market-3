import { useMutation } from '@tanstack/react-query';

import { postProduct } from '../api/ProductApi';
import type { ProductPayload } from '../model/ProductTypes';

export function usePostProduct() {
  return useMutation({
    mutationFn: (payload: ProductPayload) => postProduct(payload),
  });
}
