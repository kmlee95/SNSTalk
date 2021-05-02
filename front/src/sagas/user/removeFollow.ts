import axios from 'axios';
import { takeLatest, put, call } from 'redux-saga/effects';
import {
  REMOVE_FOLLOWER_REQUEST,
  RemoveFollowRequest,
  removeFollowSuccess,
  removeFollowFailure,
} from '@reducers/user/removeFollow';

function removeFollowerAPI(data: number) {
  return axios.delete(`/user/follower/${data}`);
}

function* removeFollower(action: RemoveFollowRequest) {
  try {
    const result = yield call(removeFollowerAPI, action.data);
    yield put(removeFollowSuccess(result.data));
  } catch (err) {
    yield put(removeFollowFailure(err.response.data));
  }
}

function* watchRemoveFollower() {
  yield takeLatest(REMOVE_FOLLOWER_REQUEST, removeFollower);
}

export default watchRemoveFollower;
