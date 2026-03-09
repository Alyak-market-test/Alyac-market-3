import { useRef, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { useSignUp } from '@/entities/auth';
import { uploadImage } from '@/shared/api/AvatarApi';
import { BigUploadIcon, ProfileImageIcon, UploadImage } from '@/shared/icons';
import { Button } from '@/shared/ui/Button';
import { Textarea } from '@/shared/ui/Textarea';

import { FormField } from './FormField';

const profileSchema = z.object({
  username: z.string().min(1, '이름을 입력해 주세요.'),
  accountname: z
    .string()
    .min(1, '계정 ID를 입력해 주세요.')
    .regex(/^[a-zA-Z0-9._]+$/, '영문, 숫자, 밑줄, 마침표만 사용할 수 있습니다.'),
  intro: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export function ProfileSetupForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, password } = location.state as { email: string; password: string };
  const signUpMutation = useSignUp();
  const [errorMessage, setErrorMessage] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: { username: '', accountname: '', intro: '' },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const onSubmit = async (data: ProfileFormData) => {
    let imageUrl = '';
    if (imageFile) {
      try {
        imageUrl = await uploadImage(imageFile);
      } catch {
        setErrorMessage('이미지 업로드에 실패했습니다.');
        return;
      }
    }

    signUpMutation.mutate(
      {
        email,
        password,
        username: data.username,
        accountname: data.accountname,
        intro: data.intro || '',
        image: imageUrl
          ? imageUrl.startsWith('uploadFiles/')
            ? imageUrl
            : `uploadFiles/${imageUrl}`
          : '',
      },
      {
        onSuccess: () => {
          navigate('/signin');
        },
        onError: () => {
          setErrorMessage('이미 사용 중인 계정 ID입니다.');
        },
      },
    );
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col gap-6">
      {/* 프로필 이미지 */}
      <div className="flex justify-center">
        <div className="relative">
          {imagePreview ? (
            <UploadImage src={imagePreview} alt="프로필 미리보기" size="xl" />
          ) : (
            <BigUploadIcon />
          )}
          <label htmlFor="profile-image-input" className="absolute right-0 bottom-0 cursor-pointer">
            <ProfileImageIcon className="h-8 w-8" />
          </label>
          <input
            id="profile-image-input"
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>
      </div>

      {errorMessage && <span className="text-xs text-red-500">{errorMessage}</span>}

      <FormField
        label="이름"
        {...form.register('username')}
        placeholder="이름을 입력해 주세요."
        error={form.formState.errors.username?.message}
      />
      <FormField
        label="계정 ID"
        {...form.register('accountname')}
        placeholder="영문, 숫자, 밑줄, 마침표만 사용 가능"
        error={form.formState.errors.accountname?.message}
      />

      {/* 자기소개 */}
      <div className="flex flex-col gap-1">
        <label className="text-muted-foreground text-sm">자기소개</label>
        <Textarea
          {...form.register('intro')}
          placeholder="자기소개를 입력해 주세요. (선택)"
          className="rounded-none border-0 border-b shadow-none focus-visible:border-green-500 focus-visible:ring-0"
          rows={3}
        />
      </div>

      <Button
        type="submit"
        variant={form.formState.isValid ? 'primary' : 'primaryDisabled'}
        size="L"
        className="w-full"
        disabled={signUpMutation.isPending}
      >
        {signUpMutation.isPending ? '가입 중...' : '회원가입'}
      </Button>
    </form>
  );
}
