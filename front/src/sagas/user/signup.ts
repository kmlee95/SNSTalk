import axios from 'axios';
import { takeLatest, put, call } from 'redux-saga/effects';
import { SignUpData } from '@src/types/user';
import { SIGN_UP_REQUEST, signUpSuccess, signUpFailure } from '@reducers/user/signup';

function signUpAPI(signUpData: SignUpData) {
  return axios.post('/user/signup', signUpData);
}

function* signUp(action) {
  try {
    yield call(signUpAPI, action.data);
    yield put(signUpSuccess());
  } catch (err) {
    yield put(signUpFailure(err.response.data));
  }
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

export default watchSignUp;
