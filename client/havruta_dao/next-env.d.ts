/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.

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
