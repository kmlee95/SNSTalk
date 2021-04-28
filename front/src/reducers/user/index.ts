import produce from 'immer';

import { SignUp, SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE } from './signup';
import { Login, LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE } from './login';

export interface UserInfo {
  email: string;
  nickname: string;
  password: string;
}

export interface MeInfo {
  email: string;
  nickname: string;
  password: string;
}

export interface UserInitialState {
  userInfo: UserInfo | null;
  me: MeInfo | null;
  loadMyInfoLoading: boolean; // 유저 정보 가져오기 시도중
  loadMyInfoDone: boolean;
  loadMyInfoError: string;

  loadUserLoading: boolean; // 유저 정보 가져오기 시도중
  loadUserDone: boolean;
  loadUserError: string;

  followLoading: boolean; // 팔로우 시도중
  followDone: boolean;
  followError: string;

  unfollowLoading: boolean; // 언팔로우 시도중
  unfollowDone: boolean;
  unfollowError: string;

  logInLoading: boolean; // 로그인 시도중
  logInDone: boolean;
  logInError: string;

  logOutLoading: boolean; // 로그아웃 시도중
  logOutDone: boolean;
  logOutError: string;

  signUpLoading: boolean; // 회원가입 시도중
  signUpDone: boolean;
  signUpError: string;

  changeNicknameLoading: boolean; // 닉네임 변경 시도중
  changeNicknameDone: boolean;
  changeNicknameError: string;

  loadFollowingsLoading: boolean;
  loadFollowingsDone: boolean;
  loadFollowingsError: string;

  loadFollowersLoading: boolean;
  loadFollowersDone: boolean;
  loadFollowersError: string;

  removeFollowerLoading: boolean;
  removeFollowerDone: boolean;
  removeFollowerError: string;
}

const initialState: UserInitialState = {
  userInfo: null,
  me: null,

  loadMyInfoLoading: false, // 유저 정보 가져오기 시도중
  loadMyInfoDone: false,
  loadMyInfoError: null,

  loadUserLoading: false, // 유저 정보 가져오기 시도중
  loadUserDone: false,
  loadUserError: null,

  followLoading: false, // 팔로우 시도중
  followDone: false,
  followError: null,

  unfollowLoading: false, // 언팔로우 시도중
  unfollowDone: false,
  unfollowError: null,

  logInLoading: false, // 로그인 시도중
  logInDone: false,
  logInError: null,

  logOutLoading: false, // 로그아웃 시도중
  logOutDone: false,
  logOutError: null,

  signUpLoading: false, // 회원가입 시도중
  signUpDone: false,
  signUpError: null,

  changeNicknameLoading: false, // 닉네임 변경 시도중
  changeNicknameDone: false,
  changeNicknameError: null,

  loadFollowingsLoading: false,
  loadFollowingsDone: false,
  loadFollowingsError: null,

  loadFollowersLoading: false,
  loadFollowersDone: false,
  loadFollowersError: null,

  removeFollowerLoading: false,
  removeFollowerDone: false,
  removeFollowerError: null,
};

type ReducerAction = SignUp | Login;

const user = (state: UserInitialState = initialState, action: ReducerAction) => {
  return produce(state, (draft: UserInitialState) => {
    switch (action.type) {
      case SIGN_UP_REQUEST:
        draft.signUpLoading = true;
        draft.signUpError = null;
        draft.signUpDone = false;
        break;
      case SIGN_UP_SUCCESS:
        draft.signUpLoading = false;
        draft.signUpDone = true;
        break;
      case SIGN_UP_FAILURE:
        draft.signUpLoading = false;
        draft.signUpError = action.error;
        break;
      case LOG_IN_REQUEST:
        draft.logInLoading = true;
        draft.logInError = null;
        draft.logInDone = false;
        break;
      case LOG_IN_SUCCESS:
        draft.logInLoading = false;
        draft.me = action.data;
        draft.logInDone = true;
        break;
      case LOG_IN_FAILURE:
        draft.logInLoading = false;
        draft.logInError = action.error;
        break;
      default:
        break;
    }
  });
};

export default user;
