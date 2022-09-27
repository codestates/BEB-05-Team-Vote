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
  klaytn?: Klaytn | any;
  caver?: any;
  Caver?: any;
}
declare global {
  interface Window {
    klaytn: Klaytn;
  }
}

declare namespace NodeJS {
  interface Process {
    env: ProcessEnv;
  }
  interface ProcessEnv {
    [key: string]: string;
  }
}
