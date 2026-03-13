import { useState } from 'react';

interface InitialProductData {
  itemName?: string;
  price?: number;
  link?: string;
  itemImage?: string;
}

export function useProductForm(initialData?: InitialProductData) {
  const [name, setName] = useState(initialData?.itemName ?? '');
  const [price, setPrice] = useState(initialData?.price?.toString() ?? '');
  const [saleUrl, setSaleUrl] = useState(initialData?.link ?? '');
  const [imageUrls, setImageUrls] = useState<string[]>(
    initialData?.itemImage ? [initialData.itemImage] : [],
  );
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const isValid = name.trim().length >= 2 && price.trim() !== '';
  const hasImage = imageUrls.length > 0 || previewUrls.length > 0;

  const buildPayload = () => ({
    product: {
      itemName: name,
      price: Number(price),
      link: saleUrl || 'http://placeholder.com',
      itemImage: imageUrls[0]?.startsWith('http')
        ? imageUrls[0]
        : imageUrls[0]?.startsWith('uploadFiles/')
          ? imageUrls[0]
          : `uploadFiles/${imageUrls[0]}`,
    },
  });

  return {
    name,
    setName,
    price,
    setPrice,
    saleUrl,
    setSaleUrl,
    imageUrls,
    setImageUrls,
    previewUrls,
    setPreviewUrls,
    isDisabled: !isValid || !hasImage,
    buildPayload,
  };
}
