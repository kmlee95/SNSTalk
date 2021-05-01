interface PostUser {
  id: number;
  nickname: string;
}
interface PostImage {
  id: number;
  PostId: number;
  src: string;
  createdAt: string;
  updatedAt: string;
}
interface PostRetweet {
  User: PostUser;
  Image: PostImage[];
}
interface PostLikser {
  id: number;
}

// 하나의 포스트 조회(singlePost) return
export interface SinglePostData {
  id: number;
  UserId: number;

  User: PostUser;
  Image: PostImage[];
  Comment: PostUser[];
  Likers: number[]; //userId
  content: string;
  createdAt: string;
  updatedAt: string;
}

// 모든 포스트 조회(mainPost) return
export interface AllPostData {
  id: number;

  User: PostUser;
  Image: PostImage[];
  Comments: PostUser[];
  Retweet: PostRetweet[];
  Likers: PostLikser[];

  content: string;
  createdAt: string;
  updatedAt: string;
  UserId: number;
  RetweetId: string;
}

//Like, unLike return data
export interface LikePostChange {
  PostId: number;
  UserId: number;
}

//Add post
export interface AddPostInputData {
  image?: string;
  content: string;
}
export interface AddPostOutputData {
  id: number;

  User: PostUser;
  Image: PostImage[];
  Comments: PostUser[];
  Retweet: PostRetweet[];
  Likers: PostLikser[];

  content: string;
  createdAt: string;
  updatedAt: string;
  UserId: number;
  RetweetId: string;
}

//Update post
export interface UpdatePostInputData {
  content: string;
}
export interface UpdatePostOutputData {
  id: number;

  User: PostUser;
  Image: PostImage[] | null;
  Comment: PostUser[] | null;
  Likers: PostLikser[];

  content: string;
}

//Comment
export interface AddCommentInputData {
  content: string;
  postId: string;
  userId: string;
}
export interface AddCommentOutputData {
  id: number;
  nickname: string;
}

//Retweet
export interface RetweetOutputData {
  id: number;

  User: PostUser;
  Image: PostImage[];
  Comments: PostUser[];
  Retweet: PostRetweet[];
  Likers: PostLikser[];

  content: string;
  createdAt: string;
  updatedAt: string;
  UserId: number;
  RetweetId: string;
}

//HashTag
export interface HashTagInputData {
  lastId: string;
  tag: string;
}
export interface HashTagOutputData {
  id: number;
  User: PostUser;
  Image: PostImage[] | null;
  Likers: PostLikser[] | null;
  Retweet: PostRetweet[] | null;
}
