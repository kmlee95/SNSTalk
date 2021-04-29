import axios from 'axios';
import { takeLatest, put, call } from 'redux-saga/effects';
import { LOG_OUT_REQUEST, logOutSuccess, logOutFailure } from '@reducers/user/logout';

function logOutAPI() {
  return axios.post('/user/logout');
}

function* logOut() {
  try {
    yield call(logOutAPI);
    yield put(logOutSuccess());
  } catch (err) {
    yield put(logOutFailure(err.response.data));
  }
}

function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}

export default watchLogOut;
