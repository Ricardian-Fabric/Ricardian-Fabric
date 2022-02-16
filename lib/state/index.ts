import {
  Events,
  EventType,
  Account,
  PopupState,
  SelectedWallet,
  StashedDetails,
  State,
  PageState,
  CreateRicardianPageProps,
  ProposalFormat,
  IPFSParams,
} from "../types";
import { getCurrentUrl, getPage } from "../view/utils";
import {
  getBlockCountriesFromDataProp,
  getBlockedAddressesFromDataProp,
  getCreatedDateFromDataProp,
  getCreatorAppLinkFromDataProp,
  getCurrentPageDataProp,
  getExpiresFromDataProp,
  getIPFSConfig,
  getIsERC20FromDataProp,
  getIssuerDataProp,
  getIssuerSignatureFromDataProp,
  getNetworkFromDataProp,
  getRedirectToDataProp,
  getSelectedWalletFromDataProp,
  getSmartContractFromDataProp,
  getSourceFromDataProp,
  getVersionFromDataProp,
} from "./dataPropGetters";
import createNewEditor from "./editor";
import { beforePageSetHook, setStateHook } from "./setStateHook";

(function InitState() {
  function createState() {
    const pageEl = getPage();
    const state: State = {
      init: false,
      ipfs: getIPFSConfig(pageEl),
      Account: { data: null, address: null, balance: null },
      popupState: PopupState.NONE,
      previousPopupState: PopupState.NONE,
      pageState: PageState.CreateRicardian,
      uploadProposalProps: null,
      createRicardianPageProps: {
        blockedCountries: [],
        blockedAddresses: "",
        expires: "",
        redirectto: "",
        smartContract: "",
        erc20Add: false,
        erc20Name: "",
        erc20Symbol: "",
        erc20Decimals: "",
        erc20Address: "",
        trail: "",
      },
      editor: createNewEditor(),
      domParser: new DOMParser(),
      selectedDate: "",
      stashedPage: "",
      stashedDetails: undefined,
      selectedWallet: getSelectedWalletFromDataProp(pageEl),
      contracttype: getCurrentPageDataProp(pageEl),
      redirectto: getRedirectToDataProp(pageEl),
      expires: getExpiresFromDataProp(pageEl),
      createdDate: getCreatedDateFromDataProp(pageEl),
      version: getVersionFromDataProp(pageEl),
      bundleSrcUrl: getSourceFromDataProp(pageEl),
      currentUrl: getCurrentUrl(),
      blockedCountries: getBlockCountriesFromDataProp(pageEl),
      blockedAddresses: getBlockedAddressesFromDataProp(pageEl),
      network: getNetworkFromDataProp(pageEl),
      issuer: getIssuerDataProp(pageEl),
      issuerSignature: getIssuerSignatureFromDataProp(pageEl),
      participant: "",
      participantSignature: "",
      smartcontract: getSmartContractFromDataProp(pageEl),
      position: undefined,
      isERC20: getIsERC20FromDataProp(pageEl),
      ipfsCID: "",
      editFinished: false,
      blockPollTimer: undefined,
      creatorAppLink: getCreatorAppLinkFromDataProp(pageEl),
    };

    const stateHandler = {
      set: function (obj: State, prop: string, value: any) {
        obj[prop] = value;
        setStateHook[prop]({ obj, prop, value });
        console.log(obj);
        return true;
      },
    };
    return new Proxy(state, stateHandler);
  }

  const stateContainer = createState();

  const stateSetter = {
    [EventType.init]: (value: {}) => {
      stateContainer.init = true;
    },
    [EventType.setIPFS]: (value: IPFSParams) => {
      stateContainer.ipfs = value;
    },
    [EventType.setEditor]: (value: any) => {
      stateContainer.editor = value;
    },
    [EventType.setSelectedDate]: (value: { date: Date | string }) => {
      stateContainer.selectedDate = value.date;
    },
    [EventType.stashPage]: (value: { page: string }) => {
      stateContainer.stashedPage = value.page;
    },
    [EventType.stashDetails]: (value: StashedDetails) => {
      stateContainer.stashedDetails = value;
    },
    [EventType.setPosition]: (value: { position: GeolocationPosition }) => {
      stateContainer.position = value.position;
    },
    [EventType.setSelectedWallet]: (value: SelectedWallet) => {
      stateContainer.selectedWallet = value;
    },
    [EventType.setNewAccount]: (value: Account) => {
      stateContainer.Account = value;
    },
    [EventType.setPopupState]: (value: PopupState) => {
      if (
        stateContainer.popupState === PopupState.Permapin &&
        value === PopupState.ShowAccount
      ) {
        stateContainer.previousPopupState = PopupState.Permapin;
      } else if (
        stateContainer.popupState === PopupState.Permapin &&
        value === PopupState.NONE
      ) {
        stateContainer.previousPopupState = value;
      }

      stateContainer.popupState = value;
    },
    [EventType.setIpfsCID]: (value: string) => {
      stateContainer.ipfsCID = value;
    },
    [EventType.setEditFinished]: (value: boolean) => {
      stateContainer.editFinished = value;
    },
    [EventType.setPageState]: (value: PageState) => {
      beforePageSetHook(stateContainer.pageState);

      stateContainer.pageState = value;
    },
    [EventType.setCreateRicardianPageProps]: (
      value: CreateRicardianPageProps
    ) => {
      stateContainer.createRicardianPageProps = value;
    },
    [EventType.saveToStateUploadProposalProps]: (value: ProposalFormat) => {
      stateContainer.uploadProposalProps = value;
    },
    [EventType.blockPollingInterval]: (value: NodeJS.Timer) => {
      stateContainer.blockPollTimer = value;
    },
  };

  document.body.addEventListener(Events.stateChange, function (event: any) {
    const type: EventType = event.detail.type;
    const value = event.detail.value;
    stateSetter[type](value);
  });
})();
