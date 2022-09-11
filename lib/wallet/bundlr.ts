// example imports
// import WebBundlr
import { Web3Provider } from "@ethersproject/providers";
import { WebBundlr } from "@bundlr-network/client";
import { ChainName, Options, Status } from "../types";
import { switchNetwork } from "./web3";

const BUNDLRURL = "https://node1.bundlr.network";
const CURRENCY = "matic";

export async function initialiseBundlr(): Promise<Options<any>> {
  const options: Options<any> = { status: Status.Success, error: "", data: "" };
  try {
    // Currently only MATIC network is supported!
    await switchNetwork(ChainName.Polygon, 0, "Mainnet");

    //@ts-ignore
    const provider = new Web3Provider(window.ethereum);
    await provider._ready();

    const bundlr = new WebBundlr(BUNDLRURL, CURRENCY, provider);
    await bundlr.ready();
    options.data = bundlr; // done!
  } catch (err) {
    options.status = Status.Failure;
    options.error = err.message;
  } finally {
    return options;
  }
}

export async function getWalletAddress(bundlr: WebBundlr) {
  // Get the loaded wallet's address
  return bundlr.address;
}

export async function getLoadedBalance(bundlr: WebBundlr) {
  //Get the loaded address' balance with the Bundlr node in atomic units
  const balance = await bundlr.getLoadedBalance();
  return bundlr.utils.unitConverter(balance);
}

export async function getBalance(bundlr) {
  return await bundlr.getBalance();
}

export async function getPrice(bundlr, nBytes) {
  // Get the price for n bytes in atomic units, used for showing the cost of uploads
  const price = await bundlr.getPrice(nBytes);
  return bundlr.utils.unitConverter(price);
}

export async function fundBundlr(
  bundlr,
  price
): Promise<{
  id: string; // the txID of the fund transfer
  quantity: string; // how much is being transferred
  reward: string; // the amount taken by the network as a fee
  target: string; // the address the funds were sent to
}> {
  return await bundlr.fund(price);
}

export async function withdrawFromBundlr(
  bundlr,
  price
): Promise<{ requested: string; fee: string; final: string; tx_id: string }> {
  return await bundlr.withdrawBalance(price);
}

export async function creatTransaction(
  bundlr,
  data,
  tags: Array<{ name: string; value: string }>
) {
  return bundlr.createTransaction(data, { tags });
}

export async function uploadTransaction(bundlr, transaction): Promise<any> {
  const result = await bundlr.uploadTransaction(transaction);
  return result;
}

// TODO: LAZYFUND FOR CREATE RICARDIAN CONTRACT
//TODO: TAKE THE LAZYFUND APART
async function lazyFund(bundlr, data: Buffer) {
  // This approach only works effectively for currencies with fast confirmation times like SOL, MATIC etc.
  const price = await bundlr.getPrice(data.length);
  const balance = await bundlr.getLoadedBalance();

  // If you don't have enough balance for the upload
  if (balance.isLessThan(price)) {
    // Fund your account with the difference
    // We multiply by 1.1 to make sure we don't run out of funds
    await bundlr.fund(balance.minus(price).multipliedBy(1.1));
  }

  // Create, sign and upload the transaction
  const tx = bundlr.createTransaction(data);
  await tx.sign();
  await tx.upload();
}

export function getFileTxTags(type, version) {
  return [
    { name: "Content-Type", value: type },
    { name: "Contract-Type", value: "File upload" },
    { name: "App-Version", value: version },
    { name: "App-Name", value: "Ricardian Fabric" },
  ];
}

export function getContractIssueingTags(
  version,
  tagDetails: { issuer: string; network: string; contractType: string }
) {
  return [
    { name: "Issuer", value: tagDetails.issuer },
    { name: "Network", value: tagDetails.network },
    { name: "Contract-Type", value: tagDetails.contractType },
    { name: "App-Version", value: version },
    { name: "App-Name", value: "Ricardian Fabric" },
    { name: "Content-Type", value: "text/html" },
  ];
}

export function getProposalTags(
  version: string,
  name: string,
  category: string,
  chainid: string,
  simpleTerms: boolean
) {
  return [
    { name: "Contract-Type", value: "Proposal" },
    { name: "Content-Type", value: "application/json" },
    { name: "App-Version", value: version },
    { name: "Name", value: name },
    { name: "Category", value: category },
    { name: "ChainId", value: chainid },
    { name: "SimpleTerms", value: `${simpleTerms}` },
  ];
}

export function getFrontEndUploadTags(version: string) {
  return [
    { name: "Contract-Type", value: "Front-End Deployment" },
    { name: "Content-Type", value: "text/html" },
    { name: "App-Version", value: version },
    { name: "App-Name", value: "Ricardian Fabric" },
  ];
}

export function getTrailTransactionTags(trailName: string, version: string) {
  return [
    { name: "Contract-Type", value: "Trail" },
    { name: "Trail-Name", value: trailName },
    { name: "App-Version", value: version },
    { name: "App-Name", value: "Ricardian Fabric" },
    { name: "Content-Type", value: "application/json" },
  ];
}
