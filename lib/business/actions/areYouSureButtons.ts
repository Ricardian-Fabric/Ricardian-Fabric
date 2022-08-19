import {
  dispatch_deployAgain,
  dispatch_enableCreateInputs,
  dispatch_noButtonPressed,
  dispatch_renderError,
  dispatch_renderLoadingIndicator,
  dispatch_renderTransaction,
  dispatch_yesButtonPressed,
} from "../../dispatch/render";
import { ContractTypes, Status, State } from "../../types";
import { getById } from "../../view/utils";
import { setTerms } from "../../wallet/web3";
import { geArweaveIdUrl, postTransaction } from "../../wallet/arweave";

export function areYouSureButtons(props: State) {
  const noButton = getById("no-button");
  const yesButton = getById("yes-button");
  noButton.onclick = function () {
    dispatch_noButtonPressed(props);
    dispatch_enableCreateInputs();
  };
  // Are you sure buttons are only for create page only!
  yesButton.onclick = async function () {
    dispatch_renderLoadingIndicator("transaction-display");
    dispatch_yesButtonPressed(props);

    // Upload to Arweave 
    await postTransaction(props.stashedDetails.arweaveTx);

    const id = props.stashedDetails.arweaveTx.id;
    const url = geArweaveIdUrl(id);

    dispatch_renderTransaction(props, url);

    const smartContract = props.stashedDetails.smartContract;

    if (props.contracttype === ContractTypes.create) {
      dispatch_deployAgain(props);
    }
    if (smartContract !== "NONE") {
      await smartContractActions(props, url, smartContract);
    }
  };
}

export async function smartContractActions(
  props: State,
  url: string,
  smartContract: string
) {
  const hash = props.stashedDetails.hash;
  const signerAddress = props.stashedDetails.signerAddress;
  const options = await setTerms({
    url,
    hash,
    contractAddress: smartContract,
    signerAddress,
  });
  if (options.status == Status.Failure) {
    dispatch_renderError(options.error);
  }
}


