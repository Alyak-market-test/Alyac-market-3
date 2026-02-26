import { LogoFullIcon } from '@/shared/icons/LogoFullIcon';

export function SplashScreen() {
  return (
    <div className="bg-background flex h-screen w-full flex-col items-center justify-center">
      <LogoFullIcon width={199} height={220} />
    </div>
  );
}
