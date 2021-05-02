/* 특정 사람 검색 */

import { UserInfo } from '@src/types/user';

export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST' as const;
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS' as const;
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE' as const;

export interface LoadUserRequest {
  type: typeof LOAD_USER_REQUEST;
  data: number;
}

export interface LoadUserSuccess {
  type: typeof LOAD_USER_SUCCESS;
  data: UserInfo;
}

export interface LoadUserFailure {
  type: typeof LOAD_USER_FAILURE;
  error: string;
}

export const loadUserRequest = (data: number): LoadUserRequest => ({
  type: LOAD_USER_REQUEST,
  data,
});

export const loadUserSuccess = (data: UserInfo): LoadUserSuccess => ({
  type: LOAD_USER_SUCCESS,
  data,
});

export const loadUserFailure = (error: string): LoadUserFailure => ({
  type: LOAD_USER_FAILURE,
  error,
});

export type GetOtherInfo =
  | ReturnType<typeof loadUserRequest>
  | ReturnType<typeof loadUserSuccess>
  | ReturnType<typeof loadUserFailure>;
