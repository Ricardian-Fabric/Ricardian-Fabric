import { getAcceptablePage, hasError } from "../utils";
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
  dispatch_triggerConfiguration,
  dispatch_createMissingContractDeployPopup,
} from "../../dispatch/render";
import {
  dispatch_stashPage,
  dispatch_stashDetails,
  dispatch_setCreateRicardianState,
} from "../../dispatch/stateChange";
import {
  ChainName,
  CreateRicardianPageProps,
  RenderType,
  State,
  Status,
} from "../../types";
import {
  canUseContract,
  deployContract,
  getAddress,
  getChainid,
  getNetwork,
  isPolygonMainnet,
  requestAccounts,
  signHash,
  switchNetwork,
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
  getConfigurationButton,
  getTermsCheckboxLabel,
  getUploadingWalletCheckboxes,
} from "../../view/utils";
import MetaMaskOnboarding from "@metamask/onboarding";
import { BlockCountry } from "../countryBlock";
import { getSignupContractWithoutWallet } from "../../wallet/signup/contractCalls";
import { acceptedTerms, getTerms } from "../../wallet/catalogDAO/contractCalls";
import {
  createContractIssueingTransaction,
  getProfitSharingAddresses,
  getProfitSharingTransaction,
} from "../../wallet/arweave";
import {
  getSimpleTermsAbi,
  getSimpleTermsByteCode,
} from "../../wallet/abi/SimpleTerms";
import { getContractIssueingTags, initialiseBundlr } from "../../wallet/bundlr";

export function renderCreateButtonClick(props: State, calledAt: RenderType) {
  if (calledAt === RenderType.create) {
    const content = props.editor.getContent();
    props.editor.destroy();
    props.editor.setup();
    props.editor.setContent(content, 0);

    //Initialize the rest of the page!!
    dispatch_initializeCreateRicardian(props, props.createRicardianPageProps);
  }

  const [bundlrCheckbox, burnerCheckbox] = getUploadingWalletCheckboxes();

  const termsCheckbox = getTermsCheckbox();
  const termsCheckboxLabel = getTermsCheckboxLabel();
  const sameButton = getSameAsAboveButton();

  const deployButton = getDeployButton();

  const configButton = getConfigurationButton();

  configButton.onclick = function () {
    dispatch_triggerConfiguration();
  };

  sameButton.onclick = function () {
    const smartC = getSmartContract();
    if (smartC !== "NONE") {
      const ercSmartC = getERCSmartContractElement();
      ercSmartC.value = smartC;
    }
  };

  termsCheckboxLabel.onclick = async function (e) {
    const signupContract = await getSignupContractWithoutWallet();
    const contractURL = await getTerms(signupContract);
    newTab(contractURL);
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

  deployButton.onclick = deploySimpleTerms;

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

    if (!bundlrCheckbox.checked && !burnerCheckbox.checked) {
      dispatch_renderError(
        "You need to select bundlr network or burner wallet in the upload configuration!"
      );
      return;
    }

    if (burnerCheckbox.checked) {
      if (props.Account.data === null) {
        dispatch_renderError(
          "Open or Create the Permaweb Wallet to upload this contract!"
        );
        return;
      }
    }

    if (bundlrCheckbox.checked) {
      const chainId = await getChainid();
      const correctChain = isPolygonMainnet(chainId);
      if (!correctChain) {
        dispatch_renderError(
          "You can only use Bundlr network on Polygon! To use other network change your uploading configuration!"
        );

        await switchNetwork(ChainName.Polygon, 0, "Mainnet").catch((err) => {
          dispatch_renderError(
            "You can only upload with Bundlr if you are connected to the Polygon Network."
          );
        });
        return;
      }
    }
    // The check for the smart contract is after the network switches to bundlr network so we don't end up deploying twice by accident!
    if (smartContract === "NONE") {
      dispatch_createMissingContractDeployPopup(props);

      dispatch_renderError(
        "You must connect a smart contract by adding the address in the contract configuration!"
      );
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
        dispatch_renderError(
          "Invalid smart contract. Make sure you are on the correct network!"
        );
        return;
      }
    }
    const ERC20ParamsOptions = getERC20Params();
    if (hasError(ERC20ParamsOptions)) {
      return;
    }

    const ERC20 = JSON.stringify(ERC20ParamsOptions.data);

    //I need to create the hash from legalContract,createdDate,expires,redirectto,version,issuer,onlysigner,network
    const hash = (await getHash({
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
    })) as string;

    const password = passwordEl.value;

    if (burnerCheckbox.checked) {
      if (password.length < 8) {
        dispatch_renderError("Missing password in Upload Configuation");
        return;
      }
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
          trailAddress: trailArweaveAddressEl.value,
        },
      });
      if (burnerCheckbox.checked) {
        await uploadWithBurnerWallet(
          props,
          password,
          page,
          issuer,
          network,
          hash,
          issuerSignature,
          smartContract
        );
      } else if (bundlrCheckbox.checked) {
        try {
          await uploadWithBundlr(
            props,
            page,
            issuer,
            network,
            hash,
            issuer,
            smartContract
          );
        } catch (err) {
          onSigningFailure(err.message);
        }
      }
    };

    const onSigningFailure = async (msg: string) => {
      dispatch_enableButton(props);
      dispatch_enableCreateInputs();
      dispatch_renderError(msg);
    };

    dispatch_renderError("Sign the document hash!")
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

