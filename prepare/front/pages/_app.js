import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import 'antd/dist/antd.css';
import withReduxSaga from 'next-redux-saga';
import wrapper from '../store/configureStore';

const NodeBird = ({ Component }) => {
  return (
    <>
      <Head>
        <meta charSet="utf=8" />
        <title>NodeBird</title>
      </Head>
      <Component />
    </>
  );
};

NodeBird.propTypes = {
  Component: PropTypes.elementType.isRequired,
};
//next에서는 Redux, reduxsaga 두번 감싼다.hoc
export default wrapper.withRedux(withReduxSaga(NodeBird));
