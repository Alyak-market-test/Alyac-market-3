import { useMutation } from '@tanstack/react-query';

import { deleteProduct } from '../api/ProductApi';

export function useDeleteProduct() {
  return useMutation({
    mutationFn: (productId: string) => deleteProduct(productId),
  });
}
