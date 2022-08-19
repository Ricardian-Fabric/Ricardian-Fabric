import { getAcceptablePage, hasError, OptionsBuilder } from "../utils";
import { decryptWallet, getHash } from "../../crypto";
import {
  dispatch_disableButton,
  dispatch_removeError,
  dispatch_renderError,
  dispatch_disableCreateInputs,
  dispatch_enableButton,
  dispatch_enableCreateInputs,
  dispatch_initializeCreateRicardian,
  dispatch_assignSmartContractAddress,
} from "../../dispatch/render";
import {
  dispatch_stashPage,
  dispatch_stashDetails,
  dispatch_setCreateRicardianState,
  dispatch_setPage,
} from "../../dispatch/stateChange";
import {
  CreateRicardianPageProps,
  PageState,
  RenderType,
  State,
  Status,
} from "../../types";
import {
  canUseContract,
  deployContract,
  getAddress,
  getNetwork,
  requestAccounts,
  signHash,
  web3Injected,
} from "../../wallet/web3";
import {
  getById,
  getExpires,
  didExpire,
  getTermsCheckbox,
  getRedirectTo,
  getSmartContract,
  getBlockedCountries,
  getBlockedAddresses,
  getSameAsAboveButton,
  getERCSmartContractElement,
  getERC20Params,
  getEditorElementInnerHTML,
  newTab,
  getDeployButton,
} from "../../view/utils";
import MetaMaskOnboarding from "@metamask/onboarding";
import { BlockCountry } from "../countryBlock";
import { getSignupContractWithoutWallet } from "../../wallet/signup/contractCalls";
import { acceptedTerms, getTerms } from "../../wallet/catalogDAO/contractCalls";
import { createContractIssueingTransaction } from "../../wallet/arweave";
import { getSimpleTermsAbi, getSimpleTermsByteCode } from "../../wallet/abi/SimpleTerms";

export function renderCreateButtonClick(props: State, calledAt: RenderType) {
  if (calledAt === RenderType.create) {
    const content = props.editor.getContent();
    props.editor.destroy();
    props.editor.setup();
    props.editor.setContent(content, 0);

    //Initialize the rest of the page!!
    dispatch_initializeCreateRicardian(props, props.createRicardianPageProps);
  }

  const termsCheckbox = getTermsCheckbox();

  const sameButton = getSameAsAboveButton();

  const deployButton = getDeployButton();

  sameButton.onclick = function () {
    const smartC = getSmartContract();
    if (smartC !== "NONE") {
      const ercSmartC = getERCSmartContractElement();
      ercSmartC.value = smartC;
    }
  };

  termsCheckbox.onclick = async function (e) {
    if (termsCheckbox.checked) {
      const address = await getAddress();
      const signupContract = await getSignupContractWithoutWallet();

      const signedTerms = await acceptedTerms(signupContract, address);
      const contractURL = await getTerms(signupContract);
      // If the terms were not signed, but they exist, I navigate to a new tab here
      if (contractURL.length !== 0) {
        if (!signedTerms) {
          newTab(contractURL);
        }
        termsCheckbox.checked = signedTerms;
      }
    }

    if (termsCheckbox.checked) {
      const expires = getExpires();

      if (!didExpire(expires)) {
        dispatch_enableButton(props);
      }
    } else {
      dispatch_disableButton(props);
    }
  };

  deployButton.onclick = deploySimpleTerms

  getById("save-contract").onclick = async function () {
    const passwordEl = getById("wallet-password") as HTMLInputElement;

    dispatch_removeError();
    const expires = getExpires();
    const expired = didExpire(expires);

    if (expired) {
      dispatch_renderError("Date expired!");
      return;
    }

    const blockedCountries = getBlockedCountries();
    const blockedAddressOptions = getBlockedAddresses();

    if (blockedAddressOptions.status !== Status.Success) {
      dispatch_renderError("Blocked addresses are malformed");
      return;
    }

    const redirectto = getRedirectTo();
    //Terms and agreements need to be accepted again with a checkbox
    const termsCheckbox = getTermsCheckbox();

    if (!termsCheckbox.checked) {
      dispatch_renderError(
        "You must check the checkbox to agree to the terms."
      );
      return;
    }

    if (!web3Injected()) {
      dispatch_renderError("Found no injected web3, install metamask");
      const onboarding = new MetaMaskOnboarding();
      onboarding.startOnboarding();
      return;
    }

    await requestAccounts();

    const legalContract = getEditorElementInnerHTML(); //editor.getContent();

    const createdDate = new Date().toISOString();
    const version = props.version;
    const network = `${await getNetwork()}`;
    const issuer = await getAddress();
    const smartContract = getSmartContract();

    if (smartContract === "NONE") {
      dispatch_renderError("You must connect a smart contract by adding the address in the contract configuration!");
      return;
    }


    if (props.Account.data === null) {
      dispatch_renderError("Open or Create the Permaweb Wallet to upload this contract!")
      return;
    }

    const trailEl = getById("trail-input") as HTMLInputElement;

    const trailArweaveAddressEl = getById(
      "trail-address-input"
    ) as HTMLInputElement;

    if (trailArweaveAddressEl.value.length !== 0) {
      if (trailArweaveAddressEl.value.length !== 43) {
        dispatch_renderError("Invalid Arweave address");
        return;
      }
    }

    if (smartContract !== "NONE") {
      const canUse = await canUseContract(smartContract, issuer);
      if (!canUse) {
        dispatch_renderError("Invalid smart contract");
        return;
      }
    }
    const ERC20ParamsOptions = getERC20Params();
    if (hasError(ERC20ParamsOptions)) {
      return;
    }

    const ERC20 = JSON.stringify(ERC20ParamsOptions.data);

    //I need to create the hash from legalContract,createdDate,expires,redirectto,version,issuer,onlysigner,network
    const hash = await getHash({
      legalContract,
      createdDate,
      expires,
      redirectto,
      version,
      issuer,
      blockedCountries,
      network,
      smartContract,
      blockedAddresses: blockedAddressOptions.data,
      ERC20,
    }) as string;

    const password = passwordEl.value;

    if (password.length < 8) {
      dispatch_renderError("Missing password in Upload Configuation");
      return;
    }

    const signingSuccess = async (issuerSignature: string) => {
      const page = await getAcceptablePage({
        props,
        data: {
          domParser: props.domParser,
          legalContract,
          createdDate,
          redirectto,
          expires,
          version,
          issuer,
          blockedCountries,
          blockedAddresses: blockedAddressOptions.data,
          network,
          issuerSignature,
          smartContract,
          ERC20,
          creatorAppLink: location.origin + location.pathname,
          relatedtrail: trailEl.value,
          trailAddress: trailArweaveAddressEl.value
        },
      });



      const decryptOptions = await decryptWallet(props.Account.data, password);

      if (decryptOptions.status !== Status.Success) {
        dispatch_renderError(decryptOptions.error);
        dispatch_enableButton(props);
        return;
      }

      const tx = await createContractIssueingTransaction(page, props.version, decryptOptions.data, { issuer, network, contractType: "Acceptable" })

      dispatch_stashDetails({
        hash,
        signerAddress: issuer,
        signature: issuerSignature,
        network,
        smartContract,
        arweaveTx: tx
      });

      dispatch_stashPage(page);
    };

    const onSigningFailure = async (msg: string) => {
      dispatch_enableButton(props);
      dispatch_enableCreateInputs();
      dispatch_renderError(msg);
    };

    //The issuer needs to sign the hash
    await signHash(
      hash,
      issuer,
      network,
      smartContract,
      signingSuccess,
      onSigningFailure
    );
    dispatch_disableButton(props);
    dispatch_disableCreateInputs();
  };
}

