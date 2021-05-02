//signin input
export interface SignUpData {
  email: string;
  nickname: string;
  password: string;
}

//login input
export interface LogInData {
  email: string;
  password: string;
}

//update input
export interface UpdateInfo {
  nickname?: string;
}

// 내 정보확인 관련 interface
interface PostId {
  id: number;
}
interface Follow {
  FollowerId?: number;
  FollowingId?: number;
  createAt?: string;
  updateAt?: string;
}
export interface Follows {
  id: number;
  Follow?: Follow[] | null;
}

//내 정보 확인 return data
export interface MeInfo {
  id: number;
  email: string;
  nickname: string;
  createAt: string;
  updateAt: string;
  Posts: PostId[];
  Followings: Follows[];
  Followers: Follows[];
}

//한명의 유저 정보 확인 return data
export interface UserInfo {
  email: string;
  nickname: string;
  createAt: string;
  updateAt: string;
  Posts: number;
  Followings: number;
  Followers: number;
}

/* followers, followings return data */
export interface FollowData {
  UserId: number;
}
export interface UnFollowData {
  UserId: number;
}
export interface RemoveFollowData {
  UserId: number;
}
