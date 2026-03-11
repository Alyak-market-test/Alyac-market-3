import { useRef } from 'react';

import { useNavigate } from 'react-router-dom';

import { useUser } from '@/entities/user';
import { usePostAdd } from '@/features/post';
import { Button } from '@/shared';
import { AvatarImage, ImgIcon } from '@/shared/icons';

export function PostAddPage() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { data: user } = useUser();

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
  } = usePostAdd();

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
          {isLoading ? '업로드 중...' : '업로드'}
        </button>
      </header>

      {/* 본문 */}
      <div className="flex gap-3 overflow-y-auto px-4 pt-3 pb-6">
        {/* 프로필 이미지 */}
        <div className="shrink-0">
          <AvatarImage src={user?.image} size="sm" />
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
          {mutationError && <p className="text-sm text-red-500">게시물 작성에 실패했습니다.</p>}

          {/* 이미지 미리보기 */}
          {previews.length > 0 && (
            <div className="mt-2 flex flex-col gap-2">
              {previews.map((preview, index) => (
                <div key={index} className="relative h-48 w-48 shrink-0">
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
      <Button onClick={() => fileInputRef.current?.click()} variant={'postingImg'} size="none">
        <ImgIcon size={56} />
      </Button>

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
