// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import {ERC20, SafeTransferLib} from "solmate/utils/safeTransferLib.sol";
import "./IMulticall3.sol";

/// @notice Payment dispersal contract
/// @author cachemon.eth
contract Payments {
    using SafeTransferLib for ERC20;

    /// @dev https://github.com/mds1/multicall
    Multicall3 public constant CALLER = Multicall3(0xcA11bde05977b3631167028862bE2a173976CA11);

    function approve(address token, uint256 amount) public {
        ERC20(token).approve(msg.sender, address(this), amount);
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
        public
        payable
        returns (Multicall3.Result[] memory)
    {
        uint256 length = targets.length;
        require(length == amounts.length, "Target amounts mismatch");

        Multicall3.Call3[] memory calls = new Multicall3.Call3[](length);

        // NOTE: is there a better way to do this?
        for (uint256 i = 0; i < length; ++i) {
            calls[i] = Multicall3.Call3({
                target: targets[i],
                allowFailure: true,
                callData: abi.encodeWithSignature(
                    "safeTransferFrom(ERC20,address,address,uint256)",
                    ERC20(token),
                    msg.sender,
                    targets[i],
                    amounts[i]
                )
            });
        }
        // TODO: sum amount and take fee
        // NOTE: should we sum the total and require balance of sender?
        return CALLER.aggregate3(calls);
    }
}
