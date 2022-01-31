// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Bank is ERC20 {
    constructor() ERC20("WRAPPED ETHER", "WETH") {}

    event evDeposit(address, uint256);
    event evWithdraw(address, uint256);

    function deposit() external payable {
        // payable(address(this)).transfer(msg.value);
        _mint(msg.sender, msg.value);
        emit evDeposit(msg.sender, msg.value);
    }

    function withdraw(uint256 _amount) external {
        require(
            balanceOf(msg.sender) >= _amount,
            'You don"t have enough WETHS'
        );
        _burn(msg.sender, _amount);
        payable(msg.sender).transfer(_amount);
        emit evWithdraw(msg.sender, _amount);
    }

    function tSupply() public view returns (uint256) {
        return totalSupply();
    }
}
