import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import { ERC20Params } from "../../types";
import { getRicAbi } from "../abi/ricABI";
import { metamask_web3, RICADDRESS } from "../web3";

export const RICPARAMS: ERC20Params = {
  name: "PolyRIC",
  symbol: "PolyRIC",
  address: RICADDRESS,
  decimals: 18,
};

export async function getRicContract(): Promise<Contract> {
  return await new metamask_web3.eth.Contract(getRicAbi(), RICADDRESS);
}

export async function getERC20(address: string): Promise<Contract> {
  //Using the ric abi to check for generic erc20 contract
  return await new metamask_web3.eth.Contract(getRicAbi(), address);
}

export async function approve(
  ric: Contract,
  spender: string,
  amount: string,
  from: string,
  onError: any,
  onReceipt: any
) {
  await ric.methods
    .approve(spender, amount)
    .send({ from })
    .on("error", onError)
    .on("receipt", onReceipt);
}

export async function balanceOf(
  ric: Contract,
  address: string,
  from: string
): Promise<string> {
  const balance = await ric.methods.balanceOf(address).call({ from });
  return Web3.utils.fromWei(balance);
}

export async function totalSupply(
  ric: Contract,
  from: string
): Promise<string> {
  const totalSupply = await ric.methods.totalSupply().call({ from });
  return Web3.utils.fromWei(totalSupply);
}

export async function allowance(
  ric: Contract,
  owner: string,
  spender: string,
  from: string
): Promise<string> {
  const allowance = await ric.methods.allowance(owner, spender).call({ from });

  return Web3.utils.fromWei(allowance);
}

export async function getName(contract: Contract, from: string) {
  return await contract.methods.name().call({ from });
}
