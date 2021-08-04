import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';
import axios from 'axios';
import { END } from 'redux-saga';

import FriendsList from '@components/FriendsList';
import MoreButton from '@components/MoreButton';
import { RootState } from '@reducers/.';
import { getFriendsRequest } from '@reducers/user/getFriends';
import wrapper from '@src/store/configureStore';

const Friends = () => {
  const dispatch = useDispatch();
  const { info } = useSelector((state: RootState) => state.user);
  const friends = useSelector((state: RootState) => state.user.Friends);

  useEffect(() => {
    if (!info) {
      Router.push('/');
    }
  }, [info]);

  const onClickMoreButton = useCallback(() => {
    dispatch(getFriendsRequest(friends[friends.length - 1].id));
  }, [friends]);

  return (
    <>
      {friends && <FriendsList list={friends} />}
      {info && friends && info.friends !== friends.length ? <MoreButton onClick={onClickMoreButton} /> : null}
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';

  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }

  context.store.dispatch(getFriendsRequest());

  context.store.dispatch(END);
  await (context.store as any).sagaTask.toPromise();
});

export default Friends;
