import { saveCreatePageData } from "../business/actions/createButtonClick";
import {
  dispatch_addCommentPopup,
  dispatch_attachDateClickListener,
  dispatch_catalogPage,
  dispatch_collectRewardPage,
  dispatch_ConnectYourWalletPage,
  dispatch_contractDeployedPopup,
  dispatch_dismissSidebar,
  dispatch_emptyPopup,
  dispatch_feeProposals,
  dispatch_hidePopup,
  dispatch_ipfsConfig,
  dispatch_manageProposals,
  dispatch_permapinPopup,
  dispatch_permawebselectActions,
  dispatch_renderAcceptButton,
  dispatch_renderAddress,
  dispatch_renderAreYouSure,
  dispatch_renderBalance,
  dispatch_renderCreate,
  dispatch_renderCreateProposalPage,
  dispatch_renderDashboard,
  dispatch_renderDocXDropper,
  dispatch_renderMenu,
  dispatch_renderReviewAndVotePage,
  dispatch_renderTransferPage,
  dispatch_renderUploadFilePopup,
  dispatch_renderVerifyContract,
  dispatch_renderWrongNetworkPopup,
  dispatch_showAccountPopup,
  dispatch_sideBar,
  dispatch_switch_Accounts,
  dispatch_tokenSale,
  dispatch_trailsPage,
  dispatch_uploadProposal,
  dispatch_vaultPage,
  dispatch_walletPopup,
} from "../dispatch/render";
import {
  ContractTypes,
  PageState,
  PopupState,
  SetHookArgs,
  State,
  StateProperties,
} from "../types";
import ScreenSizeDetector from "screen-size-detector";

