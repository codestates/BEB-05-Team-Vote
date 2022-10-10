import { noti } from '../notification';

export default function addHadaERC20Token() {
  window.klaytn.sendAsync(
    {
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: process.env.NEXT_PUBLIC_HADATOKEN,
          symbol: 'HADA',
          decimals: '18',
          image:
            'https://user-images.githubusercontent.com/64685759/192302728-1b284976-57fe-4ece-b3bb-86676eedd7fe.png',
        },
      },
      id: Math.round(Math.random() * 100000),
    },
    (err: any, result: any) => {
      console.log(err, result);
      if (result.result === true) {
        noti('success', '토큰이 성공적으로 등록되었습니다.');
      }
    }
  );
}
