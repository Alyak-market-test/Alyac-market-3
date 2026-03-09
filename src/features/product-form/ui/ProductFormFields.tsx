interface ProductFormFieldsProps {
  name: string;
  onNameChange: (v: string) => void;
  price: string;
  onPriceChange: (v: string) => void;
  saleUrl: string;
  onSaleUrlChange: (v: string) => void;
}

export function ProductFormFields({
  name,
  onNameChange,
  price,
  onPriceChange,
  saleUrl,
  onSaleUrlChange,
}: ProductFormFieldsProps) {
  const isInvalidUrl =
    saleUrl.length > 0 && !saleUrl.startsWith('http://') && !saleUrl.startsWith('https://');

  return (
    <>
      {/* 상품명 */}
      <div className="flex flex-col gap-3">
        <label className="text-foreground text-sm">상품명</label>
        <input
          type="text"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
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
          onChange={(e) => onPriceChange(e.target.value.replace(/[^0-9]/g, ''))}
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
          onChange={(e) => onSaleUrlChange(e.target.value)}
          placeholder="URL을 입력해 주세요."
          className={`text-md border-b py-2 transition-colors outline-none ${
            isInvalidUrl ? 'border-red-400' : 'border-border'
          }`}
        />
        {isInvalidUrl && (
          <p className="text-sm text-red-500">
            URL 형식이 올바르지 않습니다. (http:// 또는 https://로 시작해야 합니다.)
          </p>
        )}
        <p className="text-muted-foreground text-sm">선택 사항 (http:// 또는 https://로 시작)</p>
      </div>
    </>
  );
}
