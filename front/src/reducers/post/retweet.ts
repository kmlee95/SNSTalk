import { RetweetOutputData } from '@src/types/post';

export const RETWEET_REQUEST = 'RETWEET_REQUEST' as const;
export const RETWEET_SUCCESS = 'RETWEET_SUCCESS' as const;
export const RETWEET_FAILURE = 'RETWEET_FAILURE' as const;

export interface RetweetRequest {
  type: typeof RETWEET_REQUEST;
  data: number;
}

export interface RetweetSuccess {
  type: typeof RETWEET_SUCCESS;
  data: RetweetOutputData;
}

export interface RetweetFailure {
  type: typeof RETWEET_FAILURE;
  error: string;
}

export const retweetRequest = (data: number): RetweetRequest => ({
  type: RETWEET_REQUEST,
  data,
});

export const retweetSuccess = (data: RetweetOutputData): RetweetSuccess => ({
  type: RETWEET_SUCCESS,
  data,
});

export const retweetFailure = (error: string): RetweetFailure => ({
  type: RETWEET_FAILURE,
  error,
});

export type Retweet =
  | ReturnType<typeof retweetRequest>
  | ReturnType<typeof retweetSuccess>
  | ReturnType<typeof retweetFailure>;
