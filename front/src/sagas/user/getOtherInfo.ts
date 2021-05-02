import axios from 'axios';
import { takeLatest, put, call } from 'redux-saga/effects';
import { LOAD_USER_REQUEST, LoadUserRequest, loadUserSuccess, loadUserFailure } from '@reducers/user/getOtherInfo';

function loadUserAPI(data: number) {
  return axios.get(`/user/${data}`);
}

function* loadUser(action: LoadUserRequest) {
  try {
    const result = yield call(loadUserAPI, action.data);
    yield put(loadUserSuccess(result.data));
  } catch (err) {
    console.error(err);
    yield put(loadUserFailure(err.response.data));
  }
}

function* watchLoadUser() {
  yield takeLatest(LOAD_USER_REQUEST, loadUser);
}

export default watchLoadUser;
