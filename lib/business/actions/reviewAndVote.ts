import {
  dispatch_setPage,
  dispatch_setPopupState,
} from "../../dispatch/stateChange";
import {
  PageState,
  PopupState,
  RankProposal,
  RemovalProposal,
  SmartContractProposal,
  State,
} from "../../types";
import { getById, newTab } from "../../view/utils";
import {
  getAddress,
  getBlockNumber,
  requestAccounts,
  web3Injected,
} from "../../wallet/web3";
import MetaMaskOnboarding from "@metamask/onboarding";
import {
  dispatch_renderContractDisplayPage,
  dispatch_renderError,
  dispatch_renderReviewRankProposals,
  dispatch_renderReviewRemovalProposals,
  dispatch_renderReviewSmartContractProposals,
  dispatch_renderVoteOnSmartContract,
} from "../../dispatch/render";
import {
  getCatalogDAOContractWithWallet,
  getRankProposalIndex,
  getMyRankProposalsPaginated,
  voteOnNewRank,
  acceptedTerms,
  getTerms,
  getSmartContractProposalIndex,
  getMySmartContractProposalsPaginated,
  closeSuspiciousProposal,
  getRemovalProposalIndex,
  getRemovalProposalsPaginated,
  voteOnRemoval,
} from "../../wallet/catalogDAO/contractCalls";
import { getPaginatedByIndex, hasError, OptionsBuilder } from "../utils";
import {
  getDaoStakingContract,
  isStaking,
} from "../../wallet/daoStaking/contractCalls";
import { Contract } from "web3-eth-contract";

export async function reviewAndVotePageActions(props: State) {
  const createProposalButton = getById("create-proposal-button");
  createProposalButton.onclick = async function () {
    const catalogDAOOptions = await OptionsBuilder(() =>
      getCatalogDAOContractWithWallet()
    );

    if (hasError(catalogDAOOptions)) {
      return;
    }
    const acceptedOptions = await OptionsBuilder(() =>
      acceptedTerms(catalogDAO, myAddress)
    );
    if (hasError(acceptedOptions)) {
      return;
    }

    if (acceptedOptions.data === false) {
      dispatch_renderError("You need to accept the DAO terms.");
      const URLOptions = await OptionsBuilder(async () => getTerms(catalogDAO));

      if (hasError(URLOptions)) {
        return;
      }
      newTab(URLOptions.data);
    } else {
      dispatch_setPage(PageState.Proposals);
    }
  };

  const myProposalsButton = getById("my-proposals-button");
  myProposalsButton.onclick = function () {
    dispatch_setPage(PageState.ManageProposals);
  };

  const feePageButton = getById("fee-proposals-button");

  feePageButton.onclick = function () {
    dispatch_setPage(PageState.feeProposals);
  };

  if (!web3Injected()) {
    dispatch_renderError("Found no injected web3, install metamask");
    const onboarding = new MetaMaskOnboarding();
    onboarding.startOnboarding();
    return;
  }

  await requestAccounts();

  const myAddress = await getAddress();
  const catalogDAO = await getCatalogDAOContractWithWallet();
  const blockNumber = await getBlockNumber();

  const rankPage = await getPaginatedByIndex<RankProposal[]>(
    1,
    catalogDAO,
    myAddress,
    getRankProposalIndex,
    getMyRankProposalsPaginated
  );

  dispatch_renderReviewRankProposals(props, blockNumber, rankPage);

  const smartContractPage = await getPaginatedByIndex<SmartContractProposal[]>(
    1,
    catalogDAO,
    myAddress,
    getSmartContractProposalIndex,
    getMySmartContractProposalsPaginated
  );
  dispatch_renderReviewSmartContractProposals(
    props,
    blockNumber,
    smartContractPage
  );

  const removalProposals = await getPaginatedByIndex<RemovalProposal[]>(
    1,
    catalogDAO,
    myAddress,
    getRemovalProposalIndex,
    getRemovalProposalsPaginated
  );

  dispatch_renderReviewRemovalProposals(props, blockNumber, removalProposals);

  const contractURLOptions = await OptionsBuilder(() => getTerms(catalogDAO));
  if (hasError(contractURLOptions)) {
    return;
  }

  const termsAndConditionsButton = getById(
    "terms-and-conditions-button"
  ) as HTMLAnchorElement;

  termsAndConditionsButton.href = contractURLOptions.data;
}

