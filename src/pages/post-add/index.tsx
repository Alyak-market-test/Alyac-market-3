import { useRef } from 'react';

import { useNavigate } from 'react-router-dom';

import { useUser } from '@/entities/user';
import { usePostAdd } from '@/features/post';
import { Button, Textarea } from '@/shared';
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
          {isLoading ? '업로드 중...' : '업로드'}
        </Button>
      </header>

      {/* 본문 */}
      <div className="flex gap-3 overflow-y-auto px-4 pt-3 pb-6">
        {/* 프로필 이미지 */}
        <div className="shrink-0">
          <AvatarImage src={user?.image} size="sm" />
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
