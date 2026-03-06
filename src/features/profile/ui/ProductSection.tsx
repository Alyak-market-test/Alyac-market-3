import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import type { Product } from '@/entities/product';
import { useDeleteProduct } from '@/features/product-add';
import { Button, DeleteConfirmModal } from '@/shared/ui';

interface ProductSectionProps {
  products: Product[];
  isLoading: boolean;
  isMyProfile: boolean;
  onDeleteSuccess: (productId: string) => void;
}

const BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;

export function ProductSection({
  products,
  isLoading,
  isMyProfile,
  onDeleteSuccess,
}: ProductSectionProps) {
  const navigate = useNavigate();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const { mutate: deleteProduct, isPending } = useDeleteProduct();

  const handleDeleteClick = (productId: string) => {
    setDeleteTargetId(productId); // 모달 열기
  };

  const handleDeleteConfirm = () => {
    if (!deleteTargetId || isPending) return;
    deleteProduct(deleteTargetId, {
      onSuccess: () => {
        onDeleteSuccess(deleteTargetId);
        setDeleteTargetId(null);
      },
      onError: () => {
        alert('상품 삭제에 실패했습니다.');
        setDeleteTargetId(null);
      },
    });
  };

  const handleDeleteCancel = () => {
    if (isPending) return;
    setDeleteTargetId(null);
  };

  const handleImageClick = (product: Product) => {
    if (!isMyProfile) return;
    navigate(`/product-edit/${product.id}`);
  };

  if (isLoading) {
    return <p className="text-muted-foreground py-4 text-center text-sm">불러오는 중...</p>;
  }

  return (
    <>
      <div className={`px-3 py-3 ${products.length > 0 ? 'mt-8 border-t' : ''}`}>
        {products.length > 0 && <p className="text-foreground text-md font-bold">판매 중인 상품</p>}
        <ul className="mt-2 flex flex-row gap-3">
          {products.map((product) => (
            <li
              key={product.id}
              className="flex flex-col gap-1 p-2"
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="relative">
                <img
                  src={`${BASE_URL}/${product.itemImage}`}
                  alt={product.itemName}
                  className={`h-32 w-32 rounded-md object-cover ${isMyProfile ? 'cursor-pointer' : ''}`}
                  onClick={() => handleImageClick(product)}
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder.png';
                  }}
                />
                {/* 내 프로필일 때만 삭제 버튼 표시 */}
                {isMyProfile && hoveredId === product.id && (
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteClick(product.id);
                    }}
                    variant={'productDelete'}
                    size="icon-sm"
                  >
                    ✕
                  </Button>
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

      {/* 삭제 확인 모달 */}
      {deleteTargetId && (
        <DeleteConfirmModal
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
          isPending={isPending}
        />
      )}
    </>
  );
}
