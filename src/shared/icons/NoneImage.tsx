interface NoneImageProps {
  className?: string;
}

export function NoneImage({ className }: NoneImageProps) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M17.4167 2.75H4.58333C3.57081 2.75 2.75 3.57081 2.75 4.58333V17.4167C2.75 18.4292 3.57081 19.25 4.58333 19.25H17.4167C18.4292 19.25 19.25 18.4292 19.25 17.4167V4.58333C19.25 3.57081 18.4292 2.75 17.4167 2.75Z"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.79175 9.16666C8.55114 9.16666 9.16675 8.55105 9.16675 7.79166C9.16675 7.03227 8.55114 6.41666 7.79175 6.41666C7.03236 6.41666 6.41675 7.03227 6.41675 7.79166C6.41675 8.55105 7.03236 9.16666 7.79175 9.16666Z"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.2499 13.75L14.6666 9.16666L4.58325 19.25"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* 대각선 추가 (이미지 없음 표시) */}
      <path d="M2.75 2.75L19.25 19.25" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
