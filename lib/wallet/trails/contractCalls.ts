import { Contract } from "web3-eth-contract";
import { TrailsABI } from "../abi/TrailsABI";
import { metamask_web3, rpc_web3, TRAILSADDRESS } from "../web3";
import { TrailDetails } from "../../types";

export async function getTrailsContractWithRPC() {
  return await new rpc_web3.eth.Contract(TrailsABI(), TRAILSADDRESS);
}

export async function getTrailsContract() {
  return await new metamask_web3.eth.Contract(TrailsABI(), TRAILSADDRESS);
}

export async function newTrail(
  trails: Contract,
  trailId: string,
  access: "private" | "public",
  from: string,
  onError: any,
  onReceipt: any
) {
  let acc = access === "private" ? 0 : 1;
  await trails.methods
    .newTrail(trailId, acc)
    .send({ from })
    .on("error", onError)
    .on("receipt", onReceipt);
}

export async function add(
  trails: Contract,
  trailId: string,
  data: string,
  from: string,
  onError: any,
  onReceipt: any
) {
  await trails.methods
    .add(trailId, data)
    .send({ from })
    .on("error", onError)
    .on("receipt", onReceipt);
}

export async function blacklist(
  trails: Contract,
  trailId: string,
  data: string,
  from: string,
  onError: any,
  onReceipt: any
) {
  await trails.methods
    .blackList(trailId, data)
    .send({ from })
    .on("error", onError)
    .on("receipt", onReceipt);
}

export async function getBlackList(
  trail: Contract,
  trailId: string,
  from: string
): Promise<Array<string>> {
  return await trail.methods.getBlackList(trailId).call({ from });
}

export async function getTrailDetails(
  trail: Contract,
  trailId: string,
  from: string
): Promise<TrailDetails> {
  return await trail.methods.getTrailDetails(trailId).call({ from });
}

export async function getTrailDetailsWithoutFrom(
  trail: Contract,
  trailId: string
): Promise<TrailDetails> {
  return await trail.methods.getTrailDetails(trailId).call();
}

export async function getTrailContent(
  trail: Contract,
  trailId: string,
  from: string
): Promise<string[]> {
  return await trail.methods.getTrailContent(trailId).call({ from });
}
