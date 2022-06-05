import {
  dispatch_createRemovalProposal,
  dispatch_navigateTo,
  dispatch_renderError,
  dispatch_renderSCProposalDisplayPage,
  dispatch_SCDeploySelected,
  dispatch_teardownContractDisplayPage,
  dispatch_uploadFrontendPopup,
} from "../../dispatch/render";
import {
  dispatch_setPage,
  dispatch_setPopupState,
} from "../../dispatch/stateChange";
import { fetchTransactionBy } from "../../fetch";
import {
  AcceptedSmartContractProposal,
  PageState,
  PopupState,
  ProposalFormat,
  QueryStrings,
  State,
} from "../../types";
import { getById } from "../../view/utils";
import { getDecodedTagsFromTX } from "../../wallet/arweave";
import { hasError, OptionsBuilder } from "../utils";

export async function contractDisplayActions(
  props: State,
  contractId: string,
  preview: boolean,
  acceptedProposal: AcceptedSmartContractProposal
) {
  const backButton = getById("contract-display-back-button");
  backButton.onclick = async function () {
    dispatch_teardownContractDisplayPage();
    dispatch_setPopupState(PopupState.NONE);
  };

  const tags = await getDecodedTagsFromTX(contractId);

  if (tags.length === 0) {
    dispatch_renderError("Invalid proposal! Transaction not found.");
    return;
  }

  // then I download the contract transaction
  const transactionOptions = await OptionsBuilder(() =>
    fetchTransactionBy<ProposalFormat>(contractId)
  );

  if (hasError(transactionOptions)) {
    dispatch_renderError("Invalid proposal! Transaction not found.");
    return;
  }

  const proposal: ProposalFormat = transactionOptions.data;

  if (proposal.name === undefined) {
    dispatch_renderError("Invalid proposal! Name is undefined.");
    return;
  }
  dispatch_renderSCProposalDisplayPage(
    props,
    contractId,
    proposal,
    preview,
    acceptedProposal
  );
}

export function checkForProposalTag(edge) {
  const tags = edge.node.tags;
  let hasTag = false;
  for (let i = 0; i < tags.length; i++) {
    const tag: { name: string; value: string } = tags[i];
    if (tag.name === "Contract-Type") {
      if (tag.value === "Proposal") {
        hasTag = true;
      }
    }
  }
  return hasTag;
}

export function SCProposalDisplayPageActions(props: State) {
  const deploy = getById("deploy-button");
  const dl = getById("download-terms-button");
  const deployFrontEnd = getById("deploy-frontend-button");
  const remove = getById("remove-sc-button");
  const arweaveTxId = deploy.dataset.arweavetxid;

  deploy.onclick = async function () {
    const transactionOptions = await OptionsBuilder(() =>
      fetchTransactionBy<ProposalFormat>(arweaveTxId)
    );

    if (hasError(transactionOptions)) {
      dispatch_renderError("Invalid proposal!");
      return;
    }

    const proposal: ProposalFormat = transactionOptions.data;
    dispatch_setPopupState(PopupState.emptyPopup);
    dispatch_SCDeploySelected(props, proposal);
  };

  dl.onclick = async function () {
    const dlArweaveTxId = dl.dataset.arweavetxid;
    const transactionOptions = await OptionsBuilder(() =>
      fetchTransactionBy<ProposalFormat>(dlArweaveTxId)
    );

    if (hasError(transactionOptions)) {
      dispatch_renderError("Invalid proposal!");
      return;
    }
    const proposal: ProposalFormat = transactionOptions.data;
    dispatch_setPopupState(PopupState.NONE);
    dispatch_setPage(PageState.trails);
    dispatch_navigateTo(
      QueryStrings.trail,
      proposal.trail,
      proposal.arweaveAddress
    );
  };

  remove.onclick = async function () {
    const index = remove.dataset.index;
    dispatch_setPopupState(PopupState.emptyPopup);
    dispatch_createRemovalProposal(props, index, true);
  };

  deployFrontEnd.onclick = async function () {
    // Should show a popup where the user inputs the title and the contract address!!
    const url = deployFrontEnd.dataset.frontend;
    dispatch_setPopupState(PopupState.emptyPopup);
    dispatch_uploadFrontendPopup(props, url);
  };
}
