import { ProfileSetupForm } from '@/features/auth';

export function SignUpProfilePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6">
      <h1 className="mb-8 text-2xl font-bold">프로필 설정</h1>
      <ProfileSetupForm />
    </div>
  );
}
