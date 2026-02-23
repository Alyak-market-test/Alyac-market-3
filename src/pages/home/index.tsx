import { useEffect, useState } from 'react';

import { LogoIcon } from '@/shared/icons/LogoIcon';

import { LoginButtons } from './LoginButtons';
import SplashScreen from './SplashScreen';

export function HomePage() {
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogin(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div className={`transition-opacity duration-700 ${showLogin ? 'opacity-0' : 'opacity-100'}`}>
        <SplashScreen />
      </div>
      {/* 로그인 페이지 전체가 아래서 위로 올라옴 */}
      <div
        className={`absolute inset-0 flex flex-col transition-transform duration-1000 ${
          showLogin ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ backgroundColor: '#23D038' }}
      >
        {/* 초록 영역 */}
        <div className="flex h-[45%] items-center justify-center">
          <LogoIcon width={97} height={153} />
        </div>

        {/* 흰 카드 */}
        <div className="-mt-6 flex-1 rounded-t-3xl bg-white px-6 py-10">
          <LoginButtons />
        </div>
      </div>
    </div>
  );
}
