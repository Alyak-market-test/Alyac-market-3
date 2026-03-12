# API 문서

> **Base URL:** `http://localhost:3000/api`
> 모든 인증이 필요한 요청은 Header에 `Authorization: Bearer {accessToken}` 포함

---

## 목차

- [인증](#인증)
- [유저](#유저)
- [게시물](#게시물)
- [댓글](#댓글)
- [팔로우](#팔로우)
- [상품](#상품)
- [이미지](#이미지)

---

## 인증

### 로그인

**POST** `/user/signin`

| 항목 | 내용   |
| ---- | ------ |
| 인증 | 불필요 |

**Request Body**

```json
{
  "user": {
    "email": "string",
    "password": "string"
  }
}
```

**Response**

```json
{
  "user": {
    "accessToken": "string",
    "refreshToken": "string",
    "accountname": "string",
    "username": "string"
  }
}
```

---

### 회원가입

**POST** `/user`

| 항목 | 내용   |
| ---- | ------ |
| 인증 | 불필요 |

**Request Body**

```json
{
  "user": {
    "email": "string",
    "password": "string",
    "username": "string",
    "accountname": "string",
    "intro": "string (선택)",
    "image": "string (선택)"
  }
}
```

**Response**

```json
{
  "message": "string",
  "user": {
    "_id": "string",
    "username": "string",
    "email": "string",
    "accountname": "string",
    "intro": "string",
    "image": "string"
  }
}
```

---

### 토큰 갱신

**POST** `/user/refresh`

| 항목 | 내용                                   |
| ---- | -------------------------------------- |
| 인증 | `Authorization: Bearer {refreshToken}` |

**Response**

```json
{
  "accessToken": "string",
  "refreshToken": "string"
}
```

---

## 유저

### 내 프로필 조회

**GET** `/user/myinfo`

| 항목 | 내용 |
| ---- | ---- |
| 인증 | 필요 |

---

### 특정 유저 프로필 조회

**GET** `/profile/:accountname`

| 항목     | 내용                                 |
| -------- | ------------------------------------ |
| 인증     | 필요                                 |
| 파라미터 | `accountname` - 조회할 유저의 계정명 |

---

### 프로필 수정

**PUT** `/user`

| 항목 | 내용 |
| ---- | ---- |
| 인증 | 필요 |

**Request Body**

```json
{
  "user": {
    "username": "string",
    "accountname": "string",
    "intro": "string",
    "image": "string"
  }
}
```

---

### 유저 검색

**GET** `/user/searchuser?keyword={keyword}`

| 항목 | 내용               |
| ---- | ------------------ |
| 인증 | 필요               |
| 쿼리 | `keyword` - 검색어 |

**Response**

```json
[
  {
    "_id": "string",
    "username": "string",
    "accountname": "string",
    "intro": "string",
    "image": "string"
  }
]
```

---

## 게시물

### 피드 조회

**GET** `/post`

| 항목 | 내용 |
| ---- | ---- |
| 인증 | 필요 |

---

### 게시물 상세 조회

**GET** `/post/:postId`

| 항목     | 내용                 |
| -------- | -------------------- |
| 인증     | 필요                 |
| 파라미터 | `postId` - 게시물 ID |

**Response**

```json
{
  "id": "string",
  "content": "string",
  "image": "string",
  "createdAt": "string",
  "author": {
    "accountname": "string",
    "username": "string",
    "image": "string"
  },
  "commentCount": 0,
  "heartCount": 0,
  "hearted": false
}
```

---

### 게시물 작성

**POST** `/post`

| 항목 | 내용 |
| ---- | ---- |
| 인증 | 필요 |

**Request Body**

```json
{
  "post": {
    "content": "string",
    "image": "string (선택, 콤마로 구분)"
  }
}
```

---

### 게시물 수정

**PUT** `/post/:postId`

| 항목     | 내용                 |
| -------- | -------------------- |
| 인증     | 필요                 |
| 파라미터 | `postId` - 게시물 ID |

**Request Body**

```json
{
  "post": {
    "content": "string",
    "image": "string"
  }
}
```

---

### 게시물 삭제

**DELETE** `/post/:postId`

| 항목     | 내용                 |
| -------- | -------------------- |
| 인증     | 필요                 |
| 파라미터 | `postId` - 게시물 ID |

---

### 유저 게시물 목록

**GET** `/post/:accountname/userpost`

| 항목     | 내용                        |
| -------- | --------------------------- |
| 인증     | 필요                        |
| 파라미터 | `accountname` - 유저 계정명 |

---

### 좋아요

**POST** `/post/:postId/heart`

| 항목     | 내용                 |
| -------- | -------------------- |
| 인증     | 필요                 |
| 파라미터 | `postId` - 게시물 ID |

---

## 댓글

### 댓글 목록 조회

**GET** `/post/:postId/comments`

| 항목     | 내용                 |
| -------- | -------------------- |
| 인증     | 필요                 |
| 파라미터 | `postId` - 게시물 ID |

**Response**

```json
[
  {
    "id": "string",
    "content": "string",
    "createdAt": "string",
    "author": {
      "username": "string",
      "image": "string"
    }
  }
]
```

---

### 댓글 작성

**POST** `/post/:postId/comments`

| 항목     | 내용                 |
| -------- | -------------------- |
| 인증     | 필요                 |
| 파라미터 | `postId` - 게시물 ID |

**Request Body**

```json
{
  "comment": {
    "content": "string"
  }
}
```

---

## 팔로우

### 팔로우

**POST** `/profile/:accountname/follow`

| 항목     | 내용                                 |
| -------- | ------------------------------------ |
| 인증     | 필요                                 |
| 파라미터 | `accountname` - 팔로우할 유저 계정명 |

---

### 언팔로우

**DELETE** `/profile/:accountname/unfollow`

| 항목     | 내용                                   |
| -------- | -------------------------------------- |
| 인증     | 필요                                   |
| 파라미터 | `accountname` - 언팔로우할 유저 계정명 |

---

### 팔로워 목록

**GET** `/profile/:accountname/follower`

| 항목     | 내용                        |
| -------- | --------------------------- |
| 인증     | 필요                        |
| 파라미터 | `accountname` - 유저 계정명 |

---

### 팔로잉 목록

**GET** `/profile/:accountname/following`

| 항목     | 내용                        |
| -------- | --------------------------- |
| 인증     | 필요                        |
| 파라미터 | `accountname` - 유저 계정명 |

---

## 상품

### 상품 목록 조회

**GET** `/product/:accountname`

| 항목     | 내용                        |
| -------- | --------------------------- |
| 인증     | 필요                        |
| 파라미터 | `accountname` - 유저 계정명 |

---

### 상품 상세 조회

**GET** `/product/detail/:productId`

| 항목     | 내용                  |
| -------- | --------------------- |
| 인증     | 필요                  |
| 파라미터 | `productId` - 상품 ID |

---

### 상품 등록

**POST** `/product`

| 항목 | 내용 |
| ---- | ---- |
| 인증 | 필요 |

**Request Body**

```json
{
  "product": {
    "itemName": "string",
    "price": 0,
    "link": "string (선택)",
    "itemImage": "string"
  }
}
```

---

### 상품 수정

**PUT** `/product/:productId`

| 항목     | 내용                  |
| -------- | --------------------- |
| 인증     | 필요                  |
| 파라미터 | `productId` - 상품 ID |

**Request Body**

```json
{
  "product": {
    "itemName": "string",
    "price": 0,
    "link": "string (선택)",
    "itemImage": "string"
  }
}
```

---

### 상품 삭제

**DELETE** `/product/:productId`

| 항목     | 내용                  |
| -------- | --------------------- |
| 인증     | 필요                  |
| 파라미터 | `productId` - 상품 ID |

---

## 이미지

### 다중 이미지 업로드

**POST** `/image/uploadfiles`

| 항목         | 내용                  |
| ------------ | --------------------- |
| 인증         | 필요                  |
| Content-Type | `multipart/form-data` |
| Body         | `image: File[]`       |

**Response**

```json
[
  {
    "filename": "string",
    "path": "string",
    "originalname": "string",
    "size": 0
  }
]
```

---

### 단일 이미지 업로드

**POST** `/image/uploadfile`

| 항목         | 내용                  |
| ------------ | --------------------- |
| 인증         | 필요                  |
| Content-Type | `multipart/form-data` |
| Body         | `image: File`         |

**Response**

```json
{
  "filename": "string",
  "path": "string",
  "originalname": "string",
  "size": 0
}
```
