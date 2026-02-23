import { SignUpForm } from '@/features/auth';

export function SignUpPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6">
      <h1 className="mb-8 text-2xl font-bold">이메일로 회원가입</h1>
      <SignUpForm />
    </div>
  );
}
