import { useLocation, useNavigate } from 'react-router-dom';

import { ROUTES } from '@/shared/constants/routes';
import { ChatIcon, EditIcon, HomeIcon, ProfileIcon } from '@/shared/ui/icons';

export function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  return (
    <nav className="fixed right-0 bottom-0 left-0 flex h-16 items-center justify-around border-t bg-white">
      {/*홈*/}
      <button className="flex flex-col items-center" onClick={() => navigate(ROUTES.HOME)}>
        <HomeIcon active={path === ROUTES.HOME} className="w-6" />
        <span className="text-xs">홈</span>
      </button>
      {/* 채팅 */}
      <button className="flex flex-col items-center" onClick={() => navigate(ROUTES.CHAT.LIST)}>
        <ChatIcon active={path === ROUTES.CHAT.LIST} className="w-6" />
        <span className="text-xs">채팅</span>
      </button>

      {/* 게시물 작성 */}
      <button className="flex flex-col items-center" onClick={() => navigate(ROUTES.POST.UPLOAD)}>
        <EditIcon className="w-6" />
        <span className="text-xs">게시물작성</span>
      </button>

      {/* 프로필 */}
      <button className="flex flex-col items-center" onClick={() => navigate(ROUTES.PROFILE)}>
        <ProfileIcon active={path.startsWith('/profile')} className="w-6" />
        <span className="text-xs">프로필</span>
      </button>
    </nav>
  );
}
