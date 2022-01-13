const Ric = `{
  "_format": "hh-sol-artifact-1",
  "contractName": "Ric",
  "sourceName": "contracts/Ric.sol",
  "abi": [
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "initialSupply",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "burner",
          "type": "address"
        }
      ],
      "name": "Burn",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        }
      ],
      "name": "allowance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "burn",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "decimals",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "subtractedValue",
          "type": "uint256"
        }
      ],
      "name": "decreaseAllowance",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "addedValue",
          "type": "uint256"
        }
      ],
      "name": "increaseAllowance",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ],
  "bytecode": "0x60806040523480156200001157600080fd5b5060405162000e7138038062000e71833981016040819052620000349162000244565b6040518060400160405280600381526020016252494360e81b8152506040518060400160405280600381526020016252494360e81b8152508160039080519060200190620000849291906200019e565b5080516200009a9060049060208401906200019e565b505050620000af3382620000b660201b60201c565b50620002bf565b6001600160a01b038216620001115760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015260640160405180910390fd5b80600260008282546200012591906200025d565b90915550506001600160a01b03821660009081526020819052604081208054839290620001549084906200025d565b90915550506040518181526001600160a01b038316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35050565b828054620001ac9062000282565b90600052602060002090601f016020900481019282620001d057600085556200021b565b82601f10620001eb57805160ff19168380011785556200021b565b828001600101855582156200021b579182015b828111156200021b578251825591602001919060010190620001fe565b50620002299291506200022d565b5090565b5b808211156200022957600081556001016200022e565b60006020828403121562000256578081fd5b5051919050565b600082198211156200027d57634e487b7160e01b81526011600452602481fd5b500190565b600181811c908216806200029757607f821691505b60208210811415620002b957634e487b7160e01b600052602260045260246000fd5b50919050565b610ba280620002cf6000396000f3fe608060405234801561001057600080fd5b50600436106100d45760003560e01c806342966c6811610081578063a457c2d71161005b578063a457c2d7146101a7578063a9059cbb146101ba578063dd62ed3e146101cd57600080fd5b806342966c681461016157806370a082311461017657806395d89b411461019f57600080fd5b806323b872dd116100b257806323b872dd1461012c578063313ce5671461013f578063395093511461014e57600080fd5b806306fdde03146100d9578063095ea7b3146100f757806318160ddd1461011a575b600080fd5b6100e1610206565b6040516100ee9190610a99565b60405180910390f35b61010a610105366004610a58565b610298565b60405190151581526020016100ee565b6002545b6040519081526020016100ee565b61010a61013a366004610a1d565b6102ae565b604051601281526020016100ee565b61010a61015c366004610a58565b610372565b61017461016f366004610a81565b6103ae565b005b61011e6101843660046109ca565b6001600160a01b031660009081526020819052604090205490565b6100e16103f3565b61010a6101b5366004610a58565b610402565b61010a6101c8366004610a58565b6104b3565b61011e6101db3660046109eb565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b60606003805461021590610b1b565b80601f016020809104026020016040519081016040528092919081815260200182805461024190610b1b565b801561028e5780601f106102635761010080835404028352916020019161028e565b820191906000526020600020905b81548152906001019060200180831161027157829003601f168201915b5050505050905090565b60006102a53384846104c0565b50600192915050565b60006102bb848484610619565b6001600160a01b03841660009081526001602090815260408083203384529091529020548281101561035a5760405162461bcd60e51b815260206004820152602860248201527f45524332303a207472616e7366657220616d6f756e742065786365656473206160448201527f6c6c6f77616e636500000000000000000000000000000000000000000000000060648201526084015b60405180910390fd5b61036785338584036104c0565b506001949350505050565b3360008181526001602090815260408083206001600160a01b038716845290915281205490916102a59185906103a9908690610aec565b6104c0565b6103b83382610831565b604080518281523360208201527ff6554c3a5d28e08c120b5a69c7edbaf52f935bd2596a60b8a18e282cd257cddb910160405180910390a150565b60606004805461021590610b1b565b3360009081526001602090815260408083206001600160a01b03861684529091528120548281101561049c5760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f7760448201527f207a65726f0000000000000000000000000000000000000000000000000000006064820152608401610351565b6104a933858584036104c0565b5060019392505050565b60006102a5338484610619565b6001600160a01b03831661053b5760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f2061646460448201527f72657373000000000000000000000000000000000000000000000000000000006064820152608401610351565b6001600160a01b0382166105b75760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f20616464726560448201527f73730000000000000000000000000000000000000000000000000000000000006064820152608401610351565b6001600160a01b0383811660008181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591015b60405180910390a3505050565b6001600160a01b0383166106955760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f20616460448201527f64726573730000000000000000000000000000000000000000000000000000006064820152608401610351565b6001600160a01b0382166107115760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201527f65737300000000000000000000000000000000000000000000000000000000006064820152608401610351565b6001600160a01b038316600090815260208190526040902054818110156107a05760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e742065786365656473206260448201527f616c616e636500000000000000000000000000000000000000000000000000006064820152608401610351565b6001600160a01b038085166000908152602081905260408082208585039055918516815290812080548492906107d7908490610aec565b92505081905550826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8460405161082391815260200190565b60405180910390a350505050565b6001600160a01b0382166108ad5760405162461bcd60e51b815260206004820152602160248201527f45524332303a206275726e2066726f6d20746865207a65726f2061646472657360448201527f73000000000000000000000000000000000000000000000000000000000000006064820152608401610351565b6001600160a01b0382166000908152602081905260409020548181101561093c5760405162461bcd60e51b815260206004820152602260248201527f45524332303a206275726e20616d6f756e7420657863656564732062616c616e60448201527f63650000000000000000000000000000000000000000000000000000000000006064820152608401610351565b6001600160a01b038316600090815260208190526040812083830390556002805484929061096b908490610b04565b90915550506040518281526000906001600160a01b038516907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200161060c565b80356001600160a01b03811681146109c557600080fd5b919050565b6000602082840312156109db578081fd5b6109e4826109ae565b9392505050565b600080604083850312156109fd578081fd5b610a06836109ae565b9150610a14602084016109ae565b90509250929050565b600080600060608486031215610a31578081fd5b610a3a846109ae565b9250610a48602085016109ae565b9150604084013590509250925092565b60008060408385031215610a6a578182fd5b610a73836109ae565b946020939093013593505050565b600060208284031215610a92578081fd5b5035919050565b6000602080835283518082850152825b81811015610ac557858101830151858201604001528201610aa9565b81811115610ad65783604083870101525b50601f01601f1916929092016040019392505050565b60008219821115610aff57610aff610b56565b500190565b600082821015610b1657610b16610b56565b500390565b600181811c90821680610b2f57607f821691505b60208210811415610b5057634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fdfea2646970667358221220f9f175e67964f4255e063ee9f00d1884674b7b5e75b08e5f86c2775d66ecf0dd64736f6c63430008040033",
  "deployedBytecode": "0x608060405234801561001057600080fd5b50600436106100d45760003560e01c806342966c6811610081578063a457c2d71161005b578063a457c2d7146101a7578063a9059cbb146101ba578063dd62ed3e146101cd57600080fd5b806342966c681461016157806370a082311461017657806395d89b411461019f57600080fd5b806323b872dd116100b257806323b872dd1461012c578063313ce5671461013f578063395093511461014e57600080fd5b806306fdde03146100d9578063095ea7b3146100f757806318160ddd1461011a575b600080fd5b6100e1610206565b6040516100ee9190610a99565b60405180910390f35b61010a610105366004610a58565b610298565b60405190151581526020016100ee565b6002545b6040519081526020016100ee565b61010a61013a366004610a1d565b6102ae565b604051601281526020016100ee565b61010a61015c366004610a58565b610372565b61017461016f366004610a81565b6103ae565b005b61011e6101843660046109ca565b6001600160a01b031660009081526020819052604090205490565b6100e16103f3565b61010a6101b5366004610a58565b610402565b61010a6101c8366004610a58565b6104b3565b61011e6101db3660046109eb565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b60606003805461021590610b1b565b80601f016020809104026020016040519081016040528092919081815260200182805461024190610b1b565b801561028e5780601f106102635761010080835404028352916020019161028e565b820191906000526020600020905b81548152906001019060200180831161027157829003601f168201915b5050505050905090565b60006102a53384846104c0565b50600192915050565b60006102bb848484610619565b6001600160a01b03841660009081526001602090815260408083203384529091529020548281101561035a5760405162461bcd60e51b815260206004820152602860248201527f45524332303a207472616e7366657220616d6f756e742065786365656473206160448201527f6c6c6f77616e636500000000000000000000000000000000000000000000000060648201526084015b60405180910390fd5b61036785338584036104c0565b506001949350505050565b3360008181526001602090815260408083206001600160a01b038716845290915281205490916102a59185906103a9908690610aec565b6104c0565b6103b83382610831565b604080518281523360208201527ff6554c3a5d28e08c120b5a69c7edbaf52f935bd2596a60b8a18e282cd257cddb910160405180910390a150565b60606004805461021590610b1b565b3360009081526001602090815260408083206001600160a01b03861684529091528120548281101561049c5760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f7760448201527f207a65726f0000000000000000000000000000000000000000000000000000006064820152608401610351565b6104a933858584036104c0565b5060019392505050565b60006102a5338484610619565b6001600160a01b03831661053b5760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f2061646460448201527f72657373000000000000000000000000000000000000000000000000000000006064820152608401610351565b6001600160a01b0382166105b75760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f20616464726560448201527f73730000000000000000000000000000000000000000000000000000000000006064820152608401610351565b6001600160a01b0383811660008181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591015b60405180910390a3505050565b6001600160a01b0383166106955760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f20616460448201527f64726573730000000000000000000000000000000000000000000000000000006064820152608401610351565b6001600160a01b0382166107115760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201527f65737300000000000000000000000000000000000000000000000000000000006064820152608401610351565b6001600160a01b038316600090815260208190526040902054818110156107a05760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e742065786365656473206260448201527f616c616e636500000000000000000000000000000000000000000000000000006064820152608401610351565b6001600160a01b038085166000908152602081905260408082208585039055918516815290812080548492906107d7908490610aec565b92505081905550826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8460405161082391815260200190565b60405180910390a350505050565b6001600160a01b0382166108ad5760405162461bcd60e51b815260206004820152602160248201527f45524332303a206275726e2066726f6d20746865207a65726f2061646472657360448201527f73000000000000000000000000000000000000000000000000000000000000006064820152608401610351565b6001600160a01b0382166000908152602081905260409020548181101561093c5760405162461bcd60e51b815260206004820152602260248201527f45524332303a206275726e20616d6f756e7420657863656564732062616c616e60448201527f63650000000000000000000000000000000000000000000000000000000000006064820152608401610351565b6001600160a01b038316600090815260208190526040812083830390556002805484929061096b908490610b04565b90915550506040518281526000906001600160a01b038516907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200161060c565b80356001600160a01b03811681146109c557600080fd5b919050565b6000602082840312156109db578081fd5b6109e4826109ae565b9392505050565b600080604083850312156109fd578081fd5b610a06836109ae565b9150610a14602084016109ae565b90509250929050565b600080600060608486031215610a31578081fd5b610a3a846109ae565b9250610a48602085016109ae565b9150604084013590509250925092565b60008060408385031215610a6a578182fd5b610a73836109ae565b946020939093013593505050565b600060208284031215610a92578081fd5b5035919050565b6000602080835283518082850152825b81811015610ac557858101830151858201604001528201610aa9565b81811115610ad65783604083870101525b50601f01601f1916929092016040019392505050565b60008219821115610aff57610aff610b56565b500190565b600082821015610b1657610b16610b56565b500390565b600181811c90821680610b2f57607f821691505b60208210811415610b5057634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fdfea2646970667358221220f9f175e67964f4255e063ee9f00d1884674b7b5e75b08e5f86c2775d66ecf0dd64736f6c63430008040033",
  "linkReferences": {},
  "deployedLinkReferences": {}
}
`;

export const getRicAbi = () => JSON.parse(Ric).abi;
export const getRicBytecode = () => JSON.parse(Ric).bytecode;
