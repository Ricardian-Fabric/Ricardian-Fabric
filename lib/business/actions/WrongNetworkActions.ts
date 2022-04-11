import {
  dispatch_setPage,
  dispatch_setPopupState,
} from "../../dispatch/stateChange";
import { PopupState, State } from "../../types";
import { getById } from "../../view/utils";
import { switchToHarmony } from "../../wallet/web3";

export function wrongNetworkActions(props: State) {
  const switchButton = getById("switch-to-harmony");
  switchButton.onclick = async function () {
    await switchToHarmony(0, "Mainnet");
    dispatch_setPage(props.pageState);
    dispatch_setPopupState(PopupState.NONE);
  };
}
