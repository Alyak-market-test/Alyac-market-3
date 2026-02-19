import { useNavigate } from 'react-router-dom';

import { Button } from '@/shared/ui/button';
import alyac404 from '@/shared/ui/icons/full-logo-alyac-404.png';

export function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <img src={alyac404} alt="404" className="w-40" />

      <p className="text-gray-500">페이지를 찾을 수 없습니다 :(</p>
      <Button
        className="rounded-full bg-green-500 px-8 hover:bg-green-600"
        onClick={() => navigate(-1)}
      >
        이전 페이지
      </Button>
    </div>
  );
}
