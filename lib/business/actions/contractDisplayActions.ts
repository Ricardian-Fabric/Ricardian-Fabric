import {
  dispatch_createRemovalProposal,
  dispatch_renderError,
  dispatch_renderSCProposalDisplayPage,
  dispatch_SCDeploySelected,
  dispatch_teardownContractDisplayPage,
} from "../../dispatch/render";
import { dispatch_setPopupState } from "../../dispatch/stateChange";
import { fetchTransactionBy } from "../../fetch";
import {
  AcceptedSmartContractProposal,
  PopupState,
  ProposalFormat,
  State,
} from "../../types";
import { downloadBlob } from "../../view/render";
import { getById } from "../../view/utils";
import { getDecodedTagsFromTX } from "../../wallet/arweave";
import { hasError, OptionsBuilder } from "../utils";
import { convertToHTMLFromArrayBuffer } from "./onDocFileDropped";

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
  const getTerms = (terms: string) => {
    dispatch_renderSCProposalDisplayPage(
      props,
      contractId,
      proposal,
      terms,
      preview,
      acceptedProposal
    );
  };

  convertToHTMLFromArrayBuffer(proposal.terms, getTerms);
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

export function SCProposalDisplayPageActions(props) {
  const deploy = getById("deploy-button");
  const dl = getById("download-terms-button");
  const remove = getById("remove-sc-button");
  const arweaveTxId = deploy.dataset.arweavetxid;

  let name = "";
  if (deploy.dataset.name !== undefined) {
    name = deploy.dataset.name.split(" ").join("_");
  }
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
    // Fetch the transaction and get the terms
    const proposalOptions = await OptionsBuilder(() =>
      fetchTransactionBy(arweaveTxId)
    );

    if (hasError(proposalOptions)) {
      return;
    }
    // Buffer the terms and initiate the download
    const buff = new Uint8Array(proposalOptions.data.terms).buffer;
    const dataview = new DataView(buff);
    const blob = new Blob([dataview], {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });
    downloadBlob(blob, name + ".docx");
  };

  remove.onclick = async function () {
    const index = remove.dataset.index;
    dispatch_setPopupState(PopupState.emptyPopup);
    dispatch_createRemovalProposal(props, index, true);
  };
}
