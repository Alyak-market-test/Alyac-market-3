import { useState } from 'react';

import type { Product } from '@/entities/product';
import { useDeleteProduct } from '@/features/product-add';

interface ProductSectionProps {
  products: Product[];
  isLoading: boolean;
  onDeleteSuccess: (productId: string) => void;
}

const BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;

export function ProductSection({ products, isLoading, onDeleteSuccess }: ProductSectionProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const { mutate: deleteProduct, isPending } = useDeleteProduct();

  const handleDelete = (productId: string) => {
    if (isPending) return;
    deleteProduct(productId, {
      onSuccess: () => onDeleteSuccess(productId),
      onError: () => alert('상품 삭제에 실패했습니다.'),
    });
  };

  if (isLoading) {
    return <p className="text-muted-foreground py-4 text-center text-sm">불러오는 중...</p>;
  }

  return (
    <div className="mt-4 cursor-pointer border-t">
      <p className="text-foreground text-md p-4 font-bold">판매 중인 상품</p>
      <ul className="flex flex-row gap-3 px-4">
        {products.map((product) => (
          <li
            key={product.id}
            className="flex flex-col gap-1"
            onMouseEnter={() => setHoveredId(product.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className="relative">
              <img
                src={`${BASE_URL}/${product.itemImage}`}
                alt={product.itemName}
                className="h-32 w-32 rounded-sm object-cover"
                onError={(e) => {
                  e.currentTarget.src = '/placeholder.png';
                }}
              />
              {/* 삭제 버튼 */}
              {hoveredId === product.id && (
                <button
                  onClick={() => handleDelete(product.id)}
                  disabled={isPending}
                  className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-gray-600 text-xs text-white transition-colors hover:bg-gray-900 disabled:opacity-50"
                >
                  ✕
                </button>
              )}
            </div>
            <div className="flex flex-col gap-1 px-1">
              <span className="text-foreground text-sm font-medium">{product.itemName}</span>
              <span className="text-primary text-sm font-bold">
                {product.price.toLocaleString('ko-KR')}원
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