export const setStateHook = {
  [StateProperties.init]: (args: SetHookArgs) => {
    const currentPage = args.obj.contracttype;
    const clone = cloneState(args.obj);
    if (currentPage === ContractTypes.create) {
      dispatch_ConnectYourWalletPage(clone);
    } else if (currentPage === ContractTypes.acceptable) {
      dispatch_renderAcceptButton(clone);
    }
  },
  [StateProperties.ipfs]: (args: SetHookArgs) => {},
  [StateProperties.createRicardianPageProps]: (args: SetHookArgs) => {},
  [StateProperties.editor]: (args: SetHookArgs) => {},
  [StateProperties.balance]: (args: SetHookArgs) => {
    dispatch_renderBalance(cloneState(args.obj));
  },
  [StateProperties.address]: (args: SetHookArgs) => {
    dispatch_renderAddress(cloneState(args.obj));
  },
  [StateProperties.selectedDate]: (args: SetHookArgs) => {
    dispatch_attachDateClickListener(cloneState(args.obj));
  },
  [StateProperties.stashedPage]: (args: SetHookArgs) => {
    //Show popup
    dispatch_renderAreYouSure(cloneState(args.obj));
  },
  [StateProperties.stashedDetails]: (args: SetHookArgs) => {
    // I'm dispatching stashDetails before stashedPage so the details are passed in the above .stashedPage hook.
  },
  [StateProperties.position]: (args: SetHookArgs) => {
    // This happens only on acceptable pages
    dispatch_renderAcceptButton(cloneState(args.obj));
  },
  [StateProperties.selectedWallet]: (args: SetHookArgs) => {
    //TODO: REMOVE!!

    if (args.obj.contracttype === ContractTypes.create) {
      const clone = cloneState(args.obj);
      //TODO: This is not used  right now,
      // there could be a bug if used because createPage has the editor locally and this will reinitialize it/
      // dispatch_renderCreateButton(clone);
    }
  },
  [StateProperties.Account]: (args: SetHookArgs) => {
    const clone: State = cloneState(args.obj);
    dispatch_permawebselectActions(clone);
  },
  [StateProperties.ipfsCID]: (args: SetHookArgs) => {},
  [StateProperties.popupState]: (args: SetHookArgs) => {
    const clone = cloneState(args.obj);
    switch (args.value) {
      case PopupState.NONE:
        dispatch_hidePopup();
        break;
      case PopupState.ImportTemplate:
        dispatch_renderDocXDropper(clone);
        break;
      case PopupState.ShowAccount:
        dispatch_showAccountPopup(
          clone,
          clone.Account.balance,
          clone.Account.address
        );
        break;
      case PopupState.NewAccount:
        dispatch_walletPopup(clone);
        break;
      case PopupState.SwitchAccount:
        dispatch_switch_Accounts(clone);
        break;
      case PopupState.TransferAr:
        dispatch_renderTransferPage({
          ...clone,
        });
        break;
      case PopupState.UploadFile:
        dispatch_renderUploadFilePopup(clone);
        break;
      case PopupState.Permapin:
        dispatch_permapinPopup(clone, clone.ipfsCID);
        break;
      case PopupState.UploadProposal:
        dispatch_uploadProposal(clone, PopupState.UploadProposal);
        break;
      case PopupState.UploadProposalStep2:
        dispatch_uploadProposal(clone, PopupState.UploadProposalStep2);
        break;
      case PopupState.UploadProposalStep3:
        dispatch_uploadProposal(clone, PopupState.UploadProposalStep3);
        break;
      case PopupState.UploadProposalStep4:
        dispatch_uploadProposal(clone, PopupState.UploadProposalStep4);
        break;
      case PopupState.WrongNetwork:
        dispatch_renderWrongNetworkPopup(clone);
        break;
      case PopupState.AddComment:
        dispatch_addCommentPopup(clone);
        break;
      case PopupState.emptyPopup:
        dispatch_emptyPopup(clone);
        break;
      case PopupState.contractDeployed:
        dispatch_contractDeployedPopup(clone);
        break;
      default:
        break;
    }
  },
  [StateProperties.previousPopupState]: (args: SetHookArgs) => {},
  [StateProperties.pageState]: (args: SetHookArgs) => {
    const detectScreen = new ScreenSizeDetector();
    if (detectScreen.width < 1000) {
      dispatch_dismissSidebar();
    }

    if (
      args.value !== PageState.vault &&
      args.obj.blockPollTimer !== undefined
    ) {
      clearInterval(args.obj.blockPollTimer);
    }

    // Based on the selected page, change the shadow of the  menu button
    // dispatch_

    const clone = cloneState(args.obj);
    switch (args.value) {
      case PageState.Dashboard:
        dispatch_renderDashboard(clone);
        break;
      case PageState.Menu:
        dispatch_sideBar(clone);
        dispatch_renderMenu(clone);
        break;
      case PageState.CreateRicardian:
        dispatch_renderCreate(clone);
        break;
      case PageState.Catalog:
        dispatch_catalogPage(clone);
        dispatch_permawebselectActions(clone);
        break;
      case PageState.VerifyContract:
        dispatch_renderVerifyContract(clone);
        break;
      case PageState.Proposals:
        dispatch_renderCreateProposalPage(clone);
        dispatch_permawebselectActions(clone);
        break;
      case PageState.ReviewAndVote:
        dispatch_renderReviewAndVotePage(clone);
        break;
      case PageState.Staking:
        break;
      case PageState.ManageProposals:
        dispatch_manageProposals(clone);
        break;
      case PageState.feeProposals:
        dispatch_feeProposals(clone);
        break;
      case PageState.tokenSale:
        dispatch_tokenSale(clone);
        break;
      case PageState.vault:
        dispatch_vaultPage(clone);
        break;
      case PageState.trails:
        dispatch_trailsPage(clone);
        dispatch_permawebselectActions(clone);
        break;
      case PageState.rewards:
        dispatch_collectRewardPage(clone);
        break;
      case PageState.ipfsConfig:
        dispatch_ipfsConfig(clone);
        break;
      default:
        break;
    }
  },
  [StateProperties.proposalType]: (args: SetHookArgs) => {
    const clone = cloneState(args.obj);
    dispatch_renderCreateProposalPage(clone);
    dispatch_permawebselectActions(clone);
  },
  [StateProperties.uploadProposalProps]: (args: SetHookArgs) => {},
  [StateProperties.blockPollTimer]: (args: SetHookArgs) => {},
};

function cloneState(state: State) {
  return Object.assign({}, state);
}

export function beforePageSetHook(prevPageState: PageState) {
  if (prevPageState === PageState.CreateRicardian) {
    saveCreatePageData();
  }
}
