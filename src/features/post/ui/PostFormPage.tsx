import { useRef } from 'react';

import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useUser } from '@/entities/user';
import { Button, Textarea } from '@/shared';
import { ArrowLeftIcon, AvatarImage, ImgIcon } from '@/shared/icons';

import type { PostAddFormValues } from '../post-add/model/usePostForm';

interface PostFormPageProps {
  mode: 'add' | 'edit';
  register: UseFormRegister<PostAddFormValues>;
  errors: FieldErrors<PostAddFormValues>;
  contentValue: string;
  previews: string[];
  isLoading: boolean;
  mutationError: Error | null;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveImage: (index: number) => void;
  onSubmit: () => void;
}

export function PostFormPage({
  mode,
  register,
  errors,
  contentValue,
  previews,
  isLoading,
  mutationError,
  handleImageChange,
  handleRemoveImage,
  onSubmit,
}: PostFormPageProps) {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { data: user } = useUser();

  const isEdit = mode === 'edit';

  return (
    <div className="bg-background flex h-screen flex-col">
      <header className="flex h-14 items-center justify-between px-4">
        <button onClick={() => navigate(-1)}>
          <ArrowLeftIcon />
        </button>
        <Button
          variant="primary"
          size="Ms"
          onClick={onSubmit}
          disabled={isLoading || (!contentValue?.trim() && previews.length === 0)}
        >
          {isLoading ? (isEdit ? '수정 중...' : '업로드 중...') : isEdit ? '수정' : '업로드'}
        </Button>
      </header>

      <div className="flex gap-3 overflow-y-auto px-4 pt-3 pb-6">
        <div className="shrink-0">
          <AvatarImage src={user?.image} size="sm" />
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <Textarea
            {...register('content')}
            placeholder="게시글 입력하기."
            className="h-[75vh] resize-none border-blue-900 focus-visible:ring-blue-900"
          />
          {errors.content && <p className="text-sm text-red-500">{errors.content.message}</p>}
          {mutationError && (
            <p className="text-sm text-red-500">
              {isEdit ? '게시물 수정에 실패했습니다.' : '게시물 작성에 실패했습니다.'}
            </p>
          )}
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
