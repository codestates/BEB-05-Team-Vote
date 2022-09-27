import { Request, Response } from 'express';
const prisma = require('../db/index');
import dotenv from 'dotenv';
const Caver = require('caver-js');

dotenv.config();

const caver = new Caver('https://api.baobab.klaytn.net:8651/');

const tokenAbi = require('../abi/hadatokenAbi');
const batchAbi = require('../abi/hadatokenbatchAbi');

const tokenContractAddress = process.env.TOKEN_CA;
const batchContractAddress = process.env.BATCH_CA;

const deployAddress = process.env.DEPLOY_ADDRESS;
const deployKey = process.env.DEPLOY_PRIVATEKEY;

const tokenContract = new caver.contract(tokenAbi, tokenContractAddress);
const batchContract = new caver.contract(batchAbi, batchContractAddress);

module.exports = {
  batchFunction: async () => {
    let userScore = {};
    let limit = 500;

    let today = new Date();
    let year = today.getUTCFullYear();
    let month = today.getUTCMonth() + 1;
    let date = today.getUTCDate();
    const article = await prisma.User.findMany({
      include: {
        articles: {
          where: {
            created_at: {
              lte: new Date(`${year}-${month}-${date + 2}`),
              gte: new Date(`${year}-${month}-${date}`),
            },
          },
        },
      },
    });
    const comment = await prisma.User.findMany({
      include: {
        comments: {
          where: {
            created_at: {
              lte: new Date(`${year}-${month}-${date + 2}`),
              gte: new Date(`${year}-${month}-${date}`),
            },
          },
        },
      },
    });
    const like = await prisma.User.findMany({
      include: {
        likes: {
          where: {
            created_at: {
              lte: new Date(`${year}-${month}-${date + 2}`),
              gte: new Date(`${year}-${month}-${date}`),
            },
          },
        },
      },
    });

    for (let i = 0; i < article.length; i++) {
      userScore[article[i].user_address] = article[i].articles.length * 3;
    }
    for (let i = 0; i < comment.length; i++) {
      userScore[comment[i].user_address] += comment[i].comments.length * 2;
    }
    for (let i = 0; i < like.length; i++) {
      userScore[like[i].user_address] += like[i].likes.length;
    }
    let userScoreArray = Object.keys(userScore).map(function (key) {
      return [key, userScore[key]];
    });

    userScoreArray.sort(function (first, second) {
      return second[1] - first[1];
    });

    let userAddressArray: string[] = [];
    let userTokenArray: string[] = [];

    let totalScore = 0;
    for (let i = 0; i < userScoreArray.length; i++) {
      if (userScoreArray[i][1] === 0) {
        break;
      }
      totalScore += userScoreArray[i][1];
      if (totalScore <= limit) {
        userAddressArray.push(userScoreArray[i][0]);
        userTokenArray.push(String(userScoreArray[i][1]));
      } else {
        userAddressArray.push(userScoreArray[i][0]);
        userTokenArray.push(String(userScoreArray[i][1] - totalScore + limit));
        break;
      }
    }

    const newUserTokenArray = userTokenArray.map((e) =>
      caver.utils.toBN(caver.utils.convertToPeb(Number(e), 'KLAY'))
    );

    const numberUserTokenArray = newUserTokenArray.map((e) => caver.utils.toBN(Number(e)));

    const totalToken = caver.utils.toBN(
      numberUserTokenArray.reduce((acc, cur) => {
        return acc + cur;
      }, 0)
    );

    const keyring = caver.wallet.add(caver.wallet.keyring.createFromPrivateKey(deployKey));
    tokenContract.options.from = keyring.address;
    batchContract.options.from = keyring.address;

    await tokenContract.methods.mint(totalToken).send({ from: deployAddress, gas: 3000000 });

    await batchContract.methods
      .batchTransfer(userAddressArray, newUserTokenArray)
      .send({ from: deployAddress, gas: 3000000 });
  },
};
