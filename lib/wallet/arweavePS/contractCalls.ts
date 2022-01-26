import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import { ProfitShare } from "../../types";
import { getArweavePSAbi } from "../abi/arweavePSABI";
import { ARWAVEPSADDRESS } from "../web3";

export async function getArweavePSContract(): Promise<Contract> {
  const web3 = new Web3(window.ethereum);
  return await new web3.eth.Contract(getArweavePSAbi(), ARWAVEPSADDRESS);
}

export async function setPS(
  arweavePS: Contract,
  toAddress: string,
  from: string,
  onError: any,
  onReceipt: any
) {
  await arweavePS.methods
    .setPS(toAddress)
    .send({ from })
    .on("error", onError)
    .on("receipt", onReceipt);
}
export async function stopPS(
  arweavePS: Contract,
  from: string,
  onError: any,
  onReceipt: any
) {
  await arweavePS.methods
    .stopPS()
    .send({ from })
    .on("error", onError)
    .on("receipt", onReceipt);
}

export async function getAllPS(
  arweavePS: Contract,
  from: string
): Promise<ProfitShare[]> {
  return await arweavePS.methods.getAllPS().call({ from });
}

export async function getPS(
  arweavePS: Contract,
  address: string,
  from: string
): Promise<ProfitShare> {
  return await arweavePS.methods.getPS(address).call({ from });
}
