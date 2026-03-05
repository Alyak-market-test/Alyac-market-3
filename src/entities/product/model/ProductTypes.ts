export interface Product {
  id: string;
  itemName: string;
  price: number;
  link?: string;
  itemImage: string;
}

export interface ProductPayload {
  product: {
    itemName: string;
    price: number;
    link?: string;
    itemImage: string;
  };
}
