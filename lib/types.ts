export enum Chains {
  Ropsten = "3",
  bscTestnet = "97",
  polygonTestnet = "80001",
  harmonyTestnetShard0 = "1666700000",
}

export enum Events {
  render = "render",
  stateChange = "stateChange",
}

//TODO: start using the success message too!!
export enum RenderType {
  successMessage = "successMessage",
  errorMessage = "errorMessage",
  createPage = "createPage",
  createButton = "createButton",
  acceptButton = "acceptButton",
  balance = "balance",
  addLoadingIndicator = "addLoadingIndicator",
  removeLoadingIndicator = "removeLoadingIndicator",
  transaction = "renderTransaction",
  renderError = "renderError",
  removeError = "removeError",
  enableButton = "enableButton",
  disableButton = "disableButton",
  version = "version",
  redirect = "redirect",
  dateClickListener = "dateClickListener",
  renderTerms = "renderTerms",
  areYouSure = "areYouSure",
  noButtonPressed = "noButtonPressed",
  yesButtonPressed = "yesButtonPressed",
  removeAcceptedButton = "removeAcceptedButton",
  promptSuccess = "promptSuccess",
  promptError = "promptError",
  promptSuccessDOCX = "promptSuccessDOCX",
  promptErrorDOCX = "promptErrorDOCX",
  renderAddress = "renderAddress",
  disableCreateInputs = "disableCreateInputs",
  enableCreateInputs = "enableCreateInputs",
  disableAcceptableInputs = "disableAcceptableInputs",
  enableAcceptableInputs = "enableAcceptableInputs",
  deployAgain = "deployAgain",
  deploySCIntent = "deploySCIntent",
  SCDeploySelected = "SCDeploySelected",
  DisableSCInputs = "DisableSCInputs",
  EnableSCInputs = "EnableSCInputs",
  SetDeployedSCAddress = "SetDeployedSCAddress",
  DocxDropper = "DocxDropper",
  uploadFile = "uploadFile",
  uploadSummary = "uploadSummary",
  permapinPopup = "permapinPopup",
  hidePopup = "hidePopup",
  hideElement = "hideElement",
}

// TODO refactor to dispatchArgs for specifying the dispatch arguments
// TODO: The render function should take these args
export type dispatchArgs = State & { tmp: any };

type RenderFunction = (props: any) => void;

export type Renderer = {
  [RenderType.successMessage]: RenderFunction;
  [RenderType.errorMessage]: RenderFunction;
  [RenderType.createPage]: RenderFunction;
  [RenderType.createButton]: RenderFunction;
  [RenderType.acceptButton]: RenderFunction;
  [RenderType.addLoadingIndicator]: RenderFunction;
  [RenderType.removeLoadingIndicator]: RenderFunction;
  [RenderType.transaction]: RenderFunction;
  [RenderType.renderError]: RenderFunction;
  [RenderType.removeError]: RenderFunction;
  [RenderType.enableButton]: RenderFunction;
  [RenderType.disableButton]: RenderFunction;
  [RenderType.version]: RenderFunction;
  [RenderType.redirect]: RenderFunction;
  [RenderType.dateClickListener]: RenderFunction;
  [RenderType.renderTerms]: RenderFunction;
  [RenderType.areYouSure]: RenderFunction;
  [RenderType.noButtonPressed]: RenderFunction;
  [RenderType.yesButtonPressed]: RenderFunction;
  [RenderType.removeAcceptedButton]: RenderFunction;
  [RenderType.promptSuccess]: RenderFunction;
  [RenderType.promptError]: RenderFunction;
  [RenderType.promptSuccessDOCX]: RenderFunction;
  [RenderType.promptErrorDOCX]: RenderFunction;
  [RenderType.disableCreateInputs]: RenderFunction;
  [RenderType.enableCreateInputs]: RenderFunction;
  [RenderType.disableAcceptableInputs]: RenderFunction;
  [RenderType.enableAcceptableInputs]: RenderFunction;
  [RenderType.deployAgain]: RenderFunction;
  [RenderType.deploySCIntent]: RenderFunction;
  [RenderType.SCDeploySelected]: RenderFunction;
  [RenderType.DisableSCInputs]: RenderFunction;
  [RenderType.EnableSCInputs]: RenderFunction;
  [RenderType.SetDeployedSCAddress]: RenderFunction;
  [RenderType.DocxDropper]: RenderFunction;
  [RenderType.uploadFile]: RenderFunction;
  [RenderType.uploadSummary]: RenderFunction;
  [RenderType.permapinPopup]: RenderFunction;
  [RenderType.hidePopup]: RenderFunction;
  [RenderType.hideElement]: RenderFunction;
};

