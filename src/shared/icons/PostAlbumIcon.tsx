interface PostAlbumIconProps {
  className?: string;
  isActive?: boolean;
  onClick?: () => void;
}

const PostAlbumIcon = ({ className, isActive, onClick }: PostAlbumIconProps) => (
  <div
    onClick={onClick}
    className={`inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-md transition-colors duration-150 ${isActive ? 'text-white' : 'text-[#878787] hover:bg-[#171717]'} ${className ?? ''}`}
  >
    <svg width="20" height="20" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10.8333 3.25H3.25V10.8333H10.8333V3.25Z"
        fill="currentColor"
        stroke="currentColor"
        strokeLinecap="round"
      />
      <path
        d="M22.7501 3.25H15.1667V10.8333H22.7501V3.25Z"
        fill="currentColor"
        stroke="currentColor"
        strokeLinecap="round"
      />
      <path
        d="M22.7501 15.1667H15.1667V22.75H22.7501V15.1667Z"
        fill="currentColor"
        stroke="currentColor"
        strokeLinecap="round"
      />
      <path
        d="M10.8333 15.1667H3.25V22.75H10.8333V15.1667Z"
        fill="currentColor"
        stroke="currentColor"
        strokeLinecap="round"
      />
    </svg>
  </div>
);

export { PostAlbumIcon };
