import { useRef } from 'react';

import { useNavigate } from 'react-router-dom';

import { getTokenUserInfo } from '@/entities/user';
import { usePostEdit } from '@/features/post';
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
          onClick={onSubmit}
          disabled={isLoading || (!contentValue?.trim() && previews.length === 0)}
          className="bg-primary rounded-full px-5 py-1.5 text-sm font-medium text-white disabled:opacity-40"
        >
          {isLoading ? '수정 중...' : '수정'}
        </button>
      </header>

      {/* 본문 */}
      <div className="flex gap-3 overflow-y-auto px-4 pt-3 pb-6">
        {/* 프로필 이미지 */}
        <div className="shrink-0">
          <AvatarImage src={userInfo?.image} size="sm" />
        </div>

        {/* 오른쪽 영역 */}
        <div className="flex flex-1 flex-col gap-2">
          {/* textarea 박스 */}
          <div className="flex h-[75vh] flex-col rounded-lg border border-blue-900 p-3 focus-within:ring-2 focus-within:ring-blue-900">
            <textarea
              {...register('content', {
                validate: (value) =>
                  value.trim().length > 0 || previews.length > 0
                    ? true
                    : '게시글 내용을 입력해주세요.',
              })}
              placeholder="게시글 입력하기."
              className="text-foreground placeholder:text-muted-foreground w-full flex-1 resize-none bg-transparent text-sm outline-none"
            />
          </div>

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
