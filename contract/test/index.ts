import { expect } from 'chai';
import { ethers } from 'hardhat';
import { KlayBank } from '../typechain';

let klayBank: KlayBank;

const deployedContract: string = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

describe('Get instance of KlayBank', function () {
  before(async function () {
    klayBank = (await ethers.getContractAt(
      'KlayBank',
      deployedContract
    )) as KlayBank;
  });
  it('user balance should increase on deposit', async function () {
    const signer = await ethers.getSigners();
    const _depositor1 = signer[0].address;
    const _depositorSigner = await ethers.getSigner(_depositor1);

    const balance: any = await klayBank.getBalance(_depositor1);

    const option = { value: ethers.utils.parseEther('1') };
    const deposit: any = await klayBank
      .connect(_depositorSigner)
      .deposit(option);
    const tx = await deposit.wait();
    const value = tx.events[0].args[0];
    const depositor = tx.events[0].args[1];

    const balanceAfter: any = await klayBank.getBalance(_depositor1);

    expect(Number(balance.toString()) + Number(value.toString())).to.equal(
      Number(balanceAfter.toString())
    );
    expect(_depositor1).to.equal(depositor);
  });

  it('user and recipient balance should reduce and increase on withdraw respectively', async function () {
    const signer = await ethers.getSigners();
    const _depositor1 = signer[0].address;
    const _depositorSigner = await ethers.getSigner(_depositor1);

    const balance: any = await klayBank.getBalance(_depositor1);
    const recipientBalB4: any = await klayBank.getBalance(signer[1].address);

    const withdraw: any = await klayBank
      .connect(_depositorSigner)
      .withdraw(signer[1].address, '5000000000');
    const tx = await withdraw.wait();
    const value = tx.events[0].args[0];
    const depositor = tx.events[0].args[1];
    const recipient = tx.events[0].args[2];

    const balanceAfter: any = await klayBank.getBalance(_depositor1);
    const recBalanceAfter: any = await klayBank.getBalance(signer[1].address);

    expect(Number(balance.toString()) - Number(value.toString())).to.equal(
      Number(balanceAfter.toString())
    );
    expect(
      Number(recipientBalB4.toString()) + Number(value.toString())
    ).to.equal(Number(recBalanceAfter.toString()));
    expect(_depositor1).to.equal(depositor);
    expect(signer[1].address).to.equal(recipient);
  });

  it('Should revert when transferring to Address Zero', async function () {
    const signer = await ethers.getSigners();
    const _depositor1 = signer[0].address;
    const _depositorSigner = await ethers.getSigner(_depositor1);

    await expect(
      klayBank
        .connect(_depositorSigner)
        .withdraw(ethers.constants.AddressZero, '5000000000')
    ).to.be.revertedWith('KlayBank: Cannot Send to Address Zero');
  });

  it('Should revert when transfer amount is greater than balance', async function () {
    const signer = await ethers.getSigners();
    const _depositor1 = signer[0].address;
    const _depositorSigner = await ethers.getSigner(_depositor1);

    const balanceB4: any = await klayBank.getBalance(_depositor1);

    const balance: any = await klayBank.getBalance(_depositor1);
    await expect(
      klayBank
        .connect(_depositorSigner)
        .withdraw(signer[1].address, balance.toString() + '1000000')
    ).to.be.revertedWith('KlayBank: Insufficient Balance');
    expect(await klayBank.getBalance(_depositor1)).to.equal(balanceB4);
  });
});
