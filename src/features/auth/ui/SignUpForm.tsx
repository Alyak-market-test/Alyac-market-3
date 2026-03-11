import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@/shared';
import { Button } from '@/shared/ui/Button';

import { FormField } from './FormField';
import { type SignUpFormData, signUpSchema } from './schema';

export function SignUpForm() {
  const navigate = useNavigate();

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = (data: SignUpFormData) => {
    navigate(ROUTES.SIGNUP_PROFILE, { state: { email: data.email, password: data.password } });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col gap-4">
      <FormField
        label="이메일"
        {...form.register('email')}
        placeholder="이메일 주소를 입력해 주세요."
        error={form.formState.errors.email?.message}
      />
      <FormField
        label="비밀번호"
        htmlType="password"
        {...form.register('password')}
        placeholder="비밀번호를 설정해 주세요."
        error={form.formState.errors.password?.message}
      />

      <Button
        type="submit"
        variant={form.formState.isValid ? 'primary' : 'primaryDisabled'}
        size="L"
        className="w-full"
      >
        다음
      </Button>
    </form>
  );
}
