// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract KlayBank {
    mapping(address => uint) public balances;

    event depositEvent(uint _amount, address _depositor);
    event withdrawEvent(uint _amount, address _depositor, address _beneficiary);

    function deposit() public payable {
        balances[msg.sender] += msg.value;
        emit depositEvent(msg.value, msg.sender);
    }

    function withdraw(address _recipient, uint _amount) public {
        require(_recipient != address(0) ,"KlayBank: Cannot Send to Address Zero");
        require(_amount <= balances[msg.sender], "KlayBank: Insufficient Balance");

        balances[msg.sender] -= _amount;
        balances[_recipient] += _amount;

        emit withdrawEvent(_amount, msg.sender, _recipient);
    }

    function getBalance(address _addr) public view returns(uint) {
        return balances[_addr];
    }

}
