import {
  dispatch_navigateTo,
  dispatch_renderError,
} from "../../dispatch/render";
import { getById, newTab, parseQueryString } from "../../view/utils";
import {
  getAddress,
  requestAccounts,
  switchNetwork,
  web3Injected,
} from "../../wallet/web3";
import MetaMaskOnboarding from "@metamask/onboarding";
import {
  acceptedTerms,
  getSignupContract,
  getTerms,
} from "../../wallet/signup/contractCalls";
import {
  dispatch_setPage,
  dispatch_setPopupState,
  dispatch_stashIpfsCID,
} from "../../dispatch/stateChange";
import { ChainName, PageState, PopupState, QueryStrings } from "../../types";
import { registerEthereumProviderEvents } from "../utils";

export async function connectWalletButton(props) {
  const btn = getById("connectWalletButton");

  btn.onclick = async function () {
    if (!web3Injected()) {
      dispatch_renderError("Found no injected web3, install metamask");
      const onboarding = new MetaMaskOnboarding();
      onboarding.startOnboarding();
      return;
    }

    await requestAccounts();
    registerEthereumProviderEvents(props);

    //TODO ON MAINNET LAUNCH I NEED TO CHANGE THIS TO MAINNET
    await switchNetwork(ChainName.Harmony, 0, "Testnet");

    // Now I check if they signed the terms,
    // If the terms is an empty string, I allow pass (dev mode)
    // if they didnt accept the terms, they get redirected

    try {
      const signUpContract = await getSignupContract();

      const contractURL = await getTerms(signUpContract);

      if (contractURL.length === 0) {
        // This is developer mode, no smart contract attached
        dispatch_setPage(PageState.Menu);
        OnQueryRedirect();
      } else {
        const address = await getAddress();
        const signedTerms = await acceptedTerms(signUpContract, address);

        if (signedTerms) {
          // signed the terms already
          dispatch_setPage(PageState.Menu);
          OnQueryRedirect();
        } else {
          newTab(contractURL);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };
}

export function OnQueryRedirect() {
  // If the url container query strings, I do actions based on that!
  const queryStrings = parseQueryString(
    location.search.replace("?", ""),
    false
  );

  if (queryStrings.trail !== undefined) {
    dispatch_setPage(PageState.trails);
    dispatch_navigateTo(QueryStrings.trail, queryStrings.trail);
  } else if (queryStrings.verify !== undefined) {
    dispatch_setPage(PageState.VerifyContract);
    dispatch_navigateTo(QueryStrings.verify, queryStrings.verify);
  } else if (queryStrings.pin !== undefined) {
    dispatch_setPage(PageState.CreateRicardian);
    dispatch_stashIpfsCID(queryStrings.pin);
    dispatch_setPopupState(PopupState.Permapin);
  } else {
    dispatch_setPage(PageState.Dashboard);
  }
}
