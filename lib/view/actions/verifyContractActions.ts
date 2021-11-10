import { getHash } from "../../crypto";
import {
  dispatch_renderError,
  dispatch_verificationState,
} from "../../dispatch/render";
import { dispatch_setPopupState } from "../../dispatch/stateChange";
import { fetchAcceptableContract } from "../../fetch";
import {
  BlockCountry,
  ContractTypes,
  PopupState,
  State,
  Status,
  VerificationState,
} from "../../types";
import { getmsgParams, recoverTypedSignatures } from "../../wallet/web3";
import { getById } from "../utils";

export function verifyContractPopupTrigger() {
  const verify = getById("verify-contract-button");
  verify.onclick = function () {
    dispatch_setPopupState(PopupState.verifyContract);
  };
}

export function verifyContractActions(props: State) {
  const backbutton = getById("verify-back");
  const verifyProceed = getById("verify-proceed");

  const acceptableUrl = getById("acceptable-contract-url") as HTMLInputElement;

  backbutton.onclick = function () {
    dispatch_setPopupState(PopupState.NONE);
  };

  verifyProceed.onclick = async function () {
    if (acceptableUrl.value === "") {
      dispatch_renderError("You need to specify the contract url!");
      dispatch_verificationState(VerificationState.failure);
      return;
    }

    let value = acceptableUrl.value;

    if (!value.includes("http")) {
      dispatch_renderError("Invalid url, must start with http");
      dispatch_verificationState(VerificationState.failure);

      return;
    }

    //If the url is specified , I need to fetch it.
    await verifyAcceptableContract(value, props.domParser);
  };
}

async function verifyAcceptableContract(url: string, domParser: DOMParser) {
  const fetchOptions = await fetchAcceptableContract(url);
  if (fetchOptions.status === Status.Failure) {
    dispatch_renderError("An error occured while fetching the url.");
    dispatch_verificationState(VerificationState.failure);

    return;
  }
  let html: Document;
  try {
    html = domParser.parseFromString(fetchOptions.data, "text/html");
  } catch (err) {
    dispatch_renderError(err.message);
    return;
  }

  const page = html.getElementById("page");
  if (page === null) {
    dispatch_renderError("Not a Ricardian Fabric contract.");
    dispatch_verificationState(VerificationState.failure);

    return;
  }
  if (page.dataset.contracttype !== ContractTypes.acceptable) {
    dispatch_renderError("Wrong contract type.");
    dispatch_verificationState(VerificationState.failure);

    return;
  }

  // I need to check how many script tags are included
  const scriptTags = html.getElementsByTagName("script");
  if (scriptTags.length !== 1) {
    dispatch_renderError("Detected extra scripts. DO NOT USE!");
    dispatch_verificationState(VerificationState.failure);
    return;
  }

  //TODO: When the final dependency is deployed on arweave and I need to check who deployed it by getting the txId from the tag and checking the address!!

  // I need to recompute the hash now.
  const legalContract = html.getElementById("contract-display").innerHTML;
  const createdDate = page.dataset.created;
  const expires = page.dataset.expires;
  const redirectto = page.dataset.redirectto;
  const version = page.dataset.version;
  const issuer = page.dataset.issuer;
  const blockedCountries = JSON.parse(
    page.dataset.blockedcountries
  ) as BlockCountry[];
  const network = page.dataset.network;
  const smartContract = page.dataset.smartcontract;
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
  });

  // I need to verify the issuer signature now!

  const msgParams = getmsgParams(
    network,
    smartContract,
    recomputedHash,
    undefined,
    ContractTypes.create
  );

  const signature = page.dataset.issuersignature;

  const recovered = await recoverTypedSignatures(msgParams, signature);

  // Check if the issuer address in the data prop and on the UI is the same as the recovered one!
  const issuerFromUI = html.getElementById("issuer-address").innerText;

  if (issuerFromUI.toLowerCase() !== recovered.toLowerCase()) {
    dispatch_renderError(
      "The issuer address on page does not match the signature"
    );
    dispatch_verificationState(VerificationState.failure);
    return;
  }
  if (issuer.toLowerCase() !== recovered.toLowerCase()) {
    dispatch_renderError(
      "The issuer address used in state does not match the signature"
    );
    dispatch_verificationState(VerificationState.failure);
    return;
  }

  dispatch_verificationState(VerificationState.success);
}

export function recomputeHash(page: HTMLElement) {}