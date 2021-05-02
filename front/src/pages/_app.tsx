import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import 'antd/dist/antd.css';
import { ThemeProvider } from 'styled-components';

import wrapper from '@store/configureStore';
import theme from '@theme/.';
import AppLayout from '@components/AppLayout';

const SnsTalk = ({ Component }: AppProps) => {
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

export default wrapper.withRedux(SnsTalk);
