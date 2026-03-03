// 프로필 정보 (이름+아이디+소개) 컴포넌트

interface ProfileInfoProps {
  image: string;
  username: string;
  accountname: string;
  intro: string;
}

export function ProfileInfo({ username, accountname, intro }: ProfileInfoProps) {
  return (
    <>
      <p className="text-base font-semibold">{username}</p>
      <p className="text-muted-foreground m-1.5 text-sm">@{accountname}</p>
      <p className="text-sm">{intro}</p>
    </>
  );
}