async function uploadWithBundlr(
  props: State,
  page: string,
  issuer: string,
  network: string,
  hash: string,
  issuerSignature: string,
  smartContract: string
) {
  const bundlrOptions = await initialiseBundlr();
  if (bundlrOptions.status === Status.Failure) {
    throw new Error("Unable to connect to bundlr network!");
  }
  const bundlr = bundlrOptions.data as any;

  const tags = getContractIssueingTags(props.version, {
    issuer,
    network,
    contractType: "Acceptable",
  });
  try {
    const price = await bundlr.getPrice(page.length);
    const balance = await bundlr.getLoadedBalance();
    // Lazy Fund If you don't have enough balance for the upload
    if (balance.isLessThan(price)) {
      const fundingAmount = price.multipliedBy(1.1).toString();
      dispatch_renderError("Your Bundlr balance is empty. Fund the account now!")
      await bundlr.fund(parseInt(fundingAmount))
    }

    const tx = bundlr.createTransaction(page, { tags });
    dispatch_renderError("Sign the bundlr transaciton!")
    await tx.sign();

    dispatch_stashDetails({
      hash,
      signerAddress: issuer,
      signature: issuerSignature,
      network,
      smartContract,
      arweaveTx: tx,
      isBundlr: true,
      bundlr,
      tipTransaction: null,
      bundlrTxPrice: price,
    });

    dispatch_stashPage(page);
  } catch (err) {
    throw new Error(
      "Unable to create Bundlr transaction! Error: " + err.message
    );
  }
}

async function uploadWithBurnerWallet(
  props: State,
  password: string,
  page: string,
  issuer: string,
  network: string,
  hash: string,
  issuerSignature: string,
  smartContract: string
) {
  const decryptOptions = await decryptWallet(
    props.Account.data as ArrayBuffer,
    password
  );

  if (decryptOptions.status !== Status.Success) {
    dispatch_renderError(decryptOptions.error);
    dispatch_enableButton(props);
    dispatch_enableCreateInputs();
    return;
  }

  const pstAddress = await getProfitSharingAddresses();

  const tx = await createContractIssueingTransaction(
    page,
    props.version,
    decryptOptions.data,
    { issuer, network, contractType: "Acceptable" }
  );

  const tipTransaction = await getProfitSharingTransaction(
    pstAddress.to,
    decryptOptions.data,
    props.version
  );

  dispatch_stashDetails({
    hash,
    signerAddress: issuer,
    signature: issuerSignature,
    network,
    smartContract,
    arweaveTx: tx,
    tipTransaction,
    isBundlr: false,
    bundlr: null,
    bundlrTxPrice: null,
  });

  dispatch_stashPage(page);
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
  };

  const onReceipt = (receipt) => {
    dispatch_assignSmartContractAddress(receipt.contractAddress);
  };

  await deployContract(abi, bytecode, address, [], onError, onReceipt);
}
