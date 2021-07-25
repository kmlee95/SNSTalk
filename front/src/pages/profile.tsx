import React, { useRef, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';
import axios from 'axios';
import { END } from 'redux-saga';

import ProfileForm from '@components/ProfileForm';
import PostCard from '@components/PostCard';
import { RootState } from '../reducers';
import { getUserPostsRequest } from '../reducers/post/getUserPosts';
import wrapper from '@src/store/configureStore';

const Profile = () => {
  const dispatch = useDispatch();
  const id = useSelector((state: RootState) => state.user.info && state.user.info.id);
  const { posts } = useSelector((state: RootState) => state.post);
  const { hasMorePost } = useSelector((state: RootState) => state.post);
  const countRef = useRef<string[]>([]);

  const onScroll = useCallback(() => {
    if (
      posts.length !== 0 &&
      hasMorePost &&
      window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300
    ) {
      const lastUpdatedAt = posts[posts.length - 1].updatedAt;
      if (!countRef.current.includes(lastUpdatedAt)) {
        dispatch(getUserPostsRequest(id, lastUpdatedAt));
        countRef.current.push(lastUpdatedAt);
      }
    }
  }, [countRef.current, hasMorePost, posts]);

  useEffect(() => {
    if (!id) {
      Router.push('/');
    }
  }, [id]);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);

    return () => {
      countRef.current = [];
      window.removeEventListener('scroll', onScroll);
    };
  }, [hasMorePost, posts.length]);

  return (
    <>
      <ProfileForm />
      {posts.map((v) => (
        <PostCard key={`post_${v.id}`} postData={v} />
      ))}
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }

  const id = context.store.getState().user.info && context.store.getState().user.info.id;
  if (id) {
    context.store.dispatch(getUserPostsRequest(id));
  }

  context.store.dispatch(END);
  await (context.store as any).sagaTask.toPromise();
});

export default Profile;
