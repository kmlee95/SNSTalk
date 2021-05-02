import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { END } from 'redux-saga';

import axios from 'axios';

import PostCard from '@components/PostCard';
import wrapper from '@store/configureStore';
import { loadMyInfoRequest } from '@reducers/user/getUserInfo';
import { getHashTagRequest } from '@reducers/post/getHashTag';
import { RootState } from '@reducers/.';

const Hashtag = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { tag } = router.query;
  const { mainPosts, hasMorePosts } = useSelector((state: RootState) => state.post);

  useEffect(() => {
    const onScroll = () => {
      if (window.pageYOffset + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
        if (hasMorePosts) {
          dispatch(
            getHashTagRequest(String(tag), mainPosts[mainPosts.length - 1] && mainPosts[mainPosts.length - 1].id),
          );
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [mainPosts.length, hasMorePosts, tag]);

  return (
    <>
      {mainPosts.map((c) => (
        <PostCard key={c.id} post={c} />
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
  context.store.dispatch(loadMyInfoRequest());
  context.store.dispatch(getHashTagRequest(String(context.params.tag)));
  context.store.dispatch(END);
  await (context.store as any).sagaTask.toPromise();
  return { props: {} };
});

export default Hashtag;
