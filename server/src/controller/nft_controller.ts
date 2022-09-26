import { Request, Response } from 'express';
import dotenv from 'dotenv';
const Caver = require('caver-js');

dotenv.config();

const caver = new Caver('https://api.baobab.klaytn.net:8651/');

const tokenAbi = require('../abi/hadatokenAbi');
const passAbi = require('../abi/hadapassAbi');

const tokenContractAddress = process.env.TOKEN_CA;
const passContractAddress = process.env.PASS_CA;

const deployAddress = process.env.DEPLOY_ADDRESS;
const deployKey = process.env.DEPLOY_PRIVATEKEY;

const tokenContract = new caver.contract(tokenAbi, tokenContractAddress);
const passContract = new caver.contract(passAbi, passContractAddress);

const tokenURI =
  'https://urclass-images.s3.ap-northeast-2.amazonaws.com/beb/section4/unit4/test.json';

const keyring = caver.wallet.add(caver.wallet.keyring.createFromPrivateKey(deployKey));
tokenContract.options.from = keyring.address;
passContract.options.from = keyring.address;

module.exports = {
  exchangeNFT: async (req: Request, res: Response) => {
    const { recipient, nft_price } = req.body;

    const tokenBalance = await tokenContract.methods.balanceOf(recipient).call();

    if (tokenBalance >= nft_price) {
      passContract.methods.mintNFT(recipient, tokenURI).send({ from: deployAddress, gas: 3000000 });
      res.status(201).send('mint nft success');
    } else {
      res.status(403).send('insufficient token balance');
    }
  },
  findNFT: async (req: Request, res: Response) => {
    const user_address = req.query.user_address;
    const nftBalance = await passContract.methods.balanceOf(user_address).call();
    res.status(201).send(nftBalance);
  },
};
