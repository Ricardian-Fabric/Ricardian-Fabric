import {
  dispatch_navigateTo,
  dispatch_renderError,
} from "../../dispatch/render";
import { getById, parseQueryString } from "../../view/utils";
import {
  currentNetwork,
  requestAccounts,
  switchNetwork,
  web3Injected,
} from "../../wallet/web3";
import MetaMaskOnboarding from "@metamask/onboarding";
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

    try {
      await requestAccounts();
    } catch (e) {
      dispatch_renderError("WALLET: " + e.message);
      return;
    }
    registerEthereumProviderEvents(props);

    await switchNetwork(ChainName.Polygon, 0, currentNetwork);

    dispatch_setPage(PageState.Menu);
    OnQueryRedirect();
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

    const address =
      queryStrings.address === undefined ? "" : queryStrings.address;

    dispatch_navigateTo(QueryStrings.trail, queryStrings.trail, address);
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
