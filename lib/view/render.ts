import { html, render } from "lit-html";
import {
  AcceptedSmartContractProposal,
  ArweaveDataPage,
  ContractTypes,
  CreateRicardianPageProps,
  FetchedProposals,
  LockedTokens,
  PageState,
  PaginatedProposal,
  PaginatedProposals,
  PopupState,
  ProposalFormat,
  QueryStrings,
  RankProposal,
  RemovalProposal,
  RenderType,
  SelectedRewardDetails,
  SelectedWallet,
  SmartContractProposal,
  Staker,
  State,
  Token,
  TokenProposal,
  VerificationState,
} from "../types";
import { AcceptButton, acceptTools } from "./templates/components/acceptTools";
import { createButton } from "./templates/components/createButton";
import { CreateSummary } from "./templates/components/createSummary";
import { catalogContent, catalogPage } from "./templates/pages/catalogPage";
import { DocXDropper } from "./templates/components/docxDropper";
import { helperTooltips } from "./templates/components/helperTooltips";
import { loadingIndicator } from "./templates/components/loadingIndicator";
import { NetworkDropdown } from "./templates/dropdowns/networkdropdown";
import { PermawebDropdown } from "./templates/dropdowns/permawebDropdown";
import { redirectButton } from "./templates/components/redirectCounter";
import { SanctionsDropdown } from "./templates/dropdowns/sanctionsDropdown";
import {
  deploymentDone,
  deploymentDonePopup,
  SCConstructorPopup,
} from "./templates/popups/SCContructorPopup";
import { TemplateDropdown } from "./templates/dropdowns/templatedropdown";
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
} from "./templates/pages/verifyContractPage";
import { CatalogDropdown } from "./templates/dropdowns/catalogdropdown";
import { CreatePage } from "./templates/pages/createPage";
import { MenuPage } from "./templates/pages/menuPage";
import {
  UploadProposalPopup,
  UploadProposalSummary,
} from "./templates/popups/uploadProposalPopup";
import {
  RankProposalTable,
  RemovalProposalsTable,
  ReviewAndVote,
  SmartContractProposalsTable,
} from "./templates/pages/reviewAndVotePage";
import { SideBar } from "./templates/components/sideBar";
import { createProposalPage } from "./templates/pages/createProposalPage";
import ScreenSizeDetector from "screen-size-detector";
import {
  ManageProposals,
  MyAcceptedSmartContratctProposalsTable,
  MyProposalsContent,
  MyRankProposalTable,
  MyRemovalProposalTable,
  MySmartContractProposalTable,
  RemovalProposalPage,
  StakerDetails,
} from "./templates/pages/manageProposals";
import { WrongNetworkPopup } from "./templates/popups/WrongNetworkPopup";
import { DaoTermsPopup } from "./templates/popups/DaoTermsPopup";
import { ConnectWalletPage } from "./templates/pages/connectWalletPage";
import {
  DashboardPage,
  loadedValueEl,
} from "./templates/pages/dashboardPage";
import {
  FeeDaoPage,
  proposeTokenPopup,
  TokenProposals,
  tokenRow,
} from "./templates/pages/feeDaoPage";
import { TokenSalePage } from "./templates/pages/tokenSalePage";
import { EmptyVault, VaultItems, VaultPage } from "./templates/pages/vaultPage";
import {
  FindTrail,
  FoundTrail,
  TrailData,
  TrailsPage,
} from "./templates/pages/trailsPage";
import { ToyBlocks } from "./templates/components/logos";
import {
  CollectRewardsPage,
  getSelected,
  TokenRow,
} from "./templates/pages/collectRewardsPage";
import {
  AddCommentTrail,
  UploadArweaveTxSummary,
} from "./templates/popups/addComment";
import { BlockCountry } from "../business/countryBlock";
import {
  contractDisplay,
  VoteOnSmartContract,
} from "./templates/popups/contractDisplayAndVote";
import { smartContractProductPage } from "./templates/components/smartContractProductPage";
import DOMPurify from "dompurify";
import { uploadNewFrontEndTemplate } from "./templates/popups/uploadFrontend";

export function renderConnectYourWallet(props: State) {
  const page = getById("page");
  render(ConnectWalletPage(), page);
  const sidebarSlot = getById("sidebarSlot");

  render(html``, sidebarSlot), (page.style.backgroundColor = "");
  page.style.boxShadow = "";
}

export function renderDashboard(props: State) {
  const page = getById("page");
  render(DashboardPage(), page);
}
export function renderCollectRewardsPage(props: State) {
  const page = getById("page");
  render(CollectRewardsPage(), page);
}

export function renderMenuPage(props: State) {
  const menuItems = getById("menuItems");
  render(MenuPage(props), menuItems);

  //I need to set the background of page
  const page = getById("page");
  page.style.backgroundColor = "white";
  page.style.boxShadow =
    "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px";
}

export function renderSidebar(props: State) {
  const sidebarSlot = getById("sidebarSlot");
  render(SideBar(), sidebarSlot);

  const toggle = getById("toggleClose");
  const toggleOpen = getById("toggleOpen") as HTMLButtonElement;
  const sidebar = getById("sidebar");

  toggleOpen.disabled = false;
  toggle.onclick = function () {
    sidebar.classList.toggle("collapsed");
  };

  toggleOpen.onclick = function () {
    sidebar.classList.toggle("collapsed");
  };
}

