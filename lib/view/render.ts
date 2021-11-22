import { html, render } from "lit-html";
import {
  ContractTypes,
  DeploySC,
  SelectedWallet,
  State,
  VerificationState,
} from "../types";
import { AcceptButton, acceptTools } from "./templates/components/acceptTools";
import { createButton } from "./templates/components/createButton";
import { CreateSummary } from "./templates/createSummary";
import {
  createProposalPopup,
  deploySCIntentPopup,
} from "./templates/popups/catalogPopup";
import { DocXDropper } from "./templates/components/docxDropper";
import { helperTooltips } from "./templates/components/helperTooltips";
import { loadingIndicator } from "./templates/components/loadingIndicator";
import { NetworkDropdown } from "./templates/dropdowns/networkdropdown";
import { PermawebDropdown } from "./templates/dropdowns/permawebDropdown";
import { redirectButton } from "./templates/components/redirectCounter";
import { SanctionsDropdown } from "./templates/dropdowns/sanctionsDropdown";
import { SCConstructorPopup } from "./templates/popups/SCContructorPopup";
import { TemplateDropdown } from "./templates/dropdowns/templatedropdown";
import { termsLayout } from "./templates/terms";
import { transactionUrl, TxId } from "./templates/components/transaction";
import {
  uploadFilePopup,
  uploadFileSummary,
} from "./templates/popups/uploadFilePopup";
import {
  copyStringToClipboard,
  getById,
  getPromptEl,
  getPromptElDOCX,
  setBannerDisplayBlock,
  setBannerDisplayNone,
} from "./utils";
import {
  PermapinPopup,
  PermapinSummaryPage,
} from "./templates/popups/permapinPopup";
import {
  AddNewAccountPopup,
  ShowAccountPopup,
  SwitchAccounts,
  TransferPage,
  TransferSummaryPage,
  WalletPopup,
} from "./templates/popups/walletPopup";
import {
  VerifyContract,
  VerifyFailure,
  VerifySuccess,
} from "./templates/popups/verifyContract";
import { CatalogDropdown } from "./templates/dropdowns/catalogdropdown";

export function renderAcceptTools(props: State) {
  const actionContainer = getById("action-container");
  render(acceptTools(props), actionContainer);
}

export function renderAcceptButton(props: State) {
  const buttonSlot = getById("button-slot");
  const positionNeeded =
    props.blockedCountries.length > 0 && props.position === undefined;
  render(AcceptButton(positionNeeded), buttonSlot);
}

export async function renderLoadingIndicator(to: string) {
  render(loadingIndicator, getById(to));
}

export async function removeLoadingIndicator(from: string) {
  render(html`<div></div>`, getById(from));
}

export async function renderTransaction(props: State, url: string) {
  render(transactionUrl(props, url), getById("transaction-display"));
  copyStringToClipboard(url);
}

export async function removeTransaction() {
  render("", getById("transaction-display"));
}

export function renderError(message: string) {
  const errorDisplay = getById("error-display");
  // Add the "show" class to DIV
  errorDisplay.className = "show";
  errorDisplay.textContent = message;

  setTimeout(function () {
    errorDisplay.className = errorDisplay.className.replace("show", "");
  }, 3000);
}

export function removeError() {
  const errorDisplay = getById("error-display");
  errorDisplay.className = errorDisplay.className.replace("show", "");
  errorDisplay.innerHTML = "";
}

export function renderVersion(version: string) {
  getById("version").textContent = version;
}

export function renderredirect() {
  const counterEl = getById("redirect-display");
  render(redirectButton, counterEl);
}

export function enableButton(props: State) {
  const currentPage = props.contracttype;
  if (currentPage === ContractTypes.create) {
    const saveButton = getById("save-contract") as HTMLButtonElement;
    saveButton.disabled = false;
    saveButton.style.backgroundColor = "black";
    saveButton.style.color = "white";
  } else if (currentPage === ContractTypes.acceptable) {
    const saveButton = getById("accept-button") as HTMLButtonElement;
    saveButton.disabled = false;
    saveButton.style.backgroundColor = "black";
    saveButton.style.color = "white";
  }
}

export function disableButton(props: State) {
  const currentPage = props.contracttype;
  if (currentPage === ContractTypes.create) {
    const saveButton = getById("save-contract") as HTMLButtonElement;
    saveButton.disabled = true;
    saveButton.style.backgroundColor = "";
    saveButton.style.color = "";
  } else if (currentPage === ContractTypes.acceptable) {
    const saveButton = getById("accept-button") as HTMLButtonElement;
    saveButton.disabled = true;
    saveButton.style.backgroundColor = "";
    saveButton.style.color = "";
  }
}

