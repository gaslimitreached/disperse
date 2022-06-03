// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

import "forge-std/Test.sol";
import "solmate/test/utils/mocks/MockERC20.sol";

import {Multicall3, Payments} from "../src/Payments.sol";

contract PaymentsTest is Test {
    Payments internal payer;
    MockERC20 internal token;
    address internal alice = address(0xa11ce);
    address internal bob = address(0xb0b);
    address internal bill = address(0xb11);

    address[] internal targets = [bob, bill];
    uint256[] internal amounts = [1 ether, 1 ether];

    function setUp() public {
        payer = new Payments();
        token = new MockERC20("Mock", "MOCK", 18);
    }

    function testPaymentDispersal() public {
        token.mint(alice, 2 ether);
        vm.prank(alice);
        Multicall3.Result[] memory result = payer.disperse(address(token), targets, amounts);
        assertEq(result.length, 2);
        assertTrue(result[0].success);
        assertTrue(result[1].success);
    }
}