import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { UploadImage } from '@/shared/ui/UploadImage';

// 임시 더미 데이터 - 나중에 API 연동 시 교체
const DUMMY_USER = {
  name: 'team3',
  username: 'team_3',
  bio: '',
  image: null, // null이면 기본 이모지 표시
};

export function ProfileModification() {
  const navigate = useNavigate();
  const [name, setName] = useState(DUMMY_USER.name);
  const [bio, setBio] = useState(DUMMY_USER.bio);

  const handleSave = () => {
    if (name.trim() === '') return;
    // TODO : 실제 저장 로직 (API 연동 후 구현)
    navigate(-1);
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
        <button
          onClick={() => navigate(-1)}
          aria-label="뒤로가기"
          className="cursor-pointer rounded-md p-1 transition-colors hover:bg-gray-100"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 19L8 12L15 5"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <button
          onClick={handleSave}
          className="text-md rounded-full bg-green-500 px-5 py-1.5 font-semibold text-white transition hover:bg-green-600"
        >
          저장
        </button>
      </header>

      <div className="flex justify-center py-10">
        <div className="relative">
          <UploadImage src={DUMMY_USER.image} alt={DUMMY_USER.username} size="xxl" iconSize="lg" />

          <button className="absolute right-0 bottom-0 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-green-500 text-white shadow transition hover:bg-green-600">
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
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M20.9167 22.6667C21.8832 22.6667 22.6667 21.8832 22.6667 20.9167C22.6667 19.9502 21.8832 19.1667 20.9167 19.1667C19.9502 19.1667 19.1667 19.9502 19.1667 20.9167C19.1667 21.8832 19.9502 22.6667 20.9167 22.6667Z"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M35.4999 28.5L29.6666 22.6667L16.8333 35.5"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-10 px-7">
        <div className="flex flex-col gap-3">
          <label className="text-sm text-black">사용자 이름</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름을 입력하세요."
            className={`text-md border-b py-2 transition-colors outline-none ${
              name.trim() === '' ? 'border-red-400' : 'border-gray-300'
            }`}
          />
          {name.trim() === '' && (
            <p className="text-sm text-red-500">사용자 이름을 입력해주세요.</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-black">계정 ID</label>
          <input
            type="text"
            value={DUMMY_USER.username}
            disabled
            className="text-md cursor-not-allowed border-b border-gray-300 py-2 text-gray-400 outline-none"
          />
          <p className="text-sm text-gray-400">계정 ID는 변경할 수 없습니다.</p>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-black">소개</label>
          <input
            type="text"
            value={bio}
            onChange={(e) => {
              if (e.target.value.length <= 60) setBio(e.target.value);
            }}
            placeholder="간단한 자기 소개를 입력하세요."
            className="text-md border-b border-gray-300 py-2 outline-none"
          />
          <p className="text-sm text-gray-400">최대 60자</p>
        </div>
      </div>
    </div>
  );
}
