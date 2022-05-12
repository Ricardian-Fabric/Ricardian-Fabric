import Arweave from "arweave";
import { readContract, selectWeightedPstHolder } from "smartweave";
import { Options, ProposalFormat, Status } from "../types";
export const TIP = "0.0001";

export function getTip() {
  return ArToWinston(TIP);
}
export const ARWAEVECONFIG = {
  host: "arweave.net",
  port: 443,
  protocol: "https",
  timeout: 20000,
  logging: false,
  logger: console.log,
};

const arweave = Arweave.init(ARWAEVECONFIG);

// The address that deploys the javascript dependency.
// stored for verification purposes
export const dependencyDeployer = [
  "Ygcqww4Hq2mjMzqhWFnCTMsQ9VFEr4ytVWbYDbXCpDw",
];

const PSTContract = "ligtZZ4M3Gy3BUi2qz4B6yXQiOcjJ_wU55QYhXFw7Ow";

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
  proposal: ProposalFormat,
  version: string,
  key: any,
  name: string,
  category: string,
  chainid: string,
  simpleTerms: boolean
) {
  const transaction = await arweave.createTransaction(
    { data: JSON.stringify(proposal) },
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

export async function createFrontendUploadTransaction(
  data: string,
  version: string,
  key: any
) {
  const transaction = await arweave.createTransaction({ data }, key);
  transaction.addTag("Contract-Type", "Front-End Deployment");
  transaction.addTag("Content-Type", "text/html");
  transaction.addTag("App-Version", version);
  transaction.addTag("App-Name", "Ricardian Fabric");

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

export async function getProfitSharingTransaction(
  target: string,
  key: any,
  version: string
) {
  const quantity = getTip();
  const transaction = await arweave.createTransaction(
    {
      target,
      quantity,
      data: "<h4>Ar sharing transaction</h4>",
    },
    key
  );
  transaction.addTag("Contract-Type", "PST");
  transaction.addTag("Content-Type", "text/html");
  transaction.addTag("App-Version", version);
  transaction.addTag("App-Name", "Ricardian Fabric");

  await arweave.transactions.sign(transaction, key);
  return transaction;
}

export async function getTrailTransaction(
  trailName: string,
  key: any,
  version: string,
  comment: string,
  linkedTransaction: string
) {
  const trailData = JSON.stringify({
    comment,
    linkedTransaction,
    created: new Date().toLocaleString(),
  });
  const transaction = await arweave.createTransaction(
    {
      data: trailData,
    },
    key
  );

  transaction.addTag("Contract-Type", "Trail");
  transaction.addTag("Trail-Name", trailName);
  transaction.addTag("App-Version", version);
  transaction.addTag("App-Name", "Ricardian Fabric");
  transaction.addTag("Content-Type", "application/json");

  await arweave.transactions.sign(transaction, key);
  return transaction;
}
export async function getWeighedPSTHolder() {
  //@ts-ignore
  const contractState = await readContract(arweave, PSTContract);
  const holder = selectWeightedPstHolder(contractState.balances);
  return holder;
}

export async function getProfitSharingAddresses() {
  const holder = await getWeighedPSTHolder();
  return { to: holder };
}

export function encodeProposalTerms(buff: ArrayBuffer): Array<number> {
  return Array.from(new Uint8Array(buff));
}

export async function getTransaction(id: string) {
  return await arweave.transactions.get(id);
}

export async function getDecodedTagsFromTX(id: string) {
  const transaction = await getTransaction(id);
  let txTags = [];
  const tags = transaction.get("tags") as any;
  tags.forEach((tag) => {
    let key = tag.get("name", { decode: true, string: true });
    let value = tag.get("value", { decode: true, string: true });
    txTags.push({ [key]: value });
  });
  return txTags;
}
