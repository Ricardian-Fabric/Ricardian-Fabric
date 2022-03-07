import Web3 from "web3";
import {
  recoverTypedSignature,
  SignTypedDataVersion,
} from "@metamask/eth-sig-util";
import { toChecksumAddress } from "ethereumjs-util";
import {
  ChainName,
  Chains,
  ERC20Params,
  NetworkType,
  Options,
  Status,
} from "../types";
import { getSimpleTermsAbi } from "./abi/SimpleTerms";
import { HARMONYRPCURL } from "./catalogDAO/contractCalls";

export const SIGNUPADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
export const TRAILSADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
export const CATALOGDAOADDRESS = "0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6"; // On local hardhat testnet
export const RICADDRESS = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
export const RICSALEADDRESS = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9"; // On local hardhat testnet

export const ARWAVEPSADDRESS = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9";
export const DAOSTAKINGADDRESS = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707";
export const FEEDAOADDRESS = "0x610178dA211FEF7D417bC0e6FeD39F05609AD788";
export const RICVAULTADDRESS = "0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e";

export const metamask_web3 = new Web3(window.ethereum);
export const rpc_web3 = new Web3(HARMONYRPCURL);

const CATALOGCHAIN = Chains.HardHat;

export async function requestAccounts() {
  await window.ethereum.request({ method: "eth_requestAccounts" });
}

export async function watchAsset(erc20Params: ERC20Params, onError: any) {
  await window.ethereum
    .request({
      method: "wallet_watchAsset",
      params: {
        type: "ERC20",
        options: {
          address: erc20Params.address,
          symbol: erc20Params.symbol,
          decimals: erc20Params.decimals,
        },
      },
    })
    .then((success) => {
      if (success) {
      } else {
        onError();
      }
    })
    .catch(console.error);
}

export async function getAddress(): Promise<string> {
  const web3 = new Web3(window.ethereum);
  const accounts = await web3.eth.getAccounts();

  return accounts[0];
}

export async function getBlockNumber() {
  const web3 = new Web3(window.ethereum);
  return await web3.eth.getBlockNumber();
}

export async function getNetwork(): Promise<number> {
  const hex = window.ethereum.chainId;
  return Number(hex);
}

export async function signHash(
  hash: string,
  from: string,
  networkId: string,
  smartContract: string,
  onSuccess: CallableFunction,
  onError: CallableFunction
) {
  const msgParams = getmsgParams(networkId, smartContract, hash);

  await window.ethereum.sendAsync(
    {
      method: "eth_signTypedData_v3",
      params: [from, JSON.stringify(msgParams)],
    },
    async function (err, result) {
      if (result.error) {
        onError(result.error.message);
      } else {
        const recovered = recoverTypedSignatures(msgParams, result.result);
        if (compareAddresses(from, recovered)) {
          await onSuccess(result.result);
        } else {
          await onError("Signature verification failed.");
        }
      }
    }
  );
}

export function getmsgParams(
  networkId: string,
  smartContract: string,
  hash: string
) {
  const doc = [{ name: "value", type: "string" }];
  const message = { value: hash };
  const msgParams = {
    domain: {
      chainId: networkId,
      name: "Ricardian Fabric",
      verifyingContract: smartContract,
      version: "1",
    },
    types: {
      EIP712Domain: [
        { name: "name", type: "string" },
        { name: "version", type: "string" },
        { name: "chainId", type: "uint256" },
        { name: "verifyingContract", type: "address" },
      ],
      doc,
    },
    primaryType: "doc",
    message,
  };
  return msgParams;
}

export function recoverTypedSignatures(msgParams, signature) {
  const recovered = recoverTypedSignature({
    data: msgParams,
    signature: signature,
    version: SignTypedDataVersion.V3,
  });
  return recovered;
}

export function compareAddresses(signer: any, recovered: any): boolean {
  // The recovered is an object during runtime
  if (toChecksumAddress(recovered) === toChecksumAddress(signer)) {
    return true;
  } else {
    return false;
  }
}

export function web3Injected(): boolean {
  if (window.ethereum.send) {
    return true;
  } else {
    return false;
  }
}

// I'm using web3 in the below function because it throws errors nice for this validation.
export async function canUseContract(
  address: string,
  issuer: string
): Promise<boolean> {
  let success = true;
  const web3 = new Web3(window.ethereum);
  try {
    const agreementContract = await new web3.eth.Contract(
      getSimpleTermsAbi(),
      address
    );

    //If accepted terms is false, means I can use, this line below is for checking if it throws error
    const resul = await agreementContract.methods.acceptedTerms(issuer).call();
  } catch (err) {
    success = false;
  }

  return success;
}

