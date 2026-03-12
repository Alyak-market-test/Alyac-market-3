import { useNavigate } from 'react-router-dom';

import { useAddProduct } from '@/features/product';
import {
  ProductFormFields,
  ProductFormLayout,
  ProductImageSection,
  useProductForm,
} from '@/features/product-form';

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
    <ProductFormLayout onSave={handleSave} disabled={form.isDisabled || isPending}>
      <ProductImageSection
        previewUrls={form.previewUrls}
        imageUrls={form.imageUrls}
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
    </ProductFormLayout>
  );
}
