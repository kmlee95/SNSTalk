/* ssr에서 초기 내 정보 불러올 시 사용 */

import { MeInfo } from '@src/types/user';

export const LOAD_MY_INFO_REQUEST = 'LOAD_MY_INFO_REQUEST' as const;
export const LOAD_MY_INFO_SUCCESS = 'LOAD_MY_INFO_SUCCESS' as const;
export const LOAD_MY_INFO_FAILURE = 'LOAD_MY_INFO_FAILURE' as const;

export interface LoadMyInfoRequest {
  type: typeof LOAD_MY_INFO_REQUEST;
}

export interface LoadMyInfoSuccess {
  type: typeof LOAD_MY_INFO_SUCCESS;
  data: MeInfo;
}

export interface LoadMyInfoFailure {
  type: typeof LOAD_MY_INFO_FAILURE;
  error: string;
}

export const loadMyInfoRequest = (): LoadMyInfoRequest => ({
  type: LOAD_MY_INFO_REQUEST,
});

export const loadMyInfoSuccess = (data: MeInfo): LoadMyInfoSuccess => ({
  type: LOAD_MY_INFO_SUCCESS,
  data,
});

export const loadMyInfoFailure = (error: string): LoadMyInfoFailure => ({
  type: LOAD_MY_INFO_FAILURE,
  error,
});

export type GetUserInfo =
  | ReturnType<typeof loadMyInfoRequest>
  | ReturnType<typeof loadMyInfoSuccess>
  | ReturnType<typeof loadMyInfoFailure>;
