import googleLogo from '/src/shared/ui/icons/Google__G__Logo 1.png';

export function LoginButtons() {
  return (
    <div className="flex flex-col gap-4 px-6">
      <button className="flex w-full items-center rounded-full border border-gray-200 px-6 py-4">
        <img src="/src/shared/ui/icons/message-circle.png" alt="kakao" className="h-5 w-5" />
        <span className="flex-1 text-center text-sm">카카오톡 계정으로 로그인</span>
      </button>
      <button className="flex w-full items-center rounded-full border border-gray-200 px-6 py-4">
        <img src={googleLogo} alt="google" className="h-5 w-5" />
        <span className="flex-1 text-center text-sm">구글 계정으로 로그인</span>
      </button>
      <button className="flex w-full items-center rounded-full border border-gray-200 px-6 py-4">
        <img src="/src/shared/ui/icons/facebook.png" alt="facebook" className="h-5 w-5" />
        <span className="flex-1 text-center text-sm">페이스북 계정으로 로그인</span>
      </button>
      <div className="mt-2 flex justify-center gap-4 text-sm text-gray-400">
        <button>이메일로 로그인</button>
        <span>|</span>
        <button>회원가입</button>
      </div>
    </div>
  );
}
