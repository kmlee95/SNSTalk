import axios from 'axios';
import { takeLatest, put, call } from 'redux-saga/effects';
import { UNFOLLOW_REQUEST, UnFollowRequest, unFollowSuccess, unFollowFailure } from '@reducers/user/unfollow';

function unfollowAPI(data: number) {
  return axios.delete(`/user/${data}/follow`);
}

function* unfollow(action: UnFollowRequest) {
  try {
    const result = yield call(unfollowAPI, action.data);
    yield put(unFollowSuccess(result.data));
  } catch (err) {
    yield put(unFollowFailure(err.response.data));
  }
}

function* watchUnfollow() {
  yield takeLatest(UNFOLLOW_REQUEST, unfollow);
}
export default watchUnfollow;
