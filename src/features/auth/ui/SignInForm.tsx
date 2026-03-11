import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { useSignIn } from '@/entities/user';
import { ROUTES } from '@/shared';
import { Button } from '@/shared/ui/Button';

import { FormField } from './FormField';

const signInSchema = z.object({
  email: z.string().email('올바른 이메일을 입력하세요'),
  password: z.string().min(6, '비밀번호는 최소 6자 이상입니다'),
});

type SignInFormData = z.infer<typeof signInSchema>;

export function SignInForm() {
  const navigate = useNavigate();
  const signInMutation = useSignIn();
  const [errorMessage, setErrorMessage] = useState('');

  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: SignInFormData) => {
    setErrorMessage('');
    signInMutation.mutate(data, {
      onSuccess: () => {
        navigate(ROUTES.FEED);
      },
      onError: () => {
        setErrorMessage('이메일 또는 비밀번호가 올바르지 않습니다.');
      },
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col gap-4">
      {errorMessage && <span className="text-xs text-red-500">{errorMessage}</span>}
      <FormField
        label="이메일"
        {...form.register('email')}
        placeholder="alyac@estSecurity.com"
        error={form.formState.errors.email?.message}
      />
      <FormField
        label="비밀번호"
        htmlType="password"
        {...form.register('password')}
        placeholder="······"
        error={form.formState.errors.password?.message}
      />

      <Button
        type="submit"
        variant={form.formState.isValid ? 'primary' : 'primaryDisabled'}
        size="L"
        disabled={signInMutation.isPending}
        className="w-full"
      >
        {signInMutation.isPending ? '로그인 중...' : '로그인'}
      </Button>
      <button
        type="button"
        className="text-muted-foreground text-sm"
        onClick={() => navigate(ROUTES.SIGNUP)}
      >
        이메일로 회원가입
      </button>
    </form>
  );
}
