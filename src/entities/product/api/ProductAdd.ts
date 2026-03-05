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
  await api.delete(`/product/${productId}`);
}

export async function putProduct(productId: string, payload: ProductPayload): Promise<Product> {
  const response = await api.put(`/product/${productId}`, payload);
  return response.data;
}
