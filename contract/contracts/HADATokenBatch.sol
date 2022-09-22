// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @custom:security-contact jadenyoon@havruta.guru
contract HADATokenBatch is Ownable {

    using SafeMath for uint256;

    ERC20 public tokenContractAdress;
    address private _tokenContractAdress;

    modifier isTokenContract() {
        require(tokenContractAdress != ERC20(address(0)), "Invalid token address");
        _;
    }

    event NewTokenContractAdress(address tokenContractAdress);
    event WithdrawToken(address indexed owner, uint256 stakeAmount);

    function updateTokenContractAdress(address _adress) public onlyOwner {
        
        tokenContractAdress = ERC20(_adress);
        _tokenContractAdress = _adress;

        emit NewTokenContractAdress(_adress);
    }


    function withdrawToken(address to, uint256 value) public onlyOwner isTokenContract{
        require(tokenContractAdress.balanceOf(address(this)) >= value, "Not enough balance in the contract");
        require(tokenContractAdress.transfer(to, value), "Unable to transfer token to the owner account");

        emit WithdrawToken(to, value);
    }

    function batchTransfer(address[] calldata _address, uint256[] calldata _amounts) external onlyOwner isTokenContract{
        require(_address.length == _amounts.length, "Invalid input parameters");

        for(uint256 i = 0; i < _address.length; i++) {
            require(tokenContractAdress.transfer(_address[i], _amounts[i]), "Unable to transfer token to the account");
        }
    }

}