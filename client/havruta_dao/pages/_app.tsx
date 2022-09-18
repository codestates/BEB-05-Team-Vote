import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import { LayoutComponent } from '../components/LayoutComponent';
import '../styles/customTheme.less';
import * as gtag from '../lib/gtag';
import { hotjar } from 'react-hotjar';
import ChannelService from '../components/ChannelService.js';
import { SessionProvider } from 'next-auth/react';
import { RecoilRoot } from 'recoil';
import { Space, Spin } from 'antd';
import Head from 'next/head';
import { QueryClient, QueryClientProvider } from 'react-query';

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
          <LayoutComponent>
            <Head>
              <title>Havruta DAO</title>
              <meta name="description" content="Havruta DAO" />
            </Head>
            {loading ? (
              <Space style={{ width: '100%', justifyContent: 'center', height: '100vh' }}>
                <Spin tip="Loading..." size={'large'} />
              </Space>
            ) : (
              <Component {...pageProps} />
            )}
          </LayoutComponent>
        </SessionProvider>
      </RecoilRoot>
    </>
  );
}

export default MyApp;
