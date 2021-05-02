import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';
import {
  UNLIKE_POST_REQUEST,
  UnLikePostRequest,
  unLikePostSuccess,
  unLikePostFailure,
} from '@reducers/post/unlikePost';

function unlikePostAPI(data: number) {
  return axios.delete(`/post/${data}/like`);
}

function* unlikePost(action: UnLikePostRequest) {
  try {
    const result = yield call(unlikePostAPI, action.data);
    yield put(unLikePostSuccess(result.data));
  } catch (err) {
    yield put(unLikePostFailure(err.response.data));
  }
}

function* watchUnlikePost() {
  yield takeLatest(UNLIKE_POST_REQUEST, unlikePost);
}

export default watchUnlikePost;
