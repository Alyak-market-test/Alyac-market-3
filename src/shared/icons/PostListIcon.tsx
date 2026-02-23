interface PostListIconProps {
  className?: string;
  isActive?: boolean;
  onClick?: () => void;
}

const PostListIcon = ({ className, isActive, onClick }: PostListIconProps) => (
  <div
    onClick={onClick}
    className={`inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-md transition-colors duration-150 hover:bg-gray-100 ${isActive ? 'text-black' : 'text-[#DBDBDB]'} ${className ?? ''} `}
  >
    <svg width="20" height="20" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M22.75 3.25H3.25V7.58333H22.75V3.25Z"
        fill="currentColor"
        stroke="currentColor"
        strokeLinecap="round"
      />
      <path
        d="M22.75 10.8333H3.25V15.1667H22.75V10.8333Z"
        fill="currentColor"
        stroke="currentColor"
        strokeLinecap="round"
      />
      <path
        d="M22.75 18.4167H3.25V22.75H22.75V18.4167Z"
        fill="currentColor"
        stroke="currentColor"
        strokeLinecap="round"
      />
    </svg>
  </div>
);

export default PostListIcon;
