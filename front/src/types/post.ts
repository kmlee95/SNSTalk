interface PostUser {
  id: number;
  nickname: string;
}
export interface PostImage {
  id: number;
  PostId: number;
  src: string;
  createdAt: string;
  updatedAt: string;
}
interface PostRetweet {
  User: PostUser;
  Images: PostImage[];
}
interface PostLikser {
  id: number;
}

// 하나의 포스트 조회(singlePost) return
export interface SinglePostData {
  id: number;

  User: PostUser;
  Images: PostImage[];
  Comments: PostUser[];
  Retweet: PostRetweet[];
  Likers: PostLikser[];

  content: string;
  createdAt: string;
  updatedAt: string;
  UserId: number;
  RetweetId: string;
}

// 모든 포스트 조회(mainPost) return
export interface AllPostData {
  id: number;

  User: PostUser;
  Images: PostImage[];
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
  Images: string | null;
  content: string;
}
export interface AddPostOutputData {
  id: number;

  User: PostUser;
  Images: PostImage[];
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
  Images: PostImage[] | null;
  Comment: PostUser[] | null;
  Likers: PostLikser[];

  content: string;
}

//Comment
export interface AddCommentInputData {
  content: string;
  postId: number;
  userId: number;
}
export interface AddCommentOutputData {
  id: number;
  nickname: string;
}

//Retweet
export interface RetweetOutputData {
  id: number;

  User: PostUser;
  Images: PostImage[];
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
  Images: PostImage[];
  Comments: PostUser[];
  Retweet: PostRetweet[];
  Likers: PostLikser[];

  content: string;
  createdAt: string;
  updatedAt: string;
  UserId: number;
  RetweetId: string;
}