// A function to get a boolean, if I can agree to the contract or not
export async function canAgree(
  contractAddress: string,
  signerAddress: string
): Promise<boolean> {
  try {
    const web3 = new Web3(window.ethereum);

    const contract = new web3.eth.Contract(
      getSimpleTermsAbi(),
      contractAddress
    );

    const alreadyAccepted = await contract.methods
      .acceptedTerms(signerAddress)
      .call();

    return !alreadyAccepted;
  } catch (err) {
    console.log(err);
  }
  return false;
}

// I need a function to add a new agreement to a compatible smart contract
// Pass in the document hash,issuer,signature,network
export async function setTerms(arg: {
  url: string;
  hash: string;
  contractAddress: string;
  signerAddress: string;
}): Promise<Options<any>> {
  const options: Options<any> = {
    error: "",
    status: Status.Success,
    data: {},
  };
  try {
    const web3 = new Web3(window.ethereum);

    const contract = new web3.eth.Contract(
      getSimpleTermsAbi(),
      arg.contractAddress
    );

    const resp = await contract.methods
      .setTerms(arg.url, arg.hash)
      .send({ from: arg.signerAddress });

    options.data = resp;
  } catch (err) {
    options.status = Status.Failure;
    options.error = err.message;
  }

  return options;
}

//I need to call an Accept function on a smart contract
// Pass in the document,
export async function acceptAgreement(arg: {
  url: string;
  hash: string;
  contractAddress: string;
  signerAddress: string;
}): Promise<Options<any>> {
  const options: Options<any> = {
    error: "",
    status: Status.Success,
    data: {},
  };
  try {
    const web3 = new Web3(window.ethereum);

    const contract = new web3.eth.Contract(
      getSimpleTermsAbi(),
      arg.contractAddress
    );

    //TODO: handle onError, onReceipt
    const resp = await contract.methods
      .accept(arg.hash)
      .send({ from: arg.signerAddress });
  } catch (err) {
    options.status = Status.Failure;
    options.error = err.message;
  }
  return options;
}

export function getChains() {
  return [
    { name: "All", id: "ALL" },
    { name: ChainName.Harmony, id: Chains.harmonyTestnetShard0 },
  ];
}

export async function switchNetwork(
  network: ChainName,
  shard: number,
  type: NetworkType
) {
  if (network === ChainName.hardhat) {
    await switchToHardhat();
  }

  if (network === ChainName.Harmony) {
    await switchToHarmony(shard, type);
  }
  if (network === ChainName.Ropsten) {
    await switch_to_Chain("0x3");
    // Ropsten is in metamask by default so adding it is redundant
  }

  if (network === ChainName.BSC) {
    await switchToBSC(type);
  }

  if (network === ChainName.Polygon) {
    await switchToPolygon(type);
  }
}

export async function switchToHardhat() {
  const hexChainid = "0x" + Number(31337).toString(16);
  const switched = await switch_to_Chain(hexChainid);
  if (!switched) {
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: hexChainid,
          chainName: "Localhost 8545",
          nativeCurrency: {
            name: "ETH",
            symbol: "ETH",
            decimals: 18,
          },
          rpcUrls: ["http://localhost:8545"],
          blockExplorerUrls: ["http://localhost:8545"],
        },
      ],
    });
  }
}

export async function switchToBSC(type: NetworkType) {
  const hexchainId = "0x" + Number(97).toString(16);
  const switched = await switch_to_Chain(hexchainId);
  const chainName = type === "Mainnet" ? "BSC" : "BSC testnet";
  const rpcUrls = ["https://data-seed-prebsc-1-s1.binance.org:8545"];
  const blockExplorerUrls = ["https://explorer.binance.org/smart-testnet"];
  if (!switched) {
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: hexchainId,
          chainName,
          nativeCurrency: {
            name: "BNB",
            symbol: "BNB",
            decimals: 18,
          },
          rpcUrls,
          blockExplorerUrls,
        },
      ],
    });
  }
}
export async function switchToPolygon(type: NetworkType) {
  const hexchainId = "0x" + Number(80001).toString(16);
  const switched = await switch_to_Chain(hexchainId);
  const chainName = type === "Mainnet" ? "Polygon" : "Polygon testnet";
  const rpcUrls = ["https://rpc-mumbai.maticvigil.com/"];
  const blockExplorerUrls = ["https://mumbai.polygonscan.com/"];
  if (!switched) {
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: hexchainId,
          chainName,
          nativeCurrency: {
            name: "MATIC",
            symbol: "MATIC",
            decimals: 18,
          },
          rpcUrls,
          blockExplorerUrls,
        },
      ],
    });
  }
}

