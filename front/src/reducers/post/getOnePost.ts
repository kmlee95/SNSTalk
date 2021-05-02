import { SinglePostData } from '@src/types/post';

export const LOAD_POST_REQUEST = 'LOAD_POST_REQUEST' as const; //특정인의 post
export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS' as const;
export const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE' as const;

export interface LoadPostRequest {
  type: typeof LOAD_POST_REQUEST;
  data: number;
}

export interface LoadPostSuccess {
  type: typeof LOAD_POST_SUCCESS;
  data: SinglePostData;
}

export interface LoadPostFailure {
  type: typeof LOAD_POST_FAILURE;
  error: string;
}

export const loadPostRequest = (data: number): LoadPostRequest => ({
  type: LOAD_POST_REQUEST,
  data,
});

export const loadPostSuccess = (data: SinglePostData): LoadPostSuccess => ({
  type: LOAD_POST_SUCCESS,
  data,
});

export const loadPostFailure = (error: string): LoadPostFailure => ({
  type: LOAD_POST_FAILURE,
  error,
});

export type GetOnePost =
  | ReturnType<typeof loadPostRequest>
  | ReturnType<typeof loadPostSuccess>
  | ReturnType<typeof loadPostFailure>;
