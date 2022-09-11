import Web3 from "web3";
import {
  dispatch_bundlrNetworkDetails,
  dispatch_bundlrNetworkPopup,
  dispatch_renderError,
} from "../../dispatch/render";
import { dispatch_setPopupState } from "../../dispatch/stateChange";
import { PopupState, State, Status } from "../../types";
import { getById } from "../../view/utils";
import { getLoadedBalance, initialiseBundlr } from "../../wallet/bundlr";

export async function bundlrNetworkActions(props: State) {
  const bundlrOptions = await initialiseBundlr();

  if (bundlrOptions.status === Status.Failure) {
    dispatch_setPopupState(PopupState.NONE);
    dispatch_renderError("Unable to connect to Bundlr network!");
    return;
  }
  const bundlr = bundlrOptions.data;
  const loadedBalance = await getLoadedBalance(bundlr);
  dispatch_bundlrNetworkDetails(props, {
    loadedBalance: loadedBalance.toString(),
    bundlr,
  });
}

export function bundlrDetailsActions(props: State, bundlr: any) {
  const backButton = getById("backButton");
  const addBalance = getById("topUpButton");
  const withdrawBalance = getById("withdrawButton");

  backButton.onclick = function () {
    dispatch_setPopupState(PopupState.emptyPopup);
    dispatch_setPopupState(PopupState.NONE);
  };

  addBalance.onclick = async function (e) {
    e.preventDefault();
    const balanceInput = getById("topUpAmount") as HTMLInputElement;
    if (isNaN(parseFloat(balanceInput.value))) {
      dispatch_renderError("Invalid amount!");
      return;
    }
    const wei = Web3.utils.toWei(balanceInput.value);
    bundlr
      .fund(wei)
      .then((response) => {
        dispatch_bundlrNetworkPopup(props);
      })
      .catch((err) => {
        dispatch_renderError(err.message);
      });
  };
  withdrawBalance.onclick = async function (e) {
    e.preventDefault();
    const withdrawInput = getById("withdrawAmount") as HTMLInputElement;
    if (isNaN(parseFloat(withdrawInput.value))) {
      dispatch_renderError("Invalid amount!");
      return;
    }
    const wei = Web3.utils.toWei(withdrawInput.value);
    bundlr
      .withdrawBalance(wei)
      .then((response) => {
        if (response.status !== 200) {
          dispatch_renderError(response.data);
        } else {
          dispatch_bundlrNetworkPopup(props);
        }
      })
      .catch((err) => {
        dispatch_renderError("Unable to withdraw balance!");
      });
  };
}
