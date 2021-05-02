import React, { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import Router from 'next/router';
import { END } from 'redux-saga';
import axios from 'axios';
import useSWR from 'swr';

import NicknameEditForm from '@components/NicknameEditForm';
import FollowList from '@components/FollowList';
import { loadMyInfoRequest } from '@reducers/user/getUserInfo';
import wrapper from '@store/configureStore';
import { backUrl } from '@config/.';
import { RootState } from '@reducers/.';

const fetcher = (url: any) => axios.get(url, { withCredentials: true }).then((result) => result.data);

const Profile = () => {
  const [followingsLimit, setFollowingsLimit] = useState<number>(3);
  const [followersLimit, setFollowersLimit] = useState<number>(3);

  const { data: followingsData, error: followingError } = useSWR(
    `${backUrl}/user/followings?limit=${followingsLimit}`,
    fetcher,
  );
  const { data: followersData, error: followerError } = useSWR(
    `${backUrl}/user/followers?limit=${followersLimit}`,
    fetcher,
  );

  const { me } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (!(me && me.id)) {
      Router.push('/');
    }
  }, [me && me.id]);

  const loadMoreFollowers = useCallback(() => {
    setFollowersLimit((prev) => prev + 3);
  }, []);

  const loadMoreFollowings = useCallback(() => {
    setFollowingsLimit((prev) => prev + 3);
  }, []);

  if (!me) {
    return '내 정보 로딩중...';
  }

  if (followerError || followingError) {
    console.error(followerError || followingError);
    return '팔로잉/팔로워 로딩 중 에러가 발생했습니다.';
  }

  return (
    <>
      <Head>
        <title>내 프로필 | SnsTalk</title>
      </Head>

      <NicknameEditForm />
      <FollowList
        header="팔로잉"
        data={followingsData}
        onClickMore={loadMoreFollowings}
        loading={!followingError && !followingsData}
      />
      <FollowList
        header="팔로워"
        data={followersData}
        onClickMore={loadMoreFollowers}
        loading={!followerError && !followersData}
      />
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

  context.store.dispatch(END);
  await (context.store as any).sagaTask.toPromise();
});

export default Profile;
