import { useLocation, useNavigate } from 'react-router-dom';

import { ROUTES } from '@/shared/constants/routes';
import { ChatIcon, EditIcon, HomeIcon, ProfileIcon } from '@/shared/icons';

export function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  return (
    <nav className="bg-background fixed right-0 bottom-0 left-0 flex h-16 items-center justify-around border-t">
      {/*홈*/}
      <button className="flex flex-col items-center" onClick={() => navigate(ROUTES.FEED)}>
        <HomeIcon active={path === ROUTES.FEED} className="w-6" />
        <span className="text-xs text-[#767676]">홈</span>
      </button>
      {/* 채팅 */}
      <button className="flex flex-col items-center" onClick={() => navigate(ROUTES.CHAT.LIST)}>
        <ChatIcon active={path === ROUTES.CHAT.LIST} className="w-6" />
        <span className="text-xs text-[#767676]">채팅</span>
      </button>

      {/* 게시물 작성 */}
      <button className="flex flex-col items-center" onClick={() => navigate(ROUTES.POST.UPLOAD)}>
        <EditIcon className="w-6" />
        <span className="text-xs text-[#767676]">게시물작성</span>
      </button>

      {/* 프로필 */}
      <button className="flex flex-col items-center" onClick={() => navigate(ROUTES.PROFILE)}>
        <ProfileIcon active={path.startsWith('/profile')} className="w-6" />
        <span className="text-xs text-[#767676]">프로필</span>
      </button>
    </nav>
  );
}
