import { AddPostInputData, AddPostOutputData } from '@src/types/post';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST' as const;
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS' as const;
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE' as const;

export interface AddPostRequest {
  type: typeof ADD_POST_REQUEST;
  data: AddPostInputData;
}

export interface AddPostSuccess {
  type: typeof ADD_POST_SUCCESS;
  data: AddPostOutputData;
}

export interface AddPostFailure {
  type: typeof ADD_POST_FAILURE;
  error: string;
}

export const addPostRequest = (data: AddPostInputData): AddPostRequest => ({
  type: ADD_POST_REQUEST,
  data,
});

export const addPostSuccess = (data: AddPostOutputData): AddPostSuccess => ({
  type: ADD_POST_SUCCESS,
  data,
});

export const addPostFailure = (error: string): AddPostFailure => ({
  type: ADD_POST_FAILURE,
  error,
});

export type AddPost =
  | ReturnType<typeof addPostRequest>
  | ReturnType<typeof addPostSuccess>
  | ReturnType<typeof addPostFailure>;
