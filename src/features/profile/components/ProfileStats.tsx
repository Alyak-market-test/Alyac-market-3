// 프로필 통계 (아바타 + 팔로워, 팔로잉 수) 컴포넌트
import { UploadImage } from '@/shared';

interface ProfileStatsProps {
  followers: number;
  followings: number;
  image: string;
  username: string;
}

export function ProfileStats({ followers, followings, image, username }: ProfileStatsProps) {
  return (
    <div className="mb-4 flex items-center gap-12">
      <div className="flex flex-col items-center">
        <span className="cursor-pointer text-xl font-bold">{followers}</span>
        <span className="text-muted-foreground cursor-pointer text-sm">Followers</span>
      </div>
      <UploadImage src={image} alt={username} size="xl" iconSize="md" />
      <div className="flex flex-col items-center">
        <span className="cursor-pointer text-xl font-bold">{followings}</span>
        <span className="text-muted-foreground cursor-pointer text-sm">Followings</span>
      </div>
    </div>
  );
}
