import {
  dispatch_renderError,
  dispatch_renderProposalSummary,
  dispatch_initializeProposalUpload,
  dispatch_proposeNewRank,
  dispatch_proposeNewContract,
  dispatch_hideElement,
  dispatch_renderUploadStatus,
  dispatch_renderLoadingIndicator,
  dispatch_removeLoadingIndicator,
  dispatch_enableStakingButtons,
  dispatch_renderCreateProposalPage,
} from "../../dispatch/render";
import {
  MyProposals,
  PageState,
  PopupState,
  ProposalFormat,
  RankProposal,
  SmartContractProposal,
  State,
  Status,
} from "../../types";
import {
  DAOSTAKINGADDRESS,
  getAddress,
  requestAccounts,
} from "../../wallet/web3";
import {
  getAcceptedSCProposalsByIndex,
  getCatalogDAOContractWithWallet,
  getMyProposals,
  getRank,
  getRankProposalsByIndex,
  getSmartContractProposalsBYIndex,
  proposeNewRank,
  proposeNewSmartContract,
} from "../../wallet/catalogDAO/contractCalls";
import { hasError, OptionsBuilder } from "../utils";
import { copyStringToClipboard, getById, readFile } from "../../view/utils";
import {
  dispatch_setPage,
  dispatch_setPopupState,
  dispatch_setUploadProposalProps,
} from "../../dispatch/stateChange";
import { decryptWallet } from "../../crypto";
import {
  createProposalTransaction,
  getProfitSharingTransaction,
  postTransaction,
  uploadData,
} from "../../wallet/arweave";
import {
  convertToHTMLFromArrayBuffer,
  onDocProposalFileDropped,
} from "./onDocFileDropped";
import {
  getDaoStakingContract,
  isStaking,
  stake,
} from "../../wallet/daoStaking/contractCalls";
import {
  allowance,
  approve,
  balanceOf,
  getRicContract,
} from "../../wallet/ric/contractCalls";
import Web3 from "web3";
import { getProfitSharingAddresses } from "../profitSharing";
import { getError } from "../../wallet/errors";
import { handleTermsCheckbox } from "./permawebSelectActions";
import { createProposalEditor } from "../../state/editor";
import {
  getTrailDetailsWithoutFrom,
  getTrailsContractWithRPC,
} from "../../wallet/trails/contractCalls";

