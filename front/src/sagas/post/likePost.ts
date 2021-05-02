import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';
import { LIKE_POST_REQUEST, LikePostRequest, likePostFailure, likePostSuccess } from '@reducers/post/likePost';

function likePostAPI(data: number) {
  return axios.patch(`/post/${data}/like`);
}

function* likePost(action: LikePostRequest) {
  try {
    const result = yield call(likePostAPI, action.data);
    yield put(likePostSuccess(result.data));
  } catch (err) {
    yield put(likePostFailure(err.response.data));
  }
}

function* watchLikePost() {
  yield takeLatest(LIKE_POST_REQUEST, likePost);
}

export default watchLikePost;
