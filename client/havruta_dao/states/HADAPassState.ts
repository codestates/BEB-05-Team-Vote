import { atom } from 'recoil';

export const HADAPassState = atom({
  key: 'HADAPassState',
  default: {
    isPass: false,
  },
});
