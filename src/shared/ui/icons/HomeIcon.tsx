interface IconProps {
  active?: boolean;
  className?: string;
}

export function HomeIcon({ active = false, className }: IconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
        fill={active ? '#11CC27' : 'none'}
        stroke={active ? '#11CC27' : '#767676'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={active ? 'M8 21V11H16V21' : 'M9 21V12H15V21'}
        fill={active ? 'white' : 'none'}
        stroke={active ? '#11CC27' : '#767676'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
