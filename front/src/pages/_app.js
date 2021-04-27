import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import 'antd/dist/antd.css';
import { ThemeProvider } from 'styled-components';

import wrapper from '../store/configureStore';
import theme from '../theme';
import AppLayout from '../components/AppLayout';

const SnsTalk = ({ Component }) => {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <meta charSet="utf=8" />
        <title>SnsTalk</title>
      </Head>
      <AppLayout>
        <Component />
      </AppLayout>
    </ThemeProvider>
  );
};

SnsTalk.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(SnsTalk);
