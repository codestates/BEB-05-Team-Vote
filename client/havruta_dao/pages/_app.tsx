import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import { LayoutComponent } from '../components/LayoutComponent';
import '../styles/customTheme.less';
import * as gtag from '../lib/gtag';
import { hotjar } from 'react-hotjar';
import ChannelService from '../components/ChannelService.js';
import { SessionProvider, signOut } from 'next-auth/react';
import { RecoilRoot } from 'recoil';
import { Space, Spin } from 'antd';
import Head from 'next/head';
import { SWRConfig } from 'swr';
import axios from 'axios';
import * as Sentry from '@sentry/react';
import Background from '../components/backgoround';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  //hotjar
  useEffect(() => {
    hotjar.initialize(3149981, 6);
  }, []);

  //ga 조회
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    router.events.on('hashChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
      router.events.off('hashChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  //channal talk 추가
  useEffect(() => {
    const channelTalk = new ChannelService();
    channelTalk.boot({
      pluginKey: process.env.NEXT_PUBLIC_CHANNEL_IO_KEY,
    });
    return () => {
      channelTalk.shutdown();
    };
  }, []);

  //페이지 로딩
  useEffect(() => {
    const start = () => {
      // console.log('start');
      setLoading(true);
    };
    const end = () => {
      // console.log('finished');
      setLoading(false);
    };
    router.events.on('routeChangeStart', start);
    router.events.on('routeChangeComplete', end);
    router.events.on('routeChangeError', end);
    return () => {
      router.events.off('routeChangeStart', start);
      router.events.off('routeChangeComplete', end);
      router.events.off('routeChangeError', end);
    };
  }, []);

  const handleNetworkChanged = (...args: Array<string>) => {
    const networkId = args[0];
    console.log(networkId);
    signOut();
  };

  useEffect(() => {
    window.klaytn?.on('networkChanged', handleNetworkChanged);
    return () => {
      window.klaytn?.removeListener('networkChanged', handleNetworkChanged);
    };
  });

  useEffect(() => {
    window.klaytn?.on('accountsChanged', handleNetworkChanged);
    return () => {
      window.klaytn?.removeListener('accountsChanged', handleNetworkChanged);
    };
  });

  https: return (
    <>
      {/*Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <RecoilRoot>
        <SessionProvider session={session}>
          <SWRConfig
            value={{
              fetcher: (url: string) => axios.get(url).then((res) => res.data),
              onError: (error) => {
                Sentry.captureException(error);
              },
            }}
          >
            <LayoutComponent>
              <Head>
                <title>Havruta DAO | 미래의 동료들과 함께할 수 있는 곳</title>
                <meta name="title" content="Havruta DAO | 미래의 동료들과 함께할 수 있는 곳" />
                <meta name="description" content="함께 배우고, 나누고, 성장하세요." />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta
                  property="og:title"
                  content={'Havruta DAO | 미래의 동료들과 함께할 수 있는 곳'}
                />
                <meta property="og:description" content="함께 배우고, 나누고, 성장하세요." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={'https://havruta.guru'} />
                <meta
                  property="og:image"
                  content={
                    'https://user-images.githubusercontent.com/64685759/192302728-1b284976-57fe-4ece-b3bb-86676eedd7fe.png'
                  }
                />
                <meta property="og:article:author" content="Team Vote" />
              </Head>

              {loading ? (
                <Space style={{ width: '100%', justifyContent: 'center', height: '100vh' }}>
                  <Spin tip="Loading..." size={'large'} />
                </Space>
              ) : (
                <>
                  <Background />

                  <Component {...pageProps} />
                </>
              )}
            </LayoutComponent>
          </SWRConfig>
        </SessionProvider>
      </RecoilRoot>
    </>
  );
}

export default MyApp;
