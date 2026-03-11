import { useRef } from 'react';

import { useNavigate } from 'react-router-dom';

import { getTokenUserInfo } from '@/entities/user';
import { usePostEdit } from '@/features/post';
import { Button, Textarea } from '@/shared';
import { AvatarImage } from '@/shared/icons';

export function PostEditPage() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const userInfo = getTokenUserInfo();

  const {
    register,
    errors,
    contentValue,
    previews,
    isLoading,
    mutationError,
    handleImageChange,
    handleRemoveImage,
    onSubmit,
  } = usePostEdit();

  return (
    <div className="bg-background flex h-screen flex-col">
      {/* 상단 네비 */}
      <header className="flex h-14 items-center justify-between px-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M19 12H5M5 12L12 19M5 12L12 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Button>
        <Button
          variant="primary"
          size="Ms"
          onClick={onSubmit}
          disabled={isLoading || (!contentValue?.trim() && previews.length === 0)}
        >
          {isLoading ? '수정 중...' : '수정'}
        </Button>
      </header>

      {/* 본문 */}
      <div className="flex gap-3 overflow-y-auto px-4 pt-3 pb-6">
        {/* 프로필 이미지 */}
        <div className="shrink-0">
          <AvatarImage src={userInfo?.image} size="sm" />
        </div>

        {/* 오른쪽 영역 */}
        <div className="flex flex-1 flex-col gap-2">
          <Textarea
            {...register('content')}
            placeholder="게시글 입력하기."
            className="h-[75vh] resize-none border-blue-900 focus-visible:ring-blue-900"
          />

          {/* RHF 유효성 에러 */}
          {errors.content && <p className="text-sm text-red-500">{errors.content.message}</p>}

          {/* API 실패 에러 */}
          {mutationError && <p className="text-sm text-red-500">게시물 수정에 실패했습니다.</p>}

          {/* 이미지 미리보기 */}
          {previews.length > 0 && (
            <div className="mt-2 flex flex-col gap-2">
              {previews.map((preview, index) => (
                <div key={index} className="relative">
                  <img
                    src={preview}
                    alt={`preview-${index}`}
                    className="w-full rounded-lg object-cover"
                  />
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-2 right-2 rounded-full bg-black/50 text-white hover:bg-black/70"
                  >
                    ✕
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 이미지 추가 플로팅 버튼 */}
      <button
        onClick={() => fileInputRef.current?.click()}
        className="bg-primary fixed right-6 bottom-6 flex h-14 w-14 items-center justify-center rounded-full shadow-lg"
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
