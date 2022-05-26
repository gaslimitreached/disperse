// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

contract Contract {
    string internal greeting = "hello";

    function greet() public view returns (string memory) {
        return greeting;
    }

    function setGreeting(string memory greeting_) public {
        greeting = greeting_;
    }
}
