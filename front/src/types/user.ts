//회원가입
export interface SignUpData {
  email: string;
  nickname: string;
  password: string;
}

export interface LogInData {
  email: string;
  password: string;
}

export interface UpdateInfo {
  nickname?: string;
}
