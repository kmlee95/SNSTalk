import { UserInfo, MeInfo } from '@src/types/user';
import { AllPostData, SinglePostData } from '@src/types/post';

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

export interface PostInitailState {
  mainPosts: AllPostData[];
  singlePost: SinglePostData | null;
  imagePaths: string[];

  hasMorePosts: boolean;

  likePostLoading: boolean;
  likePostDone: boolean;
  likePostError: string | null;

  unlikePostLoading: boolean;
  unlikePostDone: boolean;
  unlikePostError: string | null;

  loadPostLoading: boolean;
  loadPostDone: boolean;
  loadPostError: string | null;

  loadPostsLoading: boolean;
  loadPostsDone: boolean;
  loadPostsError: string | null;

  addPostLoading: boolean;
  addPostDone: boolean;
  addPostError: string | null;

  updatePostLoading: boolean;
  updatePostDone: boolean;
  updatePostError: string | null;

  removePostLoading: boolean;
  removePostDone: boolean;
  removePostError: string | null;

  addCommentLoading: boolean;
  addCommentDone: boolean;
  addCommentError: string | null;

  uploadImagesLoading: boolean;
  uploadImagesDone: boolean;
  uploadImagesError: string | null;

  retweetLoading: boolean;
  retweetDone: boolean;
  retweetError: string | null;
}
