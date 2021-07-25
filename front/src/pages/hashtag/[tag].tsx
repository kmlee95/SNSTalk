import React, { useRef, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { END } from 'redux-saga';

import wrapper from '@store/configureStore';
import PostCard from '@components/PostCard';
import { RootState } from '@reducers/.';
import { getHashtagPostsRequest } from '@reducers/post/getHashtagPosts';

interface Props {
  tag: string;
}

const Hashtag = ({ tag }: Props) => {
  const dispatch = useDispatch();
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
        dispatch(getHashtagPostsRequest(tag, lastUpdatedAt));
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

  //context.params.id
  if (context.query.tag && typeof context.query.tag === 'string') {
    const { tag } = context.query;
    context.store.dispatch(getHashtagPostsRequest(tag));
    return { tag };
  }

  context.store.dispatch(END);
  await (context.store as any).sagaTask.toPromise();
});

export default Hashtag;