export async function rankProposalTableActions(props: State) {
  const paginationButtons = document.getElementsByClassName(
    "rankPagePaginationButton"
  );
  const pageLeftButton = getById("rank-page-left");
  const pageRightButton = getById("rank-page-right");

  const approveButtons = document.getElementsByClassName(
    "rankProposalApproveButton"
  );
  const rejectButtons = document.getElementsByClassName(
    "rankProposalRejectButton"
  );
  const myAddress = await getAddress();
  const catalogDAO = await getCatalogDAOContractWithWallet();
  const onError = (error, receipt) => {
    if (error.message.includes("903")) {
      dispatch_renderError(
        "You need to accept the DAO terms before you can vote."
      );
    } else if (error.message.includes("911")) {
      dispatch_renderError("You need rank to vote.");
    } else if (error.message.includes("912")) {
      dispatch_renderError("You voted already!");
    } else {
      dispatch_renderError(error.message);
    }
  };

  const onReceipt = (receipt) => {
    dispatch_setPage(PageState.ReviewAndVote);
  };

  const vote = async (approve: boolean, index: string) => {
    const isStakingResult = await checkIfUserIsStaking();

    if (isStakingResult) {
      await voteOnNewRank(
        catalogDAO,
        index,
        approve,
        myAddress,
        onError,
        onReceipt
      );
    }
  };
  // starts with _ because an import can shadow it
  const _getProposals = async (index: number) =>
    await getPaginatedByIndex<RankProposal[]>(
      index,
      catalogDAO,
      myAddress,
      getRankProposalIndex,
      getMyRankProposalsPaginated
    );

  // Add the onclick for the Rank approve buttons

  for (let i = 0; i < approveButtons.length; i++) {
    const approveButton = approveButtons[i] as HTMLButtonElement;
    const rejectButton = rejectButtons[i] as HTMLButtonElement;
    approveButton.onclick = async function () {
      const index = approveButton.dataset.index;
      await vote(true, index);
    };
    rejectButton.onclick = async function () {
      const index = rejectButton.dataset.index;
      await vote(false, index);
    };
  }

  // add the onclick for the rank pagination buttons
  for (let i = 0; i < paginationButtons.length; i++) {
    const paginationButton = paginationButtons[i] as HTMLButtonElement;
    paginationButton.onclick = async function () {
      const pageIndex = parseInt(paginationButton.dataset.rankpage);
      const rankPage = await _getProposals(pageIndex);
      const blockNumber = await getBlockNumber();
      dispatch_renderReviewRankProposals(props, blockNumber, rankPage);
    };
  }

  pageLeftButton.onclick = async function () {
    const index = parseInt(pageLeftButton.dataset.rankpage);

    if (index > 1) {
      const rankPage = await _getProposals(index - 1);

      const blockNumber = await getBlockNumber();

      dispatch_renderReviewRankProposals(props, blockNumber, rankPage);
    }
  };
  pageRightButton.onclick = async function () {
    const index = parseInt(pageRightButton.dataset.rankpage);
    const total = parseInt(pageRightButton.dataset.totalpages);

    if (index < total) {
      const rankPage = await _getProposals(index + 1);

      const blockNumber = await getBlockNumber();

      dispatch_renderReviewRankProposals(props, blockNumber, rankPage);
    }
  };
}

