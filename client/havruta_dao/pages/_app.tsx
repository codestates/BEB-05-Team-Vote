import type { AppProps } from 'next/app';
import { LayoutComponent } from '../components/LayoutComponent';
import '../styles/customTheme.less';
interface Klaytn {
  on: (eventName: string, callback: () => void) => void;
  removeListener: (eventName: string, callback: () => void) => void;
  enable: () => Promise<Array<string>>;
  selectedAddress: string;
  networkVersion: number;
  publicConfigStore: Store;
  isKaikas: boolean;
  _kaikas: any;
}

interface State {
  isEnabled: boolean;
  isUnlocked: boolean;
  networkVersion: number;
  onboardingcomplete: boolean;
}

interface Store {
  subscribe: (callback: () => void) => void;
  getState: () => State;
}

declare interface Window {
  klaytn?: Klaytn;
}
declare global {
  interface Window {
    klaytn: Klaytn;
  }
}
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LayoutComponent>
      <Component {...pageProps} />
    </LayoutComponent>
  );
}

export default MyApp;
