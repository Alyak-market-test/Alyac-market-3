interface SplashScreenProps {
  logoSrc: string;
}

export function SplashScreen({ logoSrc }: SplashScreenProps) {
  return (
    <div className="flex h-1/2 items-center justify-center">
      <img src={logoSrc} alt="알약마켓" className="h-32 w-32" />
    </div>
  );
}
