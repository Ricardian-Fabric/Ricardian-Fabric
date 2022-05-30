import {
  HashWithIds,
  HashWithTransaction,
  IPFSParams,
  Options,
  Status,
} from "../../types";
import tou8 from "buffer-to-uint8array";
import { verifyAndGetTags } from "./verification";
import isIPFS from "is-ipfs";
import { CID } from "multiformats";
import Arweave from "arweave";
import { ARWAEVECONFIG } from "../arweave";
import { fetchFromIPFS } from "../../fetch";
import { findPermapinned } from "../../fetch/graphql";
const IPFS_KEY = "IPFS-Add";

//temporary so it doesnt conflict with different data structure
const IPFS_CONSTRAINT_KEY = "standard";
const IPFS_CONSTRAINT = "v0.1";

export async function addHash(
  hash: string,
  ipfsParams: IPFSParams,
  key: any
): Promise<HashWithIds | HashWithTransaction> {
  let h = hash;
  if (!isIPFS.multihash(h) && !isIPFS.base32cid(h)) {
    return makeHashWithIds(h, "Invalid IPFS hash", Status.Failure);
  }
  // if the cid is V0, I convert it to V1
  if (isIPFS.multihash(h)) {
    const v0 = CID.parse(h);
    h = v0.toV1().toString();
  }
  const arweave = Arweave.init(ARWAEVECONFIG);

  const findPinned: Options<any> = await findPermapinned(h);

  if (findPinned.error !== "") {
    return makeHashWithIds(h, "Error!", Status.Failure);
  }

  const edges = findPinned.data.transactions.edges;
  if (edges.length !== 0) {
    return makeHashWithIds(h, "It's already permapined!", Status.AlreadyExists);
  }

  const data = await fetchFromIPFS(h, ipfsParams);
  const options = verifyAndGetTags(data);
  if (options.status === Status.Failure) {
    return makeHashWithIds(h, "Not Ricardian Fabric Contract", Status.Failure);
  }
  const tags = options.tags;
  let transaction = await arweave.createTransaction(
    {
      data: tou8(data),
    },
    key
  );

  transaction.addTag(IPFS_KEY, h);
  transaction.addTag(IPFS_CONSTRAINT_KEY, IPFS_CONSTRAINT);
  transaction.addTag("Issuer", tags.issuer);
  transaction.addTag("Network", tags.network);
  transaction.addTag("Contract-Type", tags.contractType);
  transaction.addTag("Participant", tags.participant);
  transaction.addTag("App-Version", tags.version);
  transaction.addTag("App-Name", "Ricardian Fabric");

  await arweave.transactions.sign(transaction, key);
  return {
    hash: h,
    tx: transaction,
    status: Status.Success,
  } as HashWithTransaction;
}

const makeHashWithIds = (
  hash: string,
  message: string,
  status: Status
): HashWithIds => {
  return { hash, message, status };
};