export function renderCreateButton(disabled: boolean) {
  render(createButton(disabled), getById("button-slot"));
}

export function renderTerms() {
  setBannerDisplayBlock();
  const layout = getById("overlay-layout");
  layout.style.maxHeight = "100%";
  render(termsLayout(), layout);
}

export function renderSummary(props: State) {
  render(CreateSummary(props), getById("button-slot"));
}

export function removeButtons() {
  render(``, getById("button-slot"));
}

export function removeAcceptedButton() {
  getById("accept-button").innerHTML = "";
}

export function revertPrompt() {
  const prompt = getPromptEl();
  prompt.textContent = "Drop PDF here or click to upload";
  prompt.style.color = "black";
}

export function updatePromptSuccess(file: File) {
  const prompt = getPromptEl();
  prompt.style.color = "black";
  prompt.textContent = file.name;
}

export function updatePromptError(message: string) {
  const prompt = getPromptEl();
  prompt.textContent = message;
  prompt.style.color = "red";
}

export function updatePromptSuccessDOCX(file: File) {
  const prompt = getPromptElDOCX();
  prompt.style.color = "black";
  prompt.textContent = file.name;
}

export function updatePromptErrorDOCX(message: string) {
  const prompt = getPromptElDOCX();
  prompt.textContent = message;
  prompt.style.color = "red";
}

export function renderTooltips() {
  const sanctions = getById("sanctions-tooltip");
  const blockedAddresses = getById("blocked-addresses-tooltip");
  const expires = getById("expires-tooltip");
  const redirectto = getById("redirectto-tooltip");
  const Scontract = getById("smartcontract-tooltip");
  const customNetwork = getById("customnetwork-tooltip");
  const erc20Tooltip = getById("erc20-tooltip");
  const adderc20Tooltip = getById("add-erc20-checkbox-tooltip");
  const erc20NameTooltip = getById("erc20-name-tooltip");
  const erc20SymbolTooltip = getById("erc20-symbol-tooltip");
  const erc20DecimalTooltip = getById("erc20-decimal-tooltip");
  const erc20Address = getById("erc20-address-tooltip");
  render(
    helperTooltips(
      "Ricardian Fabric uses Geolocation to block access from sanctioned countries."
    ),
    sanctions
  );
  render(helperTooltips("The contract expires always at midnight"), expires);
  render(
    helperTooltips("Redirects here with /{id}. Leave empty if not used"),
    redirectto
  );

  render(
    helperTooltips(
      "The address of a Compatible Smart Contract that Ricardian Fabric will call."
    ),
    Scontract
  );
  render(
    helperTooltips(
      "Check this to use your own custom network in metamask. Default is Harmony."
    ),
    customNetwork
  );

  render(
    helperTooltips("A comma separated list of addresses to block."),
    blockedAddresses
  );
  render(helperTooltips("Check this to add an ERC20 to the signer's wallet with the below config."), adderc20Tooltip);
  render(helperTooltips("The contract will configure the wallet to this when it's accepted."), erc20Tooltip)
  render(helperTooltips("The token name"), erc20NameTooltip);
  render(helperTooltips("The token symbol"), erc20SymbolTooltip);
  render(helperTooltips("Token decimals"), erc20DecimalTooltip);
  render(helperTooltips("Token contract address"), erc20Address);
}

