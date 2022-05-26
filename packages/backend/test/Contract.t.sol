// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

import "forge-std/Test.sol";
import "../src/Contract.sol";

contract ContractTest is Test {
    Contract internal greeter;

    function setUp() public {
        greeter = new Contract();
    }

    function testGreeter() public {
        assertEq(greeter.greet(), "hello");
    }
}