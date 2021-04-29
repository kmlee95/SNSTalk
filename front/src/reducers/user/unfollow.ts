/*  unfollow(친구삭제) 처리 */

export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST' as const;
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS' as const;
export const UNFOLLOW_FAILURE = 'UNFOLLOW_FAILURE' as const;

export interface UnFollowRequest {
  type: typeof UNFOLLOW_REQUEST;
  data: number;
}

export interface UnFollowSuccess {
  type: typeof UNFOLLOW_SUCCESS;
}

export interface UnFollowFailure {
  type: typeof UNFOLLOW_FAILURE;
  error: string;
}

export const unFollowRequest = (data: number): UnFollowRequest => ({
  type: UNFOLLOW_REQUEST,
  data,
});

export const unFollowSuccess = (): UnFollowSuccess => ({
  type: UNFOLLOW_SUCCESS,
});

export const unFollowFailure = (error: string): UnFollowFailure => ({
  type: UNFOLLOW_FAILURE,
  error,
});

export type UnFollow =
  | ReturnType<typeof unFollowRequest>
  | ReturnType<typeof unFollowSuccess>
  | ReturnType<typeof unFollowFailure>;
