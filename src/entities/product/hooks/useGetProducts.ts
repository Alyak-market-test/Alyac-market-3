import { useQuery } from '@tanstack/react-query';

import { getProducts } from '../api/ProductApi';

export function useGetProducts(accountname: string) {
  return useQuery({
    queryKey: ['products', accountname],
    queryFn: () => getProducts(accountname),
    enabled: !!accountname,
  });
}