export async function createProposalActions(props: State) {
  dispatch_renderLoadingIndicator("loading-display");
  await requestAccounts();
  const myAddress = await getAddress();
  const catalogDAO = await getCatalogDAOContractWithWallet();

  const rankOptions = await OptionsBuilder(() =>
    getRank(catalogDAO, myAddress, myAddress)
  );

  if (rankOptions.status === Status.Failure) {
    dispatch_renderError("Failed to fetch the Rank!");
    dispatch_removeLoadingIndicator("loading-display");
    return;
  }

  const myProposalOptions = await OptionsBuilder(() =>
    getMyProposals(catalogDAO, myAddress)
  );

  if (myProposalOptions.status === Status.Failure) {
    dispatch_renderError(myProposalOptions.error);
    dispatch_removeLoadingIndicator("loading-display");
    return;
  }

  const myProposals = myProposalOptions.data as MyProposals;
  const myRankProposals = myProposals.rank;

  //Check if the last RankProposal is still pending!

  const myLastRankProposal = await getMyLastRankProposal(
    catalogDAO,
    myAddress,
    myProposals.rank
  );
  let rank = rankOptions.data;
  //If the rank is zero and there is no pending Rank proposal

  // const mySmartContractProposals = myProposals.smartContract;
  const myLastSmartContractProposal = await getMyLastSmartContractProposal(
    catalogDAO,
    myAddress,
    myProposals.smartContract
  );

  dispatch_removeLoadingIndicator("loading-display");
  if (rank === "0") {
    if (myRankProposals.length === 0) {
      dispatch_proposeNewRank(false);
    } else {
      dispatch_proposeNewRank(!myLastRankProposal.closed);
    }
  } else if (rank !== "10") {
    if (myLastSmartContractProposal === undefined) {
      dispatch_proposeNewContract(false);
    } else {
      dispatch_proposeNewContract(!myLastSmartContractProposal.closed);
    }
  }

  //Then render either the proposalTXId input.. or the GithubURL, maybe I just render the labels
  const stakingButton = getById("stake-3000-ric");
  const approveButton = getById("approve-stake-spend");

  const daoStakingOptions = await OptionsBuilder(() => getDaoStakingContract());

  if (hasError(daoStakingOptions)) {
    return;
  }

  const ricOptions = await OptionsBuilder(() => getRicContract());

  if (hasError(ricOptions)) {
    return;
  }

  const amIStakingOptions = await OptionsBuilder(() =>
    isStaking(daoStakingOptions.data, myAddress, myAddress)
  );

  if (hasError(amIStakingOptions)) {
    return;
  }

  // // If I'm staking, disable the button
  const myAllowanceOptions = await OptionsBuilder(() =>
    allowance(ricOptions.data, myAddress, DAOSTAKINGADDRESS, myAddress)
  );
  if (hasError(myAllowanceOptions)) {
    return;
  }
  const ricBalanceOptions = await OptionsBuilder(() =>
    balanceOf(ricOptions.data, myAddress, myAddress)
  );
  if (hasError(ricBalanceOptions)) {
    return;
  }

  const intAllowance = parseInt(myAllowanceOptions.data);
  const enoughAllowance = intAllowance >= 3000;

  dispatch_enableStakingButtons(
    props,
    !amIStakingOptions.data && enoughAllowance,
    enoughAllowance,
    ricBalanceOptions.data,
    amIStakingOptions.data
  );

  approveButton.onclick = async function () {
    const onError = (err) => {
      dispatch_renderError(getError(err.message));
    };
    const onReceipt = (res) => {
      dispatch_renderCreateProposalPage(props);
    };
    await approve(
      ricOptions.data,
      DAOSTAKINGADDRESS,
      Web3.utils.toWei("3000"),
      myAddress,
      onError,
      onReceipt
    );
  };
  stakingButton.onclick = async function () {
    const onError = (err) => {
      dispatch_renderError(getError(err.message));
    };
    const onReceipt = (res) => {
      dispatch_renderCreateProposalPage(props);
    };

    await stake(daoStakingOptions.data, myAddress, onError, onReceipt);
  };

  const githubRepoUrl = getById("github-url") as HTMLInputElement;
  const rankheader = getById("rankHeader") as HTMLHeadingElement;
  const submitRankProposal = getById("create-rank-proposal");
  const scProposalEl = getById("proposal-tx-id") as HTMLInputElement;
  rankheader.textContent = `Your rank is ${rank}`;

  submitRankProposal.onclick = async function () {
    if (githubRepoUrl.value === "") {
      dispatch_renderError("Empty input");
      return;
    }

    if (!githubRepoUrl.validity.valid) {
      dispatch_renderError("Invalid url");
      return;
    }

    const onError = (error, receipt) => {
      dispatch_renderError(getError(error.message));
    };
    const onReceipt = (receipt) => {
      dispatch_setPage(PageState.Proposals);
    };

    await proposeNewRank(
      catalogDAO,
      githubRepoUrl.value,
      myAddress,
      onError,
      onReceipt
    );
  };

  const contractProposalSubmit = getById("proposal-submit-button");
  const isUpdateEl = getById("is-update-input") as HTMLInputElement;
  const hasFrontendEl = getById("has-frontend-input") as HTMLInputElement;
  const hasFeesEl = getById("has-fees-input") as HTMLInputElement;
  const updateOfEl = getById("of-update-input") as HTMLInputElement;

  isUpdateEl.onchange = function () {
    updateOfEl.disabled = !updateOfEl.disabled;
  };

  contractProposalSubmit.onclick = async function () {
    if (scProposalEl.value.length !== 43) {
      dispatch_renderError("Invalid transaction id");
      return;
    }

    const id = scProposalEl.value;

    if (isUpdateEl.checked) {
      const proposalToUpdate = await getAcceptedSCProposalsByIndex(
        catalogDAO,
        updateOfEl.value,
        myAddress
      );
      if (proposalToUpdate.creator !== myAddress) {
        dispatch_renderError(
          "You can only update your own smart contract proposal."
        );
        return;
      }
    }

    const onError = (error: any, receipt: any) => {
      dispatch_renderError(getError(error.message));
    };
    const onReceipt = (receipt: any) => {
      dispatch_setPage(PageState.Proposals);
    };

    const updateOf = isNaN(parseInt(updateOfEl.value)) ? "0" : updateOfEl.value;

    await proposeNewSmartContract(
      catalogDAO,
      id,
      hasFrontendEl.checked,
      hasFeesEl.checked,
      isUpdateEl.checked,
      updateOf,
      myAddress,
      onError,
      onReceipt
    );
  };
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

const proposalEditor = createProposalEditor();

export function uploadProposalActions(props: State, step: PopupState) {
  proposalEditor.destroy();
  proposalEditor.setup();

  const backbutton = getById("create-contract-back");

  const createContractProposal = getById("create-contract-proposal");

  const nameEl = getById("smartcontract-name") as HTMLInputElement;
  const artifactEl = getById("smartcontract-artifact") as HTMLInputElement;

  const gitEl = getById("smartcontract-repo") as HTMLInputElement;
  const frontEndEl = getById("smartcontract-frontend") as HTMLInputElement;
  const trailEl = getById("trailname-input") as HTMLInputElement;
  const termsAcceptedEl = getById("accepted-terms") as HTMLInputElement;

  const networkEl = getById("selected-network") as HTMLSelectElement;
  const passwordEl = getById("arweave-key-password") as HTMLInputElement;

  const categoryEl = getById("select-category") as HTMLSelectElement;
  const implementsSimpleTerms = getById(
    "implements-simpleterms-checkbox"
  ) as HTMLInputElement;

  termsAcceptedEl.onclick = async function () {
    await handleTermsCheckbox(termsAcceptedEl);
  };

  if (props.uploadProposalProps !== null) {
    proposalEditor.setContent(props.uploadProposalProps.terms, 0);
  }
  if (props.uploadProposalProps !== null) {
    dispatch_initializeProposalUpload(props, {
      nameEl,
      artifactEl,
      gitEl,
      frontEndEl,
      networkEl,
      categoryEl,
      implementsSimpleTerms,
      trailEl,
    });
  }

  if (props.Account.address === null) {
    dispatch_renderError("You need to add an arweave account.");
  }

  backbutton.onclick = function () {
    dispatch_setUploadProposalProps({
      name: nameEl.value,
      artifact: artifactEl.value,
      terms: proposalEditor.getContent(),
      git: gitEl.value,
      frontEnd: frontEndEl.value,
      network: networkEl.value,
      category: categoryEl.value,
      simpleterms: implementsSimpleTerms.checked,
      trail: trailEl.value,
    });
    switch (step) {
      case PopupState.UploadProposal:
        dispatch_setPopupState(PopupState.NONE);
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
    const terms = proposalEditor.getContent();
    dispatch_setUploadProposalProps({
      name: nameEl.value,
      artifact: artifactEl.value,
      terms,
      git: gitEl.value,
      frontEnd: frontEndEl.value,
      network: networkEl.value,
      category: categoryEl.value,
      simpleterms: implementsSimpleTerms.checked,
      trail: trailEl.value,
    });
    switch (step) {
      case PopupState.UploadProposal:
        if (nameEl.value === "") {
          dispatch_renderError("You must specify the name.");
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
        if (hasError(artifactiOptions)) {
          return;
        }

        const artifactIsValid = artifactiOptions.data;

        if (!artifactIsValid) {
          dispatch_renderError("Malformed Artifact.");
          return;
        }

        if (trailEl.value.length !== 0) {
          // Trail element can be empty but if it's not, I check if the trail exists
          const trailsContractOptions = await OptionsBuilder(() =>
            getTrailsContractWithRPC()
          );
          const trails = trailsContractOptions.data;
          if (hasError(trailsContractOptions)) {
            return;
          }
          const trailDetailsOptions = await OptionsBuilder(() =>
            getTrailDetailsWithoutFrom(trails, trailEl.value)
          );
          if (hasError(trailDetailsOptions)) {
            return;
          }
          const trailDetails = trailDetailsOptions.data;
          if (!trailDetails.initialized) {
            dispatch_renderError("Trail doesn't exist!");
            return;
          }
        }

        if (gitEl.value === "") {
          dispatch_renderError("You must add a valid link for a git repo.");
          return;
        }

        dispatch_setPopupState(PopupState.UploadProposalStep3);
        break;
      case PopupState.UploadProposalStep3:
        if (terms.length < 400) {
          dispatch_renderError(
            "You must propose terms for the contract. At least 400 characters."
          );
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

        const proposal: ProposalFormat = {
          name: nameEl.value,
          artifact: JSON.parse(artifactEl.value),
          terms: terms,
          git: gitEl.value,
          frontEnd: frontEndEl.value,
          network: networkEl.value,
          category: categoryEl.value,
          simpleterms: implementsSimpleTerms.checked,
          trail: trailEl.value,
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
        const pstAddress = await getProfitSharingAddresses();

        if (pstAddress === undefined) {
          dispatch_renderProposalSummary(
            proposalTransaction,
            props,
            proposal,
            terms,
            false,
            ""
          );
        } else {
          const tipTransaction = await getProfitSharingTransaction(
            pstAddress.to,
            decryptOptions.data,
            props.version
          );
          dispatch_renderProposalSummary(
            proposalTransaction,
            props,
            proposal,
            terms,
            true,
            tipTransaction
          );
        }
        break;
      default:
        break;
    }
  };
}

export function uploadProposalSummaryActions(
  transaction: any,
  props: State,
  hasTip: boolean,
  tipTransaction: any
) {
  const backButton = getById("post-proposal-back");
  const postButton = getById("post-proposal");
  const copyButton = getById("copy-proposal-address");

  copyButton.onclick = async function () {
    const txIdEl = getById("transactionid");
    await copyStringToClipboard(txIdEl.dataset.id);
  };

  backButton.onclick = function () {
    dispatch_setPopupState(PopupState.UploadProposalStep4);
  };

  postButton.onclick = async function () {
    dispatch_hideElement(backButton, true);
    dispatch_hideElement(postButton, true);
    dispatch_renderLoadingIndicator("upload-proposal-display");
    try {
      const res = await uploadData(transaction, (uploader) => {
        dispatch_renderUploadStatus(
          props,
          `${uploader.pctComplete}% complete, ${uploader.uploadedChunks}/${uploader.totalChunks}`
        );
      });

      if (hasTip) {
        const secondTX = (await postTransaction(tipTransaction).catch((err) => {
          dispatch_renderError(err);
        })) as {
          status: number;
          statusText: string;
          data: any;
        };
      }

      if (res.status === Status.Failure) {
        dispatch_renderError(res.error);
        dispatch_hideElement(backButton, false);
        dispatch_hideElement(postButton, false);
      }
      dispatch_removeLoadingIndicator("upload-proposal-display");
      dispatch_hideElement(backButton, false);
      backButton.onclick = function () {
        dispatch_setPopupState(PopupState.NONE);
      };
    } catch (err) {
      dispatch_renderError(err.message);
      dispatch_hideElement(backButton, false);
      dispatch_hideElement(postButton, false);
      dispatch_removeLoadingIndicator("upload-proposal-display");
    }
  };
}

export async function getMyLastSmartContractProposal(
  catalogDAO: any,
  myAddress: any,
  mySmartContractProposals: string[]
) {
  let myLastSmartContractProposal;
  if (mySmartContractProposals.length !== 0) {
    const myLastSmartContractProposalOptions = await OptionsBuilder(() =>
      getSmartContractProposalsBYIndex(
        catalogDAO,
        mySmartContractProposals.slice(-1)[0],
        myAddress
      )
    );

    if (hasError(myLastSmartContractProposalOptions)) {
      dispatch_removeLoadingIndicator("loading-display");
    }

    myLastSmartContractProposal =
      myLastSmartContractProposalOptions.data as SmartContractProposal;

    if (!myLastSmartContractProposal.closed) {
      dispatch_renderError("Your last smart contract proposal is still open");
    }
  }
  return myLastSmartContractProposal;
}

export async function getMyLastRankProposal(
  catalogDAO: any,
  myAddress: string,
  myRankProposals: string[]
) {
  let myLastRankProposal;
  if (myRankProposals.length !== 0) {
    const myLastRankProposalOptions = await OptionsBuilder(() =>
      getRankProposalsByIndex(
        catalogDAO,
        myRankProposals.slice(-1)[0],
        myAddress
      )
    );

    if (myLastRankProposalOptions.status === Status.Failure) {
      dispatch_renderError(myLastRankProposalOptions.error);
      dispatch_removeLoadingIndicator("loading-display");
    }

    myLastRankProposal = myLastRankProposalOptions.data as RankProposal;

    if (!myLastRankProposal.closed) {
      dispatch_renderError("Your last rank proposal is still open.");
    }
  }
  return myLastRankProposal;
}
