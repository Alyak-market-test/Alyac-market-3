import { useLocation, useNavigate } from 'react-router-dom';

import { ROUTES } from '@/shared/constants/routes';
import editIcon from '@/shared/ui/icons/icon-edit.png';
import homeFillIcon from '@/shared/ui/icons/icon-home-fill.png';
import homeIcon from '@/shared/ui/icons/icon-home.png';
import chatFillIcon from '@/shared/ui/icons/icon-message-circle-fill.png';
import chatIcon from '@/shared/ui/icons/icon-message-circle.png';
import userFillIcon from '@/shared/ui/icons/icon-user-fill.png';
import userIcon from '@/shared/ui/icons/icon-user.png';

export function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  return (
    <nav className="fixed right-0 bottom-0 left-0 flex h-16 items-center justify-around border-t bg-white">
      {/*홈*/}
      <button className="flex flex-col items-center" onClick={() => navigate(ROUTES.HOME)}>
        <img src={path === ROUTES.HOME ? homeFillIcon : homeIcon} alt="홈" className="w-6" />
        <span className="text-xs">홈</span>
      </button>
      {/* 채팅 */}
      <button className="flex flex-col items-center" onClick={() => navigate(ROUTES.CHAT.LIST)}>
        <img src={path === ROUTES.CHAT.LIST ? chatFillIcon : chatIcon} alt="채팅" className="w-6" />
        <span className="text-xs">채팅</span>
      </button>

      {/* 게시물 작성 */}
      <button className="flex flex-col items-center" onClick={() => navigate(ROUTES.POST.UPLOAD)}>
        <img src={editIcon} alt="게시물 작성" className="w-6" />
        <span className="text-xs">게시물작성</span>
      </button>

      {/* 프로필 */}
      <button className="flex flex-col items-center" onClick={() => navigate(ROUTES.PROFILE)}>
        <img
          src={path.startsWith('/profile') ? userFillIcon : userIcon}
          alt="프로필"
          className="w-6"
        />
        <span className="text-xs">프로필</span>
      </button>
    </nav>
  );
}
