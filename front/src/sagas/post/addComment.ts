import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';

import {
  ADD_COMMENT_REQUEST,
  AddCommentRequest,
  addCommentSuccess,
  addCommentFailure,
} from '@reducers/post/addComment';
import { AddCommentInputData } from '@src/types/post';

function addCommentAPI(data: AddCommentInputData) {
  return axios.post(`/post/${data.postId}/comment`, data); // POST /post/1/comment
}

function* addComment(action: AddCommentRequest) {
  try {
    const result = yield call(addCommentAPI, action.data);
    yield put(addCommentSuccess(result.data));
  } catch (err) {
    console.error(err);
    yield put(addCommentFailure(err.response.data));
  }
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

export default watchAddComment;
