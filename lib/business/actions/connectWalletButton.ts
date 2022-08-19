import {
  dispatch_navigateTo,
  dispatch_renderError,
} from "../../dispatch/render";
import { getById, parseQueryString } from "../../view/utils";
import {
  requestAccounts,
  web3Injected,
} from "../../wallet/web3";
import MetaMaskOnboarding from "@metamask/onboarding";
import {
  dispatch_setPage,
} from "../../dispatch/stateChange";
import { PageState, QueryStrings } from "../../types";
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
  } else {
    dispatch_setPage(PageState.CreateRicardian);
  }
}
