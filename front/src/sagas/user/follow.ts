import axios from 'axios';
import { takeLatest, put, call } from 'redux-saga/effects';
import { FOLLOW_REQUEST, FollowRequest, followSuccess, followFailure } from '@reducers/user/follow';

function followAPI(data: number) {
  return axios.patch(`/user/${data}/follow`);
}

function* follow(action: FollowRequest) {
  try {
    const result = yield call(followAPI, action.data);
    yield put(followSuccess(result.data));
  } catch (err) {
    yield put(followFailure(err.response.data));
  }
}

function* watchFollow() {
  yield takeLatest(FOLLOW_REQUEST, follow);
}

export default watchFollow;
