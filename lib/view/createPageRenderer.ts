import { areYouSureButtons } from "../business/actions/areYouSureButtons";
import { attachExpiryClickAndListener } from "../business/actions/attachExpiryClickAndListener";
import {
  bundlrDetailsActions,
  bundlrNetworkActions,
} from "../business/actions/bundlerNetworkActions";
import { walletSelectListener } from "../business/actions/catalogActions";
import { connectWalletButton } from "../business/actions/connectWalletButton";
import { renderCreateButtonClick } from "../business/actions/createButtonClick";
import {
  deployAgainButtonActions,
  redirectAction,
} from "../business/actions/deployAgainButton";
import { menuActions } from "../business/actions/menuActions";
import { missingContractDeployActions } from "../business/actions/missingContractDeployActions";
import {
  addChainButtonListener,
  networkSelectActions,
} from "../business/actions/networkSelectActions";
import {
  docxImportBackButton,
  onDocFileDropped,
} from "../business/actions/onDocFileDropped";
import {
  AddNewAccountActions,
  permawebSelectActions,
  showAccountActions,
  switchAccountsActions,
  transferPageActions,
  transferSummaryPageActions,
  uploadCommentActions,
  uploadFileListener,
  uploadSummaryActions,
  walletCreateActions,
} from "../business/actions/permawebSelectActions";
import { renderAcceptOnCLick } from "../business/actions/renderAcceptButton";
import { templateSelectActions } from "../business/actions/templateSelectActions";
import {
  fetchAllTrailDetails,
  searchButtonClicked,
  trailDetailsActions,
  trailsPageActions,
} from "../business/actions/trailsPageActions";
import { verifyContractActions } from "../business/actions/verifyContractActions";
import { wrongNetworkActions } from "../business/actions/WrongNetworkActions";
import {
  ContractTypes,
  CreatePageRenderer,
  Events,
  PopupState,
  RenderDispatchArgs,
  RenderType,
  State,
} from "../types";
import { WinstonToAr } from "../wallet/arweave";
import {
  assignSmartContractAddress,
  collapseSidebar,
  disableButton,
  disableButtonElement,
  disableCreateInputs,
  discardFile,
  emptyWalletDropper,
  enableButton,
  enableCreateInputs,
  handleDropdownClosing,
  hideElement,
  navigateToQueryString,
  openSidebarIfScreenIsBig,
  removeAcceptedButton,
  removeButtons,
  removeError,
  removeLoadingIndicator,
  removePopup,
  removeTransaction,
  renderAcceptButton,
  renderAcceptTools,
  renderAccordionOpener,
  renderAddCommentPopup,
  renderAddNewAccountPopup,
  renderArweaveSummaryTx,
  renderBundlrDetails,
  renderBundlrPopup,
  renderButtonSlotAlignment,
  renderConnectYourWallet,
  renderCreateButton,
  renderCreatePage,
  renderDocXDropper,
  renderError,
  renderLoadingIndicator,
  renderMenuPage,
  renderMissingContractDeployPopup,
  renderNetworkDropdown,
  renderPermawebDropdown,
  renderPSArweaveAddress,
  renderredirect,
  renderSanctionsDropdown,
  renderSelectedWallet,
  renderShowAccount,
  renderSidebar,
  renderSummary,
  renderSwitchAccounts,
  renderTemplatesDropdown,
  renderTooltips,
  renderTrailDataPage,
  renderTrailDetails,
  renderTrailsPage,
  renderTrailsTabs,
  renderTransaction,
  renderTransferPage,
  renderTransferSummaryPage,
  renderTxId,
  renderUploadFile,
  renderUploadStatus,
  renderUploadSummary,
  renderVerificationState,
  renderVerifyContractPopup,
  renderWalletPopup,
  render_wrongNetworkPopup,
  setCommentPopup,
  setCreatePageProps,
  triggerConfiguration,
  updatePromptError,
  updatePromptErrorDOCX,
  updatePromptSuccess,
  updatePromptSuccessDOCX,
} from "./render";
import { changeContainerSlotStyle, setBannerDisplayBlock } from "./utils";

