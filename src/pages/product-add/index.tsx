// TODO
// 상품 등록/수정 url 분리시키기
// 업로드 이미지 등록 위치 변경
import { useRef, useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import type { Product } from '@/entities/product';
import { useAddProduct, useEditProduct } from '@/features/product-add';
import { ImageUpload } from '@/features/upload';
import { TopUploadNav } from '@/shared';
import { ImgButtonIcon } from '@/shared/icons';

export function ProductAdd() {
  const navigate = useNavigate();
  const location = useLocation();

  const editProduct = location.state?.product as Product | undefined;
  const isEditMode = !!editProduct;

  const [name, setName] = useState(editProduct?.itemName ?? '');
  const [price, setPrice] = useState(editProduct?.price?.toString() ?? '');
  const [saleUrl, setSaleUrl] = useState(editProduct?.link ?? '');
  const [imageUrls, setImageUrls] = useState<string[]>(
    editProduct?.itemImage ? [editProduct.itemImage] : [],
  );
  const imageInputRef = useRef<HTMLInputElement>(null) as React.RefObject<HTMLInputElement>;

  const { mutate: addProduct, isPending: isAddPending } = useAddProduct();
  const { mutate: editProductMutate, isPending: isEditPending } = useEditProduct(); // 수정 api hook

  const isPending = isAddPending || isEditPending;
  const isDisabled = name.trim() === '' || price.trim() === '' || imageUrls.length === 0;

  const handleSave = () => {
    if (isDisabled || isPending) return;

    const payload = {
      product: {
        itemName: name,
        price: Number(price),
        link: saleUrl || 'http://placeholder.com',
        itemImage: imageUrls[0].startsWith('uploadFiles/')
          ? imageUrls[0]
          : `uploadFiles/${imageUrls[0]}`, //경로 중복 방지
      },
    };

    if (isEditMode) {
      // 등록된 상품 수정
      editProductMutate(editProduct.id, payload, {
        onSuccess: () => navigate(-1),
        onError: () => alert('상품 수정에 실패했습니다. 다시 시도해주세요.'),
      });
    } else {
      // 상품 등록
      addProduct(payload, {
        onSuccess: () => navigate(-1),
        onError: () => alert('상품 등록에 실패했습니다. 다시 시도해주세요.'),
      });
    }
  };

  return (
    <div className="bg-background mb-15 flex min-h-screen flex-col">
      <TopUploadNav
        onBack={() => navigate(-1)}
        onSave={handleSave}
        disabled={isDisabled || isPending}
      />
      <div className="flex flex-col gap-10 px-7">
        <div className="relative">
          <p className="text-muted-foreground mt-4 text-sm">이미지 등록</p>
          <div
            className="bg-muted-foreground mt-2 flex h-58 w-full cursor-pointer items-center justify-center rounded-lg transition-colors"
            onClick={() => imageInputRef.current?.click()}
          >
            {/* 수정시 기존 이미지 미리보기 */}
            {isEditMode && imageUrls[0] && (
              <img
                src={`${import.meta.env.VITE_IMAGE_BASE_URL}/${imageUrls[0]}`}
                alt="기존 이미지"
                className="h-full w-full rounded-lg object-cover"
              />
            )}
            <ImgButtonIcon
              fill="#FFFF"
              stroke="#767676"
              className="absolute right-3 bottom-3 h-11 w-11 cursor-pointer rounded-full shadow-md"
            />
          </div>
          <ImageUpload
            onUploadComplete={(urls) => setImageUrls(urls)}
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
                URL형식이 올바르지 않습니다. (http:// 또는 https://로 시작해야 합니다.)
              </p>
            )}
          <p className="text-muted-foreground text-sm">선택 사항 (http:// 또는 https://로 시작)</p>
        </div>
      </div>
    </div>
  );
}
