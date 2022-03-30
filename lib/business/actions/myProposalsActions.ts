import {
  dispatch_createRemovalProposal,
  dispatch_removeLoadingIndicator,
  dispatch_renderError,
  dispatch_renderLoadingIndicator,
  dispatch_renderMyAcceptedSmartContractProposals,
  dispatch_renderMyRankProposals,
  dispatch_renderMyRemovalProposals,
  dispatch_renderMyRicBalance,
  dispatch_renderMySmartContractProposals,
  dispatch_renderStakerDetails,
} from "../../dispatch/render";
import {
  checkNetwork,
  getAddress,
  getBlockNumber,
  requestAccounts,
  web3Injected,
} from "../../wallet/web3";
import MetaMaskOnboarding from "@metamask/onboarding";
import {
  dispatch_setPage,
  dispatch_setPopupState,
} from "../../dispatch/stateChange";
import {
  AcceptedSmartContractProposal,
  MyProposals,
  PageState,
  PaginatedProposal,
  PopupState,
  RankProposal,
  RemovalProposal,
  SmartContractProposal,
  State,
  Status,
} from "../../types";
import {
  closeRankProposal,
  closeRemovalProposal,
  closeSmartContractProposal,
  getAcceptedSmartContractProposalsPaginated,
  getCatalogDAOContractWithWallet,
  getMyProposals,
  getMyRankProposalsPaginated,
  getMySmartContractProposalsPaginated,
  getRemovalProposalsPaginated,
  proposeContractRemoval,
} from "../../wallet/catalogDAO/contractCalls";
import {
  getProposals,
  hasError,
  OptionsBuilder,
  proposalsToFetch,
  startPaginatingAProposal,
} from "../utils";
import { getById } from "../../view/utils";
import { Contract } from "web3-eth-contract";
import { addContractDetailsPopup } from "./reviewAndVote";
import {
  claimReward,
  getActualReward,
  getDaoStakingContract,
  getStaker,
  getStakingBlocks,
  isRewarded,
  unStake,
} from "../../wallet/daoStaking/contractCalls";
import { balanceOf, getRicContract } from "../../wallet/ric/contractCalls";
import { getError } from "../../wallet/errors";

export async function myProposalsActions(props: State) {
  if (!web3Injected()) {
    dispatch_renderError("Found no injected web3, install metamask");
    const onboarding = new MetaMaskOnboarding();
    onboarding.startOnboarding();
    return;
  }

  dispatch_renderLoadingIndicator("my-rank-proposals-container");
  await requestAccounts();

  const myAddress = await getAddress();
  const blockNumber = await getBlockNumber();
  const catalogDAO = await getCatalogDAOContractWithWallet();
  const ricOptions = await OptionsBuilder(() => getRicContract());
  if (hasError(ricOptions)) {
    return;
  }
  const ricBalanceOptions = await OptionsBuilder(() =>
    balanceOf(ricOptions.data, myAddress, myAddress)
  );
  if (hasError(ricBalanceOptions)) {
    return;
  }

  dispatch_renderMyRicBalance(props, ricBalanceOptions.data);

  const daoStakingOptions = await OptionsBuilder(() => getDaoStakingContract());

  if (hasError(daoStakingOptions)) {
    return;
  }

  const getStakerOptions = await OptionsBuilder(() =>
    getStaker(daoStakingOptions.data, myAddress, myAddress)
  );

  if (hasError(getStakerOptions)) {
    return;
  }

  const stakingBlocksOptions = await OptionsBuilder(() =>
    getStakingBlocks(daoStakingOptions.data, myAddress)
  );

  dispatch_renderStakerDetails(
    props,
    getStakerOptions.data,
    stakingBlocksOptions.data,
    blockNumber
  );

  const myProposalOptions = await OptionsBuilder(() =>
    getMyProposals(catalogDAO, myAddress)
  );

  if (myProposalOptions.status === Status.Failure) {
    dispatch_renderError(myProposalOptions.error);
    dispatch_removeLoadingIndicator("my-rank-proposals-container");
    return;
  }

  const myProposals = myProposalOptions.data as MyProposals;
  const paginatedRank = startPaginatingAProposal(
    myProposals.rank.slice().reverse(),
    1
  );

  await rankFetcher(paginatedRank, catalogDAO, myAddress, props, blockNumber);
  const paginatedSmartContract = startPaginatingAProposal(
    myProposals.smartContract.slice().reverse(),
    1
  );
  await smartContractProposalFetcher(
    paginatedSmartContract,
    catalogDAO,
    myAddress,
    props,
    blockNumber
  );

  const paginatedAcceptedContract = startPaginatingAProposal(
    myProposals.acceptedSCProposals.slice().reverse(),
    1
  );
  await acceptedSmartContractProposalFetcher(
    paginatedAcceptedContract,
    catalogDAO,
    myAddress,
    props,
    blockNumber
  );

  const paginatedRemovalProposal = startPaginatingAProposal(
    myProposals.removal.slice().reverse(),
    1
  );
  await removalProposalFetcher(
    paginatedRemovalProposal,
    catalogDAO,
    myAddress,
    props,
    blockNumber
  );

  addContractDetailsPopup(props);
}

