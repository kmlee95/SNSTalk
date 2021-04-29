/* 유저정보 업데이트 */
import { UpdateInfo } from '@src/types/user';

export const CHANGE_NICKNAME_REQUEST = 'CHANGE_NICKNAME_REQUEST' as const;
export const CHANGE_NICKNAME_SUCCESS = 'CHANGE_NICKNAME_SUCCESS' as const;
export const CHANGE_NICKNAME_FAILURE = 'CHANGE_NICKNAME_FAILURE' as const;

export interface ChangeNicknameRequest {
  type: typeof CHANGE_NICKNAME_REQUEST;
  data: UpdateInfo;
}

export interface ChangeNicknameSuccess {
  type: typeof CHANGE_NICKNAME_SUCCESS;
  data: UpdateInfo;
}

export interface ChangeNicknameFailure {
  type: typeof CHANGE_NICKNAME_FAILURE;
  error: string;
}

export const changeNicknameRequest = (data: UpdateInfo): ChangeNicknameRequest => ({
  type: CHANGE_NICKNAME_REQUEST,
  data,
});

export const changeNicknameSuccess = (data: UpdateInfo): ChangeNicknameSuccess => ({
  type: CHANGE_NICKNAME_SUCCESS,
  data,
});

export const changeNicknameFailure = (error: string): ChangeNicknameFailure => ({
  type: CHANGE_NICKNAME_FAILURE,
  error,
});

export type UpdateUserInfo =
  | ReturnType<typeof changeNicknameRequest>
  | ReturnType<typeof changeNicknameSuccess>
  | ReturnType<typeof changeNicknameFailure>;
