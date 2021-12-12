import {
  dispatch_renderError,
  dispatch_renderProposalSummary,
  dispatch_initializeProposalUpload,
  dispatch_proposeNewRank,
  dispatch_proposeNewContract,
} from "../../dispatch/render";
import { PopupState, ProposalFormat, State, Status } from "../../types";
import { getAddress, requestAccounts, web3Injected } from "../../wallet/web3";
import MetaMaskOnboarding from "@metamask/onboarding";
import { getCatalogDAOContract } from "../../wallet/catalogDAO/contractCalls";
import { OptionsBuilder } from "../utils";
import { getById, readFile } from "../../view/utils";
import {
  dispatch_setPopupState,
  dispatch_setUploadProposalProps,
} from "../../dispatch/stateChange";
import { decryptWallet } from "../../crypto";
import { createProposalTransaction } from "../../wallet/arweave";
import { onDocProposalFileDropped } from "./onDocFileDropped";

export async function createProposalActions(props: State) {
  if (!web3Injected()) {
    dispatch_renderError("Found no injected web3, install metamask");
    const onboarding = new MetaMaskOnboarding();
    onboarding.startOnboarding();
    return;
  }

  //TODO: CHECK NETWORK CONNECTION!!
  // IT MUST BE HARMONY NETWORK!
  // If it's not, prompt to switch to harmony

  await requestAccounts();

  const myAddress = await getAddress();
  const catalogDAO = await getCatalogDAOContract();

  //   const rankOptions = await OptionsBuilder(() =>
  //     getRank(catalogDAO, myAddress)
  //   );

  //   if (rankOptions.status === Status.Failure) {
  //     dispatch_renderError("Failed to fetch the Rank!");
  //     return;
  //   }

  // const createRankButton = getById("get-rank-tab-button");

  // createRankButton.onclick = function () {
  //   dispatch_setProposalType(ProposalType.Rank);
  // };

  // const createProposalButton = getById("propose-new-contract-tab-button");

  // createProposalButton.onclick = function () {
  //   dispatch_setProposalType(ProposalType.NewSmartContract);
  // };

  // TODO: get the rank from the smart contract
  let rank = 0;
  if (rank === 0) {
    dispatch_proposeNewRank();
  } else {
    dispatch_proposeNewContract();
  }
  //While the rank is loading, show a loading indicator
  //Then render either the proposalTXId input.. or the GithubURL, maybe I just render the labels

  // if (props.proposalType === ProposalType.Rank) {
  const githubRepoUrl = getById("github-url") as HTMLInputElement;
  const rankheader = getById("rankHeader") as HTMLHeadingElement;
  const submitRankProposal = getById("create-rank-proposal");

  rankheader.textContent = `Your rank is ${rank}`;

  submitRankProposal.onclick = function () {
    if (githubRepoUrl.value === "") {
      dispatch_renderError("Empty input");
      return;
    }

    if (!githubRepoUrl.validity.valid) {
      dispatch_renderError("Invalid url");
      return;
    }
  };
  // }

  // if (props.proposalType === ProposalType.NewSmartContract) {
  const contractProposalSubmit = getById("proposal-submit-button");

  contractProposalSubmit.onclick = function () {
    //TODO: I need tp get the ID entered,
    // use arweave to check if the status is accepted by the network
    //then I call the ricardian fabric smart contract
  };
  // }
}

function artifactValid(data: string): boolean {
  const artifact = JSON.parse(data);
  if (artifact.bytecode === undefined) {
    return false;
  }

  if (artifact.abi === undefined) {
    return false;
  }

  return true;
}

