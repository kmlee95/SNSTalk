import React from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { END } from 'redux-saga';

import { getPostRequest } from '@reducers/post/getPost';
import PostCard from '@components/PostCard';
import { RootState } from '@reducers/.';
import wrapper from '@src/store/configureStore';

const Post = () => {
  const { post } = useSelector((state: RootState) => state.post);

  return <PostCard postData={post} />;
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }

  if (context.query.id) {
    const id = parseInt(context.query.id as string, 10);
    context.store.dispatch(getPostRequest(id));
  }

  context.store.dispatch(END);
  await (context.store as any).sagaTask.toPromise();
});

export default Post;