function getCreateRenderer(): CreatePageRenderer {
  return {
    [RenderType.connectYourWallet]: (props: State) => {
      renderConnectYourWallet(props);
      connectWalletButton(props);
    },
    [RenderType.menu]: async (props: State) => {
      renderMenuPage(props);
      await menuActions(props);
      openSidebarIfScreenIsBig();
    },
    [RenderType.create]: (props: State) => {
      renderCreatePage();
      renderButtonSlotAlignment(true);

      // TODO: Check these, I will add web3 modal!
      renderSelectedWallet(props.selectedWallet);
      walletSelectListener();

      renderCreateButton(true);
      renderCreateButtonClick(props, RenderType.create);
      attachExpiryClickAndListener(props);
      renderTooltips();
      renderSanctionsDropdown();
      renderNetworkDropdown();
      networkSelectActions();
      renderPermawebDropdown(props.pageState, props.contracttype);
      permawebSelectActions(props);
      renderTemplatesDropdown();
      templateSelectActions(props);

      handleDropdownClosing();
      renderAccordionOpener();
    },
    [RenderType.sidebar]: (props: State) => {
      renderSidebar(props);
    },
    [RenderType.addLoadingIndicator]: (props: { to: string }) => {
      renderLoadingIndicator(props.to);
    },
    [RenderType.removeLoadingIndicator]: (props: { from: string }) => {
      removeLoadingIndicator(props.from);
    },
    [RenderType.transaction]: (props: any) => {
      renderTransaction(props, props.url);
    },
    [RenderType.renderError]: (props: { message: string }) => {
      renderError(props.message);
    },
    [RenderType.removeError]: () => {
      removeError();
    },
    [RenderType.enableButton]: (props: State) => {
      enableButton(props);
    },
    [RenderType.disableButton]: (props: State) => {
      disableButton(props);
    },
    [RenderType.dateClickListener]: (props: State) => {
      attachExpiryClickAndListener(props);
    },
    [RenderType.areYouSure]: (props: State) => {
      if (props.contracttype === ContractTypes.acceptable) {
        changeContainerSlotStyle(true);
      }
      renderSummary(props);
      areYouSureButtons(props);
      renderButtonSlotAlignment(false);
    },

    [RenderType.noButtonPressed]: (props: State) => {
      if (props.contracttype === ContractTypes.create) {
        renderCreateButton(true);
        renderCreateButtonClick(props, RenderType.noButtonPressed);
      } else if (props.contracttype === ContractTypes.acceptable) {
        changeContainerSlotStyle(false);
        renderAcceptButton(props);
        renderAcceptOnCLick(props);
      }
      enableButton(props);
      renderButtonSlotAlignment(true);
    },
    [RenderType.yesButtonPressed]: (props: State) => {
      removeButtons();
      renderButtonSlotAlignment(true);
    },
    [RenderType.promptSuccess]: (props: { file: File | string }) => {
      updatePromptSuccess(props.file as File);
    },
    [RenderType.promptError]: (props: { message: string }) => {
      updatePromptError(props.message);
    },
    [RenderType.promptSuccessDOCX]: (props: { file: File | string }) => {
      updatePromptSuccessDOCX(props.file as File);
    },
    [RenderType.promptErrorDOCX]: (props: { message: string }) => {
      updatePromptErrorDOCX(props.message);
    },
    [RenderType.disableCreateInputs]: (props: {}) => {
      disableCreateInputs();
    },
    [RenderType.enableCreateInputs]: (props: {}) => {
      enableCreateInputs();
      //If we deployed, this will remove the transaction when we want to deploy again
      removeTransaction();
    },
    [RenderType.deployAgain]: (props: State) => {
      deployAgainButtonActions(props);
    },
    [RenderType.DocxDropper]: (props: State) => {
      renderDocXDropper();
      onDocFileDropped(props);
      docxImportBackButton();
    },
    [RenderType.uploadFile]: (props: State) => {
      renderUploadFile();
      uploadFileListener(props);
    },
    [RenderType.uploadSummary]: (props: {
      file: File;
      transaction: any;
      data: any;
      props: State;
      tipTransaction: any;
      hasTip: boolean;
      contentType: string;
    }) => {
      let fee: string | number = parseFloat(props.transaction.reward);
      if (props.hasTip) {
        fee += parseFloat(props.tipTransaction.reward);
        fee += parseFloat(props.tipTransaction.quantity);
      }

      fee = WinstonToAr(fee.toString());

      renderUploadSummary(
        props.file,
        fee,
        props.transaction.id,
        props.contentType
      );
      uploadSummaryActions(
        props.transaction,
        props.props,
        PopupState.UploadFile,
        props.hasTip,
        props.tipTransaction
      );
    },
    [RenderType.uploadStatus]: (props: RenderDispatchArgs) => {
      renderUploadStatus(props.tmp.progress);
    },
    [RenderType.discardFile]: (props: State) => {
      discardFile();
    },
    [RenderType.walletPopup]: (props: State) => {
      renderWalletPopup();
      walletCreateActions(props);
    },
    [RenderType.emptyWalletDropper]: (props: State) => {
      emptyWalletDropper();
    },
    [RenderType.addNewAccountPopup]: (props: RenderDispatchArgs) => {
      renderAddNewAccountPopup(props.tmp.Account, props.tmp.name);
      AddNewAccountActions(props, props.tmp.Account, props.tmp.name);
    },
    [RenderType.showAccountPopup]: (props: RenderDispatchArgs) => {
      renderShowAccount(props.tmp.address, props.tmp.balance);
      showAccountActions(props);
    },
    [RenderType.switchAccounts]: (props: State) => {
      renderSwitchAccounts();
      switchAccountsActions(props);
    },
    [RenderType.transferPage]: (props: RenderDispatchArgs) => {
      renderTransferPage(props.Account.balance as string);
      transferPageActions(props);
    },
    [RenderType.transferSummaryPage]: (props: RenderDispatchArgs) => {
      renderTransferSummaryPage(props.tmp);
      transferSummaryPageActions(props);
    },
    [RenderType.hidePopup]: ({}) => {
      removePopup();
    },
    [RenderType.hideElement]: (props: { el: HTMLElement; hide: boolean }) => {
      hideElement(props.el, props.hide);
    },
    [RenderType.txId]: (props: { to: string; txId: string }) => {
      renderTxId(props.to, props.txId);
    },
    [RenderType.verifyContract]: (props: State) => {
      renderVerifyContractPopup();
      verifyContractActions(props);
    },
    [RenderType.verificationState]: (props: RenderDispatchArgs) => {
      renderVerificationState(props.tmp.verificationState);
    },
    [RenderType.permawebSelectActions]: (props: RenderDispatchArgs) => {
      renderPermawebDropdown(props.pageState, props.contracttype);
      permawebSelectActions(props);
      handleDropdownClosing();
    },
    [RenderType.initializeCreateRicardian]: (props: RenderDispatchArgs) => {
      if (props.tmp.pageProps !== null) {
        setCreatePageProps(props.tmp.pageProps);
      }
    },
    [RenderType.dismissSidebar]: (props: RenderDispatchArgs) => {
      collapseSidebar();
    },
    [RenderType.renderWrongNetworkPopup]: (props: RenderDispatchArgs) => {
      render_wrongNetworkPopup();
      wrongNetworkActions(props);
    },
    [RenderType.PSArweaveAddress]: (props: RenderDispatchArgs) => {
      renderPSArweaveAddress(props.tmp.address);
    },
    [RenderType.trailsTabs]: async (props: RenderDispatchArgs) => {
      renderTrailsTabs();
      searchButtonClicked(props);
    },
    [RenderType.trailsDetails]: async (props: RenderDispatchArgs) => {
      renderTrailDetails(props.tmp.trailId, props.tmp.uploaderWalletAddress);

      await fetchAllTrailDetails(
        props,
        props.tmp.trailId,
        props.tmp.uploaderWalletAddress
      );
    },
    [RenderType.addCommentPopup]: (props: RenderDispatchArgs) => {
      renderAddCommentPopup();
      uploadCommentActions(props);
    },
    [RenderType.disableButtonElement]: (props: RenderDispatchArgs) => {
      disableButtonElement(props.tmp.el, props.tmp.disabled);
    },
    [RenderType.arweaveTxSummary]: (props: RenderDispatchArgs) => {
      let fee: string | number = parseFloat(props.tmp.transaction.reward);
      if (props.tmp.hasTip) {
        fee += parseFloat(props.tmp.tipTransaction.reward);
        fee += parseFloat(props.tmp.tipTransaction.quantity);
      }
      fee = WinstonToAr(fee.toString());
      renderArweaveSummaryTx(fee, props.tmp.transaction.id);

      uploadSummaryActions(
        props.tmp.transaction,
        props,
        props.tmp.redirectTo,
        props.tmp.hasTip,
        props.tmp.tipTransaction
      );
    },
    [RenderType.trailDataPage]: (props: RenderDispatchArgs) => {
      renderTrailDataPage(props.tmp.dataPage, props.tmp.creatorCalls);
      trailDetailsActions(props, props.tmp.trailId, props.tmp.dataPage);
    },
    [RenderType.navigateToQueryString]: (props: RenderDispatchArgs) => {
      navigateToQueryString(
        props.tmp.queryStrings,
        props.tmp.value,
        props.tmp.secondValue
      );
    },
    [RenderType.emptyPopup]: (props: RenderDispatchArgs) => {
      setBannerDisplayBlock();
    },
    [RenderType.assignSmartContractAddress]: (props: RenderDispatchArgs) => {
      assignSmartContractAddress(props.tmp.address);
    },
    [RenderType.triggerConfiguration]: (props: RenderDispatchArgs) => {
      triggerConfiguration();
    },
    [RenderType.setCommentPopup]: (props: RenderDispatchArgs) => {
      setCommentPopup(props.tmp.trailName, props.tmp.linkedTransaction);
    },
    [RenderType.acceptButton]: (props: State) => {
      renderAcceptTools(props);
      renderAcceptButton(props);
      renderAcceptOnCLick(props);
      enableButton(props);
      addChainButtonListener(props);
    },
    [RenderType.removeAcceptedButton]: (props: State) => {
      removeAcceptedButton();
    },
    [RenderType.trailsPage]: async (props: RenderDispatchArgs) => {
      renderTrailsPage(props);
      await trailsPageActions(props);
    },
    [RenderType.redirect]: (props: { url: string }) => {
      renderredirect();
      redirectAction(props.url);
    },
    [RenderType.bundlrNetworkPopup]: async (props: RenderDispatchArgs) => {
      renderBundlrPopup();
      await bundlrNetworkActions(props);
    },
    [RenderType.bundlrNetworkDetails]: async (props: RenderDispatchArgs) => {
      renderBundlrDetails(props.tmp.values.loadedBalance);
      bundlrDetailsActions(props, props.tmp.values.bundlr);
    },
    [RenderType.createMissingContractDeployPopup]: async (
      props: RenderDispatchArgs
    ) => {
      renderMissingContractDeployPopup();
      missingContractDeployActions();
    },
  };
}

document.body.addEventListener(Events.render, async (e: any) => {
  const type: RenderType = e.detail.type;
  const props: State = e.detail.props;
  const renderer = getCreateRenderer();
  await renderer[type](props);
});
