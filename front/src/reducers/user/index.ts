import produce from 'immer';

import { UserInfo, MeInfo } from '@src/types/user';
import { SignUp, SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE } from './signup';
import { Login, LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE } from './login';
import { Follow, FOLLOW_REQUEST, FOLLOW_SUCCESS, FOLLOW_FAILURE } from './follow';
import { GetOtherInfo, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAILURE } from './getOtherInfo';
import { GetUserInfo, LOAD_MY_INFO_REQUEST, LOAD_MY_INFO_SUCCESS, LOAD_MY_INFO_FAILURE } from './getUserInfo';
import { Logout, LOG_OUT_REQUEST, LOG_OUT_SUCCESS, LOG_OUT_FAILURE } from './logout';
import {
  RemoveFollow,
  REMOVE_FOLLOWER_SUCCESS,
  REMOVE_FOLLOWER_REQUEST,
  REMOVE_FOLLOWER_FAILURE,
} from './removeFollow';
import { UnFollow, UNFOLLOW_SUCCESS, UNFOLLOW_REQUEST, UNFOLLOW_FAILURE } from './unfollow';
import {
  UpdateUserInfo,
  CHANGE_NICKNAME_REQUEST,
  CHANGE_NICKNAME_SUCCESS,
  CHANGE_NICKNAME_FAILURE,
} from './updateUserInfo';

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

type ReducerAction =
  | SignUp
  | Login
  | Follow
  | GetOtherInfo
  | GetUserInfo
  | Logout
  | RemoveFollow
  | UnFollow
  | UpdateUserInfo;

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
      /* 로그인 */
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

      /* 로그아웃 */
      case LOG_OUT_REQUEST:
        draft.logOutLoading = true;
        draft.logOutError = null;
        draft.logOutDone = false;
        break;
      case LOG_OUT_SUCCESS:
        draft.logOutLoading = false;
        draft.logOutDone = true;
        draft.me = null;
        break;
      case LOG_OUT_FAILURE:
        draft.logOutLoading = false;
        draft.logOutError = action.error;
        break;

      /* 정보 수정 - 이름 */
      case CHANGE_NICKNAME_REQUEST:
        draft.changeNicknameLoading = true;
        draft.changeNicknameError = null;
        draft.changeNicknameDone = false;
        break;
      case CHANGE_NICKNAME_SUCCESS:
        draft.me.nickname = action.data.nickname;
        draft.changeNicknameLoading = false;
        draft.changeNicknameDone = true;
        break;
      case CHANGE_NICKNAME_FAILURE:
        draft.changeNicknameLoading = false;
        draft.changeNicknameError = action.error;
        break;

      /* 현재 내 정보 */
      case LOAD_MY_INFO_REQUEST:
        draft.loadMyInfoLoading = true;
        draft.loadMyInfoError = null;
        draft.loadMyInfoDone = false;
        break;
      case LOAD_MY_INFO_SUCCESS:
        draft.loadMyInfoLoading = false;
        draft.me = action.data;
        draft.loadMyInfoDone = true;
        break;
      case LOAD_MY_INFO_FAILURE:
        draft.loadMyInfoLoading = false;
        draft.loadMyInfoError = action.error;
        break;

      /* 특정 유저 정보 */
      case LOAD_USER_REQUEST:
        draft.loadUserLoading = true;
        draft.loadUserError = null;
        draft.loadUserDone = false;
        break;
      case LOAD_USER_SUCCESS:
        draft.loadUserLoading = false;
        draft.userInfo = action.data;
        draft.loadUserDone = true;
        break;
      case LOAD_USER_FAILURE:
        draft.loadUserLoading = false;
        draft.loadUserError = action.error;
        break;

      /* follow */
      case FOLLOW_REQUEST:
        draft.followLoading = true;
        draft.followError = null;
        draft.followDone = false;
        break;
      case FOLLOW_SUCCESS:
        draft.followLoading = false;
        draft.me.Followings.push({ id: action.data.UserId });
        draft.followDone = true;
        break;
      case FOLLOW_FAILURE:
        draft.followLoading = false;
        draft.followError = action.error;
        break;

      /* unfollow */
      case UNFOLLOW_REQUEST:
        draft.unfollowLoading = true;
        draft.unfollowError = null;
        draft.unfollowDone = false;
        break;
      case UNFOLLOW_SUCCESS:
        draft.unfollowLoading = false;
        draft.me.Followings = draft.me.Followings.filter((v) => v.id !== action.data.UserId);
        draft.unfollowDone = true;
        break;
      case UNFOLLOW_FAILURE:
        draft.unfollowLoading = false;
        draft.unfollowError = action.error;
        break;

      /* remove follow */
      case REMOVE_FOLLOWER_REQUEST:
        draft.removeFollowerLoading = true;
        draft.removeFollowerError = null;
        draft.removeFollowerDone = false;
        break;
      case REMOVE_FOLLOWER_SUCCESS:
        draft.removeFollowerLoading = false;
        draft.me.Followers = draft.me.Followers.filter((v) => v.id !== action.data.UserId);
        draft.removeFollowerDone = true;
        break;
      case REMOVE_FOLLOWER_FAILURE:
        draft.removeFollowerLoading = false;
        draft.removeFollowerError = action.error;
        break;

      default:
        break;
    }
  });
};

export default user;
