import { ethers } from 'hardhat';

const contractList: any = {};

async function main() {
  contractList['HADAToken'] = await ethers.getContractFactory('HADAToken');
  contractList['HADATokenBatch'] = await ethers.getContractFactory(
    'HADATokenBatch'
  );
  contractList['HADAPASS2022'] = await ethers.getContractFactory(
    'HADAPASS2022'
  );

  for (var key in contractList) {
    const instance = await contractList[key].deploy();

    if (instance) {
      await instance.deployed();
      console.log(key, '배포된 컨트랙트의 주소 : ', instance.address);
    }
  }
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
