import { useQuery } from '@tanstack/react-query';

import { getProductDetail } from '../api/ProductApi';

export function useGetProduct(productId: string) {
  return useQuery({
    queryKey: ['product', productId],
    queryFn: () => getProductDetail(productId),
    enabled: !!productId,
    staleTime: 1000 * 60, // 1분간 캐시 유지
  });
}
