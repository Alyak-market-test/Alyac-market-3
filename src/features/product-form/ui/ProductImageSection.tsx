import { ImageUpload } from '@/entities/image';
import { ImgButtonIcon } from '@/shared/icons';

interface ProductImageSectionProps {
  previewUrls: string[];
  imageUrls: string[];
  existingImageUrl?: string;
  imageInputRef: React.RefObject<HTMLInputElement>;
  onUploadComplete: (urls: string[]) => void;
  onPreviewChange: (urls: string[]) => void;
}

export function ProductImageSection({
  previewUrls,
  existingImageUrl,
  imageInputRef,
  onUploadComplete,
  onPreviewChange,
}: ProductImageSectionProps) {
  return (
    <div className="relative">
      <p className="text-muted-foreground mt-4 text-sm">이미지 등록</p>
      <div
        className="bg-muted-foreground mt-2 flex h-58 w-full cursor-pointer items-center justify-center rounded-lg transition-colors"
        onClick={() => imageInputRef.current?.click()}
      >
        {previewUrls[0] ? (
          // 새로 업로드한 이미지 미리보기
          <img
            src={previewUrls[0]}
            alt="새 이미지 미리보기"
            className="h-full w-full rounded-lg object-cover"
          />
        ) : existingImageUrl ? (
          // Edit 페이지: 기존 서버 이미지
          <img
            src={`${import.meta.env.VITE_IMAGE_BASE_URL}/${existingImageUrl}`}
            alt="기존 이미지"
            className="h-full w-full rounded-lg object-cover"
          />
        ) : null}
        <ImgButtonIcon
          fill="#FFFF"
          stroke="#767676"
          className="absolute right-3 bottom-3 h-11 w-11 cursor-pointer rounded-full shadow-md"
        />
      </div>
      <ImageUpload
        onUploadComplete={onUploadComplete}
        onPreviewChange={onPreviewChange}
        maxFiles={3}
        inputRef={imageInputRef}
      />
    </div>
  );
}
