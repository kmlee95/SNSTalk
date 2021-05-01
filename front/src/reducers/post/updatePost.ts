import { UpdatePostInputData, UpdatePostOutputData } from '@src/types/post';

export const UPDATE_POST_REQUEST = 'UPDATE_POST_REQUEST' as const;
export const UPDATE_POST_SUCCESS = 'UPDATE_POST_SUCCESS' as const;
export const UPDATE_POST_FAILURE = 'UPDATE_POST_FAILURE' as const;

export const REMOVE_IMAGE = 'REMOVE_IMAGE' as const;

export interface UpdatePostRequest {
  type: typeof UPDATE_POST_REQUEST;
  data: UpdatePostInputData;
}

export interface UpdatePostSuccess {
  type: typeof UPDATE_POST_SUCCESS;
  data: UpdatePostOutputData;
}

export interface UpdatePostFailure {
  type: typeof UPDATE_POST_FAILURE;
  error: string;
}

export const updatePostRequest = (data: UpdatePostInputData): UpdatePostRequest => ({
  type: UPDATE_POST_REQUEST,
  data,
});

export const updatePostSuccess = (data: UpdatePostOutputData): UpdatePostSuccess => ({
  type: UPDATE_POST_SUCCESS,
  data,
});

export const updatePostFailure = (error: string): UpdatePostFailure => ({
  type: UPDATE_POST_FAILURE,
  error,
});

export type UpdatePost =
  | ReturnType<typeof updatePostRequest>
  | ReturnType<typeof updatePostSuccess>
  | ReturnType<typeof updatePostFailure>;
