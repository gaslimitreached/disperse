// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import {ERC20, SafeTransferLib} from "solmate/utils/SafeTransferLib.sol";
import "./IMulticall3.sol";

/// @notice Payment dispersal contract
/// @author cachemon.eth
contract Payments {
    using SafeTransferLib for ERC20;

    /// @dev https://github.com/mds1/multicall
    Multicall3 public constant CALLER = Multicall3(0xcA11bde05977b3631167028862bE2a173976CA11);

    /// @notice Send Ether to a list of recipients.
    /// @param targets List of recipients.
    /// @param amounts Amount to send each recipient.
    function disperseEther(
        address[] calldata targets,
        uint256[] calldata amounts
    )
        external
        payable
        returns (Multicall3.Result[] memory result)
    {
        uint256 length = targets.length;
        require(length == amounts.length, "Target amounts mismatch");

        uint total;

        Multicall3.Call3Value[] memory calls = new Multicall3.Call3Value[](length);

        // aggregate calls and dispense
        for (uint i; i < length; ++i) {
            calls[i] = Multicall3.Call3Value({
                target: msg.sender,
                allowFailure: false,
                value: amounts[i],
                callData: abi.encodeWithSignature(
                    "transfer(address,uint256)",
                    targets[i],
                    amounts[i]
                ) 
            });
            total += amounts[i];
        }

        require(msg.value >= total, "Insufficient value");

        result = CALLER.aggregate3Value{value: total}(calls);

        // return remaining ether to the sender
        uint256 remaining = address(this).balance;
        if (remaining > 0) {
            SafeTransferLib.safeTransferETH(msg.sender, remaining);
        }
    }

    /// @notice Send any token to a list of recipients.
    /// @param token Address of token to send.
    /// @param targets List of recipients.
    /// @param amounts Amount to send each recipient.
    function disperse(
        address token,
        address[] calldata targets,
        uint256[] calldata amounts
    )
        external
        returns (Multicall3.Result[] memory)
    {
        uint256 length = targets.length;
        require(length == amounts.length, "Target amounts mismatch");

        Multicall3.Call3[] memory calls = new Multicall3.Call3[](length);
        uint total;

        // NOTE: is there a better way to do this?
        for (uint256 i = 0; i < length; ++i) {
            calls[i] = Multicall3.Call3({
                target: token,
                allowFailure: true,
                callData: abi.encodeWithSignature(
                    "transferFrom(address,address,uint256)",
                    msg.sender,
                    targets[i],
                    amounts[i]
                )
            });

            total += amounts[i];
        }

        return CALLER.aggregate3(calls);
    }

    function disperseLoop(
        address token,
        address[] calldata targets,
        uint256[] calldata amounts
    )
        external
        returns (bool)
    {
        uint256 length = targets.length;
        require(length == amounts.length, "Target amounts mismatch");

        uint total;
        uint balance = ERC20(token).balanceOf(msg.sender);
        // NOTE: is there a better way to do this?
        for (uint256 i = 0; i < length; ++i) {
            ERC20(token).safeTransferFrom(msg.sender, targets[i], amounts[i]);
            total += amounts[i];
        }

        require(balance >= total, "Insufficient balance.");

        return true;
    }

    function disperseEtherLoop(
        address[] calldata targets,
        uint256[] calldata amounts
    )
        external
        payable
        returns (bool)
    {
        uint256 length = targets.length;
        require(length == amounts.length, "Target amounts mismatch");

        uint total;
        for (uint i; i < length; ++i) {
            total += amounts[i];
        }

        require(msg.value >= total, "Insufficietn balance");

        // aggregate calls and dispense
        for (uint i; i < length; ++i) {
            SafeTransferLib.safeTransferETH(targets[i], amounts[i]);
        }

        // return remaining ether to the sender
        uint256 remaining = address(this).balance;
        if (remaining > 0) {
            SafeTransferLib.safeTransferETH(msg.sender, remaining);
        }
        return true;
    }
}
