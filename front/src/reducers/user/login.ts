import { MeInfo } from '@src/types/user';
import { LogInData } from '@src/types/user';

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST' as const;
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS' as const;
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE' as const;

export interface LogInRequest {
  type: typeof LOG_IN_REQUEST;
  data: LogInData;
}

export interface LogInSuccess {
  type: typeof LOG_IN_SUCCESS;
  data: MeInfo;
}

export interface LogInFailure {
  type: typeof LOG_IN_FAILURE;
  error: string;
}

export const logInRequest = (data: LogInData): LogInRequest => ({
  type: LOG_IN_REQUEST,
  data,
});

export const logInSuccess = (data: MeInfo): LogInSuccess => ({
  type: LOG_IN_SUCCESS,
  data,
});

export const logInFailure = (error: string): LogInFailure => ({
  type: LOG_IN_FAILURE,
  error,
});

export type Login = ReturnType<typeof logInRequest> | ReturnType<typeof logInSuccess> | ReturnType<typeof logInFailure>;
