import { api } from '@/shared/api';

import type { Product, ProductPayload } from '../model/ProductTypes';

export async function postProduct(payload: ProductPayload): Promise<Product> {
  const response = await api.post('/product', payload);
  return response.data;
}

export async function getProducts(accountname: string): Promise<Product[]> {
  const response = await api.get(`/product/${accountname}`);
  return response.data.product;
}

export async function deleteProduct(productId: string): Promise<void> {
  const response = await api.delete(`/product/${productId}`);
  return response.data;
}
