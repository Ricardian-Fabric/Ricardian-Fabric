import { createRevGeocoder } from "../geocoding/index";
import {
  dispatch_ConnectYourWalletPage,
  dispatch_disableButton,
  dispatch_enableButton,
  dispatch_hideElement,
  dispatch_redirect,
  dispatch_removeLoadingIndicator,
  dispatch_renderError,
  dispatch_renderLoadingIndicator,
  dispatch_renderVaultLockedTokens,
} from "../dispatch/render";
import { fetchGeoCodingCSV } from "../fetch";
import {
  AcceptablePageProps,
  FulfilledPageProps,
  LockedTokens,
  Options,
  PaginatedProposal,
  PopupState,
  State,
  Status,
} from "../types";
import { Contract } from "web3-eth-contract";
import { getTermsAccepted } from "../view/utils";
import {
  getAcceptablePageFromVDOM,
  getFulfilledPagefromVDOM,
} from "../view/vDom";
import { GeoRecord } from "../geocoding/types";
import {
  dispatch_setPopupState,
  dispatch_setPosition,
} from "../dispatch/stateChange";

import Decimal from "decimal.js";
import {
  acceptedTerms,
  getSignupContract,
} from "../wallet/signup/contractCalls";
import { getAddress } from "../wallet/web3";
import {
  getLockIndex,
  getVaultContent,
} from "../wallet/ricVault/contractCalls";
import { isCountryBlocked } from "./countryBlock";

export async function getVaultPaginatedFromIndex(
  props: State,
  currentPage: number,
  vault: Contract,
  myAddr: string,
  block: number
) {
  const lockIndexOptions = await OptionsBuilder(() =>
    getLockIndex(vault, myAddr, myAddr)
  );

  if (hasError(lockIndexOptions)) {
    return;
  }
  const index = lockIndexOptions.data;

  const totalPages = getTotalPages(index, 6);

  let lockedTokens: LockedTokens[] = [];

  const [firstIndex, lastIndex] = getFirstAndLastIndex(currentPage, index);

  // this function is pushing into the locked tokens array, as it recurses!
  async function delayedContentFetching(_firstIndex_, _lastIndex_) {
    if (_firstIndex_ > _lastIndex_) {
      return true;
    }
    const content = await getVaultContent(vault, myAddr, _firstIndex_, myAddr);
    lockedTokens.push(content);
    dispatch_renderVaultLockedTokens(
      props,
      lockedTokens,
      block,
      firstIndex,
      _lastIndex_,
      currentPage,
      totalPages
    );
    _firstIndex_ += 1;
    setTimeout(delayedContentFetching.bind({}, _firstIndex_, _lastIndex_), 100);
  }

  return await delayedContentFetching(firstIndex, lastIndex);
}

function getFirstAndLastIndex(
  currentPage: number,
  lastIndex: number
): [firstIndexToFetch: number, lastIndexToFetch: number] {
  let firstIndexToFetch  = undefined;
  let lastIndexToFetch = undefined;

  // find the first index to fetch

  for (let i = 1; i <= lastIndex; i++) {
    if (getTotalPages(i, 6) === currentPage) {
      if (firstIndexToFetch === undefined) {
        firstIndexToFetch = i;
      }
    }
  }

  // Find the last index to fetch

  for (let i = lastIndex; i >= firstIndexToFetch; i--) {
    if (getTotalPages(i, 6) === currentPage) {
      if (lastIndexToFetch === undefined) {
        lastIndexToFetch = i;
      }
    }
  }

  return [firstIndexToFetch, lastIndexToFetch];
}

export async function getProposals<Type>(
  contract: Contract,
  myAddress: string,
  toFetch: string[],
  getPaginated: CallableFunction
): Promise<Type> {
  const proposals = await OptionsBuilder(() =>
    getPaginated(
      contract,
      myAddress,
      toFetch[0],
      toFetch[1],
      toFetch[2],
      toFetch[3],
      toFetch[4]
    )
  );
  if (hasError(proposals)) {
    return;
  }

  return proposals.data;
}

