import { useNavigate } from 'react-router-dom';

import { UploadImage } from '@/shared/ui/UploadImage';

interface User {
  _id: string;
  username: string;
  accountname: string;
  image: string;
}

interface UserCardProps {
  user: User;
  keyword?: string;
  onClick?: () => void;
}

export function UserCard({ user, keyword = '', onClick }: UserCardProps) {
  const navigate = useNavigate();

  const highlight = (text: string) => {
    if (!keyword) return text;
    const parts = text.split(new RegExp(`(${keyword})`, 'gi'));
    return parts.map((part, i) =>
      part.toLowerCase() === keyword.toLowerCase() ? (
        <span key={i} className="text-green-500">
          {part}
        </span>
      ) : (
        part
      ),
    );
  };

  return (
    <div
      className="flex cursor-pointer items-center gap-3 px-4 py-3 hover:bg-gray-50"
      onClick={() => {
        onClick?.();
        navigate('/profile/yourProfile');
      }}
    >
      <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gray-200">
        {user.image ? (
          <img
            src={user.image}
            alt={user.username}
            className="h-full w-full rounded-full object-cover"
          />
        ) : (
          <UploadImage src={undefined} size="sm" />
        )}
      </div>
      <div>
        <p className="text-sm font-medium">{highlight(user.username)}</p>
        <p className="text-xs text-gray-400">@{highlight(user.accountname)}</p>
      </div>
    </div>
  );
}
