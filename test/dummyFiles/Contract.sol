// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.7.3;

contract TestContract {
    uint256 amount;

    string message = "placeholder";

    constructor(uint256 _amount) {
        amount = _amount + 20;
    }
}