export async function rankFetcher(
  paginatedRank: PaginatedProposal,
  catalogDAO: Contract,
  myAddress: string,
  props: State,
  blockNumber: number
) {
  const rankProposalsToFetch: string[] = proposalsToFetch(paginatedRank);

  const rankProposals = await getProposals<RankProposal[]>(
    catalogDAO,
    myAddress,
    rankProposalsToFetch,
    getMyRankProposalsPaginated
  );
  dispatch_renderMyRankProposals(props, blockNumber, [
    rankProposals,
    rankProposalsToFetch,
    paginatedRank,
  ]);
}

export async function smartContractProposalFetcher(
  paginatedSmartContract: PaginatedProposal,
  catalogDAO: Contract,
  myAddress: string,
  props: State,
  blockNumber: number
) {
  const smartContractProposalsToFetch: string[] = proposalsToFetch(
    paginatedSmartContract
  );

  const smartContractProposals = await getProposals<SmartContractProposal[]>(
    catalogDAO,
    myAddress,
    smartContractProposalsToFetch,
    getMySmartContractProposalsPaginated
  );

  dispatch_renderMySmartContractProposals(props, blockNumber, [
    smartContractProposals,
    smartContractProposalsToFetch,
    paginatedSmartContract,
  ]);
}

export async function acceptedSmartContractProposalFetcher(
  paginatedContract: PaginatedProposal,
  catalogDAO: Contract,
  myAddress: string,
  props: State,
  blockNumber: number
) {
  const acceptedProposalsToFetch: string[] =
    proposalsToFetch(paginatedContract);
  const acceptedProposals = await getProposals<AcceptedSmartContractProposal[]>(
    catalogDAO,
    myAddress,
    acceptedProposalsToFetch,
    getAcceptedSmartContractProposalsPaginated
  );
  // attaching the available reward to claim ,and if reward was claimed already for it
  const acceptedWithRewardDetails = await attachRewardDetails(
    acceptedProposals,
    myAddress
  );
  dispatch_renderMyAcceptedSmartContractProposals(props, blockNumber, [
    acceptedWithRewardDetails,
    acceptedProposalsToFetch,
    paginatedContract,
  ]);
}

export async function removalProposalFetcher(
  paginatedProposal: PaginatedProposal,
  catalogDAO: Contract,
  myAddress: string,
  props: State,
  blockNumber: number
) {
  const removalProposalsToFetch: string[] = proposalsToFetch(paginatedProposal);
  const removalProposals = await getProposals<RemovalProposal[]>(
    catalogDAO,
    myAddress,
    removalProposalsToFetch,
    getRemovalProposalsPaginated
  );

  dispatch_renderMyRemovalProposals(props, blockNumber, [
    removalProposals,
    removalProposalsToFetch,
    paginatedProposal,
  ]);
}

async function attachRewardDetails(
  acceptedProposals: AcceptedSmartContractProposal[],
  myAddress: string
) {
  const daoStakingOptions = await OptionsBuilder(() => getDaoStakingContract());

  if (hasError(daoStakingOptions)) {
    return;
  }
  let acceptedWithRewardDetails: AcceptedSmartContractProposal[] = [];
  // The length is always 5 here, max 5 proposals are fetched at a time
  for (let i = 0; i < 5; i++) {
    const proposal = acceptedProposals[i];
    const claimableReward = await getActualReward(
      daoStakingOptions.data,
      proposal.hasFrontend,
      proposal.hasFees,
      myAddress
    );
    const rewardClaimed = await isRewarded(
      daoStakingOptions.data,
      proposal.arweaveTxId,
      myAddress
    );
    acceptedWithRewardDetails.push({
      ...proposal,
      rewardClaimed,
      claimableReward,
    });
  }
  return acceptedWithRewardDetails;
}

