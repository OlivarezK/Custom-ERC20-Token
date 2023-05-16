// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MToken is ERC20 {
    address public owner;

    constructor() ERC20("CrafterToken", "CTK") {
        owner = 0x70997970C51812dc3A010C7d01b50e0d17dc79C8;
    }

    modifier onlyOwner {
        require(owner == msg.sender, "You are not the owner of this contract.");
        _;
    }

    function mintToken(address _account) public onlyOwner {
        _mint(_account, 100);
    }

    function burnToken(address _account, uint _amount) public {
        _burn(_account, _amount);
    }

    function transferToken(address _to, uint _amount) public {
        transfer(_to, _amount);
    }

    function getBalance(address _account) public view returns(uint256){
        uint balance = balanceOf(_account);
        return balance;
    }

    function getTotalSupply() public view returns(uint256) {
        uint256 total = totalSupply();
        return total;
    }
}
