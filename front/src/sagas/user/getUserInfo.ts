import axios from 'axios';
import { takeLatest, put, call } from 'redux-saga/effects';
import { LOAD_MY_INFO_REQUEST, loadMyInfoSuccess, loadMyInfoFailure } from '@reducers/user/getUserInfo';

function loadMyInfoAPI() {
  return axios.get('/user');
}

function* loadMyInfo() {
  try {
    const result = yield call(loadMyInfoAPI);
    yield put(loadMyInfoSuccess(result.data));
  } catch (err) {
    yield put(loadMyInfoFailure(err.response.data));
  }
}

function* watchLoadMyInfo() {
  yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo);
}

export default watchLoadMyInfo;