export function disableCreateInputs() {

  const disable = (el: HTMLInputElement | HTMLButtonElement) => {
    el.disabled = true;
    el.style.cursor = "not-allowed"
  }

  const editor = getById("editor") as HTMLInputElement;
  const expires = getById("expires-input") as HTMLInputElement;
  const never = getById("expires-reset") as HTMLInputElement;
  const redirectto = getById("redirectto-input") as HTMLInputElement;
  const termsCheckbox = getById("terms-checkbox") as HTMLInputElement;
  const termsCheckboxLabel = getById("terms-checkbox-label");

  const docxDropper = getById("import-docx-trigger") as HTMLInputElement;
  const smartContract = getById("smartcontract-input") as HTMLInputElement;
  const sanctions = getById("sanctions_checkbox_toggle") as HTMLInputElement;
  const sanctionsLabel = getById("sanctions_checkbox_label");

  const switchNetwork = getById("network_checkbox_toggle") as HTMLInputElement;
  const switchNetworkLabel = getById(
    "network_checkbox_label"
  ) as HTMLInputElement;

  const catalogToggle = getById("catalog_checkbox_toggle") as HTMLInputElement;
  const catalogLabel = getById("catalog_checkbox_label") as HTMLInputElement;

  const metamask = getById("metamask-logo-container");

  const blockedAddresses = getById("blocked-addresses") as HTMLInputElement;

  const erc20Checkbox = getById("add-erc20-checkbox") as HTMLInputElement;
  const erc20Name = getById("erc20-name") as HTMLInputElement;
  const erc20Symbol = getById("erc20-symbol") as HTMLInputElement;
  const erc20Decimals = getById("erc20-decimals") as HTMLInputElement;
  const erc20SmartContract = getById("erc20-address") as HTMLInputElement;
  const sameButton = getById("same-contract-button") as HTMLButtonElement;
  disable(erc20Checkbox);
  disable(erc20Name);
  disable(erc20Symbol);
  disable(erc20Decimals);
  disable(erc20SmartContract);
  disable(blockedAddresses);
  disable(sameButton);

  metamask.dataset.disabled = "true";
  metamask.style.cursor = "not-allowed";

  disable(switchNetwork);

  switchNetworkLabel.style.cursor = "not-allowed";
  switchNetworkLabel.style.backgroundColor = "white";

  disable(catalogToggle);

  catalogLabel.style.cursor = "not-allowed";
  catalogLabel.style.backgroundColor = "white";
  disable(editor);
  disable(sanctions);
  sanctionsLabel.style.cursor = "not-allowed";
  sanctionsLabel.style.backgroundColor = "white";
  disable(expires);
  disable(never);
  disable(redirectto);
  disable(termsCheckbox);
  termsCheckboxLabel.style.backgroundColor = "white";
  disable(docxDropper);
  disable(smartContract);
}
export function enableCreateInputs() {
  enum Cursor {
    pointer = "pointer",
    auto = "auto"
  }
  const enable = (inp: HTMLInputElement | HTMLButtonElement, cursor: Cursor) => {
    inp.style.cursor = cursor;
    inp.disabled = false;
  }

  const editor = getById("editor") as HTMLInputElement;
  const expires = getById("expires-input") as HTMLInputElement;
  const never = getById("expires-reset") as HTMLInputElement;
  const redirectto = getById("redirectto-input") as HTMLInputElement;
  const termsCheckbox = getById("terms-checkbox") as HTMLInputElement;
  const termsCheckboxLabel = getById("terms-checkbox-label");

  const docxDropper = getById("import-docx-trigger") as HTMLInputElement;
  const smartContract = getById("smartcontract-input") as HTMLInputElement;
  const sanctions = getById("sanctions_checkbox_toggle") as HTMLInputElement;
  const sanctionsLabel = getById("sanctions_checkbox_label");

  const switchNetwork = getById("network_checkbox_toggle") as HTMLInputElement;
  const switchNetworkLabel = getById(
    "network_checkbox_label"
  ) as HTMLInputElement;

  const metamask = getById("metamask-logo-container");

  const blockedAddresses = getById("blocked-addresses") as HTMLInputElement;
  const catalogToggle = getById("catalog_checkbox_toggle") as HTMLInputElement;
  const catalogLabel = getById("catalog_checkbox_label") as HTMLInputElement;

  const erc20Checkbox = getById("add-erc20-checkbox") as HTMLInputElement;
  const erc20Name = getById("erc20-name") as HTMLInputElement;
  const erc20Symbol = getById("erc20-symbol") as HTMLInputElement;
  const erc20Decimals = getById("erc20-decimals") as HTMLInputElement;
  const erc20SmartContract = getById("erc20-address") as HTMLInputElement;
  const sameButton = getById("same-contract-button") as HTMLButtonElement;
  enable(erc20Checkbox, Cursor.pointer);
  enable(erc20Name, Cursor.pointer);
  enable(erc20Symbol, Cursor.pointer);
  enable(erc20Decimals, Cursor.pointer);
  enable(erc20SmartContract, Cursor.pointer);
  enable(blockedAddresses, Cursor.pointer);
  enable(sameButton, Cursor.pointer);

  metamask.dataset.disabled = "false";
  metamask.style.cursor = "pointer";

  enable(switchNetwork, Cursor.pointer);

  switchNetworkLabel.style.cursor = "pointer";
  switchNetworkLabel.style.backgroundColor = "#f2f2f2";

  enable(sanctions, Cursor.pointer);

  sanctionsLabel.style.cursor = "pointer";
  sanctionsLabel.style.backgroundColor = "#f2f2f2";

  enable(catalogToggle, Cursor.pointer);

  catalogLabel.style.cursor = "pointer";
  catalogLabel.style.backgroundColor = "#f2f2f2";

  editor.contentEditable = "true";
  editor.style.cursor = "text";

  enable(expires, Cursor.pointer);

  enable(never, Cursor.pointer);
  enable(redirectto, Cursor.auto);

  enable(termsCheckbox, Cursor.pointer);

  termsCheckboxLabel.style.backgroundColor = "#f2f2f2";

  enable(docxDropper, Cursor.pointer);
  enable(smartContract, Cursor.auto);
}

