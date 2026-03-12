import { useNavigate } from 'react-router-dom';

import { useAvatarUpload, useProfileForm } from '@/features/profile';
import { ROUTES } from '@/shared';
import { AvatarImage, Button, Input, TopUploadNav } from '@/shared';
import { ImgIcon } from '@/shared/icons';
import { PageStateScreen } from '@/shared/ui';

export function ProfileModification() {
  const navigate = useNavigate();
  const { form, isLoading, isSaving, error, setImage, setName, setBio, save } = useProfileForm();
  const { fileInputRef, isUploading, openFilePicker, handleFileChange, clearImage } =
    useAvatarUpload({
      onUpload: setImage,
      onClear: () => setImage(null),
      onError: (message) => alert(message),
    });

  if (isLoading) {
    return <PageStateScreen message="불러오는 중..." />;
  }

  if (error) {
    return <PageStateScreen variant="error" message={error} />;
  }

  const handleSave = async () => {
    if (form.name.trim() === '' || isSaving || isUploading) return;
    await save();
    navigate(ROUTES.PROFILE, { state: { refresh: Date.now() } });
  };

  return (
    <div className="bg-background mt-10 flex min-h-screen flex-col">
      <TopUploadNav
        onBack={() => navigate(-1)}
        onSave={handleSave}
        disabled={form.name.trim() === '' || isSaving || isUploading}
      />

      <div className="flex justify-center py-10">
        <div className="relative">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="hidden"
            onChange={handleFileChange}
          />

          <Button
            variant="ghost"
            size="none"
            type="button"
            onClick={openFilePicker}
            disabled={isUploading}
            aria-label="프로필 이미지 변경"
            className="cursor-pointer disabled:opacity-60"
          >
            <AvatarImage src={form.image} alt={form.name} size="xxl" iconSize="lg" />
          </Button>

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
        <div className="flex flex-col gap-3">
          <label className="text-foreground text-sm">사용자 이름</label>
          <Input
            type="text"
            value={form.name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름을 입력하세요."
            className={`rounded-none border-x-0 border-t-0 py-2 shadow-none ${
              form.name.trim() === '' ? 'border-red-400' : 'border-border'
            }`}
          />
          {form.name.trim() === '' && (
            <p className="text-sm text-red-500">사용자 이름을 입력해주세요.</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-foreground text-sm">계정 ID</label>
          <Input
            type="text"
            value={form.accountname}
            disabled
            className="text-muted-foreground cursor-not-allowed rounded-none border-x-0 border-t-0 py-2 shadow-none"
          />
          <p className="text-muted-foreground text-sm">계정 ID는 변경할 수 없습니다.</p>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-foreground text-sm">소개</label>
          <Input
            type="text"
            value={form.bio}
            onChange={(e) => {
              if (e.target.value.length <= 60) setBio(e.target.value);
            }}
            placeholder="간단한 자기 소개를 입력하세요."
            className="rounded-none border-x-0 border-t-0 py-2 shadow-none"
          />
          <p className="text-muted-foreground text-sm">최대 60자</p>
        </div>
      </div>
    </div>
  );
}
