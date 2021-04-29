/* 로그아웃 */
export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST' as const;
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS' as const;
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE' as const;

export interface LogOutRequest {
  type: typeof LOG_OUT_REQUEST;
}

export interface LogOutSuccess {
  type: typeof LOG_OUT_SUCCESS;
}

export interface LogOutFailure {
  type: typeof LOG_OUT_FAILURE;
  error: string;
}

export const logOutRequest = (): LogOutRequest => ({
  type: LOG_OUT_REQUEST,
});

export const logOutSuccess = (): LogOutSuccess => ({
  type: LOG_OUT_SUCCESS,
});

export const logOutFailure = (error: string): LogOutFailure => ({
  type: LOG_OUT_FAILURE,
  error,
});

export type Logout =
  | ReturnType<typeof logOutRequest>
  | ReturnType<typeof logOutSuccess>
  | ReturnType<typeof logOutFailure>;