export function renderButtonSlotAlignment(center: boolean) {
  const buttonSlot = getById("button-slot");

  if (center) {
    buttonSlot.style.margin = "0 auto";
  } else {
    buttonSlot.style.margin = null;
  }
}

export function renderNetworkDropdown() {
  const dropdown = getById("network-dropdown");
  render(NetworkDropdown(), dropdown);
}

export function renderPermawebDropdown() {
  const dropdown = getById("permaweb-dropdown");
  render(PermawebDropdown(), dropdown);
}

export function renderTemplatesDropdown() {
  const dropdown = getById("template-dropdown");
  render(TemplateDropdown(), dropdown);
}

export function renderCatalogDropdown() {
  const dropdown = getById("catalog-dropdown");
  render(CatalogDropdown(), dropdown);
}

export function handleDropdownClosing() {
  const permawebDropdown = getById("permaweb-dropdown");
  const permawebToggle = getById(
    "permaweb_checkbox_toggle"
  ) as HTMLInputElement;
  const networkDropdown = getById("network-dropdown");
  const networktoggle = getById("network_checkbox_toggle") as HTMLInputElement;
  const sanctionsDropdown = getById("sanctions-dropdown");
  const sanctionsToggle = getById(
    "sanctions_checkbox_toggle"
  ) as HTMLInputElement;
  const templateDropdown = getById("template-dropdown");
  const templateToggle = getById(
    "template_checkbox_toggle"
  ) as HTMLInputElement;

  const catalogToggle = getById("catalog_checkbox_toggle") as HTMLInputElement;
  const catalogDropdown = getById("catalog-dropdown");

  const page = getById("page");
  page.onclick = function (ev: Event) {
    if (!ev.composedPath().includes(networkDropdown)) {
      networktoggle.checked = false;
    }
    if (!ev.composedPath().includes(sanctionsDropdown)) {
      sanctionsToggle.checked = false;
    }
    if (!ev.composedPath().includes(permawebDropdown)) {
      permawebToggle.checked = false;
    }
    if (!ev.composedPath().includes(templateDropdown)) {
      templateToggle.checked = false;
    }
    if (!ev.composedPath().includes(catalogDropdown)) {
      catalogToggle.checked = false;
    }
  };
}

export function renderSanctionsDropdown() {
  const dropdown = getById("sanctions-dropdown");
  render(SanctionsDropdown(true), dropdown);
}

export function renderSCIntentPopup() {
  setBannerDisplayBlock();
  const layout = getById("overlay-layout");
  layout.style.maxHeight = "100%";
  render(deploySCIntentPopup(), layout);
}

export function removePopup() {
  setBannerDisplayNone();
}

export function removeElement(el: HTMLElement) {
  el.style.display = "none";
}
export function hideElement(el: HTMLElement, hide: boolean) {
  if (hide) {
    el.style.display = "none";
  } else {
    el.style.display = "initial";
  }
}

export function renderContructorInputs(selected: DeploySC) {
  const layout = getById("overlay-layout");
  render(SCConstructorPopup(selected), layout);
}

export function disableSCInputs(params: any) {
  const nextButton = getById("SCConstructCreateButton") as HTMLButtonElement;
  nextButton.disabled = true;
  nextButton.style.cursor = "not-allowed";
  nextButton.style.backgroundColor = "white";

  params.forEach((param) => {
    const el = getById(`${param.name}-input`) as HTMLInputElement;
    el.disabled = true;
  });
}

export function enableSCInputs(params: any) {
  const nextButton = getById("SCConstructCreateButton") as HTMLButtonElement;
  nextButton.disabled = false;
  nextButton.style.cursor = "pointer";
  nextButton.style.backgroundColor = "black";
  params.forEach((param) => {
    const el = getById(`${param.name}-input`) as HTMLInputElement;
    el.disabled = false;
  });
}

