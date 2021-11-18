import {
  dispatch_enableAcceptableInputs,
  dispatch_enableCreateInputs,
  dispatch_noButtonPressed,
  dispatch_removeError,
} from "../../dispatch/render";
import { dispatch_stashIpfsCID } from "../../dispatch/stateChange";
import { ContractTypes, State } from "../../types";
import { getById, redirect } from "../../view/utils";

export function deployAgainButtonActions(props: State) {
  const buttonEl = getById("deploy-again-button");

  if (props.contracttype === ContractTypes.acceptable) {
    buttonEl.remove();
  }

  buttonEl.onclick = function () {
    dispatch_stashIpfsCID("");
    dispatch_enableCreateInputs();
    dispatch_noButtonPressed(props);
    dispatch_enableCreateInputs();
    dispatch_enableAcceptableInputs();
    dispatch_removeError();
  };
}

export function redirectAction(url) {
  const button = getById("redirect-button");

  button.onclick = function () {
    redirect(url);
  };
}
