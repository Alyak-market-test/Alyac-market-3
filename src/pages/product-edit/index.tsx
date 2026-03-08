// 상품 수정 페이지
import { useRef, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { useGetProduct } from '@/entities/product';
import { useEditProduct } from '@/features/product-add';
import { ImageUpload } from '@/features/upload';
import { TopUploadNav } from '@/shared';
import { ImgButtonIcon } from '@/shared/icons';

export function ProductEdit() {
  const navigate = useNavigate();
  const { productId } = useParams<{ productId: string }>();

  // 서버에서 받아온 데이터를 initialData로 활용
  const { data: product, isLoading, isError } = useGetProduct(productId!);

  const imageInputRef = useRef<HTMLInputElement>(null) as React.RefObject<HTMLInputElement>;

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [saleUrl, setSaleUrl] = useState('');
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // product 데이터가 처음 도착했을 때 한 번만 초기화
  if (product && !isInitialized) {
    setName(product.itemName ?? '');
    setPrice(product.price?.toString() ?? '');
    setSaleUrl(product.link ?? '');
    setImageUrls(product.itemImage ? [product.itemImage] : []);
    setIsInitialized(true);
  }

  const { mutate: editProductMutate, isPending } = useEditProduct();

  const hasNewImage = previewUrls.length > 0;
  const isDisabled =
    name.trim() === '' || price.trim() === '' || (imageUrls.length === 0 && !hasNewImage);

  const handleSave = () => {
    if (isDisabled || isPending || !productId) return;

    const payload = {
      product: {
        itemName: name,
        price: Number(price),
        link: saleUrl || 'http://placeholder.com',
        itemImage: imageUrls[0]?.startsWith('uploadFiles/')
          ? imageUrls[0]
          : `uploadFiles/${imageUrls[0]}`,
      },
    };

    editProductMutate(productId, payload, {
      onSuccess: () => navigate(-1),
      onError: () => alert('상품 수정에 실패했습니다. 다시 시도해주세요.'),
    });
  };

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

  return (
    <div className="bg-background mb-15 flex min-h-screen flex-col">
      <TopUploadNav
        onBack={() => navigate(-1)}
        onSave={handleSave}
        disabled={isDisabled || isPending}
      />
      <div className="flex flex-col gap-10 px-7">
        {/* 이미지 등록 */}
        <div className="relative">
          <p className="text-muted-foreground mt-4 text-sm">이미지 등록</p>
          <div
            className="bg-muted-foreground mt-2 flex h-58 w-full cursor-pointer items-center justify-center rounded-lg transition-colors"
            onClick={() => imageInputRef.current?.click()}
          >
            {/* 새로 업로드한 이미지 미리보기 (우선 표시) */}
            {previewUrls[0] ? (
              <img
                src={previewUrls[0]}
                alt="새 이미지 미리보기"
                className="h-full w-full rounded-lg object-cover"
              />
            ) : (
              /* 기존 이미지 미리보기 */
              imageUrls[0] && (
                <img
                  src={`${import.meta.env.VITE_IMAGE_BASE_URL}/${imageUrls[0]}`}
                  alt="기존 이미지"
                  className="h-full w-full rounded-lg object-cover"
                />
              )
            )}
            <ImgButtonIcon
              fill="#FFFF"
              stroke="#767676"
              className="absolute right-3 bottom-3 h-11 w-11 cursor-pointer rounded-full shadow-md"
            />
          </div>
          <ImageUpload
            onUploadComplete={(urls) => setImageUrls(urls)}
            onPreviewChange={(urls) => setPreviewUrls(urls)}
            maxFiles={3}
            inputRef={imageInputRef}
          />
        </div>

        {/* 상품명 */}
        <div className="flex flex-col gap-3">
          <label className="text-foreground text-sm">상품명</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="2~15자 이내여야 합니다."
            className={`text-md border-b py-2 transition-colors outline-none ${
              name.trim() === '' ? 'border-red-400' : 'border-border'
            }`}
          />
          {name.trim() === '' && <p className="text-sm text-red-500">상품명을 입력해주세요.</p>}
          {name.trim().length === 1 && (
            <p className="text-sm text-red-500">상품명은 최소 2자 이상이어야 합니다.</p>
          )}
        </div>

        {/* 가격 */}
        <div className="flex flex-col gap-3">
          <label className="text-foreground text-sm">가격</label>
          <input
            type="text"
            inputMode="numeric"
            value={price}
            onChange={(e) => setPrice(e.target.value.replace(/[^0-9]/g, ''))}
            placeholder="숫자만 입력 가능합니다."
            className={`text-md border-b py-2 transition-colors outline-none ${
              price.trim() === '' ? 'border-red-400' : 'border-border'
            }`}
          />
          {price.trim() === '' && <p className="text-sm text-red-500">가격을 입력해주세요.</p>}
        </div>

        {/* 판매 링크 */}
        <div className="flex flex-col gap-1">
          <label className="text-foreground text-sm">판매 링크</label>
          <input
            type="url"
            value={saleUrl}
            onChange={(e) => setSaleUrl(e.target.value)}
            placeholder="URL을 입력해 주세요."
            className={`text-md border-b py-2 transition-colors outline-none ${
              saleUrl.length > 0 &&
              !saleUrl.startsWith('http://') &&
              !saleUrl.startsWith('https://')
                ? 'border-red-400'
                : 'border-border'
            }`}
          />
          {saleUrl.length > 0 &&
            !saleUrl.startsWith('http://') &&
            !saleUrl.startsWith('https://') && (
              <p className="text-sm text-red-500">
                URL 형식이 올바르지 않습니다. (http:// 또는 https://로 시작해야 합니다.)
              </p>
            )}
          <p className="text-muted-foreground text-sm">선택 사항 (http:// 또는 https://로 시작)</p>
        </div>
      </div>
    </div>
  );
}
