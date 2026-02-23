interface IconProps {
  className?: string;
}

export function EditIcon({ className }: IconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect x="3" y="3" width="18" height="18" rx="3" stroke="#767676" strokeWidth="2" />
      <path d="M12 8V16" stroke="#767676" strokeWidth="2" strokeLinecap="round" />
      <path d="M8 12L16 12" stroke="#767676" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
