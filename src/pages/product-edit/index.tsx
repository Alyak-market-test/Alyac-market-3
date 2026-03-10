// 상품 수정 페이지
import { useNavigate, useParams } from 'react-router-dom';

import { type Product, useGetProduct } from '@/entities/product';
import { useEditProduct } from '@/features/product-add';
import { ProductFormFields, ProductImageSection, useProductForm } from '@/features/product-form';
import { TopUploadNav } from '@/shared';

function ProductEditForm({ product }: { product: Product }) {
  const navigate = useNavigate();
  const { productId } = useParams<{ productId: string }>();

  const form = useProductForm({
    itemName: product.itemName,
    price: product.price,
    link: product.link,
    itemImage: product.itemImage,
  });

  const { mutate: editProductMutate, isPending } = useEditProduct();

  const handleSave = () => {
    if (form.isDisabled || isPending || !productId) return;

    editProductMutate(productId, form.buildPayload(), {
      onSuccess: () => navigate(-1),
      onError: () => alert('상품 수정에 실패했습니다. 다시 시도해주세요.'),
    });
  };

  return (
    <div className="bg-background my-15 flex min-h-screen flex-col">
      <TopUploadNav
        onBack={() => navigate(-1)}
        onSave={handleSave}
        disabled={form.isDisabled || isPending}
      />
      <div className="flex flex-col gap-10 px-7">
        <ProductImageSection
          previewUrls={form.previewUrls}
          imageUrls={form.imageUrls}
          existingImageUrl={product.itemImage}
          imageInputRef={form.imageInputRef}
          onUploadComplete={form.setImageUrls}
          onPreviewChange={form.setPreviewUrls}
        />
        <ProductFormFields
          name={form.name}
          onNameChange={form.setName}
          price={form.price}
          onPriceChange={form.setPrice}
          saleUrl={form.saleUrl}
          onSaleUrlChange={form.setSaleUrl}
        />
      </div>
    </div>
  );
}

export function ProductEdit() {
  const { productId } = useParams<{ productId: string }>();
  const { data: product, isLoading, isError } = useGetProduct(productId!);

  if (isLoading) {
    return (
      <div className="bg-background flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground text-sm">상품 정보를 불러오는 중...</p>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="bg-background flex min-h-screen items-center justify-center">
        <p className="text-sm text-red-500">상품 정보를 불러오지 못했습니다.</p>
      </div>
    );
  }

  return <ProductEditForm product={product} />;
}
