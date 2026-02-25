import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { SnsButton, SplashScreen } from '@/features/home/ui';
import { LogoIcon } from '@/shared/icons/LogoIcon';
import { Button } from '@/shared/ui/button';

export function HomePage() {
  const navigate = useNavigate();
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

      <div
        className={`absolute inset-0 flex flex-col transition-transform duration-1000 ${
          showLogin ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ backgroundColor: '#23D038' }}
      >
        <div className="flex h-[45%] items-center justify-center">
          <LogoIcon width={97} height={153} />
        </div>

        <div className="-mt-6 flex-1 rounded-t-3xl bg-white px-6 py-10">
          <div className="flex flex-col items-center gap-4">
            <SnsButton type="kakao" />
            <SnsButton type="google" />
            <SnsButton type="facebook" />

            <div className="mt-2 flex items-end justify-center gap-4">
              <Button variant="ghost" size="S" onClick={() => navigate('/signin')}>
                이메일로 로그인
              </Button>
              <span className="mb-1 text-black">|</span>
              <Button variant="ghost" size="S" onClick={() => navigate('/signup')}>
                회원가입
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
