import { Contract } from "web3-eth-contract";
import Web3 from "web3";
import { getRicSaleAbi } from "../abi/ricSaleABI";
import { metamask_web3, RICSALEADDRESS } from "../web3";

export async function getRicSaleContract() {
  return await new metamask_web3.eth.Contract(getRicSaleAbi(), RICSALEADDRESS);
}

export async function buyTokens(
  ricsale: Contract,
  weiAmount: string,
  from: string,
  onError: any,
  onReceipt: any
) {
  await ricsale.methods
    .buyTokens()
    .send({ from, value: weiAmount })
    .on("error", onError)
    .on("receipt", onReceipt);
}

export async function token(ricsale: Contract, from: string): Promise<string> {
  return await ricsale.methods.token().call({ from });
}

export async function wallet(ricsale: Contract, from: string): Promise<string> {
  return await ricsale.methods.wallet().call({ from });
}

export async function weiRaised(
  ricsale: Contract,
  from: string
): Promise<string> {
  return await ricsale.methods.weiRaised().call({ from });
}

export async function remainingTokens(
  ricsale: Contract,
  from: string
): Promise<string> {
  const remaining = await ricsale.methods.remainingTokens().call({ from });

  return Web3.utils.fromWei(remaining);
}

export async function getTokensSold(
  ricsale: Contract,
  from: string
): Promise<string> {
  return await ricsale.methods.getTokensSold().call({ from });
}

export async function getCurrentRate(
  ricsale: Contract,
  from: string
): Promise<string> {
  return await ricsale.methods.getCurrentRate().call({ from });
}
