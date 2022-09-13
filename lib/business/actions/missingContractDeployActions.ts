import { dispatch_setPopupState } from "../../dispatch/stateChange";
import { PopupState } from "../../types";
import { getById } from "../../view/utils";
import { deploySimpleTerms } from "./createButtonClick";

export function missingContractDeployActions() {
  const deploySCButton = getById("deploySCButton");
  const closePopupButton = getById("closePopupButton");

  deploySCButton.onclick = async function () {
    await deploySimpleTerms();
  };

  closePopupButton.onclick = function () {
    dispatch_setPopupState(PopupState.NONE);
  };
}
