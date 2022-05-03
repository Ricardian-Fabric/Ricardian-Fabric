import {
  dispatch_renderError,
  dispatch_renderTrailDataPage,
  dispatch_setCommentFields,
  dispatch_trailsDetails,
  dispath_trailsTabs,
} from "../../dispatch/render";
import { dispatch_setPopupState } from "../../dispatch/stateChange";
import { fetchTransactionBy } from "../../fetch";
import {
  getPublicTrail,
  getPublicTrailWithOwner,
  getTags,
} from "../../fetch/graphql";
import {
  ArweaveDataDisplayContent,
  ArweaveDataPage,
  ArweaveNode,
  ContractTypes,
  Options,
  PopupState,
  State,
  Status,
  TrailData,
} from "../../types";
import { copyStringToClipboard, getById } from "../../view/utils";
import { getTotalPages, hasError, OptionsBuilder } from "../utils";

export async function trailsPageActions(props: State) {
  dispath_trailsTabs(props);

  searchButtonClicked(props);
}

export function searchButtonClicked(props: State) {
  const searchTrail = getById("trail-find");
  const trailIdEl = getById("trail-id") as HTMLInputElement;
  const trailAddress = getById("trail-creator-address") as HTMLInputElement;
  searchTrail.onclick = async function () {
    if (trailIdEl.value === "") {
      dispatch_renderError("Trail Id is Missing");
      return;
    }
    const trailId = trailIdEl.value;
    if (trailAddress.value.length !== 0 && trailAddress.value.length !== 43) {
      dispatch_renderError("Invalid Arweave Address ");
      return;
    }

    dispatch_trailsDetails(props, trailId, trailAddress.value);
  };
}

export async function fetchAllTrailDetails(
  props: State,
  trailId,
  uploaderWalletAddress
) {
  const refreshBtn = getById("refresh-button");
  const copyBtn = getById("copyTrail");
  const addCommentButton = getById("addCommentOnTrailButton");

  addCommentButton.onclick = function () {
    dispatch_setPopupState(PopupState.AddComment);
    const name = addCommentButton.dataset.name;
    const address = addCommentButton.dataset.address;
    dispatch_setCommentFields(props, name, address);
  };

  refreshBtn.onclick = function () {
    dispatch_trailsDetails(props, trailId, uploaderWalletAddress);
  };
  copyBtn.onclick = () => {
    const name = copyBtn.dataset.name;
    const address = copyBtn.dataset.address;
    const addressURL = address.length === 0 ? "" : `&address=${address}`;
    const creatorAppLink = location.origin + location.pathname;
    const url = creatorAppLink + "?trail=" + name + addressURL;
    copyStringToClipboard(url);
  };
  let publicTrailOptions;

  if (uploaderWalletAddress.length !== 0) {
    publicTrailOptions = await getPublicTrailWithOwner(
      trailId,
      uploaderWalletAddress
    );
  } else {
    publicTrailOptions = await getPublicTrail(trailId);
  }

  if (hasError(publicTrailOptions)) {
    return;
  }
  const edges: Array<{ node: ArweaveNode }> =
    publicTrailOptions.data.transactions.edges;
  const trailContent = filterEdgesWithBlacklist(edges, []);

  trailDataPagePaginated(props, trailContent, 1, trailId);
}

async function trailDataPagePaginated(
  props: State,
  trailContent: string[],
  currentPageIndex: number,
  trailId: string
) {
  const dataPage = await getPage(trailContent, currentPageIndex);

  dispatch_renderTrailDataPage(props, dataPage, trailId);
}

async function getPage(txIds: Array<string>, currentPage: number) {
  const PageSize = 10; // 10 comments on a page
  const currentDataToFetch = getCurrentContentToFetch(
    currentPage,
    txIds,
    PageSize
  );

  const fetchedData = await fetchDataOptions(currentDataToFetch);

  const dataPage: ArweaveDataPage = {
    totalPages: getTotalPages(txIds.length, PageSize),
    totalTxIds: txIds,
    currentPage,
    currentContent: fetchedData,
  };

  return dataPage;
}

async function fetchDataOptions(currentDataToFetch: Array<string>) {
  let correctedData: ArweaveDataDisplayContent[] = [];
  for (let i = 0; i < currentDataToFetch.length; i++) {
    const res = await OptionsBuilder(() =>
      fetchTransactionBy<TrailData>(currentDataToFetch[i])
    );
    if (res.status === Status.Failure) {
      correctedData.push({
        txId: currentDataToFetch[i],
        hadError: true,
        comment: "",
        linkedTransaction: "",
        created: "",
        metadisplay: "",
        linkedContractType: "",
      });
    } else {
      const data: TrailData = res.data;

      // Fetch details about the linked transaction

      const tagOptions = await getTags(data.linkedTransaction);

      const [metadisplay, linkedContractType] = await getMetaDisplay(
        tagOptions,
        data.linkedTransaction
      );
      correctedData.push({
        txId: currentDataToFetch[i],
        hadError: false,
        comment: data.comment,
        linkedTransaction: data.linkedTransaction,
        created: data.created,
        metadisplay,
        linkedContractType,
      });
    }
  }
  return correctedData.reverse();
}

