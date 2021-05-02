import { all, fork } from 'redux-saga/effects';
import watchAddComment from './addComment';
import watchAddPost from './addPost';
import watchLoadPosts from './getAllPosts';
import watchLoadHashtagPosts from './getHashTag';
import watchLoadPost from './getOnePost';
import watchLikePost from './likePost';
import watchRemovePost from './removePost';
import watchRetweet from './retweet';
import watchUnlikePost from './unlikePost';
import watchUploadImages from './upLoadImage';

export default function* postSaga() {
  yield all([
    fork(watchAddComment),
    fork(watchAddPost),
    fork(watchLoadPosts),

    fork(watchLoadHashtagPosts),
    fork(watchLoadPost),
    fork(watchLikePost),
    fork(watchRemovePost),
    fork(watchRetweet),
    fork(watchUnlikePost),
    fork(watchUploadImages),
  ]);
}
