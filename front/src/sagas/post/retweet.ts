import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';
import { RETWEET_REQUEST, RetweetRequest, retweetSuccess, retweetFailure } from '@reducers/post/retweet';

function retweetAPI(data) {
  return axios.post(`/post/${data}/retweet`);
}

function* retweet(action: RetweetRequest) {
  try {
    const result = yield call(retweetAPI, action.data);
    yield put(retweetSuccess(result.data));
  } catch (err) {
    yield put(retweetFailure(err.response.data));
  }
}

function* watchRetweet() {
  yield takeLatest(RETWEET_REQUEST, retweet);
}
export default watchRetweet;
