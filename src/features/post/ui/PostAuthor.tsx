import { UploadImage } from '@/shared/icons';

interface PostAuthorProps {
  image: string;
  username: string;
  accountname: string;
}

export function PostAuthor({ image, username, accountname }: PostAuthorProps) {
  return (
    <div className="mb-3 flex items-center gap-3">
      <UploadImage src={image} size="sm" />
      <div>
        <p className="text-foreground text-sm font-semibold">{username}</p>
        <p className="text-muted-foreground text-xs">@{accountname}</p>
      </div>
    </div>
  );
}