export async function myAcceptedSmartContractProposalTableActions(
  props: State,
  indexes: string[]
) {
  const removeButtons = document.getElementsByClassName(
    "contract-remove-button"
  );
  const claimRewardButtons = document.getElementsByClassName(
    "contract-claim-reward-button"
  );
  const paginationButtons = document.getElementsByClassName(
    "myAcceptedSmartContractPaginationButton"
  );
  const pageLeftButton = getById("acceptedcontract-page-left");
  const pageRightButton = getById("acceptedcontract-page-right");

  const myAddressOptions = await OptionsBuilder(() => getAddress());
  if (hasError(myAddressOptions)) {
    return;
  }

  const catalogDaoOptions = await OptionsBuilder(() =>
    getCatalogDAOContractWithWallet()
  );

  if (hasError(catalogDaoOptions)) {
    return;
  }

  const onError = (error, receipt) => {
    dispatch_renderError(getError(error.message));
  };
  const onReceipt = (receipt) => {
    dispatch_setPage(PageState.ManageProposals);
  };
  const myAddress = myAddressOptions.data;
  // Let's attach the removal button onclicks

  const onRemovePressed = (index: string) => {
    dispatch_setPopupState(PopupState.emptyPopup);
    dispatch_createRemovalProposal(props, index, false);
  };

  const onRewardClaimed = async (index: string) => {
    const daoStakingOptions = await OptionsBuilder(() =>
      getDaoStakingContract()
    );
    if (hasError(daoStakingOptions)) {
      return;
    }
    await claimReward(
      daoStakingOptions.data,
      index,
      myAddress,
      onError,
      onReceipt
    );
  };

  attachListenersToAccepted(removeButtons, onRemovePressed);
  //Doing the claim reward buttons now
  attachListenersToAccepted(claimRewardButtons, onRewardClaimed);

  for (let i = 0; i < paginationButtons.length; i++) {
    const bttn = paginationButtons[i] as HTMLButtonElement;
    bttn.onclick = async function () {
      const pageIndex = parseInt(bttn.dataset.smartcontractpage);
      const blockNumber = await getBlockNumber();
      const paginatedSmartContract = startPaginatingAProposal(
        indexes,
        pageIndex
      );
      await acceptedSmartContractProposalFetcher(
        paginatedSmartContract,
        catalogDaoOptions.data,
        myAddress,
        props,
        blockNumber
      );
    };
  }

  pageLeftButton.onclick = async function () {
    const pageindex = parseInt(pageLeftButton.dataset.smartcontractpage);
    if (pageindex > 1) {
      const blockNumber = await getBlockNumber();
      const paginatedSmartContractProposals = startPaginatingAProposal(
        indexes,
        pageindex - 1
      );
      await acceptedSmartContractProposalFetcher(
        paginatedSmartContractProposals,
        catalogDaoOptions.data,
        myAddress,
        props,
        blockNumber
      );
    }
  };

  pageRightButton.onclick = async function () {
    const index = parseInt(pageRightButton.dataset.smartcontractpage);
    const total = parseInt(pageRightButton.dataset.totalpages);

    if (index < total) {
      const blockNumber = await getBlockNumber();
      const paginatedSmartContractProposal = startPaginatingAProposal(
        indexes,
        index + 1
      );

      await acceptedSmartContractProposalFetcher(
        paginatedSmartContractProposal,
        catalogDaoOptions.data,
        myAddress,
        props,
        blockNumber
      );
    }
  };
}

function attachListenersToAccepted(
  elements: HTMLCollectionOf<Element>,
  call: CallableFunction
) {
  for (let i = 0; i < elements.length; i++) {
    const bttn = elements[i] as HTMLButtonElement;
    bttn.onclick = async function () {
      const index = bttn.dataset.index;

      await call(index);
    };
  }
}

