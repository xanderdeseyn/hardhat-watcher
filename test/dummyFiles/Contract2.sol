// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.7;

contract Contract {
    uint256 amount;

    string message = "placeholder";

    constructor(uint256 _amount) {
        amount = _amount + 30;
    }
}
