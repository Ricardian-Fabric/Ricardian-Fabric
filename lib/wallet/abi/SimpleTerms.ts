const SimpleTermsABIJSON = `{
  "_format": "hh-sol-artifact-1",
  "contractName": "SimpleTerms",
  "sourceName": "contracts/SimpleTerms.sol",
  "abi": [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "participantAddress",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "proof",
          "type": "string"
        }
      ],
      "name": "NewParticipant",
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
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "value",
          "type": "string"
        }
      ],
      "name": "NewTerms",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint8",
          "name": "v",
          "type": "uint8"
        },
        {
          "internalType": "bytes32",
          "name": "r",
          "type": "bytes32"
        },
        {
          "internalType": "bytes32",
          "name": "s",
          "type": "bytes32"
        },
        {
          "internalType": "string",
          "name": "value",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "url",
          "type": "string"
        }
      ],
      "name": "Accept",
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
          "name": "_url",
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
          "internalType": "uint8",
          "name": "v",
          "type": "uint8"
        },
        {
          "internalType": "bytes32",
          "name": "r",
          "type": "bytes32"
        },
        {
          "internalType": "bytes32",
          "name": "s",
          "type": "bytes32"
        },
        {
          "internalType": "string",
          "name": "value",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "url",
          "type": "string"
        }
      ],
      "name": "verifySignature",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ],
  "bytecode": "0x608060405234801561001057600080fd5b50336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550611201806100606000396000f3fe608060405234801561001057600080fd5b50600436106100625760003560e01c80630278bbaa146100675780630e0d7f07146100975780631d143848146100c75780631d8c8971146100e55780634173b41714610115578063e2b2e4f914610133575b600080fd5b610081600480360381019061007c9190610ad3565b61014f565b60405161008e9190610daa565b60405180910390f35b6100b160048036038101906100ac9190610a35565b610367565b6040516100be9190610dc5565b60405180910390f35b6100cf6103c5565b6040516100dc9190610daa565b60405180910390f35b6100ff60048036038101906100fa9190610a5e565b6103e9565b60405161010c9190610dc5565b60405180910390f35b61011d6104e1565b60405161012a9190610f0e565b60405180910390f35b61014d60048036038101906101489190610ad3565b610576565b005b60008046905060007f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f6040518060400160405280601081526020017f52696361726469616e2046616272696300000000000000000000000000000000815250805190602001206040518060400160405280600181526020017f3100000000000000000000000000000000000000000000000000000000000000815250805190602001208430604051602001610208959493929190610e17565b60405160208183030381529060405280519060200120905061022982610679565b61023230610712565b60006040518060400160405280601c81526020017f646f6328737472696e672076616c75652c737472696e672075726c2900000000815250805190602001208888604051610281929190610d41565b60405180910390208787604051610299929190610d41565b60405180910390206040516020016102b393929190610de0565b604051602081830303815290604052805190602001209050600082826040516020016102e0929190610d73565b60405160208183030381529060405280519060200120905060006001828e8e8e6040516000815260200160405260405161031d9493929190610e6a565b6020604051602081039080840390855afa15801561033f573d6000803e3d6000fd5b50505060206040510351905061035481610712565b8095505050505050979650505050505050565b600080826001800154604051602001610381929190610d15565b6040516020818303038152906040528051906020012090506003600082815260200190815260200160002060000160009054906101000a900460ff16915050919050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000604051806040016040528086868080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505081526020018484604051602001610453929190610d5a565b604051602081830303815290604052805190602001208152506001600082015181600001908051906020019061048a929190610909565b50602082015181600101559050507f3def438507a5fd65021c8d9fca0c88e39e657f8f3af16199c7a9f8046fc8e6e5858585856040516104cd9493929190610ed3565b60405180910390a160019050949350505050565b6060600160000180546104f39061105e565b80601f016020809104026020016040519081016040528092919081815260200182805461051f9061105e565b801561056c5780601f106105415761010080835404028352916020019161056c565b820191906000526020600020905b81548152906001019060200180831161054f57829003601f168201915b5050505050905090565b6001800154848460405160200161058e929190610d5a565b60405160208183030381529060405280519060200120146105e4576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105db90610f30565b60405180910390fd5b60006105f58888888888888861014f565b90503373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614610665576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161065c90610f50565b60405180910390fd5b61066f83836107ab565b5050505050505050565b61070f8160405160240161068d9190610f70565b6040516020818303038152906040527ff5b1bba9000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff83818316178352505050506108e0565b50565b6107a8816040516024016107269190610daa565b6040516020818303038152906040527f2c2ecbc2000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff83818316178352505050506108e0565b50565b60003360018001546040516020016107c4929190610d15565b604051602081830303815290604052805190602001209050604051806040016040528060011515815260200184848080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050508152506003600083815260200190815260200160002060008201518160000160006101000a81548160ff0219169083151502179055506020820151816001019080519060200190610887929190610909565b509050503373ffffffffffffffffffffffffffffffffffffffff167f154ab44689d96a0abbf24c36bcba6c7baf03964289310de6db2339c5a6a93df584846040516108d3929190610eaf565b60405180910390a2505050565b60008151905060006a636f6e736f6c652e6c6f679050602083016000808483855afa5050505050565b8280546109159061105e565b90600052602060002090601f016020900481019282610937576000855561097e565b82601f1061095057805160ff191683800117855561097e565b8280016001018555821561097e579182015b8281111561097d578251825591602001919060010190610962565b5b50905061098b919061098f565b5090565b5b808211156109a8576000816000905550600101610990565b5090565b6000813590506109bb81611186565b92915050565b6000813590506109d08161119d565b92915050565b60008083601f8401126109e857600080fd5b8235905067ffffffffffffffff811115610a0157600080fd5b602083019150836001820283011115610a1957600080fd5b9250929050565b600081359050610a2f816111b4565b92915050565b600060208284031215610a4757600080fd5b6000610a55848285016109ac565b91505092915050565b60008060008060408587031215610a7457600080fd5b600085013567ffffffffffffffff811115610a8e57600080fd5b610a9a878288016109d6565b9450945050602085013567ffffffffffffffff811115610ab957600080fd5b610ac5878288016109d6565b925092505092959194509250565b600080600080600080600060a0888a031215610aee57600080fd5b6000610afc8a828b01610a20565b9750506020610b0d8a828b016109c1565b9650506040610b1e8a828b016109c1565b955050606088013567ffffffffffffffff811115610b3b57600080fd5b610b478a828b016109d6565b9450945050608088013567ffffffffffffffff811115610b6657600080fd5b610b728a828b016109d6565b925092505092959891949750929550565b610b8c81610fbd565b82525050565b610ba3610b9e82610fbd565b611090565b82525050565b610bb281610fcf565b82525050565b610bc181610fdb565b82525050565b610bd8610bd382610fdb565b6110a2565b82525050565b6000610bea8385610f96565b9350610bf783858461101c565b82840190509392505050565b6000610c0f8385610fa1565b9350610c1c83858461101c565b610c25836110ed565b840190509392505050565b6000610c3c8385610fb2565b9350610c4983858461101c565b82840190509392505050565b6000610c6082610f8b565b610c6a8185610fa1565b9350610c7a81856020860161102b565b610c83816110ed565b840191505092915050565b6000610c9b600d83610fa1565b9150610ca68261110b565b602082019050919050565b6000610cbe600283610fb2565b9150610cc982611134565b600282019050919050565b6000610ce1601d83610fa1565b9150610cec8261115d565b602082019050919050565b610d0081611005565b82525050565b610d0f8161100f565b82525050565b6000610d218285610b92565b601482019150610d318284610bc7565b6020820191508190509392505050565b6000610d4e828486610bde565b91508190509392505050565b6000610d67828486610c30565b91508190509392505050565b6000610d7e82610cb1565b9150610d8a8285610bc7565b602082019150610d9a8284610bc7565b6020820191508190509392505050565b6000602082019050610dbf6000830184610b83565b92915050565b6000602082019050610dda6000830184610ba9565b92915050565b6000606082019050610df56000830186610bb8565b610e026020830185610bb8565b610e0f6040830184610bb8565b949350505050565b600060a082019050610e2c6000830188610bb8565b610e396020830187610bb8565b610e466040830186610bb8565b610e536060830185610cf7565b610e606080830184610b83565b9695505050505050565b6000608082019050610e7f6000830187610bb8565b610e8c6020830186610d06565b610e996040830185610bb8565b610ea66060830184610bb8565b95945050505050565b60006020820190508181036000830152610eca818486610c03565b90509392505050565b60006040820190508181036000830152610eee818688610c03565b90508181036020830152610f03818486610c03565b905095945050505050565b60006020820190508181036000830152610f288184610c55565b905092915050565b60006020820190508181036000830152610f4981610c8e565b9050919050565b60006020820190508181036000830152610f6981610cd4565b9050919050565b6000602082019050610f856000830184610cf7565b92915050565b600081519050919050565b600081905092915050565b600082825260208201905092915050565b600081905092915050565b6000610fc882610fe5565b9050919050565b60008115159050919050565b6000819050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600060ff82169050919050565b82818337600083830152505050565b60005b8381101561104957808201518184015260208101905061102e565b83811115611058576000848401525b50505050565b6000600282049050600182168061107657607f821691505b6020821081141561108a576110896110be565b5b50919050565b600061109b826110ac565b9050919050565b6000819050919050565b60006110b7826110fe565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000601f19601f8301169050919050565b60008160601b9050919050565b7f496e76616c6964207465726d7300000000000000000000000000000000000000600082015250565b7f1901000000000000000000000000000000000000000000000000000000000000600082015250565b7f546865207369676e6572206d757374206265207468652073656e646572000000600082015250565b61118f81610fbd565b811461119a57600080fd5b50565b6111a681610fdb565b81146111b157600080fd5b50565b6111bd8161100f565b81146111c857600080fd5b5056fea26469706673582212206b8b3301dff4c0508a6b891afc8ab2035a339038273d599517f24929157aa5ba64736f6c63430008040033",
  "deployedBytecode": "0x608060405234801561001057600080fd5b50600436106100625760003560e01c80630278bbaa146100675780630e0d7f07146100975780631d143848146100c75780631d8c8971146100e55780634173b41714610115578063e2b2e4f914610133575b600080fd5b610081600480360381019061007c9190610ad3565b61014f565b60405161008e9190610daa565b60405180910390f35b6100b160048036038101906100ac9190610a35565b610367565b6040516100be9190610dc5565b60405180910390f35b6100cf6103c5565b6040516100dc9190610daa565b60405180910390f35b6100ff60048036038101906100fa9190610a5e565b6103e9565b60405161010c9190610dc5565b60405180910390f35b61011d6104e1565b60405161012a9190610f0e565b60405180910390f35b61014d60048036038101906101489190610ad3565b610576565b005b60008046905060007f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f6040518060400160405280601081526020017f52696361726469616e2046616272696300000000000000000000000000000000815250805190602001206040518060400160405280600181526020017f3100000000000000000000000000000000000000000000000000000000000000815250805190602001208430604051602001610208959493929190610e17565b60405160208183030381529060405280519060200120905061022982610679565b61023230610712565b60006040518060400160405280601c81526020017f646f6328737472696e672076616c75652c737472696e672075726c2900000000815250805190602001208888604051610281929190610d41565b60405180910390208787604051610299929190610d41565b60405180910390206040516020016102b393929190610de0565b604051602081830303815290604052805190602001209050600082826040516020016102e0929190610d73565b60405160208183030381529060405280519060200120905060006001828e8e8e6040516000815260200160405260405161031d9493929190610e6a565b6020604051602081039080840390855afa15801561033f573d6000803e3d6000fd5b50505060206040510351905061035481610712565b8095505050505050979650505050505050565b600080826001800154604051602001610381929190610d15565b6040516020818303038152906040528051906020012090506003600082815260200190815260200160002060000160009054906101000a900460ff16915050919050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000604051806040016040528086868080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505081526020018484604051602001610453929190610d5a565b604051602081830303815290604052805190602001208152506001600082015181600001908051906020019061048a929190610909565b50602082015181600101559050507f3def438507a5fd65021c8d9fca0c88e39e657f8f3af16199c7a9f8046fc8e6e5858585856040516104cd9493929190610ed3565b60405180910390a160019050949350505050565b6060600160000180546104f39061105e565b80601f016020809104026020016040519081016040528092919081815260200182805461051f9061105e565b801561056c5780601f106105415761010080835404028352916020019161056c565b820191906000526020600020905b81548152906001019060200180831161054f57829003601f168201915b5050505050905090565b6001800154848460405160200161058e929190610d5a565b60405160208183030381529060405280519060200120146105e4576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105db90610f30565b60405180910390fd5b60006105f58888888888888861014f565b90503373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614610665576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161065c90610f50565b60405180910390fd5b61066f83836107ab565b5050505050505050565b61070f8160405160240161068d9190610f70565b6040516020818303038152906040527ff5b1bba9000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff83818316178352505050506108e0565b50565b6107a8816040516024016107269190610daa565b6040516020818303038152906040527f2c2ecbc2000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff83818316178352505050506108e0565b50565b60003360018001546040516020016107c4929190610d15565b604051602081830303815290604052805190602001209050604051806040016040528060011515815260200184848080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050508152506003600083815260200190815260200160002060008201518160000160006101000a81548160ff0219169083151502179055506020820151816001019080519060200190610887929190610909565b509050503373ffffffffffffffffffffffffffffffffffffffff167f154ab44689d96a0abbf24c36bcba6c7baf03964289310de6db2339c5a6a93df584846040516108d3929190610eaf565b60405180910390a2505050565b60008151905060006a636f6e736f6c652e6c6f679050602083016000808483855afa5050505050565b8280546109159061105e565b90600052602060002090601f016020900481019282610937576000855561097e565b82601f1061095057805160ff191683800117855561097e565b8280016001018555821561097e579182015b8281111561097d578251825591602001919060010190610962565b5b50905061098b919061098f565b5090565b5b808211156109a8576000816000905550600101610990565b5090565b6000813590506109bb81611186565b92915050565b6000813590506109d08161119d565b92915050565b60008083601f8401126109e857600080fd5b8235905067ffffffffffffffff811115610a0157600080fd5b602083019150836001820283011115610a1957600080fd5b9250929050565b600081359050610a2f816111b4565b92915050565b600060208284031215610a4757600080fd5b6000610a55848285016109ac565b91505092915050565b60008060008060408587031215610a7457600080fd5b600085013567ffffffffffffffff811115610a8e57600080fd5b610a9a878288016109d6565b9450945050602085013567ffffffffffffffff811115610ab957600080fd5b610ac5878288016109d6565b925092505092959194509250565b600080600080600080600060a0888a031215610aee57600080fd5b6000610afc8a828b01610a20565b9750506020610b0d8a828b016109c1565b9650506040610b1e8a828b016109c1565b955050606088013567ffffffffffffffff811115610b3b57600080fd5b610b478a828b016109d6565b9450945050608088013567ffffffffffffffff811115610b6657600080fd5b610b728a828b016109d6565b925092505092959891949750929550565b610b8c81610fbd565b82525050565b610ba3610b9e82610fbd565b611090565b82525050565b610bb281610fcf565b82525050565b610bc181610fdb565b82525050565b610bd8610bd382610fdb565b6110a2565b82525050565b6000610bea8385610f96565b9350610bf783858461101c565b82840190509392505050565b6000610c0f8385610fa1565b9350610c1c83858461101c565b610c25836110ed565b840190509392505050565b6000610c3c8385610fb2565b9350610c4983858461101c565b82840190509392505050565b6000610c6082610f8b565b610c6a8185610fa1565b9350610c7a81856020860161102b565b610c83816110ed565b840191505092915050565b6000610c9b600d83610fa1565b9150610ca68261110b565b602082019050919050565b6000610cbe600283610fb2565b9150610cc982611134565b600282019050919050565b6000610ce1601d83610fa1565b9150610cec8261115d565b602082019050919050565b610d0081611005565b82525050565b610d0f8161100f565b82525050565b6000610d218285610b92565b601482019150610d318284610bc7565b6020820191508190509392505050565b6000610d4e828486610bde565b91508190509392505050565b6000610d67828486610c30565b91508190509392505050565b6000610d7e82610cb1565b9150610d8a8285610bc7565b602082019150610d9a8284610bc7565b6020820191508190509392505050565b6000602082019050610dbf6000830184610b83565b92915050565b6000602082019050610dda6000830184610ba9565b92915050565b6000606082019050610df56000830186610bb8565b610e026020830185610bb8565b610e0f6040830184610bb8565b949350505050565b600060a082019050610e2c6000830188610bb8565b610e396020830187610bb8565b610e466040830186610bb8565b610e536060830185610cf7565b610e606080830184610b83565b9695505050505050565b6000608082019050610e7f6000830187610bb8565b610e8c6020830186610d06565b610e996040830185610bb8565b610ea66060830184610bb8565b95945050505050565b60006020820190508181036000830152610eca818486610c03565b90509392505050565b60006040820190508181036000830152610eee818688610c03565b90508181036020830152610f03818486610c03565b905095945050505050565b60006020820190508181036000830152610f288184610c55565b905092915050565b60006020820190508181036000830152610f4981610c8e565b9050919050565b60006020820190508181036000830152610f6981610cd4565b9050919050565b6000602082019050610f856000830184610cf7565b92915050565b600081519050919050565b600081905092915050565b600082825260208201905092915050565b600081905092915050565b6000610fc882610fe5565b9050919050565b60008115159050919050565b6000819050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600060ff82169050919050565b82818337600083830152505050565b60005b8381101561104957808201518184015260208101905061102e565b83811115611058576000848401525b50505050565b6000600282049050600182168061107657607f821691505b6020821081141561108a576110896110be565b5b50919050565b600061109b826110ac565b9050919050565b6000819050919050565b60006110b7826110fe565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000601f19601f8301169050919050565b60008160601b9050919050565b7f496e76616c6964207465726d7300000000000000000000000000000000000000600082015250565b7f1901000000000000000000000000000000000000000000000000000000000000600082015250565b7f546865207369676e6572206d757374206265207468652073656e646572000000600082015250565b61118f81610fbd565b811461119a57600080fd5b50565b6111a681610fdb565b81146111b157600080fd5b50565b6111bd8161100f565b81146111c857600080fd5b5056fea26469706673582212206b8b3301dff4c0508a6b891afc8ab2035a339038273d599517f24929157aa5ba64736f6c63430008040033",
  "linkReferences": {},
  "deployedLinkReferences": {}
}`;

export const getSimpleTermsAbi = () => {
  return JSON.parse(SimpleTermsABIJSON).abi;
};