export async function switchToHarmony(shard: number, type: NetworkType) {
  const chainName =
    type === "Mainnet"
      ? "Harmony Mainnet Shard " + shard
      : "Harmony Testnet Shard " + shard;
  let chainId = type === "Mainnet" ? 1666600000 : 1666700000;

  // Calculate the shard
  chainId += shard;
  const hexchainId = "0x" + Number(chainId).toString(16);
  const blockExplorerUrls =
    type === "Mainnet"
      ? ["https://explorer.harmony.one/#/"]
      : ["https://explorer.pops.one/#/"];

  const rpcUrls = getHarmonyRPCURLS(shard, type);

  const switched = await switch_to_Chain(hexchainId);
  if (!switched) {
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: "0x" + Number(chainId).toString(16),
          chainName,
          nativeCurrency: {
            name: "ONE",
            symbol: "ONE",
            decimals: 18,
          },
          rpcUrls,
          blockExplorerUrls,
        },
      ],
    });
  }
}

async function switch_to_Chain(chainId: string) {
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId }],
    });
    return true;
  } catch (err) {
    return false;
  }
}

async function switchToAvalanche() {
  //TODO: Add avalanche!!
  //TODO: Add XDAI
  //TODO: Add Fantom
  //TODO: Add optimism
  //TODO: Add arbitrum
  const AVALANCHE_MAINNET_PARAMS = {
    chainId: "0xA86A",
    chainName: "Avalanche Mainnet C-Chain",
    nativeCurrency: {
      name: "Avalanche",
      symbol: "AVAX",
      decimals: 18,
    },
    rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"],
    blockExplorerUrls: ["https://snowtrace.io/"],
  };
  const AVALANCHE_TESTNET_PARAMS = {
    chainId: "0xA869",
    chainName: "Avalanche Testnet C-Chain",
    nativeCurrency: {
      name: "Avalanche",
      symbol: "AVAX",
      decimals: 18,
    },
    rpcUrls: ["https://api.avax-test.network/ext/bc/C/rpc"],
    blockExplorerUrls: ["https://testnet.snowtrace.io/"],
  };
}

function getHarmonyRPCURLS(shard: number, type: "Mainnet" | "Testnet") {
  if (type === "Mainnet") {
    switch (shard) {
      case 0:
        return ["https://api.harmony.one"];
      case 1:
        return ["https://s1.api.harmony.one"];
      case 2:
        return ["https://s2.api.harmony.one"];
      case 3:
        return ["https://s3.api.harmony.one"];
      default:
        break;
    }
  } else if (type === "Testnet") {
    switch (shard) {
      case 0:
        return ["https://api.s0.b.hmny.io"];
      case 1:
        return ["https://api.s1.b.hmny.io"];
      case 2:
        return ["https://api.s2.b.hmny.io"];
      case 3:
        return ["https://api.s3.b.hmny.io"];
      default:
        break;
    }
  }
}

export function findConstructorParameters(abi: Array<any>) {
  let constructorParams;
  for (let i = 0; i < abi.length; i++) {
    if (abi[i].type === "constructor") {
      constructorParams = abi[i].inputs;
    }
  }
  return constructorParams;
}

export async function deployContract(
  abi: any,
  bytecode: any,
  address: string,
  args: Array<any>,
  onError: any,
  onReceipt: any
) {
  const web3 = new Web3(window.ethereum);

  await new web3.eth.Contract(abi)
    .deploy({
      data: bytecode,
      arguments: args,
    })
    .send({ from: address })
    .on("error", onError)
    .on("receipt", onReceipt);
}

export function prepareType(type: string, value: string) {
  if (type.includes("int") && type !== "uint256") {
    return Web3.utils.toNumber(value);
  } else if (type === "uint256") {
    return Web3.utils.toWei(value);
  } else {
    return value;
  }
}

export async function checkNetwork(): Promise<boolean> {
  const chainId: string = await window.ethereum.request({
    method: "eth_chainId",
  });

  // Comparing to hardhat now, later HARMONY
  return Number(chainId) === Number(CATALOGCHAIN);
}
