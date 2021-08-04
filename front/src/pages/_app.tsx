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
        <title>Kyungmin</title>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=yes,viewport-fit=cover"
        />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="description" content="SNSTalk" />
        <meta name="og:title" content="SNSTalk" />
        <meta name="og:description" content="SNSTalk" />
        <meta property="og:type" content="website" />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
        <link rel="shortcut icon" href="/favicon2.ico" />
      </Head>
      <AppLayout>
        <Component />
      </AppLayout>
    </ThemeProvider>
  );
};

export default wrapper.withRedux(SnsTalk);
