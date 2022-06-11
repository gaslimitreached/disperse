// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

interface Multicall3 {
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
    function getBasefee() view external returns (uint256 basefee);
    function getBlockHash(uint256 blockNumber) view external returns (bytes32 blockHash);
    function getBlockNumber() view external returns (uint256 blockNumber);
    function getChainId() view external returns (uint256 chainid);
    function getCurrentBlockCoinbase() view external returns (address coinbase);
    function getCurrentBlockDifficulty() view external returns (uint256 difficulty);
    function getCurrentBlockGasLimit() view external returns (uint256 gaslimit);
    function getCurrentBlockTimestamp() view external returns (uint256 timestamp);
    function getEthBalance(address addr) view external returns (uint256 balance);
    function getLastBlockHash() view external returns (bytes32 blockHash);
}

