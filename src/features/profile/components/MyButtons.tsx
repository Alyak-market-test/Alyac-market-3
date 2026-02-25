// 마이프로필 버튼 (프로필 수정 / 상품 등록) 컴포넌트
import { useNavigate } from 'react-router-dom';

import { Button } from '@/shared/ui/button';

export function MyButtons() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center">
      <div className="mt-4 flex w-4/5 gap-3">
        <Button onClick={() => navigate('/profile-modification')} variant="myprofilebutton">
          프로필 수정
        </Button>
        <Button onClick={() => navigate('/product-add')} variant="myprofilebutton">
          상품 등록
        </Button>
      </div>
    </div>
  );
}
