import { SignInForm } from '@/features/auth';

export function SignInPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6">
      <h1 className="mb-8 text-2xl font-bold">로그인</h1>
      <SignInForm />
    </div>
  );
}
