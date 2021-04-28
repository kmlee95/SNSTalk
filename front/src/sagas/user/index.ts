import { all, fork } from 'redux-saga/effects';
import watchSignUp from './signup';
import watchLogIn from './login';

export default function* userSaga() {
  yield all([fork(watchSignUp), fork(watchLogIn)]);
}
