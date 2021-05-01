import { AllPostData } from '@src/types/post';

export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST' as const;
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS' as const;
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE' as const;

export interface LostPostsRequest {
  type: typeof LOAD_POSTS_REQUEST;
  data?: number; //lastId가 있거나 없거나..
}

export interface LoadPostsSuccess {
  type: typeof LOAD_POSTS_SUCCESS;
  data: AllPostData[];
}

export interface LoadPostFailure {
  type: typeof LOAD_POSTS_FAILURE;
  error: string;
}

export const loadPostsRequest = (data?: number): LostPostsRequest => ({
  type: LOAD_POSTS_REQUEST,
  data,
});

export const loadPostsSuccess = (data: AllPostData[]): LoadPostsSuccess => ({
  type: LOAD_POSTS_SUCCESS,
  data,
});

export const loadPostsFailure = (error: string): LoadPostFailure => ({
  type: LOAD_POSTS_FAILURE,
  error,
});

export type GetAllPost =
  | ReturnType<typeof loadPostsRequest>
  | ReturnType<typeof loadPostsSuccess>
  | ReturnType<typeof loadPostsFailure>;
