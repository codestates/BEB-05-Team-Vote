// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from 'hardhat';
import * as dotenv from 'dotenv';
import { BytesLike } from 'ethers/lib/utils';

dotenv.config();

async function main() {
  const account = '0x5760e7d28604456D5F59B37F66062b664d656659';
  const url = process.env.KLAYTN_URL;
  // @ts-ignore
  const priv: BytesLike = process.env.PRIVATE_KEY;
  const provider = new ethers.providers.JsonRpcProvider(url);
  const wallet = new ethers.Wallet(priv, provider);

  const tx = await wallet.sendTransaction({
    to: account,
    value: 90000000000,
    gasPrice: 250000000000,
    gasLimit: 21000,
  });

  const receipt = await tx.wait();
  console.log(receipt);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
