import { SignUpData } from '@src/types/user';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST' as const;
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS' as const;
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE' as const;

export interface SignUpRequest {
  type: typeof SIGN_UP_REQUEST;
  data: SignUpData;
}

export interface SignUpSuccess {
  type: typeof SIGN_UP_SUCCESS;
}

export interface SignUpFailure {
  type: typeof SIGN_UP_FAILURE;
  error: string;
}

export const signUpRequest = (data: SignUpData): SignUpRequest => ({
  type: SIGN_UP_REQUEST,
  data,
});

export const signUpSuccess = (): SignUpSuccess => ({
  type: SIGN_UP_SUCCESS,
});

export const signUpFailure = (error: string): SignUpFailure => ({
  type: SIGN_UP_FAILURE,
  error,
});

export type SignUp =
  | ReturnType<typeof signUpRequest>
  | ReturnType<typeof signUpSuccess>
  | ReturnType<typeof signUpFailure>;