export enum EventType {
  init = "init",
  setIPFS = "setIPFS",
  setEditor = "setEditor",
  setBalance = "setBalance",
  setWalletAddress = "setWalletAddress",
  setSelectedDate = "setSelectedDate",
  stashPage = "stashPage",
  stashDetails = "stashDetails",
  setPosition = "setPosition",
  setERC20 = "setERC20",
  setSelectedWallet = "setSelectedWallet",
}

export enum StateProperties {
  init = "init",
  ipfs = "ipfs",
  editor = "editor",
  balance = "balance",
  address = "address",
  selectedDate = "selectedDate",
  stashedPage = "stashedPage",
  stashedDetails = "stashedDetails",
  position = "position",
  isERC20 = "isERC20",
  selectedWallet = "selectedWallet",
}

export enum ContractTypes {
  create = "create",
  acceptable = "acceptable",
  fulfilled = "fulfilled",
}

export enum BlockCountry {
  OFEC = "OFEC",
  EU = "EU",
  UN = "UN",
  BLOCKUSA = "BLOCKUSA",
  BLOCKNY = "BLOCKNY",
}

export enum DeploySC {
  HRC20 = "HRC20",
  PST = "PST",
}

export enum SelectedWallet {
  metamask = "metamask",
  arconnect = "arconnect",
}

export type StashedDetails = {
  hash: string;
  signerAddress: string;
  signature: string;
  network: string;
  smartContract: string;
};

export type IPFSParams = {
  host: string;
  port: number;
  protocol: string;
};

export type ERC20Params = {
  name: string;
  symbol: string;
  address: string;
  decimals: number;
  image: string;
};

export type NetworkType = "Mainnet" | "Testnet";

export type State = {
  init: boolean;
  ipfs: IPFSParams;
  ipfsArweaveBridge: string;
  editor: any;
  domParser: DOMParser;
  selectedDate: Date | string;
  stashedPage: string;
  stashedDetails: StashedDetails;
  selectedWallet: SelectedWallet;
  contracttype: ContractTypes;
  redirectto: string;
  bundleSrcUrl: string;
  createdDate: string;
  expires: string;
  currentUrl: string;
  version: string;
  blockedCountries: BlockCountry[];
  network: string;
  hash: string;
  issuer: string;
  issuerSignature: string;
  participant: string;
  participantSignature: string;
  smartcontract: string;
  position: GeolocationPosition;
  isERC20: ERC20Params;
};

export type SetHookArgs = {
  obj: State;
  prop: StateProperties;
  value: any;
};

type Dependency = {
  src: string;
};

export type AcceptablePageProps = {
  version: string;
  createdDate: string;
  issuer: string;
  expires: string;
  redirectto: string;
  mainDep?: Dependency;
  domParser: DOMParser;
  legalContract: string;
  blockedCountries: BlockCountry[];
  network: string;
  hash: string;
  issuerSignature: string;
  smartContract: string;
  ERC20: string;
  selectedWallet: SelectedWallet;
};

export type FulfilledPageProps = {
  version: string;
  issuer: string;
  createdDate: string;
  expires: string;
  redirectto: string;
  domParser: DOMParser;
  legalContract: string;
  participant: string;
  parentUrl: string;
  network: string;
  hash: string;
  issuerSignature: string;
  participantSignature: string;
  smartContract: string;
  ERC20: string;
  selectedWallet: SelectedWallet;
};

export enum Status {
  Success,
  Failure,
  AlreadyExists,
}
// export type PinOptions = {
//   status: Status;
//   error: any;
//   result: Response;
// };

export type IssuerHashedData = {
  legalContract: string;
  createdDate: string;
  expires: string;
  redirectto: string;
  version: string;
  issuer: string;
  blockedCountries: BlockCountry[];
  network: string;
  smartContract: string;
};

export type Options = {
  status: Status;
  error: any;
  data: any;
};

export type Tags = {
  network: string;
  issuer: string;
  contractType: string;
  participant: string;
  version: string;
};

export type VerifyOptions = {
  status: Status;
  tags: Tags;
  error: string;
};

export type HashWithIds = { hash: string; message: string; status: Status };

declare global {
  interface Window {
    ethereum: any;
    arweaveWallet: any;
  }
}

window.ethereum = window.ethereum || {};