export function uploadProposalActions(props: State, step: PopupState) {
  const backbutton = getById("create-contract-back");

  const createContractProposal = getById("create-contract-proposal");

  const nameEl = getById("smartcontract-name") as HTMLInputElement;
  const descriptionEl = getById(
    "smartcontract-description"
  ) as HTMLInputElement;
  const artifactEl = getById("smartcontract-artifact") as HTMLInputElement;

  const termsEl = getById("docx-input") as HTMLInputElement;
  const gitEl = getById("smartcontract-repo") as HTMLInputElement;
  const commitEl = getById("smartcontract-commit") as HTMLInputElement;
  const termsAcceptedEl = getById("accepted-terms") as HTMLInputElement;

  const networkEl = getById("selected-network") as HTMLSelectElement;
  const passwordEl = getById("arweave-key-password") as HTMLInputElement;

  const categoryEl = getById("select-category") as HTMLSelectElement;
  const implementsSimpleTerms = getById(
    "implements-simpleterms-checkbox"
  ) as HTMLInputElement;

  onDocProposalFileDropped(props);

  if (props.uploadProposalProps !== null) {
    dispatch_initializeProposalUpload(props, {
      nameEl,
      descriptionEl,
      artifactEl,
      termsEl,
      gitEl,
      commitEl,
      networkEl,
      categoryEl,
      implementsSimpleTerms,
    });
  }

  backbutton.onclick = function () {
    switch (step) {
      case PopupState.UploadProposal:
        dispatch_setPopupState(PopupState.NONE);
        dispatch_setUploadProposalProps({
          name: nameEl.value,
          description: descriptionEl.value,
          artifact: artifactEl.value,
          terms: termsEl.files[0],
          git: gitEl.value,
          commit: commitEl.value,
          network: networkEl.value,
          category: categoryEl.value,
          simpleterms: implementsSimpleTerms.checked,
        });
        break;
      case PopupState.UploadProposalStep2:
        dispatch_setPopupState(PopupState.UploadProposal);
        break;
      case PopupState.UploadProposalStep3:
        dispatch_setPopupState(PopupState.UploadProposalStep2);
        break;
      case PopupState.UploadProposalStep4:
        dispatch_setPopupState(PopupState.UploadProposalStep3);
        break;
      default:
        break;
    }
  };

  createContractProposal.onclick = async function () {
    switch (step) {
      case PopupState.UploadProposal:
        if (nameEl.value === "") {
          dispatch_renderError("You must specify the name.");
          return;
        }
        if (descriptionEl.value === "") {
          dispatch_renderError("You must add a short description.");
          return;
        }
        dispatch_setPopupState(PopupState.UploadProposalStep2);
        break;
      case PopupState.UploadProposalStep2:
        if (artifactEl.value === "") {
          dispatch_renderError("You must add the Artifact.");
          return;
        }

        const artifactiOptions = await OptionsBuilder(() =>
          artifactValid(artifactEl.value)
        );

        if (artifactiOptions.status === Status.Failure) {
          dispatch_renderError(artifactiOptions.error);
          return;
        }

        const artifactIsValid = artifactiOptions.data;

        if (!artifactIsValid) {
          dispatch_renderError("Malformed Artifact.");
          return;
        }

        if (gitEl.value === "") {
          dispatch_renderError("You must add a valid link for a git repo.");
          return;
        }

        if (commitEl.value === "") {
          dispatch_renderError("Commit id is empty");
          return;
        }
        dispatch_setPopupState(PopupState.UploadProposalStep3);
        break;
      case PopupState.UploadProposalStep3:
        if (
          termsEl.files.length !== 1 &&
          props.uploadProposalProps.terms === undefined
        ) {
          dispatch_renderError("You must propose terms for the contract.");
          return;
        }
        dispatch_setPopupState(PopupState.UploadProposalStep4);
        break;
      case PopupState.UploadProposalStep4:
        if (termsAcceptedEl.checked === false) {
          dispatch_renderError("You must accept the terms.");
          return;
        }

        if (passwordEl.value === "") {
          dispatch_renderError("Misssing password");
          return;
        }

        const file =
          termsEl.files.length === 0
            ? (props.uploadProposalProps.terms as File)
            : termsEl.files[0];

        readFile(file, async (data) => {
          const proposal: ProposalFormat = {
            name: nameEl.value,
            description: descriptionEl.value,
            artifact: JSON.parse(artifactEl.value),
            terms: data,
            git: gitEl.value,
            commit: commitEl.value,
            network: networkEl.value,
            category: categoryEl.value,
            simpleterms: implementsSimpleTerms.checked,
          };
          if (props.Account.data === null) {
            dispatch_renderError("Missing arweave account.");
            return;
          }
          const decryptOptions = await decryptWallet(
            props.Account.data,
            passwordEl.value
          );

          if (decryptOptions.status !== Status.Success) {
            dispatch_renderError(decryptOptions.error);
            return;
          }

          const proposalTransaction = await createProposalTransaction(
            proposal,
            props.version,
            decryptOptions.data,
            nameEl.value,
            categoryEl.value,
            networkEl.value,
            implementsSimpleTerms.checked
          );

          console.log(proposalTransaction);
          dispatch_renderProposalSummary(proposalTransaction, props);
        });
        break;
      default:
        break;
    }
  };
}