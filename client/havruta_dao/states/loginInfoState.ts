import { atom, RecoilState } from 'recoil';
// import { recoilPersist } from 'recoil-persist';

// const { persistAtom } = recoilPersist();

export const loginInfoState = atom({
  key: 'loginInfoState',
  default: {
    user_id: 0,
    user_address: '',
    user_network: 0,
    user_nickname: '',
    user_introduction: '',
  },
  // effects_UNSTABLE: [persistAtom],
});
