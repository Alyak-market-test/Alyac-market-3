import { useState } from 'react';

export function ProductAdd() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [saleUrl, setSaleUrl] = useState('');

  return (
    <div className="flex min-h-screen flex-col bg-white">
      product add
      <div className="flex flex-col gap-10 px-7">
        {/* 상품 이미지 업로드*/}
        <div className="relative">
          <div className="flex h-58 w-full cursor-pointer items-center justify-center rounded-md bg-gray-100 transition-colors"></div>
        </div>
        {/* 상품명 */}
        <div className="flex flex-col gap-3">
          <label className="text-sm text-black">상품명</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="2~15자 이내여야 합니다."
            className={`text-md border-b py-2 transition-colors outline-none ${
              name.trim() === '' ? 'border-red-400' : 'border-gray-300'
            }`}
          />
          {name.trim() === '' && <p className="text-sm text-red-500">상품명을 입력해주세요.</p>}
          {name.trim().length === 1 && (
            <p className="text-sm text-red-500">상품명은 최소 2자 이상이어야 합니다.</p>
          )}
        </div>

        {/* 가격 */}
        <div className="flex flex-col gap-3">
          <label className="text-sm text-black">가격</label>
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
              price.trim() === '' ? 'border-red-400' : 'border-gray-300'
            }`}
          />
          {price.trim() === '' && <p className="text-sm text-red-500">가격을 입력해주세요.</p>}
        </div>

        {/* 판매 링크 */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-black">판매 링크</label>
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
                : 'border-gray-300'
            }`}
          />
          {saleUrl.length > 0 &&
            !saleUrl.startsWith('http://') &&
            !saleUrl.startsWith('https://') && (
              <p className="text-sm text-red-500">
                URL형식이 올바르지 않습니다. (http:// 또는 https://로 시작해야 합니다.)
              </p>
            )}

          <p className="text-sm text-gray-400">선택 사항 (http:// 또는 https://로 시작)</p>
        </div>
      </div>
    </div>
  );
}
