import { LikePostChange } from '@src/types/post';

export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST' as const;
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS' as const;
export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE' as const;

export interface LikePostRequest {
  type: typeof LIKE_POST_REQUEST;
  data: number; //postId
}

export interface LikePostSuccess {
  type: typeof LIKE_POST_SUCCESS;
  data: LikePostChange;
}

export interface LikePostFailure {
  type: typeof LIKE_POST_FAILURE;
  error: string;
}

export const likePostRequest = (data: number): LikePostRequest => ({
  type: LIKE_POST_REQUEST,
  data,
});

export const likePostSuccess = (data: LikePostChange): LikePostSuccess => ({
  type: LIKE_POST_SUCCESS,
  data,
});

export const likePostFailure = (error: string): LikePostFailure => ({
  type: LIKE_POST_FAILURE,
  error,
});

export type LikePost =
  | ReturnType<typeof likePostRequest>
  | ReturnType<typeof likePostSuccess>
  | ReturnType<typeof likePostFailure>;
