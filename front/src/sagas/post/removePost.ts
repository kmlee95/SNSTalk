import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';
import {
  REMOVE_POST_REQUEST,
  RemovePostRequest,
  removePostSuccess,
  removePostFailure,
} from '@reducers/post/removePost';

function removePostAPI(data: number) {
  return axios.delete(`/post/${data}`);
}

function* removePost(action: RemovePostRequest) {
  try {
    const result = yield call(removePostAPI, action.data);
    yield put(removePostSuccess(result.data));
  } catch (err) {
    yield put(removePostFailure(err.response.data));
  }
}

function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

export default watchRemovePost;
