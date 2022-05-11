import {
  dispatch_renderAvailableContractsToCatalog,
  dispatch_renderCatalogContractLoadingIndicator,
  dispatch_renderContractDisplayPage,
} from "../../dispatch/render";
import {
  dispatch_setPopupState,
  dispatch_setSelectedWallet,
} from "../../dispatch/stateChange";
import {
  getAllCatalogProposals,
  getCatalogProposalByCategory,
} from "../../fetch/graphql";
import {
  AcceptedSmartContractProposal,
  ArweaveQueryResult,
  PopupState,
  SelectedWallet,
  State,
} from "../../types";
import { getById } from "../../view/utils";
import { getDecodedTagsFromTX } from "../../wallet/arweave";
import {
  getAllAccepted,
  getAllRemoved,
  getCatalogDAOContractWithWallet,
} from "../../wallet/catalogDAO/contractCalls";
import { hasError, OptionsBuilder } from "../utils";

export async function catalogAction(props: State) {
  const categorySelectEl = getById("select-category") as HTMLSelectElement;

  // based on what category is selected, I render the contracts
  const catalogDAOOptions = await OptionsBuilder(() =>
    getCatalogDAOContractWithWallet()
  );

  if (hasError(catalogDAOOptions)) {
    return;
  }

  const allAcceptedOptions = await OptionsBuilder(() =>
    getAllAccepted(catalogDAOOptions.data)
  );
  if (hasError(allAcceptedOptions)) {
    return;
  }

  const allRemovedOptions = await OptionsBuilder(() =>
    getAllRemoved(catalogDAOOptions.data)
  );
  if (hasError(allRemovedOptions)) {
    return;
  }

  // compare the removed with the accepted and remove the required ids
  const [allowedToDisplay, ids] = getAllowedToDisplay(
    allAcceptedOptions.data,
    allRemovedOptions.data
  );
  const getContracts = async function () {
    dispatch_renderCatalogContractLoadingIndicator(props);
    const category = categorySelectEl.value;

    let decodedTxs = [];
    for (let i = 0; i < ids.length; i++) {
      decodedTxs.push({ tags: await getDecodedTagsFromTX(ids[i]), id: ids[i] });
    }

    // filter for the category
    let available = decodedTxs;
    if (category !== "All") {
      available = filterCategoryNotArweaveRes(decodedTxs, category);
    }

    setTimeout(
      () =>
        dispatch_renderAvailableContractsToCatalog(
          props,
          allowedToDisplay,
          ids,
          available
        ),
      1000
    );
  };

  await getContracts();

  categorySelectEl.onclick = getContracts;
}

function filterCategoryNotArweaveRes(
  decodedTxs: Array<{ id: string; tags: any }>,
  category: string
) {
  let res = [];
  for (let i = 0; i < decodedTxs.length; i++) {
    const tags = decodedTxs[i].tags;
    for (let j = 0; j < tags.length; j++) {
      const tag = tags[j];
      if (Object.keys(tag).includes("Category")) {
        if (tag["Category"] === category) {
          res.push(decodedTxs[i]);
        }
      }
    }
  }
  return res;
}

function filterCategoryUploads(
  uploadedProposals: ArweaveQueryResult[],
  ids: string[]
): Array<any> {
  let filtered = [];
  for (let i = 0; i < uploadedProposals.length; i++) {
    const prop = uploadedProposals[i];
    if (ids.includes(prop.node.id)) {
      filtered.push(prop);
    }
  }
  return filtered;
}

async function fetchContractsPerCategory(category: string) {
  let res;

  if (category === "All") {
    res = await getAllCatalogProposals();
  } else {
    res = await getCatalogProposalByCategory(category);
  }

  if (hasError(res)) {
    return [];
  } else {
    return res.data.transactions.edges;
  }
}

function getAllowedToDisplay(
  accepted: Array<AcceptedSmartContractProposal>,
  removed: Array<AcceptedSmartContractProposal>
): [Array<AcceptedSmartContractProposal>, Array<string>] {
  const allowedToDisplay: Array<AcceptedSmartContractProposal> = [];
  const ids: Array<string> = [];
  for (let i = 0; i < accepted.length; i++) {
    const txId = accepted[i].arweaveTxId;
    let add = true;
    for (let j = 0; j < removed.length; j++) {
      const remTxId = removed[j].arweaveTxId;
      if (txId === remTxId) {
        add = false;
      }
    }
    if (add) {
      allowedToDisplay.push(accepted[i]);
      ids.push(accepted[i].arweaveTxId);
    }
  }
  return [allowedToDisplay, ids];
}

export function catalogContentActions(props: State) {
  const smartcontracts = document.getElementsByClassName("contract-page-popup");

  for (let i = 0; i < smartcontracts.length; i++) {
    const cont = smartcontracts[i] as HTMLButtonElement;
    cont.onclick = function () {
      const tx = cont.dataset.arweavetxid;
      const proposal: AcceptedSmartContractProposal = JSON.parse(
        cont.dataset.proposal
      );
      dispatch_setPopupState(PopupState.emptyPopup);
      dispatch_renderContractDisplayPage(props, tx, false, proposal);
    };
  }
}

export function walletSelectListener() {
  const metamask = getById("metamask-logo-container");
  metamask.onclick = function () {
    if (metamask.dataset.disabled === "false") {
      dispatch_setSelectedWallet(SelectedWallet.metamask);
    }
  };
}
