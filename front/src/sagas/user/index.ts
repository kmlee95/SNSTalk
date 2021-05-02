import { all, fork } from 'redux-saga/effects';
import watchSignUp from './signup';
import watchLogIn from './login';
import watchRemoveFollower from './removeFollow';
import watchChangeNickname from './updateUserInfo';
import watchLoadMyInfo from './getUserInfo';
import watchLoadUser from './getOtherInfo';
import watchFollow from './follow';
import watchUnfollow from './unfollow';
import watchLogOut from './logout';

export default function* userSaga() {
  yield all([
    fork(watchSignUp),
    fork(watchLogIn),
    fork(watchRemoveFollower),
    fork(watchChangeNickname),
    fork(watchLoadMyInfo),
    fork(watchLoadUser),
    fork(watchFollow),
    fork(watchUnfollow),
    fork(watchLogOut),
  ]);
}
