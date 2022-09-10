import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useEffect } from 'react';
import { LayoutComponent } from '../components/LayoutComponent';
import '../styles/customTheme.less';
import * as gtag from '../lib/gtag';
import { hotjar } from 'react-hotjar';
import ChannelService from '../components/ChannelService.js';
import { SessionProvider } from 'next-auth/react';
import { RecoilRoot } from 'recoil';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const router = useRouter();

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
            <Component {...pageProps} />
          </LayoutComponent>
        </SessionProvider>
      </RecoilRoot>
    </>
  );
}

export default MyApp;
