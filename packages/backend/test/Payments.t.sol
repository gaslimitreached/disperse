// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

import "forge-std/Test.sol";
import "solmate/test/utils/mocks/MockERC20.sol";

import {IMulticall3, Payments} from "../src/Payments.sol";

contract PaymentsTest is Test {
    Payments internal payer;
    MockERC20 internal token;
    address internal alice = address(0xa11ce);
    address internal bob = address(0xb0b);
    address internal bill = address(0xb111);

    address[] internal targets = [bob, bill];
    uint256[] internal amounts = [1 ether, 1 ether];

    function setUp() public {
        payer = new Payments();
        token = new MockERC20("Mock", "MOCK", 18);
        token.mint(alice, 2 ether);
    }

    function testDisperseTokenMultiCall() public {
        vm.startPrank(alice);
        token.approve(address(payer), 2 ether);
        IMulticall3.Result[] memory result = payer.disperse(address(token), targets, amounts);
        vm.stopPrank();

        assertEq(result.length, 2);
        assertTrue(result[0].success);
        assertTrue(result[1].success);
        assertEq(token.balanceOf(bob), 1 ether);
        assertEq(token.balanceOf(bill), 1 ether);
    }

    function testDisperseTokenLoop() public {
        vm.startPrank(alice);
        token.approve(address(payer), 2 ether);
        assertTrue(token.balanceOf(alice) >= 2 ether);
        assertTrue(payer.disperseLoop(address(token), targets, amounts));
        vm.stopPrank();

        assertEq(token.balanceOf(bob), 1 ether);
        assertEq(token.balanceOf(bill), 1 ether);
    }

    function testDisperseEtherMultiCall() public {
        vm.deal(alice, 2 ether);
        vm.prank(alice);
        IMulticall3.Result[] memory result = payer.disperseEther{value: 2 ether}(targets, amounts);
        assertEq(result.length, 2);
        assertTrue(result[0].success);
        assertTrue(result[1].success);
        assertEq(bob.balance, 1 ether);
        assertEq(bill.balance, 1 ether);
    }

    function testDisperseEtherLoop() public {
        vm.deal(alice, 2 ether);
        vm.prank(alice);
        assertTrue(payer.disperseEtherLoop{value: 2 ether}(targets, amounts));
        assertEq(bob.balance, 1 ether);
        assertEq(bill.balance, 1 ether);
    }
}