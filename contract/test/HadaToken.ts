import { expect } from 'chai';
import { ethers } from 'hardhat';
import { HADAToken } from '../typechain';

let instance: HADAToken;

const deployedContract: string = '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9';

describe('Get instance of HadaToken', function () {
  before(async function () {
    instance = (await ethers.getContractAt(
      'HadaToken',
      deployedContract
    )) as HADAToken;
  });

  it('토큰의 이름이 HadaToken입니다.', async () => {
    const tokenName: string = await instance.name();
    expect(tokenName).to.equal('HadaToken');
  });

  it('토큰의 심볼이 HADA입니다.', async () => {
    const tokenSymbol: string = await instance.symbol();
    expect(tokenSymbol).to.equal('HADA');
  });

  it('배포 계정에서 HadaToken 10,000개를 보유합니다', async () => {
    const signer = await ethers.getSigners();
    const deployedAccount = signer[0].address;
    const tokenBalanceInWei = await instance.balanceOf(deployedAccount);
    const tokenBalanceInEth = ethers.utils.formatEther(tokenBalanceInWei);
    expect(Number(tokenBalanceInEth)).to.equal(10000);
  });

  it('서버 계정에서 양도받은 토큰 200개를 유저 계정으로 전송합니다.', async () => {
    const signer = await ethers.getSigners();
    const deployAccount = signer[0].address;
    const serverAccount = signer[1].address;
    const userAccount = signer[2].address;

    const serverAccountSigner = await ethers.getSigner(serverAccount);

    await instance.approve(serverAccount, 10000);

    const userAccountBalanceStart = await instance.balanceOf(userAccount);

    await instance
      .connect(serverAccountSigner)
      .transferFrom(deployAccount, userAccount, 200);

    const userAccountBalanceEnd = await instance.balanceOf(userAccount);

    expect(
      Number(userAccountBalanceEnd) - Number(userAccountBalanceStart)
    ).to.equal(200);
  });

  it('강의를 수강할 때 수강생이 지식공유자에게 토큰 500개를 지불합니다.', async () => {
    const signer = await ethers.getSigners();

    const userAccount1 = signer[2].address;
    const userAccount2 = signer[3].address;

    const userAccount1Signer = await ethers.getSigner(userAccount1);

    const userAccount2BalanceStart = await instance.balanceOf(userAccount2);
    await instance.connect(userAccount1Signer).transfer(userAccount2, 500);
    const userAccount2BalanceEnd = await instance.balanceOf(userAccount2);
    console.log(userAccount2BalanceEnd);

    expect(
      Number(userAccount2BalanceEnd) - Number(userAccount2BalanceStart)
    ).to.equal(500);
  });

  it('지식공유자가 강의를 생성 할 때 토큰 10개를 서버 계정으로 전송합니다.', async () => {
    const signer = await ethers.getSigners();
    const userAccount = signer[3].address;
  });
});
