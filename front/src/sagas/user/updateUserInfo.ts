import { UpdateInfo } from '@src/types/user';
import axios from 'axios';
import { takeLatest, put, call } from 'redux-saga/effects';
import {
  CHANGE_NICKNAME_REQUEST,
  ChangeNicknameRequest,
  changeNicknameSuccess,
  changeNicknameFailure,
} from '@reducers/user/updateUserInfo';

function changeNicknameAPI(data: UpdateInfo) {
  return axios.patch('/user/nickname', { nickname: data });
}

function* changeNickname(action: ChangeNicknameRequest) {
  try {
    const result = yield call(changeNicknameAPI, action.data);
    yield put(changeNicknameSuccess(result.data));
  } catch (err) {
    console.error(err);
    yield put(changeNicknameFailure(err.response.data));
  }
}

function* watchChangeNickname() {
  yield takeLatest(CHANGE_NICKNAME_REQUEST, changeNickname);
}

export default watchChangeNickname;
