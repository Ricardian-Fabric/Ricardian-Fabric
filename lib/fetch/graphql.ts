import { request } from "graphql-request";
import { Options, Status } from "../types";

const ARWEAVEAPI = "https://arweave.net/graphql";

export async function getOwnerFromTxId(txId: string): Promise<Options<string>> {
  const options: Options<string> = {
    status: Status.Success,
    error: "",
    data: "",
  };

  const query = `query {
    transaction(id: "${txId}") {
       owner{
        address
      }
    }
}`;

  const result = await request(ARWEAVEAPI, query).catch((err) => {
    options.error = err.message;
    options.status = Status.Failure;
  });

  options.data = result.transaction.owner.address;
  return options;
}

export async function getUploadedContracts(): Promise<Options<any>> {
  const options: Options<any> = {
    status: Status.Success,
    error: "",
    data: "",
  };

  const query = `query {
  transactions(
    first: 1000
    sort: HEIGHT_DESC
    tags: { name: "App-Name", values: ["Ricardian Fabric"] }
  ) {
    edges {
      node {
        id
        tags {
          name
          value
        }
      }
    }
  }
}
`;

  const result = await request(ARWEAVEAPI, query).catch((err) => {
    options.error = err.message;
    options.status = Status.Failure;
  });
  options.data = result;
  return options;
}

export async function getPublicTrail(trailName: string): Promise<Options<any>> {
  const options: Options<any> = {
    status: Status.Success,
    error: "",
    data: "",
  };
  // the query will fetch maximum 1000 comments
  const query = `query {
  transactions(
    first: 1000
    sort: HEIGHT_DESC
    tags: [
      { name: "App-Name", values: ["Ricardian Fabric"] }
      { name: "Trail-Name", values: ["${trailName}"] }
    ]
  ) {
    edges {
      node {
        id
        tags {
          name
          value
        }
      }
    }
  }
}`;

  const result = await request(ARWEAVEAPI, query).catch((err) => {
    options.error = err.message;
    options.status = Status.Failure;
  });
  options.data = result;
  return options;
}

export async function getPublicTrailWithOwner(
  trailName: string,
  creatorAddress: string
): Promise<Options<any>> {
  const options: Options<any> = {
    status: Status.Success,
    error: "",
    data: "",
  };
  // the query will fetch maximum 1000 comments
  const query = `query {
  transactions(
    first: 1000
    sort: HEIGHT_DESC
    tags: [
      { name: "App-Name", values: ["Ricardian Fabric"] }
      { name: "Trail-Name", values: ["${trailName}"] }
    ]
     owners: ["${creatorAddress}"]
  ) {
    edges {
      node {
        id
        tags {
          name
          value
        }
      }
    }
  }
}`;

  const result = await request(ARWEAVEAPI, query).catch((err) => {
    options.error = err.message;
    options.status = Status.Failure;
  });
  options.data = result;
  return options;
}

export async function getAllCatalogProposals() {
  const options: Options<any> = {
    status: Status.Success,
    error: "",
    data: "",
  };
  // the query will fetch maximum 1000 comments
  const query = `query {
  transactions(
    first: 1000
    sort: HEIGHT_DESC
    tags: [
      { name: "App-Name", values: ["Ricardian Fabric"] }
      { name: "Contract-Type", values: ["Proposal"] }
    ]
  ) {
    edges {
      node {
        id
        tags {
          name
          value
        }
      }
    }
  }
}`;

  const result = await request(ARWEAVEAPI, query).catch((err) => {
    options.error = err.message;
    options.status = Status.Failure;
  });
  options.data = result;
  return options;
}

export async function getCatalogProposalByCategory(
  categoryName: string
): Promise<Options<any>> {
  const options: Options<any> = {
    status: Status.Success,
    error: "",
    data: "",
  };
  // the query will fetch maximum 1000 comments
  const query = `query {
  transactions(
    first: 1000
    sort: HEIGHT_DESC
    tags: [
      { name: "App-Name", values: ["Ricardian Fabric"] }
      { name: "Contract-Type", values: ["Proposal"] }
      { name: "Category", values: ["${categoryName}"] }
    ]
  ) {
    edges {
      node {
        id
        tags {
          name
          value
        }
      }
    }
  }
}`;

  const result = await request(ARWEAVEAPI, query).catch((err) => {
    options.error = err.message;
    options.status = Status.Failure;
  });
  options.data = result;
  return options;
}

export async function getTags(transaction: string): Promise<Options<any>> {
  const options: Options<any> = {
    status: Status.Success,
    error: "",
    data: "",
  };

  const query = `query {
    transactions(ids: ["${transaction}"]) {
        edges {
            node {
                id
                tags{
                  name
                  value
                }
            }
        }
    }
}`;

  const result = await request(ARWEAVEAPI, query).catch((err) => {
    options.error = err.message;
    options.status = Status.Failure;
  });
  options.data = result;
  return options;
}

export async function getProfitSharingTransactionsOf(
  recepient: string
): Promise<Options<any>> {
  const options: Options<any> = {
    status: Status.Success,
    error: "",
    data: "",
  };

  const query = `query {
  transactions(
    recipients: ["${recepient}"]
    tags: [
      { name: "App-Name", values: ["Ricardian Fabric"] }
      { name: "Contract-Type", values: ["PST"] }
    ]
  ) {
    edges {
      node {
        id
      }
    }
  }
}
`;

  const result = await request(ARWEAVEAPI, query).catch((err) => {
    options.error = err.message;
    options.status = Status.Failure;
  });
  options.data = result;
  return options;
}

export async function findPermapinned(CID: string) {
  const options: Options<any> = {
    status: Status.Success,
    error: "",
    data: "",
  };

  const query = `query {
  transactions(
    tags: [
      { name: "IPFS-Add", values: ["${CID}"] }
      { name: "App-Name", values: ["Ricardian Fabric"] }
    ]
  ) {
    edges {
      node {
        id
      }
    }
  }
}`;

  const result = await request(ARWEAVEAPI, query).catch((err) => {
    options.error = err.message;
    options.status = Status.Failure;
  });
  options.data = result;
  return options;
}
