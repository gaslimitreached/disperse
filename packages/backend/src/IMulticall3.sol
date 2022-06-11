// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

interface IMulticall3 {

    struct Call3 {
        address target;
        bool allowFailure;
        bytes callData;
    }

    struct Call3Value {
        address target;
        bool allowFailure;
        uint value;
        bytes callData;
    }

    struct Result {
        bool success;
        bytes returnData;
    }

    function aggregate3(Call3[] memory calls) payable external returns (Result[] memory returnData);

    function aggregate3Value(Call3Value[] memory calls) payable external returns (Result[] memory returnData);
}

