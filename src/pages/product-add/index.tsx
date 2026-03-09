import { useNavigate } from 'react-router-dom';

import { useAddProduct } from '@/features/product-add';
import { ProductFormFields, ProductImageSection, useProductForm } from '@/features/product-form';
import { TopUploadNav } from '@/shared';

export function ProductAdd() {
  const navigate = useNavigate();
  const form = useProductForm();
  const { mutate: addProduct, isPending } = useAddProduct();

  const handleSave = () => {
    if (form.isDisabled || isPending) return;

    addProduct(form.buildPayload(), {
      onSuccess: () => navigate(-1),
      onError: () => alert('상품 등록에 실패했습니다. 다시 시도해주세요.'),
    });
  };

  return (
    <div className="bg-background mb-15 flex min-h-screen flex-col">
      <TopUploadNav
        onBack={() => navigate(-1)}
        onSave={handleSave}
        disabled={form.isDisabled || isPending}
      />
      <div className="flex flex-col gap-10 px-7">
        <ProductImageSection
          previewUrls={form.previewUrls}
          imageUrls={form.imageUrls}
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
