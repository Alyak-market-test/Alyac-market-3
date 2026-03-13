# 알약마켓 (Alyac Market)

> 상품 거래와 SNS 피드 기능을 결합한 소셜 마켓플레이스 웹 애플리케이션

<br />

## 목차

1. [팀원 소개](#팀원-소개)
2. [배포 URL](#배포-url)
3. [프로젝트 소개](#프로젝트-소개)
4. [주요 기능](#주요-기능)
5. [기술 스택](#기술-스택)
6. [프로젝트 구조](#프로젝트-구조)
7. [라우팅](#라우팅)
8. [설치 및 실행 방법](#설치-및-실행-방법)
9. [개선 아이디어](#개선-아이디어)

<br />

## 팀원 소개

| 역할 | 이름   | GitHub                                           |
| ---- | ------ | ------------------------------------------------ |
| 팀장 | 문규리 | [@kyuriii-moon](https://github.com/kyuriii-moon) |
| 팀원 | 김영종 | [@ressna93](https://github.com/ressna93)         |
| 팀원 | 나기영 | [@Deco4710](https://github.com/Deco4710)         |

### 담당 기능

**문규리 (팀장)**

- 프로필 페이지 구현
- 프로필 수정 데이터 저장
- 팔로우 목록 페이지
- Follow API 연동
- 상품 등록 / 수정 / 삭제
- 게시글 뷰모드
- 게시글 삭제/신고 토스트 구현

**김영종**

- 공통 컴포넌트 (Shared) 구성
- 로그인 / 회원가입 API 연동
- 피드 페이지 구현
- 채팅 페이지 구현
- 무한 스크롤 구현
- 다크 / 라이트 테마 구현

**나기영**

- 메인 페이지 구현
- 사용자 검색 구현
- 이미지 업로드 구현
- 게시물 페이지 생성
- 게시글 데이터 저장
- 좋아요 / 댓글 기능

<br />

## 배포 URL

| 환경     | URL                                   |
| -------- | ------------------------------------- |
| Vercel   | https://alyac-market-3-one.vercel.app |
| Firebase | https://alyac-maeket-3.web.app        |

<br />

## 프로젝트 소개

알약마켓은 사용자가 상품을 등록하고 SNS 피드를 통해 소통하며, 채팅으로 거래할 수 있는 소셜 마켓플레이스입니다.
React 19와 Feature-Sliced Design(FSD) 아키텍처를 기반으로 3인 팀이 약 3주간 개발한 프로젝트입니다.

**개발 기간**: 2026.02.13 ~ 2026.03.15

<br />

## 주요 기능

### 인증

- 회원가입 / 로그인 / 로그아웃
- JWT 기반 인증, Axios 인터셉터로 자동 토큰 추가
- Refresh Token 자동 갱신
- 미인증 사용자 페이지 접근 제한 (RequireGuest 가드)

### 피드

- 게시물 작성 / 수정 / 삭제
- 이미지 첨부 (다중 파일 업로드)
- 좋아요 / 댓글
- 무한 스크롤

### 상품

- 상품 등록 / 수정 / 삭제
- 상품 이미지 업로드
- 상품 목록 페이지네이션

### 프로필

- 프로필 설정 및 수정
- 팔로우 / 언팔로우
- 팔로잉 / 팔로워 목록

### 검색

- 사용자 검색 (실시간)
- 검색 기록 관리

### 채팅

- 채팅 목록
- 채팅방

### 기타

- 다크 / 라이트 테마 자동 감지 (`prefers-color-scheme`)
- React Router lazy loading으로 번들 최적화
- 404 페이지

<br />

## 기술 스택

### Frontend

![React](https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn/ui-000000?style=flat-square&logo=shadcnui&logoColor=white)

### 상태 관리 / 데이터 통신

![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=flat-square&logo=reactquery&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React_Hook_Form-EC5990?style=flat-square&logo=reacthookform&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3E67B1?style=flat-square&logo=zod&logoColor=white)

### 배포

![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=black)

<br />

## 프로젝트 구조

FSD(Feature-Sliced Design) 아키텍처를 적용하였으며, 레이어 간 단방향 의존성을 유지합니다.

```
app → pages → widgets → features → entities → shared
```

```
src/
├── app/                        # 앱 진입점, 전역 설정
│   ├── layouts/                # 레이아웃 컴포넌트
│   ├── providers/              # 전역 Provider (QueryClient 등)
│   ├── routes.tsx              # 라우터 정의 (lazy loading)
│   ├── RootLayout.tsx          # 공통 레이아웃 (하단 네비게이션 포함)
│   └── main.tsx                # 진입점
│
├── pages/                      # 페이지 단위 컴포넌트
│   ├── home/                   # 메인 페이지
│   ├── feed/                   # 피드 페이지
│   ├── signin/                 # 로그인 페이지
│   ├── signup/                 # 회원가입 페이지
│   ├── signup-profile-setup/   # 프로필 설정 페이지
│   ├── profile/                # 프로필 페이지
│   ├── profile-modification/   # 프로필 수정 페이지
│   ├── follow-list/            # 팔로우 목록 페이지
│   ├── search/                 # 검색 페이지
│   ├── post-add/               # 게시물 작성 페이지
│   ├── post-detail/            # 게시물 상세 페이지
│   ├── post-edit/              # 게시물 수정 페이지
│   ├── product-add/            # 상품 등록 페이지
│   ├── product-edit/           # 상품 수정 페이지
│   ├── chat-list/              # 채팅 목록 페이지
│   ├── chat-room/              # 채팅방 페이지
│   └── not-found/              # 404 페이지
│
├── widgets/                    # 독립적인 UI 블록
│   ├── bottom-nav/             # 하단 네비게이션
│   ├── post-card/              # 게시물 카드
│   ├── post-section/           # 게시물 목록 섹션
│   ├── product-section/        # 상품 목록 섹션
│   └── search-history/         # 검색 기록
│
├── features/                   # 사용자 인터랙션 단위
│   ├── auth/                   # 인증 (RequireGuest 가드)
│   ├── comment/                # 댓글 기능
│   ├── follow/                 # 팔로우 기능
│   ├── home/                   # 홈 관련 기능
│   ├── post/                   # 게시물 작성/수정
│   ├── product/                # 상품 관련 기능
│   ├── product-form/           # 상품 폼
│   ├── profile/                # 프로필 수정 기능
│   └── search/                 # 검색 기능
│
├── entities/                   # 비즈니스 엔티티
│   ├── image/                  # 이미지 업로드
│   ├── post/                   # 게시물 모델/API
│   ├── product/                # 상품 모델/API
│   ├── profile/                # 프로필 모델/API
│   └── user/                   # 유저 모델/API
│
└── shared/                     # 공통 유틸, UI, API 설정
    ├── api/                    # Axios 인스턴스, 인터셉터
    ├── constants/              # 라우트 상수 등
    ├── lib/                    # 유틸 함수, 테마
    └── ui/                     # 공통 UI 컴포넌트
```

<br />

## 라우팅

| 경로                           | 페이지         | 인증 필요       |
| ------------------------------ | -------------- | --------------- |
| `/`                            | 메인 (홈)      | -               |
| `/signin`                      | 로그인         | 비로그인만 접근 |
| `/signup`                      | 회원가입       | 비로그인만 접근 |
| `/signup-profile-setup`        | 프로필 설정    | 비로그인만 접근 |
| `/feed`                        | 피드           | O               |
| `/search`                      | 검색           | O               |
| `/profile`                     | 내 프로필      | O               |
| `/profile/:accountname`        | 타 유저 프로필 | O               |
| `/profile-modification`        | 프로필 수정    | O               |
| `/profile/:accountname/follow` | 팔로우 목록    | O               |
| `/post-add`                    | 게시물 작성    | O               |
| `/post/:postId`                | 게시물 상세    | O               |
| `/post/:postId/edit`           | 게시물 수정    | O               |
| `/product-add`                 | 상품 등록      | O               |
| `/product-edit/:productId`     | 상품 수정      | O               |
| `/chat`                        | 채팅 목록      | O               |
| `/chat/:id`                    | 채팅방         | O               |
| `*`                            | 404 Not Found  | -               |

<br />

## 설치 및 실행 방법

```bash
# 저장소 클론
git clone https://github.com/Alyak-market-test/Alyac-market-3.git
cd Alyac-market-3

# 패키지 설치
npm install

# 환경변수 설정 (.env 파일 생성)
VITE_API_BASE_URL=http://localhost:3000
VITE_IMAGE_BASE_URL=http://localhost:3000

# 개발 서버 실행
npm run dev
```

<br />

## 개선 아이디어

### 기능 개선

- 실시간 채팅 구현 (현재 UI만 있음 → WebSocket 또는 Firebase Realtime DB 활용)
- 상품 카테고리 / 필터 검색
- 게시물 북마크 / 저장
- 상품 찜하기

### 기술 개선

- 이미지 압축 후 업로드 (현재 원본 업로드)
- PWA 지원 (모바일 앱처럼 설치 가능)
- E2E 테스트 / 단위 테스트 추가
- CI/CD 파이프라인 구축

### UX 개선

- 토스트 알림 통일 (현재 `alert` 혼재)
- 스켈레톤 로딩 UI 적용
- 에러 바운더리 강화
