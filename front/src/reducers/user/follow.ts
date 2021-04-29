/* follow(친구신청) 처리 */

export const FOLLOW_REQUEST = 'FOLLOW_REQUEST' as const;
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS' as const;
export const FOLLOW_FAILURE = 'FOLLOW_FAILURE' as const;

export interface FollowRequest {
  type: typeof FOLLOW_REQUEST;
  data: number;
}

export interface FollowSuccess {
  type: typeof FOLLOW_SUCCESS;
}

export interface FollowFailure {
  type: typeof FOLLOW_FAILURE;
  error: string;
}

export const followRequest = (data: number): FollowRequest => ({
  type: FOLLOW_REQUEST,
  data,
});

export const followSuccess = (): FollowSuccess => ({
  type: FOLLOW_SUCCESS,
});

export const followFailure = (error: string): FollowFailure => ({
  type: FOLLOW_FAILURE,
  error,
});

export type Follow =
  | ReturnType<typeof followRequest>
  | ReturnType<typeof followSuccess>
  | ReturnType<typeof followFailure>;