export async function checkIfUserIsStaking(): Promise<boolean> {
  const addressOptions = await OptionsBuilder(() => getAddress());
  if (hasError(addressOptions)) {
    return false;
  }
  const daoStakingOptions = await OptionsBuilder(() => getDaoStakingContract());

  if (hasError(daoStakingOptions)) {
    return false;
  }
  const isStakingOptions = await OptionsBuilder(() =>
    isStaking(daoStakingOptions.data, addressOptions.data, addressOptions.data)
  );

  if (hasError(isStakingOptions)) {
    return false;
  }

  return isStakingOptions.data === true;
}

export async function smartContractProposalTableActions(props: State) {
  const paginationButtons = document.getElementsByClassName(
    "smartContractPagePaginationButton"
  );
  const pageLeftButton = getById("smartcontract-page-left");
  const pageRightButton = getById("smartcontract-page-right");

  const approveButtons = document.getElementsByClassName(
    "smartContractProposalApproveButton"
  );
  const rejectButtons = document.getElementsByClassName(
    "smartContractProposalRejectButton"
  );

  const closeSuspiciousBttn = document.getElementsByClassName(
    "close-suspicious-proposal-buttons"
  );

  const myAddress = await getAddress();
  const catalogDAO = await getCatalogDAOContractWithWallet();

  const vote = async (approve: boolean, index: string, arweaveTxId: string) => {
    const isStakingResult = await checkIfUserIsStaking();
    if (isStakingResult) {
      dispatch_setPopupState(PopupState.emptyPopup);
      dispatch_renderVoteOnSmartContract(
        props,
        index,
        approve,
        arweaveTxId,
        refresh
      );
    } else {
      dispatch_renderError("You need to be staking to vote!");
    }
  };

  const refresh = async (pageindex) => {
    const smartContractpage = await _getProposals(pageindex);
    const blockNumber = await getBlockNumber();

    dispatch_renderReviewSmartContractProposals(
      props,
      blockNumber,
      smartContractpage
    );
  };

  const _getProposals = async (pageindex: number) =>
    await getPaginatedByIndex<SmartContractProposal[]>(
      pageindex,
      catalogDAO,
      myAddress,
      getSmartContractProposalIndex,
      getMySmartContractProposalsPaginated
    );

  // Lets add the onclick for the approve and the reject buttons

  for (let i = 0; i < approveButtons.length; i++) {
    const approveButton = approveButtons[i] as HTMLButtonElement;
    const rejectButton = rejectButtons[i] as HTMLButtonElement;

    approveButton.onclick = async function () {
      const index = approveButton.dataset.index;
      const arweaveTxId = approveButton.dataset.arweavetx;
      await vote(true, index, arweaveTxId);
    };
    rejectButton.onclick = async function () {
      const index = rejectButton.dataset.index;
      const arweaveTxId = approveButton.dataset.arweavetx;
      await vote(false, index, arweaveTxId);
    };
  }
  addContractDetailsPopup(props);

  // add the onclick for the close suspicious contract buttons
  for (let i = 0; i < closeSuspiciousBttn.length; i++) {
    const bttn = closeSuspiciousBttn[i] as HTMLButtonElement;

    bttn.onclick = async function () {
      const index = bttn.dataset.index;
      const onError = (error, receipt) => {
        dispatch_renderError(error.message);
      };
      const onReceipt = () => {
        refresh(pageRightButton.dataset.smartcontractpage);
      };
      await closeSuspiciousProposal(
        catalogDAO,
        index,
        myAddress,
        onError,
        onReceipt
      );
    };
  }

  // add the onclick for the smart contract pagination buttons
  for (let i = 0; i < paginationButtons.length; i++) {
    const paginationButton = paginationButtons[i] as HTMLButtonElement;
    paginationButton.onclick = async function () {
      const pageIndex = parseInt(paginationButton.dataset.smartcontractpage);
      refresh(pageIndex);
    };
  }

  pageLeftButton.onclick = async function () {
    const index = parseInt(pageLeftButton.dataset.smartcontractpage);

    if (index > 1) {
      refresh(index - 1);
    }
  };

  pageRightButton.onclick = async function () {
    const index = parseInt(pageRightButton.dataset.smartcontractpage);
    const total = parseInt(pageRightButton.dataset.totalpages);

    if (index < total) {
      refresh(index + 1);
    }
  };
}

