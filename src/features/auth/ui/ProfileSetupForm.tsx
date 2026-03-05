import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { useSignUp } from '@/entities/auth';
import { Button } from '@/shared/ui/Button';

import { FormField } from './FormField';

const profileSchema = z.object({
  username: z.string().min(1, '이름을 입력해 주세요.'),
  accountname: z
    .string()
    .min(1, '계정 ID를 입력해 주세요.')
    .regex(/^[a-zA-Z0-9._]+$/, '영문, 숫자, 밑줄, 마침표만 사용할 수 있습니다.'),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export function ProfileSetupForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, password } = location.state as { email: string; password: string };
  const signUpMutation = useSignUp();
  const [errorMessage, setErrorMessage] = useState('');

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: { username: '', accountname: '' },
  });

  const onSubmit = (data: ProfileFormData) => {
    signUpMutation.mutate(
      { email, password, username: data.username, accountname: data.accountname },
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
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col gap-4">
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
