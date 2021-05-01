import { LikePostChange } from '@src/types/post';

export const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST' as const;
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS' as const;
export const UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE' as const;

export interface UnLikePostRequest {
  type: typeof UNLIKE_POST_REQUEST;
  data: number; //postId
}

export interface UnLikePostSuccess {
  type: typeof UNLIKE_POST_SUCCESS;
  data: LikePostChange;
}

export interface UnLikePostFailure {
  type: typeof UNLIKE_POST_FAILURE;
  error: string;
}

export const unLikePostRequest = (data: number): UnLikePostRequest => ({
  type: UNLIKE_POST_REQUEST,
  data,
});

export const unLikePostSuccess = (data: LikePostChange): UnLikePostSuccess => ({
  type: UNLIKE_POST_SUCCESS,
  data,
});

export const unLikePostFailure = (error: string): UnLikePostFailure => ({
  type: UNLIKE_POST_FAILURE,
  error,
});

export type UnlikePost =
  | ReturnType<typeof unLikePostRequest>
  | ReturnType<typeof unLikePostSuccess>
  | ReturnType<typeof unLikePostFailure>;