async function getMetaDisplay(
  tagOptions: Options<any>,
  linkedTransaction: string
) {
  let metadisplay = "";
  let linkedContractType = "";
  if (tagOptions.status === Status.Success) {
    const edges = tagOptions.data.transactions.edges;
    if (edges.length > 0) {
      const tags = edges[0].node.tags;
      const [contractType, contentType] = getDetailsFromTags(tags);
      // If this is a comment, then I fetch what it's replying to...
      // Else I will display the contentType
      linkedContractType = contractType;
      if (contractType === ContractTypes.trail) {
        const replyToOptions = await OptionsBuilder(() =>
          fetchTransactionBy<TrailData>(linkedTransaction)
        );
        if (replyToOptions.status === Status.Success) {
          const data: TrailData = replyToOptions.data;
          metadisplay = data.comment;
          //If the transaction links a comment, I don't render the linked transaction
        }
      } else {
        metadisplay = contentType;
      }
    }
  }

  return [metadisplay, linkedContractType];
}

function getDetailsFromTags(
  tags: Array<{ name: string; value: string }>
): [string, string] {
  let contractType = "";
  let contentType = "";

  for (let i = 0; i < tags.length; i++) {
    const tag = tags[i];
    if (tag.name === "Contract-Type") {
      contractType = tag.value;
    }
    if (tag.name === "Content-Type") {
      contentType = tag.value;
    }
  }

  return [contractType, contentType];
}

function getCurrentContentToFetch(
  currentPage: number,
  totalTxIds: Array<string>,
  pageSize: number
) {
  let currentDataTofetch = [];
  for (let i = 0; i < totalTxIds.length; i++) {
    if (getTotalPages(i + 1, pageSize) === currentPage) {
      currentDataTofetch.push(totalTxIds[i]);
    }
  }
  return currentDataTofetch;
}

function filterEdgesWithBlacklist(
  edges: Array<{ node: ArweaveNode }>,
  blacklist: Array<string>
): Array<string> {
  // I sort the ids of the edges into a list
  let edgeIds: Array<string> = [];
  for (let i = 0; i < edges.length; i++) {
    const id = edges[i].node.id;
    if (!blacklist.includes(id)) {
      edgeIds.push(id);
    }
  }
  return edgeIds;
}

function filterAddedTrailsWithBlackList(
  added: Array<string>,
  blacklist: Array<string>
) {
  let results: Array<string> = [];
  for (let i = 0; i < added.length; i++) {
    const a = added[i];
    if (!blacklist.includes(a)) {
      results.push(a);
    }
  }
  return results;
}

export function trailDetailsActions(
  props,
  trailId: string,
  dataPage: ArweaveDataPage
) {
  const copyButtons = document.getElementsByClassName("copy-txid-buttons");
  const paginationButtons = document.getElementsByClassName(
    "trail-paging-buttons"
  );

  for (let i = 0; i < paginationButtons.length; i++) {
    const btn = paginationButtons[i] as HTMLButtonElement;
    const pageIndex = parseInt(btn.dataset.trailpage);
    btn.onclick = async function () {
      await trailDataPagePaginated(
        props,
        dataPage.totalTxIds,
        pageIndex,
        trailId
      );
    };
  }

  const pageLeftButton = getById("trail-page-left");
  const pageRightButton = getById("trail-page-right");
  const lastPageButton = getById("trail-last-page");
  const firstPageButton = getById("trail-first-page");

  pageLeftButton.onclick = async function () {
    const index = parseInt(pageLeftButton.dataset.trailpage);
    if (index > 1) {
      await trailDataPagePaginated(
        props,
        dataPage.totalTxIds,
        index - 1,
        trailId
      );
    }
  };

  pageRightButton.onclick = async function () {
    const index = parseInt(pageRightButton.dataset.trailpage);
    const total = parseInt(pageRightButton.dataset.totalpages);
    if (index < total) {
      await trailDataPagePaginated(
        props,
        dataPage.totalTxIds,
        index + 1,
        trailId
      );
    }
  };

  lastPageButton.onclick = async function () {
    const index = parseInt(lastPageButton.dataset.trailpage);
    const total = parseInt(lastPageButton.dataset.totalpages);

    if (index < total) {
      await trailDataPagePaginated(props, dataPage.totalTxIds, total, trailId);
    }
  };

  firstPageButton.onclick = async function () {
    const index = parseInt(firstPageButton.dataset.trailpage);
    if (index > 1) {
      await trailDataPagePaginated(props, dataPage.totalTxIds, 1, trailId);
    }
  };

  for (let i = 0; i < copyButtons.length; i++) {
    const btn = copyButtons[i] as HTMLButtonElement;
    const txId = btn.dataset.txid;
    btn.onclick = async function () {
      await copyStringToClipboard(txId);
    };
  }
}
