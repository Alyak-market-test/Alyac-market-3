import { LogoFullIcon } from '@/shared/icons/LogoFullIcon';

const SplashScreen = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-white">
      <LogoFullIcon width={199} height={220} />
    </div>
  );
};

export default SplashScreen;
