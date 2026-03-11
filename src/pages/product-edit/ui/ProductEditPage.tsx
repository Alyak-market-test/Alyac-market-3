import { useNavigate, useParams } from 'react-router-dom';

import { type Product, useGetProduct } from '@/entities/product';
import { useEditProduct } from '@/features/product';
import {
  ProductFormFields,
  ProductFormLayout,
  ProductImageSection,
  useProductForm,
} from '@/features/product-form';
import { PageStateScreen } from '@/shared/ui';

export function ProductEdit() {
  const { productId } = useParams<{ productId: string }>();
  const { data: product, isLoading, isError } = useGetProduct(productId!);

  if (isLoading) {
    return <PageStateScreen message="상품 정보를 불러오는 중..." />;
  }

  if (isError || !product) {
    return <PageStateScreen variant="error" message="상품 정보를 불러오지 못했습니다." />;
  }

  return <ProductEditForm product={product} />;
}

function ProductEditForm({ product }: { product: Product }) {
  const navigate = useNavigate();
  const { productId } = useParams<{ productId: string }>();
  const { mutate: editProductMutate, isPending } = useEditProduct();

  const form = useProductForm({
    itemName: product.itemName,
    price: product.price,
    link: product.link,
    itemImage: product.itemImage,
  });

  const handleSave = () => {
    if (form.isDisabled || isPending || !productId) return;

    editProductMutate(productId, form.buildPayload(), {
      onSuccess: () => navigate(-1),
      onError: () => alert('상품 수정에 실패했습니다. 다시 시도해주세요.'),
    });
  };

  return (
    <ProductFormLayout onSave={handleSave} disabled={form.isDisabled || isPending}>
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
    </ProductFormLayout>
  );
}
