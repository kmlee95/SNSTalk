export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST' as const;
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS' as const;
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE' as const;

export interface RemovePostRequest {
  type: typeof REMOVE_POST_REQUEST;
  data: number; //postId
}

export interface RemovePostSuccess {
  type: typeof REMOVE_POST_SUCCESS;
  data: number; //postId
}

export interface RemovePostFailure {
  type: typeof REMOVE_POST_FAILURE;
  error: string;
}

export const removePostRequest = (data: number): RemovePostRequest => ({
  type: REMOVE_POST_REQUEST,
  data,
});

export const removePostSuccess = (data: number): RemovePostSuccess => ({
  type: REMOVE_POST_SUCCESS,
  data,
});

export const removePostFailure = (error: string): RemovePostFailure => ({
  type: REMOVE_POST_FAILURE,
  error,
});

export type RemovePost =
  | ReturnType<typeof removePostRequest>
  | ReturnType<typeof removePostSuccess>
  | ReturnType<typeof removePostFailure>;
