import React, { useRef, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { END } from 'redux-saga';

import UserInfo from '@components/UserInfo';
import FriendRequestForm from '@components/FriendRequestForm';
import { GetOtherUserInfoRequest } from '@reducers/user/getOtherUserInfo';
import { RootState } from '@reducers/.';
import PostCard from '@components/PostCard';
import { getUserPostsRequest } from '@reducers/post/getUserPosts';
import wrapper from '@src/store/configureStore';

const User = () => {
  const dispatch = useDispatch();
  const { info } = useSelector((state: RootState) => state.user);
  const { id } = useSelector((state: RootState) => state.user.otherUserInfo);
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
    window.addEventListener('scroll', onScroll);

    return () => {
      countRef.current = [];
      window.removeEventListener('scroll', onScroll);
    };
  }, [hasMorePost, posts.length]);

  return (
    <>
      {info && info.id !== id && <FriendRequestForm id={id} />}
      <UserInfo />
      {posts.map((v, i) => (
        <PostCard key={`post_${v.id}`} postIndex={i} postData={v} />
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

  if (context.query.id) {
    const id = parseInt(context.query.id as string, 10);
    context.store.dispatch(GetOtherUserInfoRequest(id));
    context.store.dispatch(getUserPostsRequest(id));
  }

  context.store.dispatch(END);
  await (context.store as any).sagaTask.toPromise();

  return { props: {} };
});

export default User;
