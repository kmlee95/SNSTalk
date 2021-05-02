import axios from 'axios';
import { put, call, throttle } from 'redux-saga/effects';
import { LOAD_POSTS_REQUEST, LoadPostsRequest, loadPostsSuccess, loadPostsFailure } from '@reducers/post/getAllPosts';

function loadPostsAPI(lastId: number) {
  return axios.get(`/posts?lastId=${lastId || 0}`);
}

function* loadPosts(action: LoadPostsRequest) {
  try {
    const result = yield call(loadPostsAPI, action.data);
    yield put(loadPostsSuccess(result.data));
  } catch (err) {
    yield put(loadPostsFailure(err.response.data));
  }
}

function* watchLoadPosts() {
  yield throttle(5000, LOAD_POSTS_REQUEST, loadPosts);
}

export default watchLoadPosts;