export function renderCreatePage() {
  const page = getById("page");
  render(CreatePage(), page);
}

export function renderCatalogPage() {
  const page = getById("page");
  render(catalogPage(), page);
}

export function renderFeeProposalsPage(props: State) {
  const page = getById("page");
  render(FeeDaoPage(), page);
}
export function renderTokenSalePage(props: State) {
  const page = getById("page");
  render(TokenSalePage(), page);
}
export function renderVaultPage(props: State) {
  const page = getById("page");
  render(VaultPage(), page);
}

export function renderTrailsPage(props: State) {
  const page = getById("page");
  render(TrailsPage(), page);
}


export function renderAcceptTools(props: State) {
  const actionContainer = getById("action-container");
  const adblockerNotification = getById("adblocker-notification");
  render(acceptTools(props), actionContainer);
  adblockerNotification.style.display = "none";
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
  await copyStringToClipboard(url);
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

export function renderredirect() {
  const counterEl = getById("redirect-display");
  const acceptButton = getById("accept-button");
  render(redirectButton, counterEl);
  hideElement(acceptButton, true);
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
  const trailTooltip = getById("trail-tooltip");
  const customNetwork = getById("customnetwork-tooltip");
  const erc20Tooltip = getById("erc20-tooltip");
  const adderc20Tooltip = getById("add-erc20-checkbox-tooltip");
  const erc20NameTooltip = getById("erc20-name-tooltip");
  const erc20SymbolTooltip = getById("erc20-symbol-tooltip");
  const erc20DecimalTooltip = getById("erc20-decimal-tooltip");
  const erc20Address = getById("erc20-address-tooltip");
  const burnerWalletTooltip = getById("burner-wallet-tooltip");

  render(helperTooltips("The password of your burner wallet!"), burnerWalletTooltip);

  render(
    helperTooltips(
      "Add a trail to this contract. Arweave Address is optional."
    ),
    trailTooltip
  );

  render(
    helperTooltips(
      "Ricardian Fabric uses Geolocation to block access from sanctioned countries."
    ),
    sanctions
  );
  render(helperTooltips("The contract expires always at midnight"), expires);
  render(
    helperTooltips("A button to redirect here will appear on the signed contract. Leave empty if not used"),
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
  render(
    helperTooltips(
      "Check this to add an ERC20 to the signer's wallet with the below config."
    ),
    adderc20Tooltip
  );
  render(
    helperTooltips(
      "The contract will configure the wallet to this when it's accepted."
    ),
    erc20Tooltip
  );
  render(helperTooltips("The token name"), erc20NameTooltip);
  render(helperTooltips("The token symbol"), erc20SymbolTooltip);
  render(helperTooltips("Token decimals"), erc20DecimalTooltip);
  render(helperTooltips("Token contract address"), erc20Address);
}

export function disableCreateInputs() {
  const disable = (el: HTMLInputElement | HTMLButtonElement) => {
    el.disabled = true;
    el.style.cursor = "not-allowed !important";
  };
  const editor = getById("editor") as HTMLInputElement;

  editor.contentEditable = "false";

  const expires = getById("expires-input") as HTMLInputElement;
  const never = getById("expires-reset") as HTMLInputElement;
  const redirectto = getById("redirectto-input") as HTMLInputElement;
  const termsCheckbox = getById("terms-checkbox") as HTMLInputElement;
  const termsCheckboxLabel = getById("terms-checkbox-label");

  const docxDropper = getById("import-docx-trigger") as HTMLInputElement;
  const smartContract = getById("smartcontract-input") as HTMLInputElement;
  const trail = getById("trail-input") as HTMLInputElement;
  const arweaveAddress = getById("trail-address-input") as HTMLInputElement;
  const sanctions = getById("sanctions_checkbox_toggle") as HTMLInputElement;
  const sanctionsLabel = getById("sanctions_checkbox_label");

  const switchNetwork = getById("network_checkbox_toggle") as HTMLInputElement;
  const switchNetworkLabel = getById(
    "network_checkbox_button"
  ) as HTMLButtonElement;

  const catalogToggle = getById("catalog_checkbox_toggle") as HTMLInputElement;
  const catalogLabel = getById("catalog_checkbox_button") as HTMLButtonElement;

  const metamask = getById("metamask-logo-container");

  const blockedAddresses = getById("blocked-addresses") as HTMLInputElement;

  const erc20Checkbox = getById("add-erc20-checkbox") as HTMLInputElement;
  const erc20Name = getById("erc20-name") as HTMLInputElement;
  const erc20Symbol = getById("erc20-symbol") as HTMLInputElement;
  const erc20Decimals = getById("erc20-decimals") as HTMLInputElement;
  const erc20SmartContract = getById("erc20-address") as HTMLInputElement;
  const sameButton = getById("same-contract-button") as HTMLButtonElement;
  const burnerWalletPassword = getById("wallet-password") as HTMLInputElement;

  disable(burnerWalletPassword);
  disable(erc20Checkbox);
  disable(erc20Name);
  disable(erc20Symbol);
  disable(erc20Decimals);
  disable(erc20SmartContract);
  disable(blockedAddresses);
  disable(sameButton);
  sameButton.style.cursor = "not-allowed";
  sameButton.style.backgroundColor = "white";
  metamask.dataset.disabled = "true";
  metamask.style.cursor = "not-allowed";

  disable(switchNetwork);

  switchNetworkLabel.style.cursor = "not-allowed";

  disable(catalogToggle);

  catalogLabel.style.cursor = "not-allowed";

  disable(sanctions);
  sanctionsLabel.style.cursor = "not-allowed";
  sanctionsLabel.style.backgroundColor = "white";
  disable(expires);
  disable(never);
  never.style.cursor = "not-allowed";
  never.style.backgroundColor = "white";
  disable(redirectto);
  disable(termsCheckbox);
  termsCheckboxLabel.style.backgroundColor = "white";
  docxDropper.style.cursor = "not-allowed";
  disable(docxDropper);
  disable(smartContract);
  disable(trail);
  disable(arweaveAddress);
}
export function enableCreateInputs() {
  enum Cursor {
    pointer = "pointer",
    auto = "auto",
  }
  const enable = (
    inp: HTMLInputElement | HTMLButtonElement,
    cursor: Cursor
  ) => {
    inp.style.cursor = cursor;
    inp.disabled = false;
  };

  const editor = getById("editor") as HTMLInputElement;

  editor.contentEditable = "true";

  const expires = getById("expires-input") as HTMLInputElement;
  const never = getById("expires-reset") as HTMLInputElement;
  const redirectto = getById("redirectto-input") as HTMLInputElement;
  const termsCheckbox = getById("terms-checkbox") as HTMLInputElement;
  const termsCheckboxLabel = getById("terms-checkbox-label");

  const docxDropper = getById("import-docx-trigger") as HTMLInputElement;
  const smartContract = getById("smartcontract-input") as HTMLInputElement;
  const trail = getById("trail-input") as HTMLInputElement;
  const arweaveAddress = getById("trail-address-input") as HTMLInputElement;
  const sanctions = getById("sanctions_checkbox_toggle") as HTMLInputElement;
  const sanctionsLabel = getById("sanctions_checkbox_label");

  const switchNetwork = getById("network_checkbox_toggle") as HTMLInputElement;
  const switchNetworkLabel = getById(
    "network_checkbox_button"
  ) as HTMLButtonElement;

  const metamask = getById("metamask-logo-container");

  const blockedAddresses = getById("blocked-addresses") as HTMLInputElement;
  const catalogToggle = getById("catalog_checkbox_toggle") as HTMLInputElement;
  const catalogLabel = getById("catalog_checkbox_button") as HTMLButtonElement;

  const erc20Checkbox = getById("add-erc20-checkbox") as HTMLInputElement;
  const erc20Name = getById("erc20-name") as HTMLInputElement;
  const erc20Symbol = getById("erc20-symbol") as HTMLInputElement;
  const erc20Decimals = getById("erc20-decimals") as HTMLInputElement;
  const erc20SmartContract = getById("erc20-address") as HTMLInputElement;
  const sameButton = getById("same-contract-button") as HTMLButtonElement;
  const burnerWalletPassword = getById("wallet-password") as HTMLInputElement;

  enable(burnerWalletPassword, Cursor.pointer);

  enable(erc20Checkbox, Cursor.pointer);
  enable(erc20Name, Cursor.auto);
  enable(erc20Symbol, Cursor.auto);
  enable(erc20Decimals, Cursor.auto);
  enable(erc20SmartContract, Cursor.auto);
  enable(blockedAddresses, Cursor.auto);
  enable(sameButton, Cursor.pointer);
  sameButton.style.backgroundColor = "#f2f2f2";

  metamask.dataset.disabled = "false";
  metamask.style.cursor = "pointer";

  enable(switchNetwork, Cursor.pointer);

  switchNetworkLabel.style.cursor = "pointer";
  switchNetworkLabel.style.backgroundColor = "#f2f2f2";

  enable(sanctions, Cursor.pointer);

  sanctionsLabel.style.cursor = "pointer";
  sanctionsLabel.style.backgroundColor = "";

  enable(catalogToggle, Cursor.pointer);

  catalogLabel.style.cursor = "pointer";

  editor.contentEditable = "true";
  editor.style.cursor = "text";

  enable(expires, Cursor.pointer);

  enable(never, Cursor.pointer);
  never.style.backgroundColor = "#f2f2f2";

  enable(redirectto, Cursor.auto);

  enable(termsCheckbox, Cursor.pointer);

  termsCheckboxLabel.style.backgroundColor = "#f2f2f2";

  enable(docxDropper, Cursor.pointer);
  enable(smartContract, Cursor.auto);
  enable(trail, Cursor.auto);
  enable(arweaveAddress, Cursor.auto);
}

export function renderButtonSlotAlignment(center: boolean) {
  const buttonSlot = getById("button-slot");

  if (center) {
    buttonSlot.style.margin = "0 auto";
  } else {
    buttonSlot.style.margin = "";
  }
}

export function renderNetworkDropdown() {
  const dropdown = getById("network-dropdown");
  render(NetworkDropdown(), dropdown);
}

export function renderPermawebDropdown(
  page: PageState,
  contractType: ContractTypes
) {
  const dropdown = getById("permaweb-dropdown");
  render(PermawebDropdown(contractType, page), dropdown);
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
    collapseSidebarIfScreenIsSmall();
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

export function collapseSidebarIfScreenIsSmall() {
  const detectScreen = new ScreenSizeDetector();
  if (detectScreen.width < 1000) {
    // If the screen is smaller than 1000 pixels, I close the menu on page click
    collapseSidebar();
  }
}

export function openSidebarIfScreenIsBig() {
  const detectScreen = new ScreenSizeDetector();
  if (detectScreen.width > 1000) {
    // If the screen is smaller than 1000 pixels, I close the menu on page click
    openSidebar();
  }
}

export function openSidebar() {
  const sidebar = getById("sidebar");
  if (sidebar.classList.contains("collapsed")) {
    sidebar.classList.remove("collapsed");
  }
}

export function collapseSidebar() {
  const sidebar = getById("sidebar");
  if (!sidebar.classList.contains("collapsed")) {
    sidebar.classList.add("collapsed");
  }
}

export function renderSanctionsDropdown() {
  const dropdown = getById("sanctions-dropdown");
  render(SanctionsDropdown(true), dropdown);
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

export function renderContructorInputs(selected: ProposalFormat) {
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
  //TODO: I DONT NEED THIS ANYMORE< DEPRECATED!
  const metamask = getById("metamask-logo-container");
  const selectNetwork = getById("network_checkbox_button");
  const permaweb = getById("permaweb_checkbox_button");

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

export function renderUploadSummary(
  file: File,
  fee: any,
  id: string,
  contentType: string
) {
  const layout = getById("overlay-layout");
  render(uploadFileSummary(file.name, contentType, fee, id), layout);
}

export function renderUploadStatus(status: string) {
  const statusDisplay = getById("upload-status");
  statusDisplay.innerHTML = status;
}

export function discardFile() {
  const fileInput = getById("file-input") as HTMLInputElement;
  fileInput.value = "";
  const prompt = getById("drop-prompt");
  prompt.textContent = "Drop File here or click to upload";
  prompt.style.color = "#cccccc";
  const contentTypeEl = getById("content-type-input") as HTMLInputElement;
  contentTypeEl.value = "";
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

export function render_wrongNetworkPopup() {
  setBannerDisplayBlock();
  const layout = getById("overlay-layout");
  render(WrongNetworkPopup(), layout);
}
export function render_uploadFrontendPopup(url: string) {
  const layout = getById("overlay-layout");
  render(uploadNewFrontEndTemplate(url), layout);
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
  const el = getById("page");
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
  const page = getById("page");

  render(createProposalPage(), page);
}

export function renderReviewAndVotePage(props: State) {
  const page = getById("page");
  render(ReviewAndVote(), page);
}

export function renderManageProposals() {
  const page = getById("page");
  render(ManageProposals(), page);
}

export function renderMyProposalsContent(
  paginatedProposals: PaginatedProposals,
  fetchedProposals: FetchedProposals,
  blockNumber: number
) {
  const myProposalsContainer = getById("my-proposals-container");
  render(
    MyProposalsContent(paginatedProposals, fetchedProposals, blockNumber),
    myProposalsContainer
  );
}

export function renderMyProposalsRankContent(
  ranks: RankProposal[],
  rankIndexes: string[],
  blockNumber: number,
  totalPages: number,
  currentPage: number
) {
  const el = getById("my-rank-proposals-container");
  render(
    MyRankProposalTable(
      ranks,
      rankIndexes,
      blockNumber,
      totalPages,
      currentPage
    ),
    el
  );
}

export function renderMyProposalsSmartContractContent(
  smartContractProposals: SmartContractProposal[],
  indexes: string[],
  blockNumber: number,
  totalPages: number,
  currentPage: number
) {
  const el = getById("my-smart-contract-proposals-container");
  render(
    MySmartContractProposalTable(
      smartContractProposals,
      indexes,
      blockNumber,
      totalPages,
      currentPage
    ),
    el
  );
}

export function renderMyAcceptedSmartContractProposalsContent(
  acceptedProposals: AcceptedSmartContractProposal[],
  indexes: string[],
  blockNumber: number,
  totalPage: number,
  currentPage: number
) {
  const el = getById("my-accepted-contracts-container");
  render(
    MyAcceptedSmartContratctProposalsTable(
      acceptedProposals,
      indexes,
      blockNumber,
      totalPage,
      currentPage
    ),
    el
  );
}

export function renderMyRemovalProposals(
  removalProposals: RemovalProposal[],
  indexes: string[],
  blockNumber: number,
  totalPage: number,
  currentPage: number
) {
  const el = getById("my-removal-porposals-container");
  render(
    MyRemovalProposalTable(
      removalProposals,
      indexes,
      blockNumber,
      totalPage,
      currentPage
    ),
    el
  );
}

export function renderAccordionOpener() {
  const acc = document.getElementsByClassName("accordion");

  const listener = function () {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  };

  for (let i = 0; i < acc.length; i++) {
    const el = acc[i] as HTMLElement;
    el.onclick = listener;
  }
}

export function renderUploadProposal(step: PopupState) {
  setBannerDisplayBlock();
  const layout = getById("overlay-layout");
  layout.style.maxHeight = "100%";
  render(UploadProposalPopup(), layout);
  const step1: HTMLElement = getById("uploadProposalStep1");
  const step2: HTMLElement = getById("uploadProposalStep2");
  const step3: HTMLElement = getById("uploadProposalStep3");
  const step4: HTMLElement = getById("uploadProposalStep4");

  switch (step) {
    case PopupState.UploadProposal:
      step1.style.display = "block";
      step2.style.display = "none";
      step3.style.display = "none";
      step4.style.display = "none";
      break;
    case PopupState.UploadProposalStep2:
      step1.style.display = "none";
      step2.style.display = "block";
      step3.style.display = "none";
      step4.style.display = "none";
      break;
    case PopupState.UploadProposalStep3:
      step1.style.display = "none";
      step2.style.display = "none";
      step3.style.display = "block";
      step4.style.display = "none";
      break;
    case PopupState.UploadProposalStep4:
      step1.style.display = "none";
      step2.style.display = "none";
      step3.style.display = "none";
      step4.style.display = "block";
      break;
    default:
      break;
  }
}

export function renderProposalSummary(
  fee: string,
  id: string,
  terms: string,
  proposal: ProposalFormat
) {
  const layout = getById("overlay-layout");

  render(UploadProposalSummary(fee, id, proposal), layout);
  const termsContent = getById("termsContent");
  termsContent.innerHTML = terms;
}

export function setBlockedCountries(blockedCountries: BlockCountry[]) {
  const ofec = getById("ofec_checkbox") as HTMLInputElement;
  const eu = getById("eu-checkbox") as HTMLInputElement;
  const un = getById("un-checkbox") as HTMLInputElement;
  if (blockedCountries.includes(BlockCountry.OFEC)) {
    ofec.checked = true;
  } else {
    ofec.checked = false;
  }

  if (blockedCountries.includes(BlockCountry.EU)) {
    eu.checked = true;
  } else {
    eu.checked = false;
  }
  if (blockedCountries.includes(BlockCountry.UN)) {
    un.checked = true;
  } else {
    un.checked = false;
  }

  const countryCodeBoxes = document.getElementsByClassName(
    "countryCodeCheckboxes"
  );

  for (let i = 0; i < countryCodeBoxes.length; i++) {
    const countryCodeBoxEl = countryCodeBoxes[i] as HTMLInputElement;
    const countrycode = countryCodeBoxEl.dataset.countrycode as string;
    const castedCountries = blockedCountries as string[];
    if (castedCountries.includes(countrycode)) {
      countryCodeBoxEl.checked = true;
    }
  }
}

export function setCreatePageProps(pageProps: CreateRicardianPageProps) {
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

  const define = (val) => (val === undefined ? "" : val);

  blockkedAddressesEl.value = define(pageProps.blockedAddresses);
  expiresEl.value = define(pageProps.expires);
  redirecttoEl.value = define(pageProps.redirectto);
  smartcontractEl.value = define(pageProps.smartContract);
  erc20AddEl.checked = define(pageProps.erc20Add);
  erc20NameEl.value = define(pageProps.erc20Name);
  erc20SymbolEl.value = define(pageProps.erc20Symbol);
  erc20DecimalsEl.value = define(pageProps.erc20Decimals);
  erc20AddressEl.value = define(pageProps.erc20Address);
  trailEl.value = define(pageProps.trail);
  // Need to wait for the page to render because the blocked countries are pretty deep down the DOM tree
  setTimeout(() => setBlockedCountries(pageProps.blockedCountries), 1000);
}

export function proposalUpload(
  props: State,
  elements: {
    nameEl: HTMLInputElement;
    artifactEl: HTMLInputElement;
    gitEl: HTMLInputElement;
    frontEndEl: HTMLInputElement;
    networkEl: HTMLSelectElement;
    categoryEl: HTMLSelectElement;
    implementsSimpleTerms: HTMLInputElement;
    trailEl: HTMLInputElement;
    arweaveAddressEl: HTMLInputElement;
  }
) {
  const {
    nameEl,
    artifactEl,
    gitEl,
    frontEndEl,
    networkEl,
    categoryEl,
    implementsSimpleTerms,
    trailEl,
    arweaveAddressEl,
  } = elements;

  const proposalProps = props.uploadProposalProps;

  nameEl.value = proposalProps.name;
  artifactEl.value = proposalProps.artifact;
  gitEl.value = proposalProps.git;
  frontEndEl.value = proposalProps.frontEnd;
  networkEl.value = proposalProps.network;
  categoryEl.value = proposalProps.category;
  implementsSimpleTerms.checked = proposalProps.simpleterms;
  trailEl.value = proposalProps.trail;
  arweaveAddressEl.value = proposalProps.arweaveAddress;
}

export function render_createProposalPageContent(
  renderType: RenderType,
  lastProposalOpen: boolean
) {
  const proposeContract = getById("proposeNewContract");
  const proposeNewRank = getById("proposeNewRank");
  const proposalPending = getById("proposalPending");

  switch (renderType) {
    case RenderType.proposeNewRank:
      if (lastProposalOpen) {
        proposeNewRank.style.display = "none";
        proposeContract.style.display = "none";
        proposalPending.style.display = "block";
      } else {
        proposeNewRank.style.display = "block";
        proposeContract.style.display = "none";
        proposalPending.style.display = "none";
      }
      break;
    case RenderType.proposeNewContract:
      if (lastProposalOpen) {
        proposeNewRank.style.display = "none";
        proposeContract.style.display = "none";
        proposalPending.style.display = "block";
      } else {
        proposeNewRank.style.display = "none";
        proposeContract.style.display = "block";
        proposalPending.style.display = "none";
      }
      break;
    default:
      break;
  }
}

export function renderDAOTermsPopup() {
  const layout = getById("overlay-layout");
  layout.style.maxHeight = "100%";
  render(DaoTermsPopup(null), layout);
}

export function renderRankProposalTable(
  blockNumber: number,
  ranks: RankProposal[],
  indexes: string[],
  paging: PaginatedProposal
) {
  const el = getById("rank-proposal-table");
  render(
    RankProposalTable(
      ranks,
      indexes,
      blockNumber,
      paging.totalPages,
      paging.currentPage
    ),
    el
  );
}

export function renderSmartContractProposalTable(
  blockNumber: number,
  smartContracts: SmartContractProposal[],
  indexes: string[],
  paging: PaginatedProposal
) {
  const el = getById("smart-contract-proposal-table");
  render(
    SmartContractProposalsTable(blockNumber, smartContracts, indexes, paging),
    el
  );
}

export function renderRemovalProposalTable(
  blockNumber: number,
  removalProposals: RemovalProposal[],
  indexes: string[],
  paging: PaginatedProposal
) {
  const el = getById("removal-proposal-table");

  render(
    RemovalProposalsTable(blockNumber, removalProposals, indexes, paging),
    el
  );
}

export function renderLoadedValue(loadedValue: any, renderTo: HTMLElement) {
  renderTo.classList.remove("placeholder-item");
  render(loadedValueEl(loadedValue), renderTo);
}

export function enableStakingButtons(
  stakingButtonDisabled: boolean,
  approveButtonDisabled: boolean,
  ricBalance: string,
  isStaking: boolean
) {
  const stakingButtonEl = getById("stake-3000-ric") as HTMLButtonElement;
  const approveButtonEl = getById("approve-stake-spend") as HTMLButtonElement;
  const ricBalanceEl = getById("ricBalance");
  const rankProposalSubmit = getById(
    "create-rank-proposal"
  ) as HTMLButtonElement;
  ricBalanceEl.textContent = ricBalance;

  let stakingdisabled = !stakingButtonDisabled;
  if (parseInt(ricBalance) < 3000) {
    stakingdisabled = true;
  }
  let approveDisabled = approveButtonDisabled;

  if (isStaking) {
    approveDisabled = true;
  }

  if (stakingdisabled) {
    stakingButtonEl.title = "You need 3000 PolyRIC to stake!";
  }

  stakingButtonEl.disabled = stakingdisabled;
  approveButtonEl.disabled = approveDisabled;

  rankProposalSubmit.disabled = !isStaking;
}

export function tokenSaleInit(
  ricLeft: string,
  rate: string,
  tokensSold: string
) {
  const ricLeftEl = getById("ric-left-for-sale-buy-page");
  const rateEl = getById("ric-rate-buy-page");
  const buyAmount = getById("buy-amount") as HTMLInputElement;
  const buyButton = getById("buy-ric") as HTMLButtonElement;

  ricLeftEl.classList.remove("placeholder-item");
  rateEl.classList.remove("placeholder-item");

  ricLeftEl.textContent = ricLeft + " PolyRIC";

  rateEl.textContent = rate + " PolyRIC/ONE";

  if (tokensSold === "2000000") {
    ricLeftEl.textContent = "SALE FINISHED";
    rateEl.textContent = "SALE FINISHED";
    buyButton.disabled = true;
    buyAmount.disabled = true;
  }

  buyAmount.value = "0";
}

export function renderSellAmount(amount: number) {
  const sellEl = getById("sell-rate");
  const buyButton = getById("buy-ric") as HTMLButtonElement;
  if (amount > 100000) {
    buyButton.disabled = true;
  } else {
    buyButton.disabled = false;
  }
  sellEl.textContent = amount.toFixed(2);
}

export function renderMyRICBalance(balance: string) {
  const myBalanceEl = getById("ricBalance");
  myBalanceEl.classList.remove("placeholder-item");
  myBalanceEl.textContent = balance;
}
export function renderCurrentBlock(block: number) {
  const currentBlockEl = getById("current-block") as HTMLElement;
  currentBlockEl.classList.remove("placeholder-item");
  currentBlockEl.textContent = block.toString();

  renderBlocksleft(parseInt(currentBlockEl.textContent));
}

function renderBlocksleft(currentBlock: number) {
  // Find
  const allBlocksLeft = document.getElementsByClassName("all-blocks-left");

  for (let i = 0; i < allBlocksLeft.length; i++) {
    const el = allBlocksLeft[i] as HTMLElement;
    const current = currentBlock;
    const created = parseInt(el.dataset.created as string);
    const forperiod = parseInt(el.dataset.forperiod as string);
    const released = el.dataset.released === "true" ? true : false;
    const index = el.dataset.index;
    if (!released) {
      const blocksLeft = calculateBlocksLeft(current, created, forperiod);
      const releaseButton = getById(
        `vaultRelease_${index}`
      ) as HTMLButtonElement;
      if (blocksLeft < 0) {
        render(html`Blocks left: ${ToyBlocks()} OPEN`, el);

        releaseButton.disabled = false;
      } else {
        render(html`Blocks left: ${ToyBlocks()} ${blocksLeft}`, el);
        releaseButton.disabled = true;
      }
    } else {
      render(html``, el);
    }
  }
}

function calculateBlocksLeft(
  current: number,
  created: number,
  period: number
): number {
  return created + period - current;
}

export function renderVaultLockedTokens(
  lockedTokens: LockedTokens[],
  blocks: number,
  firstIndex: number,
  lastIndex: number,
  currentPage: number,
  totalPages: number
) {
  const vaultItemContainer = getById("vault-item-container");
  vaultItemContainer.classList.remove("placeholder-item");
  render(
    VaultItems(lockedTokens, firstIndex, lastIndex, currentPage, totalPages),
    vaultItemContainer
  );
  // I get the current block and I calculate how much time is left from the lock
  renderBlocksleft(blocks);
}

export function renderApprovedSpend(spend: string) {
  const spendEl = getById("spend");
  spendEl.classList.remove("placeholder-item");
  spendEl.textContent = spend;
}

export function renderPSArweaveAddress(address: string) {
  const addrEl = getById("currentPSTAddress");
  if (address === "") {
    addrEl.textContent = "NOT ADDED";
  } else {
    addrEl.textContent = address;
  }
}

export function renderVaultHistoryEmpty() {
  const vaultItemContainer = getById("vault-item-container");
  vaultItemContainer.classList.remove("placeholder-item");
  vaultItemContainer.classList.add("text-align-center");
  render(EmptyVault(), vaultItemContainer);
}

export function renderTrailsTabs() {
  const createTabButton = getById("create-trail-tab");
  const searchTabButton = getById("search-trail-tab");
  const searchContainer = getById("search-container");
  const createContainer = getById("create-container");

  searchContainer.classList.remove("display-none");

  createTabButton.classList.add("light-shadow");
  searchContainer.style.width = "";

  searchTabButton.classList.remove("light-shadow");
  searchContainer.classList.add("display-block");
  if (!createContainer.classList.contains("display-none")) {
    createContainer.classList.add("display-none");
  }
  render(FindTrail(), searchContainer);
}

export function renderTrailDetails(
  trailId: string,
  uploaderWalletAddress: string
) {
  const searchTabButton = getById("search-trail-tab");
  searchTabButton.classList.add("light-shadow");

  const searchContainer = getById("search-container");
  searchContainer.style.width = "100%";
  render(FoundTrail(trailId, uploaderWalletAddress), searchContainer);
  // const trailContentDisplay = getById("trail-content-display");

  // if (lastIndex === "0" && access === "private") {
  //   trailContentDisplay.classList.remove("placeholder-item");
  //   trailContentDisplay.classList.add("center");
  //   trailContentDisplay.textContent = "Trail is empty";
  // }
}

export function renderAddCommentPopup() {
  setBannerDisplayBlock();
  const layout = getById("overlay-layout");
  render(AddCommentTrail(), layout);
}

export function disableButtonElement(el: HTMLButtonElement, disabled: boolean) {
  el.disabled = disabled;
}

export function renderArweaveSummaryTx(fee: string, id: string) {
  const layout = getById("overlay-layout");

  render(UploadArweaveTxSummary(fee, id), layout);
}

export function renderTrailDataPage(
  dataPage: ArweaveDataPage,
  creatorCalls: boolean
) {
  const contentDisplay = getById("trail-content-display");

  if (contentDisplay.classList.contains("placeholder-item")) {
    contentDisplay.classList.remove("placeholder-item");
  } else {
    const trailListElements =
      document.getElementsByClassName("trailListElement");

    for (let i = 0; i < trailListElements.length; i++) {
      const el = trailListElements[i];
      el.classList.add("display-none");
    }
    contentDisplay.classList.add("placeholder-item");
    setTimeout(() => {
      contentDisplay.classList.remove("placeholder-item");

      for (let i = 0; i < trailListElements.length; i++) {
        const el = trailListElements[i];
        el.classList.remove("display-none");
      }
    }, 1000);
  }
  render(TrailData(dataPage, creatorCalls), contentDisplay);
}

export function navigateToQueryString(
  queryStrings: QueryStrings,
  value: string,
  secondValue: string
) {
  setTimeout(() => {
    switch (queryStrings) {
      case QueryStrings.trail:
        const trailIdEl = getById("trail-id") as HTMLInputElement;
        trailIdEl.classList.add("display-none");
        trailIdEl.value = value;

        const addressEl = getById("trail-creator-address") as HTMLInputElement;
        addressEl.value = secondValue;

        const find = getById("trail-find");
        find.click();
        break;
      case QueryStrings.verify:
        const verifyInput = getById(
          "acceptable-contract-url"
        ) as HTMLInputElement;
        const verifyButton = getById("verify-proceed");
        verifyInput.value = value;
        verifyButton.click();
      default:
        break;
    }
  }, 500);
}

export function renderContractDisplayPage(contractId: string) {
  const layout = getById("overlay-layout");
  render(contractDisplay(contractId), layout);
}
export function renderTeardownContractDisplay() {
  const loading = getById("contract-loading-slot");
  render(html`${loadingIndicator}`, loading);
  const display = getById("contract-display-slot");
  render(html``, display);
}

export function renderVoteOnSmartContract(
  accepted: boolean,
  contractIndex: string
) {
  const layout = getById("overlay-layout");
  render(VoteOnSmartContract(accepted, contractIndex), layout);
}

export function renderSCProposalDisplayPage(
  arweaveTxId: string,
  proposal: ProposalFormat,
  preview: boolean,
  acceptedProposal: AcceptedSmartContractProposal
) {
  const overlay = getById("overlay-layout");
  overlay.style.maxHeight = "100%";
  const loading = getById("contract-loading-slot");
  render(html``, loading);
  const slot = getById("contract-display-slot");
  if (acceptedProposal === null) {
    render(
      smartContractProductPage(arweaveTxId, proposal, preview, null),
      slot
    );
  } else {
    render(
      smartContractProductPage(
        arweaveTxId,
        proposal,
        preview,
        acceptedProposal[0]
      ),
      slot
    );
  }

  const termsContent = getById("termsContent");
  //If there are script tags injected by malicious user, FCK U
  termsContent.innerHTML = DOMPurify.sanitize(proposal.terms);
}
export function renderRemovalProposalPopup(
  props: State,
  acceptableIndex: string,
  malicious: boolean
) {
  const overlay = getById("overlay-layout");
  render(RemovalProposalPage(acceptableIndex, malicious), overlay);
}

export function renderStakerDetails(
  staker: Staker,
  stakingBlocks: string,
  blockNumber: number
) {
  const slot = getById("stakerDetails");
  slot.classList.remove("placeholder-item");

  render(StakerDetails(staker, stakingBlocks, blockNumber), slot);
}

export function renderCatalogContent(
  uploadsFoallContractsToDisplay: Array<AcceptedSmartContractProposal>,
  allIds: Array<string>,
  uploadsForCategory: any // Arweave graphql query result for the selected category
) {
  const contentEl = getById("catalog-content");
  contentEl.classList.remove("placeholder-item");
  contentEl.classList.add("rowAround");
  render(
    catalogContent(uploadsFoallContractsToDisplay, allIds, uploadsForCategory),
    contentEl
  );
}

export function renderCatalogContentLoadingIndicator() {
  const contentEl = getById("catalog-content");
  contentEl.classList.add("placeholder-item");
  contentEl.classList.remove("rowAround");
  render(html`<h3>Loading</h3>`, contentEl);
}

export function renderFeeTokenRow(tokens: Token[]) {
  const feeTokenRow = getById("tokenRow");
  render(tokenRow(tokens), feeTokenRow);
}

export function renderTokenProposalPopup() {
  const layout = getById("overlay-layout");
  render(proposeTokenPopup(), layout);
}

export function renderTokenProposals(
  proposals: TokenProposal[],
  blockNumber: number,
  myaddress: string
) {
  const slot = getById("tokenProposals");
  render(TokenProposals(proposals, blockNumber, myaddress), slot);
}

export function renderRewardTokenRowWithBalances(
  tokens: Array<{ name: string; address: string; balance: string }>
) {
  const el = getById("rewardTokenRow");
  el.classList.remove("placeholder-item");
  render(TokenRow(tokens), el);
}

export function renderWithdrawRewardToken(
  selected: "none" | "single" | "triple",
  details: Array<SelectedRewardDetails>
) {
  const slot = getById("rewardWithdrawSelected");
  render(getSelected(selected, details), slot);
}

export function renderTokenSelected(selected: string) {
  const selectedEl = getById(selected);
  if (selectedEl.classList.contains("rewardSelected")) {
    selectedEl.classList.remove("rewardSelected");
  } else {
    selectedEl.classList.add("rewardSelected");
  }
}

export function contractDeployedPopup() {
  const layout = getById("overlay-layout");
  render(deploymentDonePopup(), layout);
}

export function contractDeployedData(address: string, simpleterms: boolean) {
  const contractDetails = getById("contract-details");
  render(deploymentDone(address, simpleterms), contractDetails);
}

export function setCommentPopup(name: string, linkedTx: string) {
  const trailNameEl = getById("trail-name") as HTMLInputElement;
  const linkedTransactionEl = getById(
    "linkedTransaction-input"
  ) as HTMLInputElement;

  trailNameEl.value = name;
  linkedTransactionEl.value = linkedTx;
}

export function assignSmartContractAddress(address: string) {
  const inputEl = getById("smartcontract-input") as HTMLInputElement;
  inputEl.value = address;
}

export function triggerConfiguration() {
  const createPageOne = getById("create-page-one");
  const createPageTwo = getById("create-page-two");

  if (createPageOne.style.display === "none") {
    createPageTwo.style.display = "none";
    createPageOne.style.display = "block";
  } else if (createPageOne.style.display === "block") {
    createPageTwo.style.display = "block";
    createPageOne.style.display = "none";
  }
}