export async function getPaginatedByIndex<Type>(
  pageIndex: number,
  contract: Contract,
  myAddress: string,
  getLastIndex: CallableFunction,
  getPaginated: CallableFunction
): Promise<[Type, string[], PaginatedProposal]> {
  const indexOptions = await OptionsBuilder(() =>
    getLastIndex(contract, myAddress)
  );

  if (hasError(indexOptions)) {
    return;
  }

  const pagination: PaginatedProposal = {
    proposals: generateProposalIndexes(indexOptions.data),
    currentPage: pageIndex,
    totalPages: getTotalPages(indexOptions.data, 5),
    totalContent: parseInt(indexOptions.data),
  };

  const startPage = startPaginatingAProposal(
    pagination.proposals,
    pagination.currentPage
  );
  const toFetch = proposalsToFetch(startPage);

  const proposals = await getProposals<Type>(
    contract,
    myAddress,
    toFetch,
    getPaginated
  );

  return [proposals, toFetch, pagination];
}

function generateProposalIndexes(lastIndex: string) {
  const intIndex = parseInt(lastIndex);
  const indexes = [];
  for (let i = intIndex; i > 0; i--) {
    indexes.push(i.toString());
  }
  return indexes;
}

export async function OptionsBuilder(
  method: CallableFunction
): Promise<Options<any>> {
  const options: Options<any> = {
    status: Status.Success,
    error: "",
    data: null,
  };
  try {
    options.data = await method();
  } catch (err) {
    options.error = err.message;
    options.status = Status.Failure;
  }
  return options;
}

export const getTotalPages = (length, size) => {
  if (length === 0) {
    return 1;
  }
  const divided = new Decimal(length).dividedBy(size);
  const split = divided.toString().split(".");

  if (split[0] === 0) {
    return 1;
  }

  if (split[1] === undefined) {
    return parseInt(split[0]);
  }

  return parseInt(split[0]) + 1;
};

// I need to get a proposal at random index and tell what page it's on.
export const proposalsToFetch = (data: PaginatedProposal) => {
  let proposals = [];

  for (let i = 0; i < data.totalContent; i++) {
    if (proposals.length !== 5) {
      if (getTotalPages(i + 1, 5) === data.currentPage) {
        proposals.push(data.proposals[i].toString());
      }
    }
  }
  if (proposals.length < 5) {
    //If I have less then 5 things on a page, I pad it with zeroes
    for (let i = proposals.length; i < 5; i++) {
      proposals.push("0");
    }
  }

  return proposals;
};

function reverseArray(arr: Array<any>) {
  let newArr = arr.slice();
  if (newArr.length > 1) {
    return newArr.reverse();
  } else {
    return newArr;
  }
}

// export function startPaginatingMyProposals(
//   myProposals: MyProposals
// ): PaginatedProposals {
//   return {
//     rank: {
//       proposals: reverseArray(myProposals.rank),
//       currentPage: 1,
//       totalPages: getTotalPages(myProposals.rank.length),
//       totalContent: myProposals.rank.length,
//     },
//     smartContract: {
//       proposals: myProposals.smartContract,
//       currentPage: 1,
//       totalPages: getTotalPages(myProposals.smartContract.length),
//       totalContent: myProposals.smartContract.length,
//     },
//     accepted: {
//       proposals: myProposals.acceptedSCProposals,
//       currentPage: 1,
//       totalPages: getTotalPages(myProposals.acceptedSCProposals.length),
//       totalContent: myProposals.acceptedSCProposals.length,
//     },
//     removal: {
//       proposals: myProposals.removal,
//       currentPage: 1,
//       totalPages: getTotalPages(myProposals.removal.length),
//       totalContent: myProposals.removal.length,
//     },
//     removedFromMe: {
//       proposals: myProposals.removedFromMe,
//       currentPage: 1,
//       totalPages: getTotalPages(myProposals.removedFromMe.length),
//       totalContent: myProposals.removedFromMe.length,
//     },
//   };
// }

