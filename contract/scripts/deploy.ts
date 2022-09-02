/**
 *localhost deploy
 */
// import { ethers } from 'hardhat';

// async function main() {
//   //   We get the contract to deploy
//   const Bank = await ethers.getContractFactory('KlayBank');
//   const bank = await Bank.deploy();
//   await bank.deployed();
//   console.log('Bank deployed to:', bank.address);
// }
// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });

/**
 * baobab network deploy
 */
// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.

// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from 'hardhat';

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  //   run this first to get the contract address
  //   after getting the contract address,
  //   you can comment it out and past your address in line 25(address argument)
  // const Bank = await ethers.getContractFactory("KlayBank");
  // const bank = await Bank.deploy();
  // await bank.deployed();
  // console.log("Bank deployed to:", bank.address);

  const depositorsAddr = '0xAe88dFEE2Da3d2a46b2dafEe0De2ee97dC8Fa1b5';
  const depositor1 = await ethers.getSigner(depositorsAddr);
  const bankInstance = await ethers.getContractAt(
    'KlayBank',
    '0xa3c334624510122469390d8dbf41d10b67ec4860'
  );

  const bal4 = await bankInstance.getBalance(depositorsAddr);
  console.log(`balance of depositor1 before is ${bal4}`);

  const option = { value: ethers.utils.parseEther('1') };
  const deposit = await bankInstance.connect(depositor1).deposit(option);
  const tx = await deposit.wait();
  //   console.log(tx);

  // Note you can change this address to another live address
  const beneficiaryAddr = '0x5760e7d28604456D5F59B37F66062b664d656659';
  const balAfter = await bankInstance.getBalance(depositorsAddr);
  console.log(`balance of depositor1 after is ${balAfter}`);

  const balBenerficiaryb4 = await bankInstance.getBalance(beneficiaryAddr);
  console.log(`balance of beneficiary before is ${balBenerficiaryb4}`);

  const withdraw = await bankInstance
    .connect(depositor1)
    .withdraw(beneficiaryAddr, '5000000000');
  const tx2 = await withdraw.wait();
  //  console.log(tx2);

  const balBenerficiaryAfter = await bankInstance.getBalance(beneficiaryAddr);
  console.log(`balance of beneficiary after is ${balBenerficiaryAfter}`);

  const balDepositor1AfterWithdrawal = await bankInstance.getBalance(
    depositorsAddr
  );
  console.log(
    `balance of depositor1 after  withdrawal is ${balDepositor1AfterWithdrawal}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
