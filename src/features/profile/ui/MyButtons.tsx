// 마이프로필 버튼 (프로필 수정 / 상품 등록) 컴포넌트
import { useNavigate } from 'react-router-dom';

import { Button, ROUTES } from '@/shared';

export function MyButtons() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center">
      <div className="mt-4 flex w-4/5 gap-3">
        <Button
          onClick={() => navigate(ROUTES.PROFILE_MODIFICATION)}
          variant="myprofilebutton"
          size="none"
        >
          프로필 수정
        </Button>
        <Button onClick={() => navigate(ROUTES.PRODUCT.ADD)} variant="myprofilebutton" size="none">
          상품 등록
        </Button>
      </div>
    </div>
  );
}
