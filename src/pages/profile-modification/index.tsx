import { useNavigate } from 'react-router-dom';

import { useAvatarUpload, useProfileForm } from '@/features/profile';
import { Button, TopUploadNav } from '@/shared';
import { AvatarImage, ImgIcon } from '@/shared/icons';

export function ProfileModification() {
  const navigate = useNavigate();
  const { form, isLoading, isSaving, error, setImage, setName, setBio, save } = useProfileForm();
  const { fileInputRef, isUploading, openFilePicker, handleFileChange, clearImage } =
    useAvatarUpload({
      onUpload: setImage,
      onClear: () => setImage(null),
      onError: (message) => alert(message),
    });

  const handleSave = async () => {
    if (form.name.trim() === '' || isSaving || isUploading) return;
    await save();
    navigate('/profile', { state: { refresh: Date.now() } });
  };

  if (isLoading) {
    return (
      <div className="bg-background flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground text-sm">불러오는 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-background flex min-h-screen items-center justify-center">
        <p className="text-sm text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-background flex min-h-screen flex-col">
      <TopUploadNav onBack={() => navigate(-1)} onSave={handleSave} />

      <div className="flex justify-center py-10">
        <div className="relative">
          {/* 숨겨진 파일 input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="hidden"
            onChange={handleFileChange}
          />

          {/* 아바타 전체 클릭 */}
          <button
            type="button"
            onClick={openFilePicker}
            disabled={isUploading}
            aria-label="프로필 이미지 변경"
            className="cursor-pointer disabled:opacity-60"
          >
            <AvatarImage src={form.image} alt={form.name} size="xxl" iconSize="lg" />
          </button>

          {/* 이미지 파일 선택 아이콘 */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-0 bottom-0 flex h-11 w-11 items-center justify-center rounded-full"
          >
            {isUploading ? (
              <span className="h-11 w-11 animate-spin rounded-full border-2 border-white border-t-transparent bg-green-500" />
            ) : (
              <ImgIcon size={44} />
            )}
          </div>

          {/* 기존 이미지로 변경 X 버튼 - 이미지가 있을 때만 표시 */}
          {form.image && !isUploading && (
            <Button
              variant={'avatarNone'}
              size="none"
              onClick={clearImage}
              aria-label="이미지 삭제"
            >
              ✕
            </Button>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-10 px-7">
        {/* 사용자 이름 */}
        <div className="flex flex-col gap-3">
          <label className="text-foreground text-sm">사용자 이름</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름을 입력하세요."
            className={`text-md border-b py-2 transition-colors outline-none ${
              form.name.trim() === '' ? 'border-red-400' : 'border-border'
            }`}
          />
          {form.name.trim() === '' && (
            <p className="text-sm text-red-500">사용자 이름을 입력해주세요.</p>
          )}
        </div>

        {/* 계정 ID */}
        <div className="flex flex-col gap-1">
          <label className="text-foreground text-sm">계정 ID</label>
          <input
            type="text"
            value={form.accountname}
            disabled
            className="text-md border-border text-muted-foreground cursor-not-allowed border-b py-2 outline-none"
          />
          <p className="text-muted-foreground text-sm">계정 ID는 변경할 수 없습니다.</p>
        </div>

        {/* 자기 소개 */}
        <div className="flex flex-col gap-1">
          <label className="text-foreground text-sm">소개</label>
          <input
            type="text"
            value={form.bio}
            onChange={(e) => {
              if (e.target.value.length <= 60) setBio(e.target.value);
            }}
            placeholder="간단한 자기 소개를 입력하세요."
            className="text-md border-border border-b py-2 outline-none"
          />
          <p className="text-muted-foreground text-sm">최대 60자</p>
        </div>
      </div>
    </div>
  );
}
