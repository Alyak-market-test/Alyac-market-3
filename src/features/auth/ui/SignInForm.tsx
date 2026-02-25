import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { useSignIn } from '@/entities/auth';
import { Button } from '@/shared/ui/button';

const signInSchema = z.object({
  email: z.string().email('올바른 이메일을 입력하세요'),
  password: z.string().min(6, '비밀번호는 최소 6자 이상입니다'),
});

type SignInFormData = z.infer<typeof signInSchema>;

export function SignInForm() {
  const navigate = useNavigate();
  const signInMutation = useSignIn();

  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: SignInFormData) => {
    signInMutation.mutate(data, {
      onSuccess: () => {
        navigate('/feed');
      },
      onError: (error) => {
        alert('로그인 실패: ' + error.message);
      },
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label className="text-muted-foreground text-sm">이메일</label>
        <input
          {...form.register('email')}
          placeholder="alyac@estSecurity.com"
          className="border-border border-b py-2 outline-none focus:border-green-500"
        />
        {form.formState.errors.email && (
          <span className="text-xs text-red-500">{form.formState.errors.email.message}</span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-muted-foreground text-sm">비밀번호</label>
        <input
          {...form.register('password')}
          type="password"
          placeholder="······"
          className="border-border border-b py-2 outline-none focus:border-green-500"
        />
        {form.formState.errors.password && (
          <span className="text-xs text-red-500">{form.formState.errors.password.message}</span>
        )}
      </div>

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
        onClick={() => navigate('/signup')}
      >
        이메일로 회원가입
      </button>
    </form>
  );
}