export function startPaginatingAProposal(
  proposals: Array<string>,
  currentPage: number
): PaginatedProposal {
  return {
    proposals,
    currentPage: currentPage,
    totalPages: getTotalPages(proposals.length, 5),
    totalContent: proposals.length,
  };
}

export async function getAcceptablePage(args: {
  props: State;
  data: AcceptablePageProps;
}) {
  dispatch_renderLoadingIndicator("transaction-display");
  const src = args.props.bundleSrcUrl;
  const page = await getAcceptablePageFromVDOM({
    ...args.data,
    mainDep: {
      src,
    },
  });
  dispatch_removeLoadingIndicator("transaction-display");
  return page;
}

// Returns true if blocked
export async function isBlocked(props: State, acceptButton: HTMLElement) {
  dispatch_renderLoadingIndicator("transaction-display");
  dispatch_disableButton(props);
  dispatch_hideElement(acceptButton, true);
  const geoCodingOptions = await fetchGeoCodingCSV();
  const record = await getCountryCode(props.position, geoCodingOptions.data);
  if (geoCodingOptions.status === Status.Failure) {
    return true;
  }

  if (record) {
    dispatch_removeLoadingIndicator("transaction-display");
    dispatch_hideElement(acceptButton, false);
    return isCountryBlocked(record, props.blockedCountries).data;
  }
}

export async function getCountryCode(
  locationData: GeolocationPosition,
  geoCodingData: string
): Promise<GeoRecord> {
  const revGeocoder = await createRevGeocoder({ dataset: geoCodingData });
  const result = await revGeocoder.lookup({
    latitude: locationData?.coords.latitude,
    longitude: locationData?.coords.longitude,
  });

  return result.record;
}

export function getLocation(props: State, acceptButton: HTMLElement) {
  dispatch_disableButton(props);
  dispatch_hideElement(acceptButton, true);
  // Ask for permission and access the Geolocation API.
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      async function (position) {
        setTimeout(() => {
          dispatch_hideElement(acceptButton, false);
          dispatch_setPosition(position);
        }, 1000);
      },
      function (err) {
        dispatch_enableButton(props);
        dispatch_renderError(err.message);
        dispatch_hideElement(acceptButton, false);
      }
    );
  } else {
    dispatch_renderError("Can't get geolocation.");
    dispatch_enableButton(props);
    dispatch_hideElement(acceptButton, false);
  }
}

export async function handlePost(props: State) {
  const url = props.redirectto;
  if (url === "NONE") {
    return;
  }
  dispatch_redirect(url);
}

export async function getFulfilledPage(props: FulfilledPageProps) {
  dispatch_renderLoadingIndicator("transaction-display");
  const page = await getFulfilledPagefromVDOM(props);
  dispatch_removeLoadingIndicator("transaction-display");

  return page;
}

export function registerEthereumProviderEvents(props) {
  window.ethereum.removeAllListeners();
  let initJustCalled = true;
  window.ethereum.on("accountsChanged", async () => {
    try {
      const signUpContract = await getSignupContract();
      const address = await getAddress();
      const signedTerms = await acceptedTerms(signUpContract, address);

      if (signedTerms === false) {
        if (initJustCalled) {
          initJustCalled = false;
          dispatch_ConnectYourWalletPage(props);
          dispatch_setPopupState(PopupState.NONE);
        }
      }
    } catch (err) {
      if (initJustCalled) {
        initJustCalled = false;
        dispatch_ConnectYourWalletPage(props);
        dispatch_setPopupState(PopupState.NONE);
      }
    }
  });
}

export function hasError(options: Options<any>): boolean {
  if (options.status === Status.Failure) {
    dispatch_renderError(options.error);
    return true;
  }
  return false;
}
