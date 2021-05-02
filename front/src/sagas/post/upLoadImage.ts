import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';
import {
  UPLOAD_IMAGES_REQUEST,
  UploadImageRequest,
  uploadImageSuccess,
  uploadImageFailure,
} from '@reducers/post/upLoadImage';

function uploadImagesAPI(data: string) {
  return axios.post('/post/images', data);
}

function* uploadImages(action: UploadImageRequest) {
  try {
    const result = yield call(uploadImagesAPI, action.data);
    yield put(uploadImageSuccess(result.data));
  } catch (err) {
    yield put(uploadImageFailure(err.response.data));
  }
}

function* watchUploadImages() {
  yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages);
}

export default watchUploadImages;
