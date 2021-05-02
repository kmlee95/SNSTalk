import { HashTagInputData, HashTagOutputData } from '@src/types/post';

export const LOAD_HASHTAG_POSTS_REQUEST = 'LOAD_HASHTAG_POSTS_REQUEST';
export const LOAD_HASHTAG_POSTS_SUCCESS = 'LOAD_HASHTAG_POSTS_SUCCESS';
export const LOAD_HASHTAG_POSTS_FAILURE = 'LOAD_HASHTAG_POSTS_FAILURE';

export interface GetHashTagRequest {
  type: typeof LOAD_HASHTAG_POSTS_REQUEST;
  data: string;
  lastId: string;
}

export interface GetHashTagSuccess {
  type: typeof LOAD_HASHTAG_POSTS_SUCCESS;
  data: HashTagOutputData[];
}

export interface GetHashTagFailure {
  type: typeof LOAD_HASHTAG_POSTS_FAILURE;
  error: string;
}

export const getHashTagRequest = (data: string, lastId: string): GetHashTagRequest => ({
  type: LOAD_HASHTAG_POSTS_REQUEST,
  data,
  lastId,
});

export const getHashTagSuccess = (data: HashTagOutputData[]): GetHashTagSuccess => ({
  type: LOAD_HASHTAG_POSTS_SUCCESS,
  data,
});

export const getHashTagFailure = (error: string): GetHashTagFailure => ({
  type: LOAD_HASHTAG_POSTS_FAILURE,
  error,
});

export type GetHashTag =
  | ReturnType<typeof getHashTagRequest>
  | ReturnType<typeof getHashTagSuccess>
  | ReturnType<typeof getHashTagFailure>;
