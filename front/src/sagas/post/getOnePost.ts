import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';
import { LOAD_POST_REQUEST, LoadPostRequest, loadPostSuccess, loadPostFailure } from '@reducers/post/getOnePost';

function loadPostAPI(data: number) {
  return axios.get(`/post/${data}`);
}

function* loadPost(action: LoadPostRequest) {
  try {
    const result = yield call(loadPostAPI, action.data);
    yield put(loadPostSuccess(result.data));
  } catch (err) {
    yield put(loadPostFailure(err.response.data));
  }
}

function* watchLoadPost() {
  yield takeLatest(LOAD_POST_REQUEST, loadPost);
}

export default watchLoadPost;