export function saveCreatePageData() {
  const blockedCountries: BlockCountry[] = getBlockedCountries();
  const blockkedAddressesEl = getById("blocked-addresses") as HTMLInputElement;
  const expiresEl = getById("expires-input") as HTMLInputElement;
  const redirecttoEl = getById("redirectto-input") as HTMLInputElement;
  const smartcontractEl = getById("smartcontract-input") as HTMLInputElement;
  const trailEl = getById("trail-input") as HTMLInputElement;
  const erc20AddEl = getById("add-erc20-checkbox") as HTMLInputElement;
  const erc20NameEl = getById("erc20-name") as HTMLInputElement;
  const erc20SymbolEl = getById("erc20-symbol") as HTMLInputElement;
  const erc20DecimalsEl = getById("erc20-decimals") as HTMLInputElement;
  const erc20AddressEl = getById("erc20-address") as HTMLInputElement;

  const ricardianPageProps: CreateRicardianPageProps = {
    blockedCountries,
    blockedAddresses: blockkedAddressesEl.value,
    expires: expiresEl.value,
    redirectto: redirecttoEl.value,
    smartContract: smartcontractEl.value,
    erc20Add: erc20AddEl.checked,
    erc20Name: erc20NameEl.value,
    erc20Decimals: erc20DecimalsEl.value,
    erc20Address: erc20AddressEl.value,
    erc20Symbol: erc20SymbolEl.value,
    trail: trailEl.value,
  };

  dispatch_setCreateRicardianState(ricardianPageProps);
}


export async function deploySimpleTerms() {
  const address = await getAddress();

  const abi = getSimpleTermsAbi();
  const bytecode = getSimpleTermsByteCode();

  const onError = (err, receipt) => {
    dispatch_renderError(err.message);
  }

  const onReceipt = (receipt) => {
    dispatch_assignSmartContractAddress(receipt.contractAddress);
  }

  await deployContract(abi, bytecode, address, [], onError, onReceipt);

}