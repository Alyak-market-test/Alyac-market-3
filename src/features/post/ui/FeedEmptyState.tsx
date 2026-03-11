import { useNavigate } from 'react-router-dom';

import { Button, ROUTES } from '@/shared';
import { LogoGrayIcon } from '@/shared/icons';

export function FeedEmptyState() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center gap-4 pt-32">
      <LogoGrayIcon width={65} height={103} />
      <p className="text-muted-foreground text-sm">유저를 검색해 팔로우 해보세요!</p>
      <Button variant="primary" size="M" onClick={() => navigate(ROUTES.SEARCH)}>
        검색하기
      </Button>
    </div>
  );
}
