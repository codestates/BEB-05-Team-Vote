# 하브루타 스마트 컨트랙트

하브루타 DAO에 사용되는 스마트 컨트랙트입니다.

# Description

하브루타 DAO Tokenomics Flow

![](https://user-images.githubusercontent.com/64685759/191690526-67a0dc59-a721-4a7b-b4ce-d76ab5fbe61a.png)

# Getting Started

## Installing

```shell
yarn
```

## Executing program

How to deploy the contract

```shell
yarn hardhat compile
```

```
yarn hardhat node
```

```
yarn hardhat run scripts/deploy.ts --network localhost
```

```
yarn hardhat test test/HadaToken.ts --network localhost
```

# License

This project is licensed under the MIT License
