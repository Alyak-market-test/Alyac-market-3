import { useRef } from 'react';

import { useNavigate } from 'react-router-dom';

import { getTokenUserInfo } from '@/entities/auth/lib/token';
import { usePostAdd } from '@/features/post-add/usePostAdd';
import { UploadImage } from '@/shared/ui/UploadImage';

export function PostAddPage() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const userInfo = getTokenUserInfo();

  const {
    content,
    setContent,
    previews,
    isLoading,
    handleImageChange,
    handleRemoveImage,
    handleSubmit,
  } = usePostAdd();

  return (
    <div className="bg-background flex h-screen flex-col">
      {/* 상단 네비 */}
      <header className="flex h-14 items-center justify-between border-b px-4">
        <button onClick={() => navigate(-1)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M19 12H5M5 12L12 19M5 12L12 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="bg-primary rounded-full px-4 py-1.5 text-sm text-white disabled:opacity-50"
        >
          업로드
        </button>
      </header>

      {/* 본문 */}
      <div className="flex flex-1 gap-3 overflow-y-auto p-4">
        <UploadImage src={userInfo?.image} size="sm" />

        <div className="flex flex-1 flex-col gap-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="게시글 입력하기..."
            className="text-foreground placeholder:text-muted-foreground w-full resize-none bg-transparent text-sm outline-none"
            rows={5}
          />

          {/* 이미지 미리보기 */}
          {previews.length > 0 && (
            <div className="flex flex-col gap-2">
              {previews.map((preview, index) => (
                <div key={index} className="relative">
                  <img
                    src={preview}
                    alt={`preview-${index}`}
                    className="w-full rounded-lg object-cover"
                  />
                  <button
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-black/50 text-white"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 이미지 추가 플로팅 버튼 */}
      <button
        onClick={() => fileInputRef.current?.click()}
        className="bg-primary absolute right-6 bottom-6 flex h-12 w-12 items-center justify-center rounded-full shadow-lg"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="18" height="18" rx="3" stroke="white" strokeWidth="2" />
          <circle cx="8.5" cy="8.5" r="1.5" fill="white" />
          <path d="M21 15L16 10L5 21" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleImageChange}
      />
    </div>
  );
}
