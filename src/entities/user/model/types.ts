export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignInResponse {
  user: {
    accessToken: string;
    refreshToken: string;
    accountname: string;
    username: string;
  };
}

export interface SignUpRequest {
  email: string;
  password: string;
  username: string;
  accountname: string;
  intro?: string;
  image?: string;
}

export interface SignUpResponse {
  message: string;
  user: {
    _id: string;
    username: string;
    email: string;
    accountname: string;
    intro: string;
    image: string;
  };
}
