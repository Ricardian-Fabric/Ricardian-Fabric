function catalogDAO() {
  return `{
  "_format": "hh-sol-artifact-1",
  "contractName": "CatalogDao",
  "sourceName": "contracts/CatalogDao.sol",
  "abi": [
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "pollPeriod",
          "type": "uint256"
        },
        {
          "internalType": "contract DaoStaking",
          "name": "_daoStaking",
          "type": "address"
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
          "name": "from",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "index",
          "type": "uint256"
        }
      ],
      "name": "CloseRemovalProposal",
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
          "indexed": false,
          "internalType": "uint256",
          "name": "index",
          "type": "uint256"
        }
      ],
      "name": "CloseSmartContractProposal",
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
          "indexed": false,
          "internalType": "uint256",
          "name": "rankIndex",
          "type": "uint256"
        }
      ],
      "name": "ClosingRankVote",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "participant",
          "type": "address"
        }
      ],
      "name": "NewParticipant",
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
          "indexed": false,
          "internalType": "string",
          "name": "repository",
          "type": "string"
        }
      ],
      "name": "NewRankProposal",
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
          "indexed": false,
          "internalType": "string",
          "name": "discussionUrl",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "accetedIndex",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "malicious",
          "type": "bool"
        }
      ],
      "name": "NewRemovalProposal",
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
          "indexed": false,
          "internalType": "string",
          "name": "arweaveTxId",
          "type": "string"
        }
      ],
      "name": "NewSmartContractProposal",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "string",
          "name": "url",
          "type": "string"
        }
      ],
      "name": "NewTerms",
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
          "indexed": false,
          "internalType": "uint256",
          "name": "rankIndex",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "accepted",
          "type": "bool"
        }
      ],
      "name": "RankVote",
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
          "indexed": false,
          "internalType": "uint256",
          "name": "index",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "accepted",
          "type": "bool"
        }
      ],
      "name": "VoteOnNewSmartContract",
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
          "indexed": false,
          "internalType": "uint256",
          "name": "index",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "accepted",
          "type": "bool"
        }
      ],
      "name": "VoteOnRemoval",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "value",
          "type": "string"
        }
      ],
      "name": "accept",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_address",
          "type": "address"
        }
      ],
      "name": "acceptedTerms",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_address",
          "type": "address"
        }
      ],
      "name": "ban",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "rankIndex",
          "type": "uint256"
        }
      ],
      "name": "closeRankProposal",
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
          "internalType": "uint256",
          "name": "removalIndex",
          "type": "uint256"
        }
      ],
      "name": "closeRemovalProposal",
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
          "internalType": "uint256",
          "name": "sCIndex",
          "type": "uint256"
        }
      ],
      "name": "closeSmartContractProposal",
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
          "internalType": "uint256",
          "name": "sCIndex",
          "type": "uint256"
        }
      ],
      "name": "closeSuspiciousProposal",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "sCIndex",
          "type": "uint256"
        }
      ],
      "name": "getAcceptedSCProposalsByIndex",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "index",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "created",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "arweaveTxId",
              "type": "string"
            },
            {
              "internalType": "address",
              "name": "creator",
              "type": "address"
            },
            {
              "internalType": "bool",
              "name": "removed",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "hasFrontend",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "hasFees",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "isUpdate",
              "type": "bool"
            },
            {
              "internalType": "uint256",
              "name": "updateOf",
              "type": "uint256"
            }
          ],
          "internalType": "struct AcceptedSmartContractProposal",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getAcceptedSmartContractIndex",
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
          "name": "first",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "second",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "third",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "fourth",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "fifth",
          "type": "uint256"
        }
      ],
      "name": "getAcceptedSmartContractProposalsPaginated",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "index",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "created",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "arweaveTxId",
              "type": "string"
            },
            {
              "internalType": "address",
              "name": "creator",
              "type": "address"
            },
            {
              "internalType": "bool",
              "name": "removed",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "hasFrontend",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "hasFees",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "isUpdate",
              "type": "bool"
            },
            {
              "internalType": "uint256",
              "name": "updateOf",
              "type": "uint256"
            }
          ],
          "internalType": "struct AcceptedSmartContractProposal",
          "name": "",
          "type": "tuple"
        },
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "index",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "created",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "arweaveTxId",
              "type": "string"
            },
            {
              "internalType": "address",
              "name": "creator",
              "type": "address"
            },
            {
              "internalType": "bool",
              "name": "removed",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "hasFrontend",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "hasFees",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "isUpdate",
              "type": "bool"
            },
            {
              "internalType": "uint256",
              "name": "updateOf",
              "type": "uint256"
            }
          ],
          "internalType": "struct AcceptedSmartContractProposal",
          "name": "",
          "type": "tuple"
        },
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "index",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "created",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "arweaveTxId",
              "type": "string"
            },
            {
              "internalType": "address",
              "name": "creator",
              "type": "address"
            },
            {
              "internalType": "bool",
              "name": "removed",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "hasFrontend",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "hasFees",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "isUpdate",
              "type": "bool"
            },
            {
              "internalType": "uint256",
              "name": "updateOf",
              "type": "uint256"
            }
          ],
          "internalType": "struct AcceptedSmartContractProposal",
          "name": "",
          "type": "tuple"
        },
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "index",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "created",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "arweaveTxId",
              "type": "string"
            },
            {
              "internalType": "address",
              "name": "creator",
              "type": "address"
            },
            {
              "internalType": "bool",
              "name": "removed",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "hasFrontend",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "hasFees",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "isUpdate",
              "type": "bool"
            },
            {
              "internalType": "uint256",
              "name": "updateOf",
              "type": "uint256"
            }
          ],
          "internalType": "struct AcceptedSmartContractProposal",
          "name": "",
          "type": "tuple"
        },
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "index",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "created",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "arweaveTxId",
              "type": "string"
            },
            {
              "internalType": "address",
              "name": "creator",
              "type": "address"
            },
            {
              "internalType": "bool",
              "name": "removed",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "hasFrontend",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "hasFees",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "isUpdate",
              "type": "bool"
            },
            {
              "internalType": "uint256",
              "name": "updateOf",
              "type": "uint256"
            }
          ],
          "internalType": "struct AcceptedSmartContractProposal",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getAllAccepted",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "index",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "created",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "arweaveTxId",
              "type": "string"
            },
            {
              "internalType": "address",
              "name": "creator",
              "type": "address"
            },
            {
              "internalType": "bool",
              "name": "removed",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "hasFrontend",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "hasFees",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "isUpdate",
              "type": "bool"
            },
            {
              "internalType": "uint256",
              "name": "updateOf",
              "type": "uint256"
            }
          ],
          "internalType": "struct AcceptedSmartContractProposal[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getAllRemoved",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "index",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "created",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "arweaveTxId",
              "type": "string"
            },
            {
              "internalType": "address",
              "name": "creator",
              "type": "address"
            },
            {
              "internalType": "bool",
              "name": "removed",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "hasFrontend",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "hasFees",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "isUpdate",
              "type": "bool"
            },
            {
              "internalType": "uint256",
              "name": "updateOf",
              "type": "uint256"
            }
          ],
          "internalType": "struct AcceptedSmartContractProposal[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getMyProposals",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256[]",
              "name": "rank",
              "type": "uint256[]"
            },
            {
              "internalType": "uint256[]",
              "name": "smartContract",
              "type": "uint256[]"
            },
            {
              "internalType": "uint256[]",
              "name": "acceptedSCProposals",
              "type": "uint256[]"
            },
            {
              "internalType": "uint256[]",
              "name": "removal",
              "type": "uint256[]"
            }
          ],
          "internalType": "struct MyProposals",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "first",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "second",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "third",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "fourth",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "fifth",
          "type": "uint256"
        }
      ],
      "name": "getMyRankProposalsPaginated",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "repository",
              "type": "string"
            },
            {
              "internalType": "address",
              "name": "creator",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "createdBlock",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "approvals",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "rejections",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "closed",
              "type": "bool"
            }
          ],
          "internalType": "struct RankProposal",
          "name": "",
          "type": "tuple"
        },
        {
          "components": [
            {
              "internalType": "string",
              "name": "repository",
              "type": "string"
            },
            {
              "internalType": "address",
              "name": "creator",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "createdBlock",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "approvals",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "rejections",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "closed",
              "type": "bool"
            }
          ],
          "internalType": "struct RankProposal",
          "name": "",
          "type": "tuple"
        },
        {
          "components": [
            {
              "internalType": "string",
              "name": "repository",
              "type": "string"
            },
            {
              "internalType": "address",
              "name": "creator",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "createdBlock",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "approvals",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "rejections",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "closed",
              "type": "bool"
            }
          ],
          "internalType": "struct RankProposal",
          "name": "",
          "type": "tuple"
        },
        {
          "components": [
            {
              "internalType": "string",
              "name": "repository",
              "type": "string"
            },
            {
              "internalType": "address",
              "name": "creator",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "createdBlock",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "approvals",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "rejections",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "closed",
              "type": "bool"
            }
          ],
          "internalType": "struct RankProposal",
          "name": "",
          "type": "tuple"
        },
        {
          "components": [
            {
              "internalType": "string",
              "name": "repository",
              "type": "string"
            },
            {
              "internalType": "address",
              "name": "creator",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "createdBlock",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "approvals",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "rejections",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "closed",
              "type": "bool"
            }
          ],
          "internalType": "struct RankProposal",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "first",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "second",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "third",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "fourth",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "fifth",
          "type": "uint256"
        }
      ],
      "name": "getMySmartContractProposalsPaginated",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "arweaveTxId",
              "type": "string"
            },
            {
              "internalType": "address",
              "name": "creator",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "createdBlock",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "approvals",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "rejections",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "suspicious",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "penalized",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "closed",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "hasFrontend",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "hasFees",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "isUpdate",
              "type": "bool"
            },
            {
              "internalType": "uint256",
              "name": "updateOf",
              "type": "uint256"
            }
          ],
          "internalType": "struct SmartContractProposal",
          "name": "",
          "type": "tuple"
        },
        {
          "components": [
            {
              "internalType": "string",
              "name": "arweaveTxId",
              "type": "string"
            },
            {
              "internalType": "address",
              "name": "creator",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "createdBlock",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "approvals",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "rejections",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "suspicious",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "penalized",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "closed",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "hasFrontend",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "hasFees",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "isUpdate",
              "type": "bool"
            },
            {
              "internalType": "uint256",
              "name": "updateOf",
              "type": "uint256"
            }
          ],
          "internalType": "struct SmartContractProposal",
          "name": "",
          "type": "tuple"
        },
        {
          "components": [
            {
              "internalType": "string",
              "name": "arweaveTxId",
              "type": "string"
            },
            {
              "internalType": "address",
              "name": "creator",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "createdBlock",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "approvals",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "rejections",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "suspicious",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "penalized",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "closed",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "hasFrontend",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "hasFees",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "isUpdate",
              "type": "bool"
            },
            {
              "internalType": "uint256",
              "name": "updateOf",
              "type": "uint256"
            }
          ],
          "internalType": "struct SmartContractProposal",
          "name": "",
          "type": "tuple"
        },
        {
          "components": [
            {
              "internalType": "string",
              "name": "arweaveTxId",
              "type": "string"
            },
            {
              "internalType": "address",
              "name": "creator",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "createdBlock",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "approvals",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "rejections",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "suspicious",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "penalized",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "closed",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "hasFrontend",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "hasFees",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "isUpdate",
              "type": "bool"
            },
            {
              "internalType": "uint256",
              "name": "updateOf",
              "type": "uint256"
            }
          ],
          "internalType": "struct SmartContractProposal",
          "name": "",
          "type": "tuple"
        },
        {
          "components": [
            {
              "internalType": "string",
              "name": "arweaveTxId",
              "type": "string"
            },
            {
              "internalType": "address",
              "name": "creator",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "createdBlock",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "approvals",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "rejections",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "suspicious",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "penalized",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "closed",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "hasFrontend",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "hasFees",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "isUpdate",
              "type": "bool"
            },
            {
              "internalType": "uint256",
              "name": "updateOf",
              "type": "uint256"
            }
          ],
          "internalType": "struct SmartContractProposal",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getPollPeriod",
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
          "name": "_address",
          "type": "address"
        }
      ],
      "name": "getRank",
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
      "inputs": [],
      "name": "getRankProposalIndex",
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
          "name": "index",
          "type": "uint256"
        }
      ],
      "name": "getRankProposalsByIndex",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "repository",
              "type": "string"
            },
            {
              "internalType": "address",
              "name": "creator",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "createdBlock",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "approvals",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "rejections",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "closed",
              "type": "bool"
            }
          ],
          "internalType": "struct RankProposal",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "index",
          "type": "uint256"
        }
      ],
      "name": "getRemovalProposalByIndex",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "discussionUrl",
              "type": "string"
            },
            {
              "internalType": "address",
              "name": "creator",
              "type": "address"
            },
            {
              "internalType": "bool",
              "name": "malicious",
              "type": "bool"
            },
            {
              "internalType": "uint256",
              "name": "acceptedIndex",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "createdBlock",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "approvals",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "rejections",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "closed",
              "type": "bool"
            }
          ],
          "internalType": "struct RemovalProposal",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getRemovalProposalIndex",
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
          "name": "first",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "second",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "third",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "fourth",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "fifth",
          "type": "uint256"
        }
      ],
      "name": "getRemovalProposalsPaginated",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "discussionUrl",
              "type": "string"
            },
            {
              "internalType": "address",
              "name": "creator",
              "type": "address"
            },
            {
              "internalType": "bool",
              "name": "malicious",
              "type": "bool"
            },
            {
              "internalType": "uint256",
              "name": "acceptedIndex",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "createdBlock",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "approvals",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "rejections",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "closed",
              "type": "bool"
            }
          ],
          "internalType": "struct RemovalProposal",
          "name": "",
          "type": "tuple"
        },
        {
          "components": [
            {
              "internalType": "string",
              "name": "discussionUrl",
              "type": "string"
            },
            {
              "internalType": "address",
              "name": "creator",
              "type": "address"
            },
            {
              "internalType": "bool",
              "name": "malicious",
              "type": "bool"
            },
            {
              "internalType": "uint256",
              "name": "acceptedIndex",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "createdBlock",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "approvals",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "rejections",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "closed",
              "type": "bool"
            }
          ],
          "internalType": "struct RemovalProposal",
          "name": "",
          "type": "tuple"
        },
        {
          "components": [
            {
              "internalType": "string",
              "name": "discussionUrl",
              "type": "string"
            },
            {
              "internalType": "address",
              "name": "creator",
              "type": "address"
            },
            {
              "internalType": "bool",
              "name": "malicious",
              "type": "bool"
            },
            {
              "internalType": "uint256",
              "name": "acceptedIndex",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "createdBlock",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "approvals",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "rejections",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "closed",
              "type": "bool"
            }
          ],
          "internalType": "struct RemovalProposal",
          "name": "",
          "type": "tuple"
        },
        {
          "components": [
            {
              "internalType": "string",
              "name": "discussionUrl",
              "type": "string"
            },
            {
              "internalType": "address",
              "name": "creator",
              "type": "address"
            },
            {
              "internalType": "bool",
              "name": "malicious",
              "type": "bool"
            },
            {
              "internalType": "uint256",
              "name": "acceptedIndex",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "createdBlock",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "approvals",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "rejections",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "closed",
              "type": "bool"
            }
          ],
          "internalType": "struct RemovalProposal",
          "name": "",
          "type": "tuple"
        },
        {
          "components": [
            {
              "internalType": "string",
              "name": "discussionUrl",
              "type": "string"
            },
            {
              "internalType": "address",
              "name": "creator",
              "type": "address"
            },
            {
              "internalType": "bool",
              "name": "malicious",
              "type": "bool"
            },
            {
              "internalType": "uint256",
              "name": "acceptedIndex",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "createdBlock",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "approvals",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "rejections",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "closed",
              "type": "bool"
            }
          ],
          "internalType": "struct RemovalProposal",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getSmartContractProposalIndex",
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
          "name": "index",
          "type": "uint256"
        }
      ],
      "name": "getSmartContractProposalsByIndex",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "arweaveTxId",
              "type": "string"
            },
            {
              "internalType": "address",
              "name": "creator",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "createdBlock",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "approvals",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "rejections",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "suspicious",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "penalized",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "closed",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "hasFrontend",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "hasFees",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "isUpdate",
              "type": "bool"
            },
            {
              "internalType": "uint256",
              "name": "updateOf",
              "type": "uint256"
            }
          ],
          "internalType": "struct SmartContractProposal",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getTerms",
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
      "name": "issuer",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_discussionUrl",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_acceptedSCIndex",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "malicious",
          "type": "bool"
        }
      ],
      "name": "proposeContractRemoval",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_repository",
          "type": "string"
        }
      ],
      "name": "proposeNewRank",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_arweaveTxId",
          "type": "string"
        },
        {
          "internalType": "bool",
          "name": "_hasFrontEnd",
          "type": "bool"
        },
        {
          "internalType": "bool",
          "name": "_hasFees",
          "type": "bool"
        },
        {
          "internalType": "bool",
          "name": "isUpdate",
          "type": "bool"
        },
        {
          "internalType": "uint256",
          "name": "updateOf",
          "type": "uint256"
        }
      ],
      "name": "proposeNewSmartContract",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_address_",
          "type": "address"
        }
      ],
      "name": "retire",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "pollPeriod",
          "type": "uint256"
        }
      ],
      "name": "setPollPeriod",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "url",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "value",
          "type": "string"
        }
      ],
      "name": "setTerms",
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
          "internalType": "uint256",
          "name": "rankIndex",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "accepted",
          "type": "bool"
        }
      ],
      "name": "voteOnNewRank",
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
          "internalType": "uint256",
          "name": "sCIndex",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "accepted",
          "type": "bool"
        },
        {
          "internalType": "bool",
          "name": "suspicious",
          "type": "bool"
        }
      ],
      "name": "voteOnNewSmartContract",
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
          "internalType": "uint256",
          "name": "removalIndex",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "accepted",
          "type": "bool"
        }
      ],
      "name": "voteOnRemoval",
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
          "internalType": "uint256",
          "name": "rankIndex",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "_voter",
          "type": "address"
        }
      ],
      "name": "votedAlreadyOnRank",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "removalIndex",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "_voter",
          "type": "address"
        }
      ],
      "name": "votedAlreadyOnRemoval",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "sCIndex",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "_voter",
          "type": "address"
        }
      ],
      "name": "votedAlreadyOnSmartContract",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ],
  "bytecode": "0x60806040523480156200001157600080fd5b5060405162004d5138038062004d51833981016040819052620000349162000092565b600080546001600160a01b031990811633908117835580835260056020526040909220805460ff1916600a179055600493909355601680546001600160a01b03939093169284169290921790915560158054909216179055620000cf565b60008060408385031215620000a5578182fd5b825160208401519092506001600160a01b0381168114620000c4578182fd5b809150509250929050565b614c7280620000df6000396000f3fe608060405234801561001057600080fd5b50600436106102925760003560e01c806371110f3911610160578063a5513a18116100d8578063d79950761161008c578063edbc975911610071578063edbc975914610623578063fdedbe951461062b578063fef7e50b1461063e57600080fd5b8063d7995076146105fb578063ea614f541461061b57600080fd5b8063c42bca85116100bd578063c42bca85146105a4578063c9ddacbc146105b7578063d4865bed146105d757600080fd5b8063a5513a181461057e578063a972d10b1461059157600080fd5b806380e11be91161012f57806394b535ec1161011457806394b535ec1461054557806397c3ccd8146105585780639e6371ba1461056b57600080fd5b806380e11be91461051f578063899e456c1461053257600080fd5b806371110f39146104d857806371414ed3146104e05780637331210c146104f357806374700218146104fb57600080fd5b80634112fdd01161020e57806356cf5358116101c25780635f90dec4116101a75780635f90dec41461048e5780636127d22d146104b257806364894bb6146104c557600080fd5b806356cf5358146104735780635e06f50f1461047b57600080fd5b806344443dea116101f357806344443dea146104025780634d8b10a914610422578063548c0ef41461043557600080fd5b80634112fdd0146103da5780634173b417146103ed57600080fd5b80631d143848116102655780632b60c8bb1161024a5780632b60c8bb146103905780632f370ba3146103b057806336ffa905146103c557600080fd5b80631d143848146103525780631d8c89711461037d57600080fd5b806302a08328146102975780630e0d7f07146102ae5780630fba4ca11461032a5780631aecf6a01461033f575b600080fd5b6004545b6040519081526020015b60405180910390f35b61031a6102bc366004614299565b6002546040516bffffffffffffffffffffffff19606084901b1660208201526034810191909152600090819060540160408051601f1981840301815291815281516020928301206000908152600390925290205460ff169392505050565b60405190151581526020016102a5565b61033d6103383660046142cf565b610662565b005b61031a61034d3660046144e2565b610779565b600054610365906001600160a01b031681565b6040516001600160a01b0390911681526020016102a5565b61031a61038b366004614392565b610958565b6103a361039e366004614458565b610a8a565b6040516102a59190614a7b565b6103b8610bbf565b6040516102a59190614851565b6103cd610d30565b6040516102a59190614a06565b61033d6103e8366004614458565b610ed2565b6103f5610f17565b6040516102a591906148f2565b610415610410366004614458565b610fac565b6040516102a59190614905565b61031a610430366004614488565b611125565b610461610443366004614299565b6001600160a01b031660009081526005602052604090205460ff1690565b60405160ff90911681526020016102a5565b60075461029b565b61031a610489366004614488565b6111e1565b6104a161049c366004614523565b61124a565b6040516102a5959493929190614a8e565b61031a6104c0366004614458565b611857565b61031a6104d3366004614488565b611993565b600b5461029b565b61029b6104ee3660046143fb565b6119fc565b60095461029b565b61050e610509366004614523565b611bdd565b6040516102a5959493929190614b02565b61031a61052d366004614458565b6122d2565b61029b6105403660046142cf565b6123cf565b61029b61055336600461430f565b6125a6565b61033d610566366004614299565b612789565b61033d610579366004614299565b612862565b61031a61058c366004614458565b6128e0565b61031a61059f3660046144b3565b6129ca565b61031a6105b23660046144b3565b612b99565b6105ca6105c5366004614458565b612d1c565b6040516102a59190614b63565b6105ea6105e5366004614523565b612ec6565b6040516102a5959493929190614918565b61060e610609366004614458565b6135e2565b6040516102a59190614aef565b6103b8613747565b600f5461029b565b61033d610639366004614458565b6138af565b61065161064c366004614523565b613947565b6040516102a5959493929190614b76565b6002546040516106789084908490602001614841565b60405160208183030381529060405280519060200120146106e05760405162461bcd60e51b815260206004820152600360248201527f393032000000000000000000000000000000000000000000000000000000000060448201526064015b60405180910390fd5b6002546040516bffffffffffffffffffffffff193360601b166020820152603481019190915260009060540160408051808303601f190181528282528051602091820120818401835260018452600081815260039092528282209351845460ff191690151517909355905191925033917f79229b212fa3ea547fb5e5b66090cf250d442b12a51854a030f3b796d528134e9190a2505050565b6002546040516bffffffffffffffffffffffff193360601b1660208201526034810191909152600090819060540160408051601f1981840301815291815281516020928301206000818152600390935291205490915060ff166108045760405162461bcd60e51b815260206004820152600360248201526239303360e81b60448201526064016106d7565b60165460405163c695d24960e01b81523360048201526001600160a01b039091169063c695d24990602401600060405180830381600087803b15801561084957600080fd5b505af115801561085d573d6000803e3d6000fd5b50506040805188815287151560208201523393507f1a53dbc4afb4355dae75da1c738d7f9da8d47895ca9e52298a2f13edef1eeb9a92500160405180910390a26040517f42877fb7000000000000000000000000000000000000000000000000000000008152600480820152602481018690528415156044820152831515606482015273__$284e1ffe9f2937f5412f1e8a04db4dc613$__906342877fb79060840160206040518083038186803b15801561091757600080fd5b505af415801561092b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061094f91906142b3565b95945050505050565b600080546001600160a01b031633146109b35760405162461bcd60e51b815260206004820152600360248201527f393031000000000000000000000000000000000000000000000000000000000060448201526064016106d7565b6040805160606020601f88018190040282018101835291810186815290918291908890889081908501838280828437600092019190915250505090825250604051602091820191610a08918791879101614841565b60408051601f19818403018152919052805160209182012090915281518051600192610a3892849291019061419d565b50602082015181600101559050507f9c1e1a17a78053ad78b3801837ad5e515d429987252f2e1371b7b50fa8ff8bec8585604051610a779291906148b2565b60405180910390a1506001949350505050565b610ace6040518060c001604052806060815260200160006001600160a01b031681526020016000815260200160008152602001600081526020016000151581525090565b60008281526008602052604090819020815160c08101909252805482908290610af690614bd7565b80601f0160208091040260200160405190810160405280929190818152602001828054610b2290614bd7565b8015610b6f5780601f10610b4457610100808354040283529160200191610b6f565b820191906000526020600020905b815481529060010190602001808311610b5257829003601f168201915b505050918352505060018201546001600160a01b0316602082015260028201546040820152600382015460608201526004820154608082015260059091015460ff16151560a09091015292915050565b60606004600f01805480602002602001604051908101604052809291908181526020016000905b82821015610d275783829060005260206000209060050201604051806101200160405290816000820154815260200160018201548152602001600282018054610c2e90614bd7565b80601f0160208091040260200160405190810160405280929190818152602001828054610c5a90614bd7565b8015610ca75780601f10610c7c57610100808354040283529160200191610ca7565b820191906000526020600020905b815481529060010190602001808311610c8a57829003601f168201915b505050918352505060038201546001600160a01b03811660208084019190915260ff600160a01b8304811615156040850152600160a81b8304811615156060850152600160b01b8304811615156080850152600160b81b909204909116151560a083015260049092015460c0909101529082526001929092019101610be6565b50505050905090565b610d5b6040518060800160405280606081526020016060815260200160608152602001606081525090565b336000908152600d60209081526040918290208251815460a093810282018401909452608081018481529093919284928491840182828015610dbc57602002820191906000526020600020905b815481526020019060010190808311610da8575b5050505050815260200160018201805480602002602001604051908101604052809291908181526020018280548015610e1457602002820191906000526020600020905b815481526020019060010190808311610e00575b5050505050815260200160028201805480602002602001604051908101604052809291908181526020018280548015610e6c57602002820191906000526020600020905b815481526020019060010190808311610e58575b5050505050815260200160038201805480602002602001604051908101604052809291908181526020018280548015610ec457602002820191906000526020600020905b815481526020019060010190808311610eb0575b505050505081525050905090565b6015546001600160a01b03163314610f125760405162461bcd60e51b815260206004820152600360248201526239333760e81b60448201526064016106d7565b600455565b606060016000018054610f2990614bd7565b80601f0160208091040260200160405190810160405280929190818152602001828054610f5590614bd7565b8015610fa25780601f10610f7757610100808354040283529160200191610fa2565b820191906000526020600020905b815481529060010190602001808311610f8557829003601f168201915b5050505050905090565b604080516101208101825260008082526020820181905260609282018390529181018290526080810182905260a0810182905260c0810182905260e081018290526101008101919091526004600201600083815260200190815260200160002060405180610120016040529081600082015481526020016001820154815260200160028201805461103c90614bd7565b80601f016020809104026020016040519081016040528092919081815260200182805461106890614bd7565b80156110b55780601f1061108a576101008083540402835291602001916110b5565b820191906000526020600020905b81548152906001019060200180831161109857829003601f168201915b505050918352505060038201546001600160a01b038116602083015260ff600160a01b8204811615156040840152600160a81b8204811615156060840152600160b01b8204811615156080840152600160b81b90910416151560a082015260049091015460c09091015292915050565b6040517ffd3e4768000000000000000000000000000000000000000000000000000000008152600480820152602481018390526001600160a01b038216604482015260009073__$284e1ffe9f2937f5412f1e8a04db4dc613$__9063fd3e4768906064015b60206040518083038186803b1580156111a257600080fd5b505af41580156111b6573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111da91906142b3565b9392505050565b6040517f2ca650b2000000000000000000000000000000000000000000000000000000008152600480820152602481018390526001600160a01b038216604482015260009073__$284e1ffe9f2937f5412f1e8a04db4dc613$__90632ca650b29060640161118a565b61128e6040518060c001604052806060815260200160006001600160a01b031681526020016000815260200160008152602001600081526020016000151581525090565b6112d26040518060c001604052806060815260200160006001600160a01b031681526020016000815260200160008152602001600081526020016000151581525090565b6113166040518060c001604052806060815260200160006001600160a01b031681526020016000815260200160008152602001600081526020016000151581525090565b61135a6040518060c001604052806060815260200160006001600160a01b031681526020016000815260200160008152602001600081526020016000151581525090565b61139e6040518060c001604052806060815260200160006001600160a01b031681526020016000815260200160008152602001600081526020016000151581525090565b60008a8152600860205260408082208b83528183208b84528284208b85528385208b865294849020845160c0810190955283549395929491939091908690829082906113e990614bd7565b80601f016020809104026020016040519081016040528092919081815260200182805461141590614bd7565b80156114625780601f1061143757610100808354040283529160200191611462565b820191906000526020600020905b81548152906001019060200180831161144557829003601f168201915b505050918352505060018201546001600160a01b031660208201526002820154604080830191909152600383015460608301526004830154608083015260059092015460ff16151560a090910152805160c081019091528554919650908590829082906114ce90614bd7565b80601f01602080910402602001604051908101604052809291908181526020018280546114fa90614bd7565b80156115475780601f1061151c57610100808354040283529160200191611547565b820191906000526020600020905b81548152906001019060200180831161152a57829003601f168201915b505050918352505060018201546001600160a01b031660208201526002820154604080830191909152600383015460608301526004830154608083015260059092015460ff16151560a090910152805160c081019091528454919550908490829082906115b390614bd7565b80601f01602080910402602001604051908101604052809291908181526020018280546115df90614bd7565b801561162c5780601f106116015761010080835404028352916020019161162c565b820191906000526020600020905b81548152906001019060200180831161160f57829003601f168201915b505050918352505060018201546001600160a01b031660208201526002820154604080830191909152600383015460608301526004830154608083015260059092015460ff16151560a090910152805160c0810190915283549194509083908290829061169890614bd7565b80601f01602080910402602001604051908101604052809291908181526020018280546116c490614bd7565b80156117115780601f106116e657610100808354040283529160200191611711565b820191906000526020600020905b8154815290600101906020018083116116f457829003601f168201915b505050918352505060018201546001600160a01b031660208201526002820154604080830191909152600383015460608301526004830154608083015260059092015460ff16151560a090910152805160c0810190915282549193509082908290829061177d90614bd7565b80601f01602080910402602001604051908101604052809291908181526020018280546117a990614bd7565b80156117f65780601f106117cb576101008083540402835291602001916117f6565b820191906000526020600020905b8154815290600101906020018083116117d957829003601f168201915b505050918352505060018201546001600160a01b0316602082015260028201546040820152600382015460608201526004820154608082015260059091015460ff16151560a090910152949f939e50919c509a509198509650505050505050565b60165460405163c695d24960e01b81523360048201526000916001600160a01b03169063c695d24990602401600060405180830381600087803b15801561189d57600080fd5b505af11580156118b1573d6000803e3d6000fd5b50506040518481523392507f111d8408ae92d0b78f4d97697012bcdee255bb0e7615f3a011a759d4f80abfed915060200160405180910390a26040517f14e4f3310000000000000000000000000000000000000000000000000000000081526004808201526024810183905273__$284e1ffe9f2937f5412f1e8a04db4dc613$__906314e4f331906044015b60206040518083038186803b15801561195557600080fd5b505af4158015611969573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061198d91906142b3565b92915050565b6040517fbd1d2c31000000000000000000000000000000000000000000000000000000008152600480820152602481018390526001600160a01b038216604482015260009073__$284e1ffe9f2937f5412f1e8a04db4dc613$__9063bd1d2c319060640161118a565b6002546040516bffffffffffffffffffffffff193360601b1660208201526034810191909152600090819060540160408051601f1981840301815291815281516020928301206000818152600390935291205490915060ff16611a875760405162461bcd60e51b815260206004820152600360248201526239303360e81b60448201526064016106d7565b60165460405163c695d24960e01b81523360048201526001600160a01b039091169063c695d24990602401600060405180830381600087803b158015611acc57600080fd5b505af1158015611ae0573d6000803e3d6000fd5b50505050336001600160a01b03167f67696076dd0093e34ea851b9556ffdb425ef250da860120eab4183b76e7cb2b087878787604051611b2394939291906148c6565b60405180910390a26040517fdd54839e00000000000000000000000000000000000000000000000000000000815273__$284e1ffe9f2937f5412f1e8a04db4dc613$__9063dd54839e90611b83906004908a908a908a908a9085016149d3565b60206040518083038186803b158015611b9b57600080fd5b505af4158015611baf573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611bd39190614470565b9695505050505050565b611c326040518061010001604052806060815260200160006001600160a01b03168152602001600015158152602001600081526020016000815260200160008152602001600081526020016000151581525090565b611c876040518061010001604052806060815260200160006001600160a01b03168152602001600015158152602001600081526020016000815260200160008152602001600081526020016000151581525090565b611cdc6040518061010001604052806060815260200160006001600160a01b03168152602001600015158152602001600081526020016000815260200160008152602001600081526020016000151581525090565b611d316040518061010001604052806060815260200160006001600160a01b03168152602001600015158152602001600081526020016000815260200160008152602001600081526020016000151581525090565b611d866040518061010001604052806060815260200160006001600160a01b03168152602001600015158152602001600081526020016000815260200160008152602001600081526020016000151581525090565b60008a8152600e60205260408082208b83528183208b84528284208b85528385208b865294849020845161010081019095528354939592949193909190869082908290611dd290614bd7565b80601f0160208091040260200160405190810160405280929190818152602001828054611dfe90614bd7565b8015611e4b5780601f10611e2057610100808354040283529160200191611e4b565b820191906000526020600020905b815481529060010190602001808311611e2e57829003601f168201915b505050918352505060018201546001600160a01b038116602083015260ff600160a01b909104811615156040808401919091526002840154606084015260038401546080840152600484015460a0840152600584015460c084015260069093015416151560e09091015280516101008101909152855491965090859082908290611ed490614bd7565b80601f0160208091040260200160405190810160405280929190818152602001828054611f0090614bd7565b8015611f4d5780601f10611f2257610100808354040283529160200191611f4d565b820191906000526020600020905b815481529060010190602001808311611f3057829003601f168201915b505050918352505060018201546001600160a01b038116602083015260ff600160a01b909104811615156040808401919091526002840154606084015260038401546080840152600484015460a0840152600584015460c084015260069093015416151560e09091015280516101008101909152845491955090849082908290611fd690614bd7565b80601f016020809104026020016040519081016040528092919081815260200182805461200290614bd7565b801561204f5780601f106120245761010080835404028352916020019161204f565b820191906000526020600020905b81548152906001019060200180831161203257829003601f168201915b505050918352505060018201546001600160a01b038116602083015260ff600160a01b909104811615156040808401919091526002840154606084015260038401546080840152600484015460a0840152600584015460c084015260069093015416151560e090910152805161010081019091528354919450908390829082906120d890614bd7565b80601f016020809104026020016040519081016040528092919081815260200182805461210490614bd7565b80156121515780601f1061212657610100808354040283529160200191612151565b820191906000526020600020905b81548152906001019060200180831161213457829003601f168201915b505050918352505060018201546001600160a01b038116602083015260ff600160a01b909104811615156040808401919091526002840154606084015260038401546080840152600484015460a0840152600584015460c084015260069093015416151560e090910152805161010081019091528254919350908290829082906121da90614bd7565b80601f016020809104026020016040519081016040528092919081815260200182805461220690614bd7565b80156122535780601f1061222857610100808354040283529160200191612253565b820191906000526020600020905b81548152906001019060200180831161223657829003601f168201915b505050918352505060018201546001600160a01b0381166020830152600160a01b900460ff908116151560408301526002830154606083015260038301546080830152600483015460a0830152600583015460c0830152600690920154909116151560e090910152949f939e50919c509a509198509650505050505050565b60165460405163c695d24960e01b81523360048201526000916001600160a01b03169063c695d24990602401600060405180830381600087803b15801561231857600080fd5b505af115801561232c573d6000803e3d6000fd5b50506040518481523392507fd1b02b10475a07f1767fa17ac24c11cb86236e52df9fbc8e2cd2662f470be9ac915060200160405180910390a26016546040517fca2f2aa00000000000000000000000000000000000000000000000000000000081526004808201526001600160a01b0390911660248201526044810183905273__$284e1ffe9f2937f5412f1e8a04db4dc613$__9063ca2f2aa09060640161193d565b6002546040516bffffffffffffffffffffffff193360601b1660208201526034810191909152600090819060540160408051601f1981840301815291815281516020928301206000818152600390935291205490915060ff1661245a5760405162461bcd60e51b815260206004820152600360248201526239303360e81b60448201526064016106d7565b60165460405163c695d24960e01b81523360048201526001600160a01b039091169063c695d24990602401600060405180830381600087803b15801561249f57600080fd5b505af11580156124b3573d6000803e3d6000fd5b50505050336001600160a01b03167fe249461360e6eb5f99fc32e18970ea7e714fe4a6ae1bb2b802109ce1897551a385856040516124f29291906148b2565b60405180910390a26040517ffe59ad1300000000000000000000000000000000000000000000000000000000815273__$284e1ffe9f2937f5412f1e8a04db4dc613$__9063fe59ad139061254e90600490889088908301614979565b60206040518083038186803b15801561256657600080fd5b505af415801561257a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061259e9190614470565b949350505050565b6002546040516bffffffffffffffffffffffff193360601b1660208201526034810191909152600090819060540160408051601f1981840301815291815281516020928301206000818152600390935291205490915060ff166126315760405162461bcd60e51b815260206004820152600360248201526239303360e81b60448201526064016106d7565b60165460405163c695d24960e01b81523360048201526001600160a01b039091169063c695d24990602401600060405180830381600087803b15801561267657600080fd5b505af115801561268a573d6000803e3d6000fd5b50505050336001600160a01b03167f282a70c1093742e40fc04b5fcdaf156b8f7dc0f4daccc210e2826ab21ef52e2f89896040516126c99291906148b2565b60405180910390a26040517f67de66a200000000000000000000000000000000000000000000000000000000815273__$284e1ffe9f2937f5412f1e8a04db4dc613$__906367de66a29061272d906004908c908c908c908c908c908c908701614993565b60206040518083038186803b15801561274557600080fd5b505af4158015612759573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061277d9190614470565b98975050505050505050565b6015546001600160a01b031633146127c95760405162461bcd60e51b815260206004820152600360248201526239333760e81b60448201526064016106d7565b6016546040517f78d97c940000000000000000000000000000000000000000000000000000000081526001600160a01b038381166004830152909116906378d97c9490602401600060405180830381600087803b15801561282957600080fd5b505af115801561283d573d6000803e3d6000fd5b505050506001600160a01b03166000908152600560205260409020805460ff19169055565b6016546001600160a01b031633146128bc5760405162461bcd60e51b815260206004820152600360248201527f393534000000000000000000000000000000000000000000000000000000000060448201526064016106d7565b6001600160a01b03166000908152600560205260409020805460ff19166001179055565b60165460405163c695d24960e01b81523360048201526000916001600160a01b03169063c695d24990602401600060405180830381600087803b15801561292657600080fd5b505af115801561293a573d6000803e3d6000fd5b50506040518481523392507f537cd2e3949e391193079a5700552e511e26e8feac335a6cdc444049ab35a90f915060200160405180910390a26040517fc824d8910000000000000000000000000000000000000000000000000000000081526004808201526024810183905273__$284e1ffe9f2937f5412f1e8a04db4dc613$__9063c824d8919060440161193d565b6002546040516bffffffffffffffffffffffff193360601b1660208201526034810191909152600090819060540160408051601f1981840301815291815281516020928301206000818152600390935291205490915060ff16612a555760405162461bcd60e51b815260206004820152600360248201526239303360e81b60448201526064016106d7565b60165460405163c695d24960e01b81523360048201526001600160a01b039091169063c695d24990602401600060405180830381600087803b158015612a9a57600080fd5b505af1158015612aae573d6000803e3d6000fd5b50506040805187815286151560208201523393507fe17beb8487c3e79865827ae14ef940fe858d8dd153cc7a4b25b041e2895e82f492500160405180910390a26040517fb943b0c100000000000000000000000000000000000000000000000000000000815260048082015260248101859052831515604482015273__$284e1ffe9f2937f5412f1e8a04db4dc613$__9063b943b0c1906064015b60206040518083038186803b158015612b6157600080fd5b505af4158015612b75573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061259e91906142b3565b6002546040516bffffffffffffffffffffffff193360601b1660208201526034810191909152600090819060540160408051601f1981840301815291815281516020928301206000818152600390935291205490915060ff16612c245760405162461bcd60e51b815260206004820152600360248201526239303360e81b60448201526064016106d7565b60165460405163c695d24960e01b81523360048201526001600160a01b039091169063c695d24990602401600060405180830381600087803b158015612c6957600080fd5b505af1158015612c7d573d6000803e3d6000fd5b50506040805187815286151560208201523393507ff98e7718ee4616550f38594da7703cb4a26dd80936283951d7741e86553e308692500160405180910390a26040517fc6ce9bfd00000000000000000000000000000000000000000000000000000000815260048082015260248101859052831515604482015273__$284e1ffe9f2937f5412f1e8a04db4dc613$__9063c6ce9bfd90606401612b49565b6040805161018081018252606080825260006020830181905292820183905281018290526080810182905260a0810182905260c0810182905260e081018290526101008101829052610120810182905261014081018290526101608101919091526000828152600a60205260409081902081516101808101909252805482908290612da690614bd7565b80601f0160208091040260200160405190810160405280929190818152602001828054612dd290614bd7565b8015612e1f5780601f10612df457610100808354040283529160200191612e1f565b820191906000526020600020905b815481529060010190602001808311612e0257829003601f168201915b505050918352505060018201546001600160a01b03166020820152600282015460408201526003820154606082015260048201546080820152600582015460a0820152600682015460ff808216151560c08401526101008083048216151560e0850152620100008304821615159084015263010000008204811615156101208401526401000000009091041615156101408201526007909101546101609091015292915050565b604080516101208082018352600080835260208084018290526060848601819052808501839052608080860184905260a080870185905260c080880186905260e0808901879052610100808a018890528a51808a018c52888152808801899052808c018790528087018990528086018990528085018990528084018990528083018990528082018990528b51808b018d528981528089018a9052808d018890528088018a90528087018a90528086018a90528085018a90528084018a90528083018a90528c51808c018e528a8152808a018b9052808e018990528089018b90528088018b90528087018b90528086018b90528085018b90528084018b90528d51808d018f528b8152808b018c9052808f018a90529889018b90529688018a905294870189905292860188905290850187905284018690528d8652600685528886208d87528987208d88528a88208d89528b89208d8a52988c90208c519a8b018d5283548b526001840154988b01989098526002830180549b9c949b959a969997989397929691959294919288928401919061306090614bd7565b80601f016020809104026020016040519081016040528092919081815260200182805461308c90614bd7565b80156130d95780601f106130ae576101008083540402835291602001916130d9565b820191906000526020600020905b8154815290600101906020018083116130bc57829003601f168201915b505050918352505060038201546001600160a01b03811660208084019190915260ff600160a01b830481161515604080860191909152600160a81b8404821615156060860152600160b01b8404821615156080860152600160b81b90930416151560a084015260049093015460c0909201919091528051610120810182528754815260018801549281019290925260028701805493985091928792918401919061318290614bd7565b80601f01602080910402602001604051908101604052809291908181526020018280546131ae90614bd7565b80156131fb5780601f106131d0576101008083540402835291602001916131fb565b820191906000526020600020905b8154815290600101906020018083116131de57829003601f168201915b505050918352505060038201546001600160a01b03811660208084019190915260ff600160a01b830481161515604080860191909152600160a81b8404821615156060860152600160b01b8404821615156080860152600160b81b90930416151560a084015260049093015460c090920191909152805161012081018252865481526001870154928101929092526002860180549397509192869291840191906132a490614bd7565b80601f01602080910402602001604051908101604052809291908181526020018280546132d090614bd7565b801561331d5780601f106132f25761010080835404028352916020019161331d565b820191906000526020600020905b81548152906001019060200180831161330057829003601f168201915b505050918352505060038201546001600160a01b03811660208084019190915260ff600160a01b830481161515604080860191909152600160a81b8404821615156060860152600160b01b8404821615156080860152600160b81b90930416151560a084015260049093015460c090920191909152805161012081018252855481526001860154928101929092526002850180549396509192859291840191906133c690614bd7565b80601f01602080910402602001604051908101604052809291908181526020018280546133f290614bd7565b801561343f5780601f106134145761010080835404028352916020019161343f565b820191906000526020600020905b81548152906001019060200180831161342257829003601f168201915b505050918352505060038201546001600160a01b03811660208084019190915260ff600160a01b830481161515604080860191909152600160a81b8404821615156060860152600160b01b8404821615156080860152600160b81b90930416151560a084015260049093015460c090920191909152805161012081018252845481526001850154928101929092526002840180549395509192849291840191906134e890614bd7565b80601f016020809104026020016040519081016040528092919081815260200182805461351490614bd7565b80156135615780601f1061353657610100808354040283529160200191613561565b820191906000526020600020905b81548152906001019060200180831161354457829003601f168201915b505050918352505060038201546001600160a01b038116602083015260ff600160a01b8204811615156040840152600160a81b8204811615156060840152600160b01b8204811615156080840152600160b81b90910416151560a082015260049091015460c090910152949f939e50919c509a509198509650505050505050565b6136376040518061010001604052806060815260200160006001600160a01b03168152602001600015158152602001600081526020016000815260200160008152602001600081526020016000151581525090565b6000828152600e6020526040908190208151610100810190925280548290829061366090614bd7565b80601f016020809104026020016040519081016040528092919081815260200182805461368c90614bd7565b80156136d95780601f106136ae576101008083540402835291602001916136d9565b820191906000526020600020905b8154815290600101906020018083116136bc57829003601f168201915b505050918352505060018201546001600160a01b038116602083015260ff600160a01b9091048116151560408301526002830154606083015260038301546080830152600483015460a0830152600583015460c0830152600690920154909116151560e09091015292915050565b60606004601001805480602002602001604051908101604052809291908181526020016000905b82821015610d2757838290600052602060002090600502016040518061012001604052908160008201548152602001600182015481526020016002820180546137b690614bd7565b80601f01602080910402602001604051908101604052809291908181526020018280546137e290614bd7565b801561382f5780601f106138045761010080835404028352916020019161382f565b820191906000526020600020905b81548152906001019060200180831161381257829003601f168201915b505050918352505060038201546001600160a01b03811660208084019190915260ff600160a01b8304811615156040850152600160a81b8304811615156060850152600160b01b8304811615156080850152600160b81b909204909116151560a083015260049092015460c090910152908252600192909201910161376e565b6016546040517f9a8b8c15000000000000000000000000000000000000000000000000000000008152600480820152602481018390526001600160a01b03909116604482015273__$284e1ffe9f2937f5412f1e8a04db4dc613$__90639a8b8c159060640160006040518083038186803b15801561392c57600080fd5b505af4158015613940573d6000803e3d6000fd5b5050505050565b6040805161018081018252606080825260006020830181905292820183905281018290526080810182905260a0810182905260c0810182905260e081018290526101008101829052610120810182905261014081018290526101608101919091526040805161018081018252606080825260006020830181905292820183905281018290526080810182905260a0810182905260c0810182905260e081018290526101008101829052610120810182905261014081018290526101608101919091526040805161018081018252606080825260006020830181905292820183905281018290526080810182905260a0810182905260c0810182905260e081018290526101008101829052610120810182905261014081018290526101608101919091526040805161018081018252606080825260006020830181905292820183905281018290526080810182905260a0810182905260c0810182905260e081018290526101008101829052610120810182905261014081018290526101608101919091526040805161018081018252606080825260006020830181905292820183905281018290526080810182905260a0810182905260c0810182905260e0810182905261010081018290526101208101829052610140810182905261016081019190915260008a8152600a60205260408082208b83528183208b84528284208b85528385208b865294849020845161018081019095528354939592949193909190869082908290613b7890614bd7565b80601f0160208091040260200160405190810160405280929190818152602001828054613ba490614bd7565b8015613bf15780601f10613bc657610100808354040283529160200191613bf1565b820191906000526020600020905b815481529060010190602001808311613bd457829003601f168201915b505050918352505060018201546001600160a01b0316602082015260028201546040808301919091526003830154606083015260048301546080830152600583015460a0830152600683015460ff808216151560c08501526101008083048216151560e0860152620100008304821615159085015263010000008204811615156101208501526401000000009091041615156101408301526007909201546101609091015280516101808101909152855491965090859082908290613cb590614bd7565b80601f0160208091040260200160405190810160405280929190818152602001828054613ce190614bd7565b8015613d2e5780601f10613d0357610100808354040283529160200191613d2e565b820191906000526020600020905b815481529060010190602001808311613d1157829003601f168201915b505050918352505060018201546001600160a01b0316602082015260028201546040808301919091526003830154606083015260048301546080830152600583015460a0830152600683015460ff808216151560c08501526101008083048216151560e0860152620100008304821615159085015263010000008204811615156101208501526401000000009091041615156101408301526007909201546101609091015280516101808101909152845491955090849082908290613df290614bd7565b80601f0160208091040260200160405190810160405280929190818152602001828054613e1e90614bd7565b8015613e6b5780601f10613e4057610100808354040283529160200191613e6b565b820191906000526020600020905b815481529060010190602001808311613e4e57829003601f168201915b505050918352505060018201546001600160a01b0316602082015260028201546040808301919091526003830154606083015260048301546080830152600583015460a0830152600683015460ff808216151560c08501526101008083048216151560e0860152620100008304821615159085015263010000008204811615156101208501526401000000009091041615156101408301526007909201546101609091015280516101808101909152835491945090839082908290613f2f90614bd7565b80601f0160208091040260200160405190810160405280929190818152602001828054613f5b90614bd7565b8015613fa85780601f10613f7d57610100808354040283529160200191613fa8565b820191906000526020600020905b815481529060010190602001808311613f8b57829003601f168201915b505050918352505060018201546001600160a01b0316602082015260028201546040808301919091526003830154606083015260048301546080830152600583015460a0830152600683015460ff808216151560c08501526101008083048216151560e086015262010000830482161515908501526301000000820481161515610120850152640100000000909104161515610140830152600790920154610160909101528051610180810190915282549193509082908290829061406c90614bd7565b80601f016020809104026020016040519081016040528092919081815260200182805461409890614bd7565b80156140e55780601f106140ba576101008083540402835291602001916140e5565b820191906000526020600020905b8154815290600101906020018083116140c857829003601f168201915b505050918352505060018201546001600160a01b03166020820152600282015460408201526003820154606082015260048201546080820152600582015460a0820152600682015460ff808216151560c08401526101008083048216151560e08501526201000083048216151590840152630100000082048116151561012084015264010000000090910416151561014082015260079091015461016090910152949f939e50919c509a509198509650505050505050565b8280546141a990614bd7565b90600052602060002090601f0160209004810192826141cb5760008555614211565b82601f106141e457805160ff1916838001178555614211565b82800160010185558215614211579182015b828111156142115782518255916020019190600101906141f6565b5061421d929150614221565b5090565b5b8082111561421d5760008155600101614222565b80356001600160a01b038116811461424d57600080fd5b919050565b60008083601f840112614263578182fd5b50813567ffffffffffffffff81111561427a578182fd5b60208301915083602082850101111561429257600080fd5b9250929050565b6000602082840312156142aa578081fd5b6111da82614236565b6000602082840312156142c4578081fd5b81516111da81614c2b565b600080602083850312156142e1578081fd5b823567ffffffffffffffff8111156142f7578182fd5b61430385828601614252565b90969095509350505050565b60008060008060008060a08789031215614327578182fd5b863567ffffffffffffffff81111561433d578283fd5b61434989828a01614252565b909750955050602087013561435d81614c2b565b9350604087013561436d81614c2b565b9250606087013561437d81614c2b565b80925050608087013590509295509295509295565b600080600080604085870312156143a7578384fd5b843567ffffffffffffffff808211156143be578586fd5b6143ca88838901614252565b909650945060208701359150808211156143e2578384fd5b506143ef87828801614252565b95989497509550505050565b60008060008060608587031215614410578384fd5b843567ffffffffffffffff811115614426578485fd5b61443287828801614252565b90955093505060208501359150604085013561444d81614c2b565b939692955090935050565b600060208284031215614469578081fd5b5035919050565b600060208284031215614481578081fd5b5051919050565b6000806040838503121561449a578182fd5b823591506144aa60208401614236565b90509250929050565b600080604083850312156144c5578182fd5b8235915060208301356144d781614c2b565b809150509250929050565b6000806000606084860312156144f6578283fd5b83359250602084013561450881614c2b565b9150604084013561451881614c2b565b809150509250925092565b600080600080600060a0868803121561453a578081fd5b505083359560208501359550604085013594606081013594506080013592509050565b6000815180845260208085019450808401835b8381101561458c57815187529582019590820190600101614570565b509495945050505050565b81835281816020850137506000828201602090810191909152601f909101601f19169091010190565b60008151808452815b818110156145e5576020818501810151868301820152016145c9565b818111156145f65782602083870101525b50601f01601f19169290920160200192915050565b600061012082518452602083015160208501526040830151816040860152614635828601826145c0565b9150506001600160a01b036060840151166060850152608083015161465e608086018215159052565b5060a083015161467260a086018215159052565b5060c083015161468660c086018215159052565b5060e083015161469a60e086018215159052565b50610100928301519390920192909252919050565b6000815160c084526146c460c08501826145c0565b90506001600160a01b03602084015116602085015260408301516040850152606083015160608501526080830151608085015260a0830151151560a08501528091505092915050565b60006101008251818552614723828601826145c0565b9150506001600160a01b036020840151166020850152604083015115156040850152606083015160608501526080830151608085015260a083015160a085015260c083015160c085015260e0830151151560e08501528091505092915050565b60006101808251818552614799828601826145c0565b91505060208301516147b660208601826001600160a01b03169052565b5060408301516040850152606083015160608501526080830151608085015260a083015160a085015260c08301516147f260c086018215159052565b5060e083015161480660e086018215159052565b506101008381015115159085015261012080840151151590850152610140808401511515908501526101609283015192909301919091525090565b8183823760009101908152919050565b6000602080830181845280855180835260408601915060408160051b8701019250838701855b828110156148a557603f1988860301845261489385835161460b565b94509285019290850190600101614877565b5092979650505050505050565b60208152600061259e602083018486614597565b6060815260006148da606083018688614597565b60208301949094525090151560409091015292915050565b6020815260006111da60208301846145c0565b6020815260006111da602083018461460b565b60a08152600061492b60a083018861460b565b828103602084015261493d818861460b565b90508281036040840152614951818761460b565b90508281036060840152614965818661460b565b9050828103608084015261277d818561460b565b83815260406020820152600061094f604083018486614597565b87815260c0602082015260006149ad60c08301888a614597565b9515156040830152509215156060840152901515608083015260a0909101529392505050565b8581526080602082015260006149ed608083018688614597565b6040830194909452509015156060909101529392505050565b602081526000825160806020840152614a2260a084018261455d565b90506020840151601f1980858403016040860152614a40838361455d565b92506040860151915080858403016060860152614a5d838361455d565b925060608601519150808584030160808601525061094f828261455d565b6020815260006111da60208301846146af565b60a081526000614aa160a08301886146af565b8281036020840152614ab381886146af565b90508281036040840152614ac781876146af565b90508281036060840152614adb81866146af565b9050828103608084015261277d81856146af565b6020815260006111da602083018461470d565b60a081526000614b1560a083018861470d565b8281036020840152614b27818861470d565b90508281036040840152614b3b818761470d565b90508281036060840152614b4f818661470d565b9050828103608084015261277d818561470d565b6020815260006111da6020830184614783565b60a081526000614b8960a0830188614783565b8281036020840152614b9b8188614783565b90508281036040840152614baf8187614783565b90508281036060840152614bc38186614783565b9050828103608084015261277d8185614783565b600181811c90821680614beb57607f821691505b60208210811415614c25577f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b50919050565b8015158114614c3957600080fd5b5056fea264697066735822122070395b64e0d2348719740347a918cf0df2b431ae67dc53a015d0999940300d4f64736f6c63430008040033",
  "deployedBytecode": "0x608060405234801561001057600080fd5b50600436106102925760003560e01c806371110f3911610160578063a5513a18116100d8578063d79950761161008c578063edbc975911610071578063edbc975914610623578063fdedbe951461062b578063fef7e50b1461063e57600080fd5b8063d7995076146105fb578063ea614f541461061b57600080fd5b8063c42bca85116100bd578063c42bca85146105a4578063c9ddacbc146105b7578063d4865bed146105d757600080fd5b8063a5513a181461057e578063a972d10b1461059157600080fd5b806380e11be91161012f57806394b535ec1161011457806394b535ec1461054557806397c3ccd8146105585780639e6371ba1461056b57600080fd5b806380e11be91461051f578063899e456c1461053257600080fd5b806371110f39146104d857806371414ed3146104e05780637331210c146104f357806374700218146104fb57600080fd5b80634112fdd01161020e57806356cf5358116101c25780635f90dec4116101a75780635f90dec41461048e5780636127d22d146104b257806364894bb6146104c557600080fd5b806356cf5358146104735780635e06f50f1461047b57600080fd5b806344443dea116101f357806344443dea146104025780634d8b10a914610422578063548c0ef41461043557600080fd5b80634112fdd0146103da5780634173b417146103ed57600080fd5b80631d143848116102655780632b60c8bb1161024a5780632b60c8bb146103905780632f370ba3146103b057806336ffa905146103c557600080fd5b80631d143848146103525780631d8c89711461037d57600080fd5b806302a08328146102975780630e0d7f07146102ae5780630fba4ca11461032a5780631aecf6a01461033f575b600080fd5b6004545b6040519081526020015b60405180910390f35b61031a6102bc366004614299565b6002546040516bffffffffffffffffffffffff19606084901b1660208201526034810191909152600090819060540160408051601f1981840301815291815281516020928301206000908152600390925290205460ff169392505050565b60405190151581526020016102a5565b61033d6103383660046142cf565b610662565b005b61031a61034d3660046144e2565b610779565b600054610365906001600160a01b031681565b6040516001600160a01b0390911681526020016102a5565b61031a61038b366004614392565b610958565b6103a361039e366004614458565b610a8a565b6040516102a59190614a7b565b6103b8610bbf565b6040516102a59190614851565b6103cd610d30565b6040516102a59190614a06565b61033d6103e8366004614458565b610ed2565b6103f5610f17565b6040516102a591906148f2565b610415610410366004614458565b610fac565b6040516102a59190614905565b61031a610430366004614488565b611125565b610461610443366004614299565b6001600160a01b031660009081526005602052604090205460ff1690565b60405160ff90911681526020016102a5565b60075461029b565b61031a610489366004614488565b6111e1565b6104a161049c366004614523565b61124a565b6040516102a5959493929190614a8e565b61031a6104c0366004614458565b611857565b61031a6104d3366004614488565b611993565b600b5461029b565b61029b6104ee3660046143fb565b6119fc565b60095461029b565b61050e610509366004614523565b611bdd565b6040516102a5959493929190614b02565b61031a61052d366004614458565b6122d2565b61029b6105403660046142cf565b6123cf565b61029b61055336600461430f565b6125a6565b61033d610566366004614299565b612789565b61033d610579366004614299565b612862565b61031a61058c366004614458565b6128e0565b61031a61059f3660046144b3565b6129ca565b61031a6105b23660046144b3565b612b99565b6105ca6105c5366004614458565b612d1c565b6040516102a59190614b63565b6105ea6105e5366004614523565b612ec6565b6040516102a5959493929190614918565b61060e610609366004614458565b6135e2565b6040516102a59190614aef565b6103b8613747565b600f5461029b565b61033d610639366004614458565b6138af565b61065161064c366004614523565b613947565b6040516102a5959493929190614b76565b6002546040516106789084908490602001614841565b60405160208183030381529060405280519060200120146106e05760405162461bcd60e51b815260206004820152600360248201527f393032000000000000000000000000000000000000000000000000000000000060448201526064015b60405180910390fd5b6002546040516bffffffffffffffffffffffff193360601b166020820152603481019190915260009060540160408051808303601f190181528282528051602091820120818401835260018452600081815260039092528282209351845460ff191690151517909355905191925033917f79229b212fa3ea547fb5e5b66090cf250d442b12a51854a030f3b796d528134e9190a2505050565b6002546040516bffffffffffffffffffffffff193360601b1660208201526034810191909152600090819060540160408051601f1981840301815291815281516020928301206000818152600390935291205490915060ff166108045760405162461bcd60e51b815260206004820152600360248201526239303360e81b60448201526064016106d7565b60165460405163c695d24960e01b81523360048201526001600160a01b039091169063c695d24990602401600060405180830381600087803b15801561084957600080fd5b505af115801561085d573d6000803e3d6000fd5b50506040805188815287151560208201523393507f1a53dbc4afb4355dae75da1c738d7f9da8d47895ca9e52298a2f13edef1eeb9a92500160405180910390a26040517f42877fb7000000000000000000000000000000000000000000000000000000008152600480820152602481018690528415156044820152831515606482015273__$284e1ffe9f2937f5412f1e8a04db4dc613$__906342877fb79060840160206040518083038186803b15801561091757600080fd5b505af415801561092b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061094f91906142b3565b95945050505050565b600080546001600160a01b031633146109b35760405162461bcd60e51b815260206004820152600360248201527f393031000000000000000000000000000000000000000000000000000000000060448201526064016106d7565b6040805160606020601f88018190040282018101835291810186815290918291908890889081908501838280828437600092019190915250505090825250604051602091820191610a08918791879101614841565b60408051601f19818403018152919052805160209182012090915281518051600192610a3892849291019061419d565b50602082015181600101559050507f9c1e1a17a78053ad78b3801837ad5e515d429987252f2e1371b7b50fa8ff8bec8585604051610a779291906148b2565b60405180910390a1506001949350505050565b610ace6040518060c001604052806060815260200160006001600160a01b031681526020016000815260200160008152602001600081526020016000151581525090565b60008281526008602052604090819020815160c08101909252805482908290610af690614bd7565b80601f0160208091040260200160405190810160405280929190818152602001828054610b2290614bd7565b8015610b6f5780601f10610b4457610100808354040283529160200191610b6f565b820191906000526020600020905b815481529060010190602001808311610b5257829003601f168201915b505050918352505060018201546001600160a01b0316602082015260028201546040820152600382015460608201526004820154608082015260059091015460ff16151560a09091015292915050565b60606004600f01805480602002602001604051908101604052809291908181526020016000905b82821015610d275783829060005260206000209060050201604051806101200160405290816000820154815260200160018201548152602001600282018054610c2e90614bd7565b80601f0160208091040260200160405190810160405280929190818152602001828054610c5a90614bd7565b8015610ca75780601f10610c7c57610100808354040283529160200191610ca7565b820191906000526020600020905b815481529060010190602001808311610c8a57829003601f168201915b505050918352505060038201546001600160a01b03811660208084019190915260ff600160a01b8304811615156040850152600160a81b8304811615156060850152600160b01b8304811615156080850152600160b81b909204909116151560a083015260049092015460c0909101529082526001929092019101610be6565b50505050905090565b610d5b6040518060800160405280606081526020016060815260200160608152602001606081525090565b336000908152600d60209081526040918290208251815460a093810282018401909452608081018481529093919284928491840182828015610dbc57602002820191906000526020600020905b815481526020019060010190808311610da8575b5050505050815260200160018201805480602002602001604051908101604052809291908181526020018280548015610e1457602002820191906000526020600020905b815481526020019060010190808311610e00575b5050505050815260200160028201805480602002602001604051908101604052809291908181526020018280548015610e6c57602002820191906000526020600020905b815481526020019060010190808311610e58575b5050505050815260200160038201805480602002602001604051908101604052809291908181526020018280548015610ec457602002820191906000526020600020905b815481526020019060010190808311610eb0575b505050505081525050905090565b6015546001600160a01b03163314610f125760405162461bcd60e51b815260206004820152600360248201526239333760e81b60448201526064016106d7565b600455565b606060016000018054610f2990614bd7565b80601f0160208091040260200160405190810160405280929190818152602001828054610f5590614bd7565b8015610fa25780601f10610f7757610100808354040283529160200191610fa2565b820191906000526020600020905b815481529060010190602001808311610f8557829003601f168201915b5050505050905090565b604080516101208101825260008082526020820181905260609282018390529181018290526080810182905260a0810182905260c0810182905260e081018290526101008101919091526004600201600083815260200190815260200160002060405180610120016040529081600082015481526020016001820154815260200160028201805461103c90614bd7565b80601f016020809104026020016040519081016040528092919081815260200182805461106890614bd7565b80156110b55780601f1061108a576101008083540402835291602001916110b5565b820191906000526020600020905b81548152906001019060200180831161109857829003601f168201915b505050918352505060038201546001600160a01b038116602083015260ff600160a01b8204811615156040840152600160a81b8204811615156060840152600160b01b8204811615156080840152600160b81b90910416151560a082015260049091015460c09091015292915050565b6040517ffd3e4768000000000000000000000000000000000000000000000000000000008152600480820152602481018390526001600160a01b038216604482015260009073__$284e1ffe9f2937f5412f1e8a04db4dc613$__9063fd3e4768906064015b60206040518083038186803b1580156111a257600080fd5b505af41580156111b6573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111da91906142b3565b9392505050565b6040517f2ca650b2000000000000000000000000000000000000000000000000000000008152600480820152602481018390526001600160a01b038216604482015260009073__$284e1ffe9f2937f5412f1e8a04db4dc613$__90632ca650b29060640161118a565b61128e6040518060c001604052806060815260200160006001600160a01b031681526020016000815260200160008152602001600081526020016000151581525090565b6112d26040518060c001604052806060815260200160006001600160a01b031681526020016000815260200160008152602001600081526020016000151581525090565b6113166040518060c001604052806060815260200160006001600160a01b031681526020016000815260200160008152602001600081526020016000151581525090565b61135a6040518060c001604052806060815260200160006001600160a01b031681526020016000815260200160008152602001600081526020016000151581525090565b61139e6040518060c001604052806060815260200160006001600160a01b031681526020016000815260200160008152602001600081526020016000151581525090565b60008a8152600860205260408082208b83528183208b84528284208b85528385208b865294849020845160c0810190955283549395929491939091908690829082906113e990614bd7565b80601f016020809104026020016040519081016040528092919081815260200182805461141590614bd7565b80156114625780601f1061143757610100808354040283529160200191611462565b820191906000526020600020905b81548152906001019060200180831161144557829003601f168201915b505050918352505060018201546001600160a01b031660208201526002820154604080830191909152600383015460608301526004830154608083015260059092015460ff16151560a090910152805160c081019091528554919650908590829082906114ce90614bd7565b80601f01602080910402602001604051908101604052809291908181526020018280546114fa90614bd7565b80156115475780601f1061151c57610100808354040283529160200191611547565b820191906000526020600020905b81548152906001019060200180831161152a57829003601f168201915b505050918352505060018201546001600160a01b031660208201526002820154604080830191909152600383015460608301526004830154608083015260059092015460ff16151560a090910152805160c081019091528454919550908490829082906115b390614bd7565b80601f01602080910402602001604051908101604052809291908181526020018280546115df90614bd7565b801561162c5780601f106116015761010080835404028352916020019161162c565b820191906000526020600020905b81548152906001019060200180831161160f57829003601f168201915b505050918352505060018201546001600160a01b031660208201526002820154604080830191909152600383015460608301526004830154608083015260059092015460ff16151560a090910152805160c0810190915283549194509083908290829061169890614bd7565b80601f01602080910402602001604051908101604052809291908181526020018280546116c490614bd7565b80156117115780601f106116e657610100808354040283529160200191611711565b820191906000526020600020905b8154815290600101906020018083116116f457829003601f168201915b505050918352505060018201546001600160a01b031660208201526002820154604080830191909152600383015460608301526004830154608083015260059092015460ff16151560a090910152805160c0810190915282549193509082908290829061177d90614bd7565b80601f01602080910402602001604051908101604052809291908181526020018280546117a990614bd7565b80156117f65780601f106117cb576101008083540402835291602001916117f6565b820191906000526020600020905b8154815290600101906020018083116117d957829003601f168201915b505050918352505060018201546001600160a01b0316602082015260028201546040820152600382015460608201526004820154608082015260059091015460ff16151560a090910152949f939e50919c509a509198509650505050505050565b60165460405163c695d24960e01b81523360048201526000916001600160a01b03169063c695d24990602401600060405180830381600087803b15801561189d57600080fd5b505af11580156118b1573d6000803e3d6000fd5b50506040518481523392507f111d8408ae92d0b78f4d97697012bcdee255bb0e7615f3a011a759d4f80abfed915060200160405180910390a26040517f14e4f3310000000000000000000000000000000000000000000000000000000081526004808201526024810183905273__$284e1ffe9f2937f5412f1e8a04db4dc613$__906314e4f331906044015b60206040518083038186803b15801561195557600080fd5b505af4158015611969573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061198d91906142b3565b92915050565b6040517fbd1d2c31000000000000000000000000000000000000000000000000000000008152600480820152602481018390526001600160a01b038216604482015260009073__$284e1ffe9f2937f5412f1e8a04db4dc613$__9063bd1d2c319060640161118a565b6002546040516bffffffffffffffffffffffff193360601b1660208201526034810191909152600090819060540160408051601f1981840301815291815281516020928301206000818152600390935291205490915060ff16611a875760405162461bcd60e51b815260206004820152600360248201526239303360e81b60448201526064016106d7565b60165460405163c695d24960e01b81523360048201526001600160a01b039091169063c695d24990602401600060405180830381600087803b158015611acc57600080fd5b505af1158015611ae0573d6000803e3d6000fd5b50505050336001600160a01b03167f67696076dd0093e34ea851b9556ffdb425ef250da860120eab4183b76e7cb2b087878787604051611b2394939291906148c6565b60405180910390a26040517fdd54839e00000000000000000000000000000000000000000000000000000000815273__$284e1ffe9f2937f5412f1e8a04db4dc613$__9063dd54839e90611b83906004908a908a908a908a9085016149d3565b60206040518083038186803b158015611b9b57600080fd5b505af4158015611baf573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611bd39190614470565b9695505050505050565b611c326040518061010001604052806060815260200160006001600160a01b03168152602001600015158152602001600081526020016000815260200160008152602001600081526020016000151581525090565b611c876040518061010001604052806060815260200160006001600160a01b03168152602001600015158152602001600081526020016000815260200160008152602001600081526020016000151581525090565b611cdc6040518061010001604052806060815260200160006001600160a01b03168152602001600015158152602001600081526020016000815260200160008152602001600081526020016000151581525090565b611d316040518061010001604052806060815260200160006001600160a01b03168152602001600015158152602001600081526020016000815260200160008152602001600081526020016000151581525090565b611d866040518061010001604052806060815260200160006001600160a01b03168152602001600015158152602001600081526020016000815260200160008152602001600081526020016000151581525090565b60008a8152600e60205260408082208b83528183208b84528284208b85528385208b865294849020845161010081019095528354939592949193909190869082908290611dd290614bd7565b80601f0160208091040260200160405190810160405280929190818152602001828054611dfe90614bd7565b8015611e4b5780601f10611e2057610100808354040283529160200191611e4b565b820191906000526020600020905b815481529060010190602001808311611e2e57829003601f168201915b505050918352505060018201546001600160a01b038116602083015260ff600160a01b909104811615156040808401919091526002840154606084015260038401546080840152600484015460a0840152600584015460c084015260069093015416151560e09091015280516101008101909152855491965090859082908290611ed490614bd7565b80601f0160208091040260200160405190810160405280929190818152602001828054611f0090614bd7565b8015611f4d5780601f10611f2257610100808354040283529160200191611f4d565b820191906000526020600020905b815481529060010190602001808311611f3057829003601f168201915b505050918352505060018201546001600160a01b038116602083015260ff600160a01b909104811615156040808401919091526002840154606084015260038401546080840152600484015460a0840152600584015460c084015260069093015416151560e09091015280516101008101909152845491955090849082908290611fd690614bd7565b80601f016020809104026020016040519081016040528092919081815260200182805461200290614bd7565b801561204f5780601f106120245761010080835404028352916020019161204f565b820191906000526020600020905b81548152906001019060200180831161203257829003601f168201915b505050918352505060018201546001600160a01b038116602083015260ff600160a01b909104811615156040808401919091526002840154606084015260038401546080840152600484015460a0840152600584015460c084015260069093015416151560e090910152805161010081019091528354919450908390829082906120d890614bd7565b80601f016020809104026020016040519081016040528092919081815260200182805461210490614bd7565b80156121515780601f1061212657610100808354040283529160200191612151565b820191906000526020600020905b81548152906001019060200180831161213457829003601f168201915b505050918352505060018201546001600160a01b038116602083015260ff600160a01b909104811615156040808401919091526002840154606084015260038401546080840152600484015460a0840152600584015460c084015260069093015416151560e090910152805161010081019091528254919350908290829082906121da90614bd7565b80601f016020809104026020016040519081016040528092919081815260200182805461220690614bd7565b80156122535780601f1061222857610100808354040283529160200191612253565b820191906000526020600020905b81548152906001019060200180831161223657829003601f168201915b505050918352505060018201546001600160a01b0381166020830152600160a01b900460ff908116151560408301526002830154606083015260038301546080830152600483015460a0830152600583015460c0830152600690920154909116151560e090910152949f939e50919c509a509198509650505050505050565b60165460405163c695d24960e01b81523360048201526000916001600160a01b03169063c695d24990602401600060405180830381600087803b15801561231857600080fd5b505af115801561232c573d6000803e3d6000fd5b50506040518481523392507fd1b02b10475a07f1767fa17ac24c11cb86236e52df9fbc8e2cd2662f470be9ac915060200160405180910390a26016546040517fca2f2aa00000000000000000000000000000000000000000000000000000000081526004808201526001600160a01b0390911660248201526044810183905273__$284e1ffe9f2937f5412f1e8a04db4dc613$__9063ca2f2aa09060640161193d565b6002546040516bffffffffffffffffffffffff193360601b1660208201526034810191909152600090819060540160408051601f1981840301815291815281516020928301206000818152600390935291205490915060ff1661245a5760405162461bcd60e51b815260206004820152600360248201526239303360e81b60448201526064016106d7565b60165460405163c695d24960e01b81523360048201526001600160a01b039091169063c695d24990602401600060405180830381600087803b15801561249f57600080fd5b505af11580156124b3573d6000803e3d6000fd5b50505050336001600160a01b03167fe249461360e6eb5f99fc32e18970ea7e714fe4a6ae1bb2b802109ce1897551a385856040516124f29291906148b2565b60405180910390a26040517ffe59ad1300000000000000000000000000000000000000000000000000000000815273__$284e1ffe9f2937f5412f1e8a04db4dc613$__9063fe59ad139061254e90600490889088908301614979565b60206040518083038186803b15801561256657600080fd5b505af415801561257a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061259e9190614470565b949350505050565b6002546040516bffffffffffffffffffffffff193360601b1660208201526034810191909152600090819060540160408051601f1981840301815291815281516020928301206000818152600390935291205490915060ff166126315760405162461bcd60e51b815260206004820152600360248201526239303360e81b60448201526064016106d7565b60165460405163c695d24960e01b81523360048201526001600160a01b039091169063c695d24990602401600060405180830381600087803b15801561267657600080fd5b505af115801561268a573d6000803e3d6000fd5b50505050336001600160a01b03167f282a70c1093742e40fc04b5fcdaf156b8f7dc0f4daccc210e2826ab21ef52e2f89896040516126c99291906148b2565b60405180910390a26040517f67de66a200000000000000000000000000000000000000000000000000000000815273__$284e1ffe9f2937f5412f1e8a04db4dc613$__906367de66a29061272d906004908c908c908c908c908c908c908701614993565b60206040518083038186803b15801561274557600080fd5b505af4158015612759573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061277d9190614470565b98975050505050505050565b6015546001600160a01b031633146127c95760405162461bcd60e51b815260206004820152600360248201526239333760e81b60448201526064016106d7565b6016546040517f78d97c940000000000000000000000000000000000000000000000000000000081526001600160a01b038381166004830152909116906378d97c9490602401600060405180830381600087803b15801561282957600080fd5b505af115801561283d573d6000803e3d6000fd5b505050506001600160a01b03166000908152600560205260409020805460ff19169055565b6016546001600160a01b031633146128bc5760405162461bcd60e51b815260206004820152600360248201527f393534000000000000000000000000000000000000000000000000000000000060448201526064016106d7565b6001600160a01b03166000908152600560205260409020805460ff19166001179055565b60165460405163c695d24960e01b81523360048201526000916001600160a01b03169063c695d24990602401600060405180830381600087803b15801561292657600080fd5b505af115801561293a573d6000803e3d6000fd5b50506040518481523392507f537cd2e3949e391193079a5700552e511e26e8feac335a6cdc444049ab35a90f915060200160405180910390a26040517fc824d8910000000000000000000000000000000000000000000000000000000081526004808201526024810183905273__$284e1ffe9f2937f5412f1e8a04db4dc613$__9063c824d8919060440161193d565b6002546040516bffffffffffffffffffffffff193360601b1660208201526034810191909152600090819060540160408051601f1981840301815291815281516020928301206000818152600390935291205490915060ff16612a555760405162461bcd60e51b815260206004820152600360248201526239303360e81b60448201526064016106d7565b60165460405163c695d24960e01b81523360048201526001600160a01b039091169063c695d24990602401600060405180830381600087803b158015612a9a57600080fd5b505af1158015612aae573d6000803e3d6000fd5b50506040805187815286151560208201523393507fe17beb8487c3e79865827ae14ef940fe858d8dd153cc7a4b25b041e2895e82f492500160405180910390a26040517fb943b0c100000000000000000000000000000000000000000000000000000000815260048082015260248101859052831515604482015273__$284e1ffe9f2937f5412f1e8a04db4dc613$__9063b943b0c1906064015b60206040518083038186803b158015612b6157600080fd5b505af4158015612b75573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061259e91906142b3565b6002546040516bffffffffffffffffffffffff193360601b1660208201526034810191909152600090819060540160408051601f1981840301815291815281516020928301206000818152600390935291205490915060ff16612c245760405162461bcd60e51b815260206004820152600360248201526239303360e81b60448201526064016106d7565b60165460405163c695d24960e01b81523360048201526001600160a01b039091169063c695d24990602401600060405180830381600087803b158015612c6957600080fd5b505af1158015612c7d573d6000803e3d6000fd5b50506040805187815286151560208201523393507ff98e7718ee4616550f38594da7703cb4a26dd80936283951d7741e86553e308692500160405180910390a26040517fc6ce9bfd00000000000000000000000000000000000000000000000000000000815260048082015260248101859052831515604482015273__$284e1ffe9f2937f5412f1e8a04db4dc613$__9063c6ce9bfd90606401612b49565b6040805161018081018252606080825260006020830181905292820183905281018290526080810182905260a0810182905260c0810182905260e081018290526101008101829052610120810182905261014081018290526101608101919091526000828152600a60205260409081902081516101808101909252805482908290612da690614bd7565b80601f0160208091040260200160405190810160405280929190818152602001828054612dd290614bd7565b8015612e1f5780601f10612df457610100808354040283529160200191612e1f565b820191906000526020600020905b815481529060010190602001808311612e0257829003601f168201915b505050918352505060018201546001600160a01b03166020820152600282015460408201526003820154606082015260048201546080820152600582015460a0820152600682015460ff808216151560c08401526101008083048216151560e0850152620100008304821615159084015263010000008204811615156101208401526401000000009091041615156101408201526007909101546101609091015292915050565b604080516101208082018352600080835260208084018290526060848601819052808501839052608080860184905260a080870185905260c080880186905260e0808901879052610100808a018890528a51808a018c52888152808801899052808c018790528087018990528086018990528085018990528084018990528083018990528082018990528b51808b018d528981528089018a9052808d018890528088018a90528087018a90528086018a90528085018a90528084018a90528083018a90528c51808c018e528a8152808a018b9052808e018990528089018b90528088018b90528087018b90528086018b90528085018b90528084018b90528d51808d018f528b8152808b018c9052808f018a90529889018b90529688018a905294870189905292860188905290850187905284018690528d8652600685528886208d87528987208d88528a88208d89528b89208d8a52988c90208c519a8b018d5283548b526001840154988b01989098526002830180549b9c949b959a969997989397929691959294919288928401919061306090614bd7565b80601f016020809104026020016040519081016040528092919081815260200182805461308c90614bd7565b80156130d95780601f106130ae576101008083540402835291602001916130d9565b820191906000526020600020905b8154815290600101906020018083116130bc57829003601f168201915b505050918352505060038201546001600160a01b03811660208084019190915260ff600160a01b830481161515604080860191909152600160a81b8404821615156060860152600160b01b8404821615156080860152600160b81b90930416151560a084015260049093015460c0909201919091528051610120810182528754815260018801549281019290925260028701805493985091928792918401919061318290614bd7565b80601f01602080910402602001604051908101604052809291908181526020018280546131ae90614bd7565b80156131fb5780601f106131d0576101008083540402835291602001916131fb565b820191906000526020600020905b8154815290600101906020018083116131de57829003601f168201915b505050918352505060038201546001600160a01b03811660208084019190915260ff600160a01b830481161515604080860191909152600160a81b8404821615156060860152600160b01b8404821615156080860152600160b81b90930416151560a084015260049093015460c090920191909152805161012081018252865481526001870154928101929092526002860180549397509192869291840191906132a490614bd7565b80601f01602080910402602001604051908101604052809291908181526020018280546132d090614bd7565b801561331d5780601f106132f25761010080835404028352916020019161331d565b820191906000526020600020905b81548152906001019060200180831161330057829003601f168201915b505050918352505060038201546001600160a01b03811660208084019190915260ff600160a01b830481161515604080860191909152600160a81b8404821615156060860152600160b01b8404821615156080860152600160b81b90930416151560a084015260049093015460c090920191909152805161012081018252855481526001860154928101929092526002850180549396509192859291840191906133c690614bd7565b80601f01602080910402602001604051908101604052809291908181526020018280546133f290614bd7565b801561343f5780601f106134145761010080835404028352916020019161343f565b820191906000526020600020905b81548152906001019060200180831161342257829003601f168201915b505050918352505060038201546001600160a01b03811660208084019190915260ff600160a01b830481161515604080860191909152600160a81b8404821615156060860152600160b01b8404821615156080860152600160b81b90930416151560a084015260049093015460c090920191909152805161012081018252845481526001850154928101929092526002840180549395509192849291840191906134e890614bd7565b80601f016020809104026020016040519081016040528092919081815260200182805461351490614bd7565b80156135615780601f1061353657610100808354040283529160200191613561565b820191906000526020600020905b81548152906001019060200180831161354457829003601f168201915b505050918352505060038201546001600160a01b038116602083015260ff600160a01b8204811615156040840152600160a81b8204811615156060840152600160b01b8204811615156080840152600160b81b90910416151560a082015260049091015460c090910152949f939e50919c509a509198509650505050505050565b6136376040518061010001604052806060815260200160006001600160a01b03168152602001600015158152602001600081526020016000815260200160008152602001600081526020016000151581525090565b6000828152600e6020526040908190208151610100810190925280548290829061366090614bd7565b80601f016020809104026020016040519081016040528092919081815260200182805461368c90614bd7565b80156136d95780601f106136ae576101008083540402835291602001916136d9565b820191906000526020600020905b8154815290600101906020018083116136bc57829003601f168201915b505050918352505060018201546001600160a01b038116602083015260ff600160a01b9091048116151560408301526002830154606083015260038301546080830152600483015460a0830152600583015460c0830152600690920154909116151560e09091015292915050565b60606004601001805480602002602001604051908101604052809291908181526020016000905b82821015610d2757838290600052602060002090600502016040518061012001604052908160008201548152602001600182015481526020016002820180546137b690614bd7565b80601f01602080910402602001604051908101604052809291908181526020018280546137e290614bd7565b801561382f5780601f106138045761010080835404028352916020019161382f565b820191906000526020600020905b81548152906001019060200180831161381257829003601f168201915b505050918352505060038201546001600160a01b03811660208084019190915260ff600160a01b8304811615156040850152600160a81b8304811615156060850152600160b01b8304811615156080850152600160b81b909204909116151560a083015260049092015460c090910152908252600192909201910161376e565b6016546040517f9a8b8c15000000000000000000000000000000000000000000000000000000008152600480820152602481018390526001600160a01b03909116604482015273__$284e1ffe9f2937f5412f1e8a04db4dc613$__90639a8b8c159060640160006040518083038186803b15801561392c57600080fd5b505af4158015613940573d6000803e3d6000fd5b5050505050565b6040805161018081018252606080825260006020830181905292820183905281018290526080810182905260a0810182905260c0810182905260e081018290526101008101829052610120810182905261014081018290526101608101919091526040805161018081018252606080825260006020830181905292820183905281018290526080810182905260a0810182905260c0810182905260e081018290526101008101829052610120810182905261014081018290526101608101919091526040805161018081018252606080825260006020830181905292820183905281018290526080810182905260a0810182905260c0810182905260e081018290526101008101829052610120810182905261014081018290526101608101919091526040805161018081018252606080825260006020830181905292820183905281018290526080810182905260a0810182905260c0810182905260e081018290526101008101829052610120810182905261014081018290526101608101919091526040805161018081018252606080825260006020830181905292820183905281018290526080810182905260a0810182905260c0810182905260e0810182905261010081018290526101208101829052610140810182905261016081019190915260008a8152600a60205260408082208b83528183208b84528284208b85528385208b865294849020845161018081019095528354939592949193909190869082908290613b7890614bd7565b80601f0160208091040260200160405190810160405280929190818152602001828054613ba490614bd7565b8015613bf15780601f10613bc657610100808354040283529160200191613bf1565b820191906000526020600020905b815481529060010190602001808311613bd457829003601f168201915b505050918352505060018201546001600160a01b0316602082015260028201546040808301919091526003830154606083015260048301546080830152600583015460a0830152600683015460ff808216151560c08501526101008083048216151560e0860152620100008304821615159085015263010000008204811615156101208501526401000000009091041615156101408301526007909201546101609091015280516101808101909152855491965090859082908290613cb590614bd7565b80601f0160208091040260200160405190810160405280929190818152602001828054613ce190614bd7565b8015613d2e5780601f10613d0357610100808354040283529160200191613d2e565b820191906000526020600020905b815481529060010190602001808311613d1157829003601f168201915b505050918352505060018201546001600160a01b0316602082015260028201546040808301919091526003830154606083015260048301546080830152600583015460a0830152600683015460ff808216151560c08501526101008083048216151560e0860152620100008304821615159085015263010000008204811615156101208501526401000000009091041615156101408301526007909201546101609091015280516101808101909152845491955090849082908290613df290614bd7565b80601f0160208091040260200160405190810160405280929190818152602001828054613e1e90614bd7565b8015613e6b5780601f10613e4057610100808354040283529160200191613e6b565b820191906000526020600020905b815481529060010190602001808311613e4e57829003601f168201915b505050918352505060018201546001600160a01b0316602082015260028201546040808301919091526003830154606083015260048301546080830152600583015460a0830152600683015460ff808216151560c08501526101008083048216151560e0860152620100008304821615159085015263010000008204811615156101208501526401000000009091041615156101408301526007909201546101609091015280516101808101909152835491945090839082908290613f2f90614bd7565b80601f0160208091040260200160405190810160405280929190818152602001828054613f5b90614bd7565b8015613fa85780601f10613f7d57610100808354040283529160200191613fa8565b820191906000526020600020905b815481529060010190602001808311613f8b57829003601f168201915b505050918352505060018201546001600160a01b0316602082015260028201546040808301919091526003830154606083015260048301546080830152600583015460a0830152600683015460ff808216151560c08501526101008083048216151560e086015262010000830482161515908501526301000000820481161515610120850152640100000000909104161515610140830152600790920154610160909101528051610180810190915282549193509082908290829061406c90614bd7565b80601f016020809104026020016040519081016040528092919081815260200182805461409890614bd7565b80156140e55780601f106140ba576101008083540402835291602001916140e5565b820191906000526020600020905b8154815290600101906020018083116140c857829003601f168201915b505050918352505060018201546001600160a01b03166020820152600282015460408201526003820154606082015260048201546080820152600582015460a0820152600682015460ff808216151560c08401526101008083048216151560e08501526201000083048216151590840152630100000082048116151561012084015264010000000090910416151561014082015260079091015461016090910152949f939e50919c509a509198509650505050505050565b8280546141a990614bd7565b90600052602060002090601f0160209004810192826141cb5760008555614211565b82601f106141e457805160ff1916838001178555614211565b82800160010185558215614211579182015b828111156142115782518255916020019190600101906141f6565b5061421d929150614221565b5090565b5b8082111561421d5760008155600101614222565b80356001600160a01b038116811461424d57600080fd5b919050565b60008083601f840112614263578182fd5b50813567ffffffffffffffff81111561427a578182fd5b60208301915083602082850101111561429257600080fd5b9250929050565b6000602082840312156142aa578081fd5b6111da82614236565b6000602082840312156142c4578081fd5b81516111da81614c2b565b600080602083850312156142e1578081fd5b823567ffffffffffffffff8111156142f7578182fd5b61430385828601614252565b90969095509350505050565b60008060008060008060a08789031215614327578182fd5b863567ffffffffffffffff81111561433d578283fd5b61434989828a01614252565b909750955050602087013561435d81614c2b565b9350604087013561436d81614c2b565b9250606087013561437d81614c2b565b80925050608087013590509295509295509295565b600080600080604085870312156143a7578384fd5b843567ffffffffffffffff808211156143be578586fd5b6143ca88838901614252565b909650945060208701359150808211156143e2578384fd5b506143ef87828801614252565b95989497509550505050565b60008060008060608587031215614410578384fd5b843567ffffffffffffffff811115614426578485fd5b61443287828801614252565b90955093505060208501359150604085013561444d81614c2b565b939692955090935050565b600060208284031215614469578081fd5b5035919050565b600060208284031215614481578081fd5b5051919050565b6000806040838503121561449a578182fd5b823591506144aa60208401614236565b90509250929050565b600080604083850312156144c5578182fd5b8235915060208301356144d781614c2b565b809150509250929050565b6000806000606084860312156144f6578283fd5b83359250602084013561450881614c2b565b9150604084013561451881614c2b565b809150509250925092565b600080600080600060a0868803121561453a578081fd5b505083359560208501359550604085013594606081013594506080013592509050565b6000815180845260208085019450808401835b8381101561458c57815187529582019590820190600101614570565b509495945050505050565b81835281816020850137506000828201602090810191909152601f909101601f19169091010190565b60008151808452815b818110156145e5576020818501810151868301820152016145c9565b818111156145f65782602083870101525b50601f01601f19169290920160200192915050565b600061012082518452602083015160208501526040830151816040860152614635828601826145c0565b9150506001600160a01b036060840151166060850152608083015161465e608086018215159052565b5060a083015161467260a086018215159052565b5060c083015161468660c086018215159052565b5060e083015161469a60e086018215159052565b50610100928301519390920192909252919050565b6000815160c084526146c460c08501826145c0565b90506001600160a01b03602084015116602085015260408301516040850152606083015160608501526080830151608085015260a0830151151560a08501528091505092915050565b60006101008251818552614723828601826145c0565b9150506001600160a01b036020840151166020850152604083015115156040850152606083015160608501526080830151608085015260a083015160a085015260c083015160c085015260e0830151151560e08501528091505092915050565b60006101808251818552614799828601826145c0565b91505060208301516147b660208601826001600160a01b03169052565b5060408301516040850152606083015160608501526080830151608085015260a083015160a085015260c08301516147f260c086018215159052565b5060e083015161480660e086018215159052565b506101008381015115159085015261012080840151151590850152610140808401511515908501526101609283015192909301919091525090565b8183823760009101908152919050565b6000602080830181845280855180835260408601915060408160051b8701019250838701855b828110156148a557603f1988860301845261489385835161460b565b94509285019290850190600101614877565b5092979650505050505050565b60208152600061259e602083018486614597565b6060815260006148da606083018688614597565b60208301949094525090151560409091015292915050565b6020815260006111da60208301846145c0565b6020815260006111da602083018461460b565b60a08152600061492b60a083018861460b565b828103602084015261493d818861460b565b90508281036040840152614951818761460b565b90508281036060840152614965818661460b565b9050828103608084015261277d818561460b565b83815260406020820152600061094f604083018486614597565b87815260c0602082015260006149ad60c08301888a614597565b9515156040830152509215156060840152901515608083015260a0909101529392505050565b8581526080602082015260006149ed608083018688614597565b6040830194909452509015156060909101529392505050565b602081526000825160806020840152614a2260a084018261455d565b90506020840151601f1980858403016040860152614a40838361455d565b92506040860151915080858403016060860152614a5d838361455d565b925060608601519150808584030160808601525061094f828261455d565b6020815260006111da60208301846146af565b60a081526000614aa160a08301886146af565b8281036020840152614ab381886146af565b90508281036040840152614ac781876146af565b90508281036060840152614adb81866146af565b9050828103608084015261277d81856146af565b6020815260006111da602083018461470d565b60a081526000614b1560a083018861470d565b8281036020840152614b27818861470d565b90508281036040840152614b3b818761470d565b90508281036060840152614b4f818661470d565b9050828103608084015261277d818561470d565b6020815260006111da6020830184614783565b60a081526000614b8960a0830188614783565b8281036020840152614b9b8188614783565b90508281036040840152614baf8187614783565b90508281036060840152614bc38186614783565b9050828103608084015261277d8185614783565b600181811c90821680614beb57607f821691505b60208210811415614c25577f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b50919050565b8015158114614c3957600080fd5b5056fea264697066735822122070395b64e0d2348719740347a918cf0df2b431ae67dc53a015d0999940300d4f64736f6c63430008040033",
  "linkReferences": {
    "contracts/libraries/CatalogDaoLib.sol": {
      "CatalogDaoLib": [
        {
          "length": 20,
          "start": 2497
        },
        {
          "length": 20,
          "start": 4683
        },
        {
          "length": 20,
          "start": 4871
        },
        {
          "length": 20,
          "start": 6654
        },
        {
          "length": 20,
          "start": 6841
        },
        {
          "length": 20,
          "start": 7218
        },
        {
          "length": 20,
          "start": 9356
        },
        {
          "length": 20,
          "start": 9729
        },
        {
          "length": 20,
          "start": 10200
        },
        {
          "length": 20,
          "start": 10887
        },
        {
          "length": 20,
          "start": 11274
        },
        {
          "length": 20,
          "start": 11737
        },
        {
          "length": 20,
          "start": 14806
        }
      ]
    }
  },
  "deployedLinkReferences": {
    "contracts/libraries/CatalogDaoLib.sol": {
      "CatalogDaoLib": [
        {
          "length": 20,
          "start": 2274
        },
        {
          "length": 20,
          "start": 4460
        },
        {
          "length": 20,
          "start": 4648
        },
        {
          "length": 20,
          "start": 6431
        },
        {
          "length": 20,
          "start": 6618
        },
        {
          "length": 20,
          "start": 6995
        },
        {
          "length": 20,
          "start": 9133
        },
        {
          "length": 20,
          "start": 9506
        },
        {
          "length": 20,
          "start": 9977
        },
        {
          "length": 20,
          "start": 10664
        },
        {
          "length": 20,
          "start": 11051
        },
        {
          "length": 20,
          "start": 11514
        },
        {
          "length": 20,
          "start": 14583
        }
      ]
    }
  }
}`};

export const getCatalogDAOAbi = () => {
  return JSON.parse(catalogDAO()).abi;
};

export const getCatalogDAOBytecode = () => {
  return JSON.parse(catalogDAO()).bytecode;
};