export async function mySmartContractProposalsTableActions(
  props: State,
  smartContractProposalIndexes: string[]
) {
  const closeSmartContractButtons = document.getElementsByClassName(
    "smartContractProposalButtonId"
  );
  const paginationButtons = document.getElementsByClassName(
    "mySmartContractPaginationButton"
  );

  const pageLeftButton = getById("smartcontract-page-left");
  const pageRightButton = getById("smartcontract-page-right");

  const catalogDAO = await getCatalogDAOContractWithWallet();
  const myAddressOptions = await OptionsBuilder(() => getAddress());
  if (hasError(myAddressOptions)) {
    return;
  }
  const myAddress = myAddressOptions.data;

  for (let i = 0; i < closeSmartContractButtons.length; i++) {
    const button = closeSmartContractButtons[i] as HTMLButtonElement;
    button.onclick = async function () {
      const index = button.dataset.proposalindex;

      const onError = (error, receipt) => {
        dispatch_renderError(getError(error.message));
      };
      const onReceipt = (receipt) => {
        dispatch_setPage(PageState.ManageProposals);
      };
      await closeSmartContractProposal(
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
      const blockNumber = await getBlockNumber();
      const paginatedSmartContract = startPaginatingAProposal(
        smartContractProposalIndexes,
        pageIndex
      );
      await smartContractProposalFetcher(
        paginatedSmartContract,
        catalogDAO,
        myAddress,
        props,
        blockNumber
      );
    };
  }

  pageLeftButton.onclick = async function () {
    const index = parseInt(pageLeftButton.dataset.smartcontractpage);
    if (index > 1) {
      const blockNumber = await getBlockNumber();
      const paginatedSmartcontract = startPaginatingAProposal(
        smartContractProposalIndexes,
        index - 1
      );

      await smartContractProposalFetcher(
        paginatedSmartcontract,
        catalogDAO,
        myAddress,
        props,
        blockNumber
      );
    }
  };

  pageRightButton.onclick = async function () {
    const index = parseInt(pageRightButton.dataset.smartcontractpage);
    const total = parseInt(pageRightButton.dataset.totalpages);
    if (index < total) {
      const blockNumber = await getBlockNumber();
      const paginatedSmartContractProposal = startPaginatingAProposal(
        smartContractProposalIndexes,
        index + 1
      );

      await smartContractProposalFetcher(
        paginatedSmartContractProposal,
        catalogDAO,
        myAddress,
        props,
        blockNumber
      );
    }
  };
}

export async function myRemovalPropsalTableActions(
  props: State,
  removalProposalIndexes: string[]
) {
  const closeRemovalProposalButton = document.getElementsByClassName(
    "removalProposalCloseButton"
  );
  const paginationButtons = document.getElementsByClassName(
    "myRemovalProposalPaginationButton"
  );
  const pageLeftButton = getById("removalProposal-page-left");
  const pageRightButton = getById("removalProposal-page-right");
  const catalogDAOOptions = await OptionsBuilder(() =>
    getCatalogDAOContractWithWallet()
  );

  if (hasError(catalogDAOOptions)) {
    return;
  }
  const myAddressOptions = await OptionsBuilder(() => getAddress());
  if (hasError(myAddressOptions)) {
    return;
  }
  const myAddress = myAddressOptions.data;
  const blockNumber = await getBlockNumber();

  for (let i = 0; i < closeRemovalProposalButton.length; i++) {
    const bttn = closeRemovalProposalButton[i] as HTMLButtonElement;

    bttn.onclick = async function () {
      const index = bttn.dataset.proposalindex;

      const myAddress = await getAddress();
      const onError = (error, receipt) => {
        dispatch_renderError(getError(error.message));
      };
      const onReceipt = (receipt) => {
        dispatch_setPage(PageState.ManageProposals);
      };
      await closeRemovalProposal(
        catalogDAOOptions.data,
        index,
        myAddress,
        onError,
        onReceipt
      );
    };
  }

  for (let i = 0; i < paginationButtons.length; i++) {
    const bttn = paginationButtons[i] as HTMLButtonElement;
    bttn.onclick = async function () {
      const pageIndex = parseInt(bttn.dataset.proposalpage);
      const paginatedRemoval = startPaginatingAProposal(
        removalProposalIndexes,
        pageIndex
      );
      await removalProposalFetcher(
        paginatedRemoval,
        catalogDAOOptions.data,
        myAddress,
        props,
        blockNumber
      );
    };
  }

  pageLeftButton.onclick = async function () {
    const index = parseInt(pageLeftButton.dataset.smartcontractpage);
    if (index > 1) {
      const paginatedRemovalProposal = startPaginatingAProposal(
        removalProposalIndexes,
        index - 1
      );

      await removalProposalFetcher(
        paginatedRemovalProposal,
        catalogDAOOptions.data,
        myAddress,
        props,
        blockNumber
      );
    }
  };

  pageRightButton.onclick = async function () {
    const index = parseInt(pageRightButton.dataset.smartcontractpage);
    const total = parseInt(pageRightButton.dataset.totalpages);

    if (index < total) {
      const paginatedRemovalProposal = startPaginatingAProposal(
        removalProposalIndexes,
        index + 1
      );

      await removalProposalFetcher(
        paginatedRemovalProposal,
        catalogDAOOptions.data,
        myAddress,
        props,
        blockNumber
      );
    }
  };
}

export async function myRankProposalsTableActions(
  props: State,
  rankProposalIndexes: string[]
) {
  const closeRankButtons = document.getElementsByClassName(
    "rankProposalButtonId"
  );
  const paginationButtons = document.getElementsByClassName(
    "myRankPaginationButton"
  );
  const pageLeftButton = getById("rank-page-left");
  const pageRightButton = getById("rank-page-right");
  const catalogDAO = await getCatalogDAOContractWithWallet();

  for (let i = 0; i < closeRankButtons.length; i++) {
    const button = closeRankButtons[i] as HTMLButtonElement;

    button.onclick = async function () {
      const index = button.dataset.proposalindex;

      const myAddress = await getAddress();
      const onError = (error, receipt) => {
        dispatch_renderError(getError(error.message));
      };

      const onReceipt = (receipt) => {
        dispatch_setPage(PageState.ManageProposals);
      };
      await closeRankProposal(catalogDAO, index, myAddress, onError, onReceipt);
    };
  }

  // add the onclick for the rank pagination buttons
  for (let i = 0; i < paginationButtons.length; i++) {
    const paginationButton = paginationButtons[i] as HTMLButtonElement;
    paginationButton.onclick = async function () {
      const pageIndex = parseInt(paginationButton.dataset.rankpage);
      const blockNumber = await getBlockNumber();
      const paginatedRank = startPaginatingAProposal(
        rankProposalIndexes,
        pageIndex
      );
      const myAddress = await getAddress();

      await rankFetcher(
        paginatedRank,
        catalogDAO,
        myAddress,
        props,
        blockNumber
      );
    };
  }

  pageLeftButton.onclick = async function () {
    const index = parseInt(pageLeftButton.dataset.rankpage);

    if (index > 1) {
      const blockNumber = await getBlockNumber();
      const paginatedRank = startPaginatingAProposal(
        rankProposalIndexes,
        index - 1
      );
      const myAddress = await getAddress();

      await rankFetcher(
        paginatedRank,
        catalogDAO,
        myAddress,
        props,
        blockNumber
      );
    }
  };

  pageRightButton.onclick = async function () {
    const index = parseInt(pageRightButton.dataset.rankpage);
    const total = parseInt(pageRightButton.dataset.totalpages);

    if (index < total) {
      const blockNumber = await getBlockNumber();
      const paginatedRank = startPaginatingAProposal(
        rankProposalIndexes,
        index + 1
      );
      const myAddress = await getAddress();

      await rankFetcher(
        paginatedRank,
        catalogDAO,
        myAddress,
        props,
        blockNumber
      );
    }
  };
}

export function removalProposalPageActions(
  props: State,
  acceptedIndex: string,
  malicious: boolean
) {
  const discussionLink = getById("discussion-link-input") as HTMLInputElement;
  const backButton = getById("removal-back-button") as HTMLButtonElement;
  const proceedButton = getById(
    "removal-proposal-proceed"
  ) as HTMLButtonElement;

  backButton.onclick = function () {
    dispatch_setPopupState(PopupState.NONE);
  };

  proceedButton.onclick = async function () {
    if (discussionLink.value.length === 0) {
      dispatch_renderError("Invalid discussion link");
      return;
    }
    const onError = (error, receipt) => {
      dispatch_renderError(getError(error.message));
    };
    const onReceipt = (receipt) => {
      dispatch_setPopupState(PopupState.NONE);
      dispatch_setPage(PageState.ManageProposals);
    };
    const catalogDAOOptions = await OptionsBuilder(() =>
      getCatalogDAOContractWithWallet()
    );
    if (hasError(catalogDAOOptions)) {
      return;
    }

    const myAddressOpts = await OptionsBuilder(() => getAddress());

    if (hasError(myAddressOpts)) {
      return;
    }

    await proposeContractRemoval(
      catalogDAOOptions.data,
      discussionLink.value,
      acceptedIndex,
      malicious,
      myAddressOpts.data,
      onError,
      onReceipt
    );
  };
}

export function stakerDetailsActions() {
  const unstakeBttn = getById("unstake-button");

  unstakeBttn.onclick = async function () {
    const myAddressOpt = await OptionsBuilder(() => getAddress());

    const onError = (error, receipt) => {
      dispatch_renderError(getError(error.message));
    };
    const onReceipt = (receipt) => {
      dispatch_setPage(PageState.ManageProposals);
    };
    const daoStakingOptions = await OptionsBuilder(() =>
      getDaoStakingContract()
    );

    if (hasError(daoStakingOptions.data)) {
      return;
    }

    await unStake(
      daoStakingOptions.data,
      myAddressOpt.data,
      onError,
      onReceipt
    );
  };
}
