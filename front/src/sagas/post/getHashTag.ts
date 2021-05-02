import axios from 'axios';
import { put, call, throttle } from 'redux-saga/effects';
import {
  LOAD_HASHTAG_POSTS_REQUEST,
  GetHashTagRequest,
  getHashTagSuccess,
  getHashTagFailure,
} from '@reducers/post/getHashTag';

function loadHashtagPostsAPI(data, lastId) {
  return axios.get(`/hashtag/${encodeURIComponent(data)}?lastId=${lastId || 0}`); //한글요청을 처리하기 위한 인코딩
}

function* loadHashtagPosts(action: GetHashTagRequest) {
  try {
    const result = yield call(loadHashtagPostsAPI, action.data, action.lastId);
    yield put(getHashTagSuccess(result.data));
  } catch (err) {
    console.error(err);
    yield put(getHashTagFailure(err.response.data));
  }
}

function* watchLoadHashtagPosts() {
  yield throttle(5000, LOAD_HASHTAG_POSTS_REQUEST, loadHashtagPosts);
}

export default watchLoadHashtagPosts;
