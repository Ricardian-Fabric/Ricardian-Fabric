import Arweave from "arweave";
import { readContract, selectWeightedPstHolder } from "smartweave";
import { Options, Status } from "../types";
// import TestWeave from "testweave-sdk";

export const ARWAEVECONFIG = {
  host: "arweave.net",
  port: 443,
  protocol: "https",
  timeout: 20000,
  logging: false,
  logger: console.log,
};

const arweave = Arweave.init(ARWAEVECONFIG);

// init TestWeave on the top of arweave
// export let testWeave;
// (async function () {
//   //@ts-ignore
//   testWeave = await TestWeave.init(arweave);
//   // → 🎉
// })();

// The address that deploys the javascript dependency.
// stored for verification purposes
export const dependencyDeployer = [
  "Ygcqww4Hq2mjMzqhWFnCTMsQ9VFEr4ytVWbYDbXCpDw",
];

const PSTContract = "ligtZZ4M3Gy3BUi2qz4B6yXQiOcjJ_wU55QYhXFw7Ow";

export const TIP = "0.01";

export function getTip() {
  return ArToWinston(TIP);
}

export async function createFileTransaction(
  type: string,
  data: any,
  version: string,
  key: any
) {
  const transaction = await arweave.createTransaction({ data }, key);
  transaction.addTag("Contract-Type", "File upload");
  transaction.addTag("Content-Type", type);
  transaction.addTag("App-Version", version);
  transaction.addTag("App-Name", "Ricardian Fabric");

  await arweave.transactions.sign(transaction, key);
  return transaction;
}

export async function createProposalTransaction(
  data: any,
  version: string,
  key: any,
  name: string,
  category: string,
  chainid: string,
  simpleTerms: boolean
) {
  const transaction = await arweave.createTransaction(
    { data: JSON.stringify(data) },
    key
  );
  transaction.addTag("Contract-Type", "Proposal");
  transaction.addTag("Content-Type", "application/json");
  transaction.addTag("App-Version", version);
  transaction.addTag("App-Name", "Ricardian Fabric");
  transaction.addTag("Name", name);
  transaction.addTag("Category", category);
  transaction.addTag("ChainId", chainid);
  transaction.addTag("SimpleTerms", `${simpleTerms}`);
  await arweave.transactions.sign(transaction, key);
  return transaction;
}

export async function uploadData(
  transaction: any,
  progressLogger: CallableFunction
): Promise<Options<string>> {
  const options: Options<string> = {
    status: Status.Success,
    error: "",
    data: "",
  };
  try {
    let uploader = await arweave.transactions.getUploader(transaction);

    while (!uploader.isComplete) {
      await uploader.uploadChunk();
      progressLogger(uploader);
      console.log(
        `${uploader.pctComplete}% complete, ${uploader.uploadedChunks}/${uploader.totalChunks}`
      );
    }
  } catch (error) {
    options.status = Status.Failure;
    options.error = error.message;
  }
  return options;
}

export async function postTransaction(transaction: any) {
  const posted = await arweave.transactions.post(
    Buffer.from(JSON.stringify(transaction), "utf8")
  );
  return posted;
}

export async function createWallet() {
  const key = await arweave.wallets.generate();
  return key;
}

export async function getWalletAddress(key: any) {
  const address = await arweave.wallets.jwkToAddress(key);
  return address;
}

export async function getWalletBalance(address: string): Promise<string> {
  const balance = await arweave.wallets.getBalance(address);
  return arweave.ar.winstonToAr(balance);
}

export function ArToWinston(amount: string): string {
  return arweave.ar.arToWinston(amount);
}

export function WinstonToAr(amount: string): string {
  return arweave.ar.winstonToAr(amount);
}

export async function getTransferTransaction(
  target: string,
  quantity: string,
  key: any,
  version: string
) {
  const transaction = await arweave.createTransaction(
    {
      target,
      quantity,
    },
    key
  );

  transaction.addTag("Contract-Type", "Transfer");
  transaction.addTag("App-Version", version);
  transaction.addTag("App-Name", "Ricardian Fabric");

  await arweave.transactions.sign(transaction, key);
  return transaction;
}

export async function getWeighedPSTHolder() {
  //@ts-ignore
  const contractState = await readContract(arweave, PSTContract);
  const holder = selectWeightedPstHolder(contractState.balances);
  return holder;
}
