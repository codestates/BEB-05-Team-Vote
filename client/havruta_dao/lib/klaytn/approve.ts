import * as Sentry from '@sentry/react';

export default function approveERC20Token(
  from: string,
  to: string,
  val: number | undefined,
  callbackSucc: any,
  callbackFail: any
) {
  const data = window.caver.klay.abi.encodeFunctionCall(
    {
      name: 'approve',
      type: 'function',
      inputs: [
        {
          type: 'address',
          name: 'recipient',
        },
        {
          type: 'uint256',
          name: 'amount',
        },
      ],
    },
    [
      to,
      window.caver.utils
        .toBN(val)
        .mul(window.caver.utils.toBN(Number(`1e18`)))
        .toString(),
    ]
  );

  window.caver.klay
    .sendTransaction({
      type: 'SMART_CONTRACT_EXECUTION',
      from: from,
      to: process.env.NEXT_PUBLIC_HADATOKEN,
      data,
      gas: '3000000',
    })
    .on('transactionHash', (transactionHash: any) => {
      console.log('txHash', transactionHash);
    })
    .on('receipt', (receipt: any) => {
      console.log('receipt', receipt);
      callbackSucc();
    })
    .on('error', (error: any) => {
      console.log('error', error.message);
      Sentry.captureException(error.message);
      callbackFail();
    });
}
