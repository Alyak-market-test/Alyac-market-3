import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { getMyProfile } from '@/entities/profile/api/profile';
import { UploadImage } from '@/shared/ui/UploadImage';
import { TopUploadNav } from '@/shared/ui/nav/TopUploadNav';

export function ProfileModification() {
  const navigate = useNavigate();
  const [accountname, setAccountname] = useState('');
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getMyProfile();
        console.log('API 응답 성공:', data);
        setAccountname(data.user.accountname ?? '');
        setImage(data.user.image ?? '');
        setName(data.user.username ?? '');
        setBio(data.user.intro ?? '');
      } catch (error) {
        console.error('에러 발생:', error);
      }
    };
    fetchProfile();
  }, []);

  const handleSave = () => {
    if (name.trim() === '') return;
    // TODO : 실제 저장 로직 (API 연동 후 구현)
    navigate(-1);
  };

  return (
    <div className="bg-background flex min-h-screen flex-col">
      {/* 헤더 */}
      <TopUploadNav onBack={() => navigate(-1)} onSave={handleSave} />

      <div className="flex justify-center py-10">
        <div className="relative">
          {/* 프로필 이미지 업로드 */}
          <UploadImage src={image} alt={name} size="xxl" iconSize="lg" />

          <button className="absolute right-0 bottom-0 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-green-500 text-white shadow transition">
            <svg
              width="50"
              height="50"
              viewBox="0 0 50 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="25" cy="25" r="25" fill="#11CC27" />
              <path
                d="M33.1667 14.5H16.8333C15.5447 14.5 14.5 15.5447 14.5 16.8333V33.1667C14.5 34.4553 15.5447 35.5 16.8333 35.5H33.1667C34.4553 35.5 35.5 34.4553 35.5 33.1667V16.8333C35.5 15.5447 34.4553 14.5 33.1667 14.5Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M20.9167 22.6667C21.8832 22.6667 22.6667 21.8832 22.6667 20.9167C22.6667 19.9502 21.8832 19.1667 20.9167 19.1667C19.9502 19.1667 19.1667 19.9502 19.1667 20.9167C19.1667 21.8832 19.9502 22.6667 20.9167 22.6667Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M35.4999 28.5L29.6666 22.6667L16.8333 35.5"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-10 px-7">
        {/* 사용자 이름 */}
        <div className="flex flex-col gap-3">
          <label className="text-foreground text-sm">사용자 이름</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름을 입력하세요."
            className={`text-md border-b py-2 transition-colors outline-none ${
              name.trim() === '' ? 'border-red-400' : 'border-border'
            }`}
          />
          {name.trim() === '' && (
            <p className="text-sm text-red-500">사용자 이름을 입력해주세요.</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          {/* 계정 ID는 변경 불가 - disabled 처리 */}
          <label className="text-foreground text-sm">계정 ID</label>
          <input
            type="text"
            value={accountname}
            disabled
            className="text-md border-border text-muted-foreground cursor-not-allowed border-b py-2 outline-none"
          />
          <p className="text-muted-foreground text-sm">계정 ID는 변경할 수 없습니다.</p>
        </div>

        <div className="flex flex-col gap-1">
          {/* 자기 소개 */}
          <label className="text-foreground text-sm">소개</label>
          <input
            type="text"
            value={bio}
            onChange={(e) => {
              if (e.target.value.length <= 60) setBio(e.target.value);
            }}
            placeholder="간단한 자기 소개를 입력하세요."
            className="text-md border-border border-b py-2 outline-none"
          />
          <p className="text-muted-foreground text-sm">최대 60자</p>
        </div>
      </div>
    </div>
  );
}