export async function removalProposalTableActions(props: State) {
  const paginationButtons = document.getElementsByClassName(
    "removalProposalPaginationButton"
  );
  const pageLeftButton = getById("removalProposal-page-left");
  const pageRightButton = getById("removalProposal-page-right");
  const approveButtons = document.getElementsByClassName(
    "removalProposalApproveButton"
  );
  const rejectButtons = document.getElementsByClassName(
    "removalProposalRejectButton"
  );
  let myAddress: any = await OptionsBuilder(() => getAddress());
  if (hasError(myAddress)) {
    return;
  }
  myAddress = myAddress.data as string;

  let catalogDAO: any = await OptionsBuilder(() =>
    getCatalogDAOContractWithWallet()
  );
  if (hasError(catalogDAO)) {
    return;
  }
  catalogDAO = catalogDAO.data as Contract;

  const onError = (error, receipt) => {
    dispatch_renderError(error.message);
  };
  const onReceipt = (receipt) => {
    dispatch_setPage(PageState.ReviewAndVote);
  };

  const vote = async (approve: boolean, index: string) => {
    const isStakingResult = await checkIfUserIsStaking();
    if (isStakingResult) {
      await voteOnRemoval(
        catalogDAO,
        index,
        approve,
        myAddress,
        onError,
        onReceipt
      );
    }
  };

  const _getProposals = async (index: number) =>
    await getPaginatedByIndex<RemovalProposal[]>(
      index,
      catalogDAO,
      myAddress,
      getRemovalProposalIndex,
      getRemovalProposalsPaginated
    );

  // add the onclick for the approve buttons

  for (let i = 0; i < approveButtons.length; i++) {
    const approveButton = approveButtons[i] as HTMLButtonElement;
    const rejectButton = rejectButtons[i] as HTMLButtonElement;

    approveButton.onclick = async function () {
      const index = approveButton.dataset.index;
      await vote(true, index);
    };
    rejectButton.onclick = async function () {
      const index = rejectButton.dataset.index;
      await vote(false, index);
    };
  }

  // add the onclick for the pagination buttons

  for (let i = 0; i < paginationButtons.length; i++) {
    const bttn = paginationButtons[i] as HTMLButtonElement;
    bttn.onclick = async function () {
      const pageIndex = parseInt(bttn.dataset.proposalpage);
      const removalPage = await _getProposals(pageIndex);
      const blockNumber = await getBlockNumber();
      dispatch_renderReviewRemovalProposals(props, blockNumber, removalPage);
    };
  }

  pageLeftButton.onclick = async function () {
    const index = parseInt(pageLeftButton.dataset.smartcontractpage);
    if (index > 1) {
      const removalPage = await _getProposals(index - 1);
      const blockNumber = await getBlockNumber();

      dispatch_renderReviewRemovalProposals(props, blockNumber, removalPage);
    }
  };

  pageRightButton.onclick = async function () {
    const index = parseInt(pageRightButton.dataset.smartcontractpage);
    const total = parseInt(pageRightButton.dataset.totalpages);
    if (index < total) {
      const removalPage = await _getProposals(index + 1);
      const blockNumber = await getBlockNumber();
      dispatch_renderReviewRemovalProposals(props, blockNumber, removalPage);
    }
  };
}

export function addContractDetailsPopup(props: State) {
  const contractDetailsBttn = document.getElementsByClassName(
    "contract-page-popup"
  );
  // add the onclick for the contract page popup
  for (let i = 0; i < contractDetailsBttn.length; i++) {
    const bttn = contractDetailsBttn[i] as HTMLButtonElement;
    bttn.onclick = async function () {
      const tx = bttn.dataset.arweavetx;
      dispatch_setPopupState(PopupState.emptyPopup);
      dispatch_renderContractDisplayPage(props, tx, true, null);
    };
  }
}
