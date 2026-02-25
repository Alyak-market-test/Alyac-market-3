import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { Button } from '@/shared/ui/button';

const signUpSchema = z.object({
  email: z.string().email('올바른 이메일을 입력하세요.'),
  password: z.string().min(6, '*비밀번호는 6자 이상이어야 합니다.'),
});

type SignUpFormData = z.infer<typeof signUpSchema>;

export function SignUpForm() {
  const navigate = useNavigate();

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = (data: SignUpFormData) => {
    navigate('/signup/profile', { state: { email: data.email, password: data.password } });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-500">이메일</label>
        <input
          {...form.register('email')}
          placeholder="이메일 주소를 입력해 주세요."
          className="border-b border-gray-300 py-2 outline-none focus:border-green-500"
        />
        {form.formState.errors.email && (
          <span className="text-xs text-red-500">{form.formState.errors.email.message}</span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-500">비밀번호</label>
        <input
          {...form.register('password')}
          type="password"
          placeholder="비밀번호를 설정해 주세요."
          className="border-b border-gray-300 py-2 outline-none focus:border-green-500"
        />
        {form.formState.errors.password && (
          <span className="text-xs text-red-500">{form.formState.errors.password.message}</span>
        )}
      </div>

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
