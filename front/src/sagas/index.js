import { all, fork } from 'redux-saga/effects';
import axios from 'axios';
import postSaga from './post';
import userSaga from './user';

axios.defaults.baseURL = 'http://localhost:3065';
axios.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([fork(postSaga), fork(userSaga)]);
}

//take에서 action실행시
//fork : 함수를실행(비동기)
//fork대신 call은 함수를실행(동기)
//all은 Fork나 call을 동시에 실행시킬 수 있게 해준다.
//put은 Dispatch라 생각

//yield take 는 일회용.. while take는 동기적 작동 . takeEvery는 비동기
//takeEvery takeLatest 차이는 마우스클릭이 두번클릭되었다고 했을 때 두번클릭되냐 한번클릭되냐 그 차이
