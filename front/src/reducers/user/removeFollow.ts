/* follower 제거 */

export const REMOVE_FOLLOWER_REQUEST = 'REMOVE_FOLLOWER_REQUEST' as const;
export const REMOVE_FOLLOWER_SUCCESS = 'REMOVE_FOLLOWER_SUCCESS' as const;
export const REMOVE_FOLLOWER_FAILURE = 'REMOVE_FOLLOWER_FAILURE' as const;

export interface RemoveFollowRequest {
  type: typeof REMOVE_FOLLOWER_REQUEST;
  data: number;
}

export interface RemoveFollowSuccess {
  type: typeof REMOVE_FOLLOWER_SUCCESS;
}

export interface RemoveFollowFailure {
  type: typeof REMOVE_FOLLOWER_FAILURE;
  error: string;
}

export const removeFollowRequest = (data: number): RemoveFollowRequest => ({
  type: REMOVE_FOLLOWER_REQUEST,
  data,
});

export const removeFollowSuccess = (): RemoveFollowSuccess => ({
  type: REMOVE_FOLLOWER_SUCCESS,
});

export const removeFollowFailure = (error: string): RemoveFollowFailure => ({
  type: REMOVE_FOLLOWER_FAILURE,
  error,
});

export type RemoveFollow =
  | ReturnType<typeof removeFollowRequest>
  | ReturnType<typeof removeFollowSuccess>
  | ReturnType<typeof removeFollowFailure>;
