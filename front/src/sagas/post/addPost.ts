import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';

import { ADD_POST_REQUEST, AddPostRequest, addPostSuccess, addPostFailure } from '@reducers/post/addPost';
import { AddPostInputData } from '@src/types/post';

function addPostAPI(data: AddPostInputData) {
  return axios.post('/post', data);
}

function* addPost(action: AddPostRequest) {
  try {
    const result = yield call(addPostAPI, action.data);
    yield put(addPostSuccess(result.data));
  } catch (err) {
    console.error(err);
    yield put(addPostFailure(err.response.data));
  }
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

export default watchAddPost;
