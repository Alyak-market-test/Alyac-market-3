import { useRef, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { ImageUpload } from '@/features/upload/ui/ImageUpload';
import { ImgButtonIcon } from '@/shared/icons/ImgButtonIcon';
import { TopUploadNav } from '@/shared/ui/nav/TopUploadNav';

export function ProductAdd() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [saleUrl, setSaleUrl] = useState('');
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const imageInputRef = useRef<HTMLInputElement>(null) as React.RefObject<HTMLInputElement>;

  const isDisabled = name.trim() === '' || price.trim() === '' || imageUrls.length === 0;

  const handleSave = () => {
    if (name.trim() === '') return;
    // TODO : 실제 저장 로직 (API 연동 후 구현)
    navigate(-1);
  };

  return (
    <div className="bg-background mb-15 flex min-h-screen flex-col">
      <TopUploadNav onBack={() => navigate(-1)} onSave={handleSave} disabled={isDisabled} />
      <div className="flex flex-col gap-10 px-7">
        {/* 상품 이미지 업로드*/}
        <div className="relative">
          <p className="text-muted-foreground mt-4 text-sm">이미지 등록</p>
          <div
            className="bg-muted mt-2 flex h-58 w-full cursor-pointer items-center justify-center rounded-lg transition-colors"
            onClick={() => imageInputRef.current?.click()}
          >
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
            onChange={(e) => {
              const onlyNumbers = e.target.value.replace(/[^0-9]/g, '');
              setPrice(onlyNumbers);
            }}
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