export function setDeployedSCAddressToDOM(address: string) {
  const smartContract = getById("smartcontract-input") as HTMLInputElement;
  smartContract.value = address;
}

export function renderSelectedWallet(selectedWallet: SelectedWallet) {
  const metamask = getById("metamask-logo-container");
  const selectNetwork = getById("network_checkbox_label");
  const permaweb = getById("permaweb_checkbox_label");

  selectNetwork.classList.add("lightBlue-shadow");
  permaweb.classList.add("lightCoral-shadow");

  if (selectedWallet === SelectedWallet.metamask) {
    metamask.classList.add("lightBlue-shadow");
  }
}

export function renderDocXDropper() {
  setBannerDisplayBlock();
  const layout = getById("overlay-layout");
  layout.style.maxHeight = "100%";
  render(DocXDropper(), layout);
}

export function renderUploadFile() {
  setBannerDisplayBlock();
  const layout = getById("overlay-layout");
  layout.style.maxHeight = "100%";
  render(uploadFilePopup(), layout);
}

export function renderUploadSummary(file: File, fee: any, id: string) {
  const layout = getById("overlay-layout");
  render(uploadFileSummary(file.name, file.type, fee, id), layout);
}

export function renderPermapinPopup() {
  setBannerDisplayBlock();
  const layout = getById("overlay-layout");
  render(PermapinPopup(), layout);
}

export function renderWalletPopup() {
  setBannerDisplayBlock();
  const layout = getById("overlay-layout");
  render(WalletPopup(), layout);
}
export function renderAddNewAccountPopup(account: Blob, address: string) {
  const layout = getById("overlay-layout");
  render(AddNewAccountPopup(address), layout);
}
export function renderShowAccount(address: string, balance: string) {
  setBannerDisplayBlock();
  const layout = getById("overlay-layout");
  render(ShowAccountPopup(address, balance), layout);
}

export function renderSwitchAccounts() {
  const layout = getById("overlay-layout");
  render(SwitchAccounts(), layout);
}

export function renderTransferPage(balance: string) {
  const layout = getById("overlay-layout");
  render(TransferPage(balance), layout);
}

export function renderTransferSummaryPage(arg: {
  mainTransaction: any;
  amountToSend: string;
  sendTip: boolean;
  tipAmount: string;
  tipTransaction: any;
}) {
  const layout = getById("overlay-layout");
  render(TransferSummaryPage(arg), layout);
}

export function renderPermapinSummaryPage(arg: {
  permapinTx: any;
  sendTip: boolean;
  tipTx: any;
}) {
  const layout = getById("overlay-layout");
  render(PermapinSummaryPage(arg), layout);
}

export function emptyWalletDropper() {
  const fileInput = getById("wallet-input") as HTMLInputElement;
  fileInput.value = "";
  const prompt = getById("drop-prompt");
  prompt.textContent = "Drop Your Arweave wallet file here ";
  prompt.style.color = "#cccccc";
}

export function downloadBlob(blob: Blob, name: string) {
  const dl = document.createElement("a");
  dl.download = name;
  dl.href = URL.createObjectURL(blob);
  dl.click();
  URL.revokeObjectURL(dl.href);
}

export function renderTxId(to: string, txId: string) {
  const el = getById(to);
  render(TxId(txId), el);
}

export function renderVerifyContractPopup() {
  setBannerDisplayBlock();
  const el = getById("overlay-layout");
  render(VerifyContract(), el);
}
export function renderVerificationState(verificationState: VerificationState) {
  const el = getById("verify-result-display");

  switch (verificationState) {
    case VerificationState.none:
      render("", el);
      break;
    case VerificationState.success:
      render(VerifySuccess(), el);
      break;
    case VerificationState.failure:
      render(VerifyFailure(), el);
      break;
    default:
      break;
  }
}

export function renderCreateProposalPage(props: State) {
  setBannerDisplayBlock();
  const layout = getById("overlay-layout");
  render(createProposalPopup(), layout);
}

export function renderAccordionOpener() {
  const acc = document.getElementsByClassName("accordion");

  for (let i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
      this.classList.toggle("active");
      var panel = this.nextElementSibling;
      if (panel.style.display === "block") {
        panel.style.display = "none";
      } else {
        panel.style.display = "block";
      }
    });
  }
}
