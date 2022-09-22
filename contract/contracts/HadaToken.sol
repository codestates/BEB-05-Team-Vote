// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @custom:security-contact jadenyoon@havruta.guru
contract HADAToken is ERC20, ERC20Burnable, Ownable {

    address public batchContractAdress;

    modifier isBatchContract() {
        require(batchContractAdress != address(0), "Invalid batch address");
        _;
    }

    constructor() ERC20("HADAToken", "HADA") {
    }

    event NewBatchContractAdress(address batchContractAdress);

    function updateBatchContractAdress(address _adress) public onlyOwner  {
        batchContractAdress = _adress;
        emit NewBatchContractAdress(_adress);
    }

    function mint( uint256 _amount) public onlyOwner isBatchContract{
        _mint(batchContractAdress, _amount);
    }

    function burn(uint256 amount) public override onlyOwner{
        _burn(address(this), amount);
    }
    

}