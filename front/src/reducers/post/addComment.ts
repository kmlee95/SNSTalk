import { AddCommentInputData, AddCommentOutputData } from '@src/types/post';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST' as const;
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS' as const;
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE' as const;

export interface AddCommentRequest {
  type: typeof ADD_COMMENT_REQUEST;
  data: AddCommentInputData; //PostId
}

export interface AddCommentSuccess {
  type: typeof ADD_COMMENT_SUCCESS;
  data: AddCommentOutputData;
}

export interface AddCommentFailure {
  type: typeof ADD_COMMENT_FAILURE;
  error: string;
}

export const addCommentRequest = (data: AddCommentInputData): AddCommentRequest => ({
  type: ADD_COMMENT_REQUEST,
  data,
});

export const addCommentSuccess = (data: AddCommentOutputData): AddCommentSuccess => ({
  type: ADD_COMMENT_SUCCESS,
  data,
});

export const addCommentFailure = (error: string): AddCommentFailure => ({
  type: ADD_COMMENT_FAILURE,
  error,
});

export type AddComment =
  | ReturnType<typeof addCommentRequest>
  | ReturnType<typeof addCommentSuccess>
  | ReturnType<typeof addCommentFailure>;
