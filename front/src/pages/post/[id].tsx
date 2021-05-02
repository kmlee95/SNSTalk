import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import Head from 'next/head';
import { END } from 'redux-saga';
import axios from 'axios';

import { loadMyInfoRequest } from '@reducers/user/getUserInfo';
import { loadPostRequest } from '@reducers/post/getOnePost';
import PostCard from '@components/PostCard';
import { RootState } from '@reducers/.';
import wrapper from '@store/configureStore';

const Post = () => {
  const { singlePost } = useSelector((state: RootState) => state.post);
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Head>
        <title>
          {singlePost.User.nickname}
          님의 글
        </title>
        <meta name="description" content={singlePost.content} />
        <meta property="og:title" content={`${singlePost.User.nickname}님의 게시글`} />
        <meta property="og:description" content={singlePost.content} />
        <meta
          property="og:image"
          content={singlePost.Images[0] ? singlePost.Images[0].src : 'https://nodebird.com/favicon.ico'}
        />
        <meta property="og:url" content={`https://nodebird.com/post/${id}`} />
      </Head>
      <PostCard post={singlePost} />
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  console.log(context);
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch(loadMyInfoRequest());
  context.store.dispatch(loadPostRequest(Number(context.params.id)));
  context.store.dispatch(END);
  await (context.store as any).sagaTask.toPromise();
  return { props: {} };
});

export default Post;
