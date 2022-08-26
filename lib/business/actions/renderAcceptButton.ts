import { getLocation, handlePost, isBlocked } from "../utils";
import {
  dispatch_disableButton,
  dispatch_enableButton,
  dispatch_removeError,
  dispatch_renderError,
} from "../../dispatch/render";
import { State, Status } from "../../types";
import {
  acceptAgreement,
  canAgree,
  getAddress,
  getNetwork,
  requestAccounts,
  watchAsset,
  web3Injected,
} from "../../wallet/web3";
import {
  getById,
  newTab,
} from "../../view/utils";
import MetaMaskOnboarding from "@metamask/onboarding";
import { getHash } from "../../crypto";

export function renderAcceptOnCLick(props: State) {
  const acceptButton = getById("accept-button") as HTMLInputElement;
  const verifyButton = getById("verifyContract");
  verifyButton.onclick = function () {
    const url = props.creatorAppLink + "?verify=" + location.href;
    newTab(url);
  };

  acceptButton.onclick = async function () {
    dispatch_removeError();

    if (props.blockedCountries.length > 0 && props.position === undefined) {
      getLocation(props, acceptButton);
      return;
    }

    if (props.blockedCountries.length > 0) {
      const blocked = await isBlocked(props, acceptButton);
      if (blocked) {
        dispatch_renderError("You are not allowed to sign this contract.");
        dispatch_disableButton(props);
        return;
      }
    }

    if (!web3Injected()) {
      dispatch_renderError("Found no injected web3, install metamask");
      const onboarding = new MetaMaskOnboarding();
      onboarding.startOnboarding();
      return;
    }

    await requestAccounts();

    // I need to get the address of the signer
    // make sure its the same network
    const network = `${await getNetwork()}`;

    if (network !== props.network) {
      dispatch_renderError("You must switch to another network!");
      return;
    }

    const participant = await getAddress();

    if (props.blockedAddresses.includes(participant)) {
      dispatch_renderError("Your address is blocked.");
      return;
    }

    const canAccept = await canAgree(props.smartcontract, participant);
    if (!canAccept) {
      dispatch_renderError("Already accepted this contract");
      return;
    }

    const hash = <string>await getRecomputedHash(props);

    const onError = (error, receipt) => {
      dispatch_renderError(error.message);
      dispatch_enableButton(props);
    };

    const onReceipt = async (receipt) => {

      await handlePost(props);

      if (props.isERC20 !== null) {
        await watchAsset(props.isERC20, () => {
          dispatch_renderError(
            "Failed to add " + props.isERC20.name + " token to wallet."
          );
        });
      }
    }

    dispatch_disableButton(props);

    const options = await acceptAgreement({ hash, contractAddress: props.smartcontract, signerAddress: participant, onError, onReceipt });

    if (options.status === Status.Failure) {
      dispatch_renderError(options.error);
    }
  };
}

async function getRecomputedHash(props: State) {
  const legalContract = getById("contract-display").innerHTML;

  const createdDate = props.createdDate;
  const expires = props.expires;
  const redirectto = props.redirectto;
  const version = props.version;
  const issuer = props.issuer;
  const blockedCountries = props.blockedCountries;
  const blockedAddresses = props.blockedAddresses;
  const network = props.network;
  const smartContract = props.smartcontract;
  const ERC20 = JSON.stringify(props.isERC20);
  const recomputedHash = await getHash({
    legalContract,
    createdDate,
    expires,
    redirectto,
    version,
    issuer,
    blockedCountries,
    network,
    smartContract,
    blockedAddresses,
    ERC20,
  });

  return recomputedHash;
}
