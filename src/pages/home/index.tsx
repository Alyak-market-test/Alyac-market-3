import { useEffect, useState } from 'react';

import { LoginButtons } from './LoginButtons';
import { SplashScreen } from './SplashScreen';

export function HomePage() {
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogin(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-green-500">
      <SplashScreen logoSrc="/src/shared/ui/icons/full-logo-alyac-no-text.png" />

      <div
        className={`absolute right-0 bottom-0 left-0 rounded-t-3xl bg-white px-6 py-10 transition-all duration-700 ${
          showLogin ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <LoginButtons />
      </div>

      <div
        className={`absolute inset-0 flex flex-col items-center justify-center bg-white transition-transform duration-700 ${
          showLogin ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        <img
          src="/src/shared/ui/icons/full-logo-alyac-png.png"
          alt="알약마켓"
          className="h-36 w-36"
        />
        <p className="text-2xl font-bold text-green-500">알약마켓</p>
      </div>
    </div>
  );
}
