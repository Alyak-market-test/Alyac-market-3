// 프로필 통계 (아바타 + 팔로워, 팔로잉 수) 컴포넌트
import { UploadImage } from '@/shared/ui/UploadImage';

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
        <span className="text-xl font-bold">{followers}</span>
        <span className="text-sm text-gray-500">Followers</span>
      </div>
      <UploadImage src={image} alt={username} size="xl" iconSize="md" />
      <div className="flex flex-col items-center">
        <span className="text-xl font-bold">{followings}</span>
        <span className="text-sm text-gray-500">Followings</span>
      </div>
    </div>
  );
}
