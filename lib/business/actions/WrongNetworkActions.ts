import {
  dispatch_setPage,
  dispatch_setPopupState,
} from "../../dispatch/stateChange";
import { PopupState, State } from "../../types";
import { getById } from "../../view/utils";
import { switchToPolygon } from "./menuActions";

export function wrongNetworkActions(props: State) {
  const switchButton = getById("switch-network");
  switchButton.onclick = async function () {
    await switchToPolygon();
    dispatch_setPage(props.pageState);
    dispatch_setPopupState(PopupState.NONE);
  };
}
