import axios from 'axios';
import { takeLatest, put, call } from 'redux-saga/effects';
import { LogInData } from '@src/types/user';
import { LOG_IN_REQUEST, logInSuccess, logInFailure, LogInRequest } from '@reducers/user/login';

function signInAPI(LogInData: LogInData) {
  return axios.post('/user/signin', LogInData, { withCredentials: true });
}

function* signIn(action: LogInRequest) {
  try {
    const result = yield call(signInAPI, action.data);
    yield put(logInSuccess(result.data));
  } catch (e) {
    yield put(logInFailure(e));
  }
}

function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, signIn);
}

export default watchLogIn;
