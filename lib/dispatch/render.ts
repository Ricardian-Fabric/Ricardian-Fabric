import {
  ArweaveDataPage,
  CreateRicardianPageProps,
  DeploySC,
  FetchedProposals,
  LockedTokens,
  PaginatedProposal,
  PaginatedProposals,
  PopupState,
  ProposalFormat,
  QueryStrings,
  RankProposal,
  RenderType,
  State,
  TrailDetails,
  VerificationState,
} from "../types";
import { dispatch } from "./dispatch";
import { Events } from "../types";
import { Contract } from "web3-eth-contract";

export function dispatch_splashPage(props: State) {
  dispatch(Events.render, {
    type: RenderType.splashPage,
    props,
  });
}

export function dispatch_ConnectYourWalletPage(props: State) {
  dispatch(Events.render, {
    type: RenderType.connectYourWallet,
    props,
  });
}

export function dispatch_renderDashboard(props: State) {
  dispatch(Events.render, {
    type: RenderType.renderDashboard,
    props,
  });
}

export function dispatch_renderMenu(props: State) {
  dispatch(Events.render, {
    type: RenderType.menu,
    props,
  });
}

export function dispatch_renderCreate(props: State) {
  dispatch(Events.render, {
    type: RenderType.create,
    props,
  });
}

export function dispatch_sideBar(props: State) {
  dispatch(Events.render, {
    type: RenderType.sidebar,
    props,
  });
}

export function dispatch_renderAcceptButton(props: State) {
  dispatch(Events.render, { type: RenderType.acceptButton, props });
}

export function dispatch_renderBalance(props: State) {
  dispatch(Events.render, { type: RenderType.balance, props });
}

export function dispatch_renderLoadingIndicator(to: string) {
  dispatch(Events.render, {
    type: RenderType.addLoadingIndicator,
    props: { to },
  });
}

export function dispatch_removeLoadingIndicator(from: string) {
  dispatch(Events.render, {
    type: RenderType.removeLoadingIndicator,
    props: { from },
  });
}

export function dispatch_renderTransaction(
  props: State,
  url: string,
  ipfsHash: string
) {
  dispatch(Events.render, {
    type: RenderType.transaction,
    props: { ...props, url, ipfsHash },
  });
}

export function dispatch_removeError() {
  dispatch(Events.render, {
    type: RenderType.removeError,
  });
}

export function dispatch_enableButton(props: State) {
  dispatch(Events.render, {
    type: RenderType.enableButton,
    props,
  });
}

export function dispatch_disableButton(props: State) {
  dispatch(Events.render, {
    type: RenderType.disableButton,
    props,
  });
}

export function dispatch_disableButtonElement(
  el: HTMLButtonElement,
  disabled: boolean
) {
  dispatch(Events.render, {
    type: RenderType.disableButtonElement,
    props: { tmp: { el, disabled } },
  });
}

export function dispatch_renderError(message: string) {
  dispatch(Events.render, {
    type: RenderType.renderError,
    props: { message },
  });
}

export function dispatch_redirect(url: string) {
  dispatch(Events.render, {
    type: RenderType.redirect,
    props: { url },
  });
}

export function dispatch_attachDateClickListener(props: State) {
  dispatch(Events.render, {
    type: RenderType.dateClickListener,
    props,
  });
}

export function dispatch_renderAreYouSure(props: State) {
  dispatch(Events.render, {
    type: RenderType.areYouSure,
    props,
  });
}

export function dispatch_noButtonPressed(props: any) {
  dispatch(Events.render, {
    type: RenderType.noButtonPressed,
    props,
  });
}

export function dispatch_yesButtonPressed(props: any) {
  dispatch(Events.render, {
    type: RenderType.yesButtonPressed,
    props,
  });
}

export function dispatch_removeAcceptedButton(props: State) {
  dispatch(Events.render, {
    type: RenderType.removeAcceptedButton,
    props,
  });
}
export function dispatch_promptSuccess(file: File | string) {
  dispatch(Events.render, {
    type: RenderType.promptSuccess,
    props: { file },
  });
}
export function dispatch_promptError(message: string) {
  dispatch(Events.render, {
    type: RenderType.promptError,
    props: { message },
  });
}

export function dispatch_promptSuccessDOCX(file: File | string) {
  dispatch(Events.render, {
    type: RenderType.promptSuccessDOCX,
    props: { file },
  });
}

export function dispatch_promptErrorDOCX(message: string) {
  dispatch(Events.render, {
    type: RenderType.promptErrorDOCX,
    props: { message },
  });
}

export function dispatch_renderAddress(props: State) {
  dispatch(Events.render, {
    type: RenderType.renderAddress,
    props,
  });
}

export function dispatch_disableCreateInputs() {
  dispatch(Events.render, {
    type: RenderType.disableCreateInputs,
    props: {},
  });
}
export function dispatch_enableCreateInputs() {
  dispatch(Events.render, {
    type: RenderType.enableCreateInputs,
    props: {},
  });
}

export function dispatch_disableAcceptableInputs() {
  dispatch(Events.render, {
    type: RenderType.disableAcceptableInputs,
    props: {},
  });
}
export function dispatch_enableAcceptableInputs() {
  dispatch(Events.render, {
    type: RenderType.enableAcceptableInputs,
    props: {},
  });
}

export function dispatch_deployAgain(props: State) {
  dispatch(Events.render, {
    type: RenderType.deployAgain,
    props,
  });
}

export function dispatch_catalogPage(props: State) {
  dispatch(Events.render, {
    type: RenderType.catalogPage,
    props,
  });
}

export function dispatch_SCDeploySelected(deploy: DeploySC) {
  dispatch(Events.render, {
    type: RenderType.SCDeploySelected,
    props: { deploy },
  });
}

export function dispatch_DisableSCInputs(params: any) {
  dispatch(Events.render, {
    type: RenderType.DisableSCInputs,
    props: { params },
  });
}
export function dispatch_EnableSCInputs(params: any) {
  dispatch(Events.render, {
    type: RenderType.EnableSCInputs,
    props: { params },
  });
}

export function dispatch_setDeployedSCAddress(address: string) {
  dispatch(Events.render, {
    type: RenderType.SetDeployedSCAddress,
    props: { address },
  });
}

export function dispatch_renderDocXDropper(props: State) {
  dispatch(Events.render, {
    type: RenderType.DocxDropper,
    props,
  });
}

export function dispatch_renderUploadFilePopup(props: State) {
  dispatch(Events.render, {
    type: RenderType.uploadFile,
    props,
  });
}

export function dispatch_renderUploadStatus(props: State, progress: string) {
  dispatch(Events.render, {
    type: RenderType.uploadStatus,
    props: { ...props, tmp: { progress } },
  });
}

export function dispatch_discardFile(props: State) {
  dispatch(Events.render, {
    type: RenderType.discardFile,
    props,
  });
}

export function dispatch_hidePopup() {
  dispatch(Events.render, {
    type: RenderType.hidePopup,
    props: {},
  });
}

export function dispatch_renderUploadSummary(
  file: File,
  transaction: any,
  data: any,
  props: State,
  hasTip: boolean,
  tipTransaction: any
) {
  dispatch(Events.render, {
    type: RenderType.uploadSummary,
    props: { transaction, file, data, props, hasTip, tipTransaction },
  });
}

export function dispatch_renderProposalSummary(
  transaction: any,
  props: State,
  proposal: ProposalFormat,
  terms: string,
  hasTip: boolean,
  tipTransaction: any
) {
  dispatch(Events.render, {
    type: RenderType.proposalSummary,
    props: {
      ...props,
      tmp: {
        transaction,
        proposal,
        terms,
        hasTip,
        tipTransaction,
      },
    },
  });
}

export function dispatch_hideElement(el: HTMLElement, hide: boolean) {
  dispatch(Events.render, {
    type: RenderType.hideElement,
    props: { el, hide },
  });
}

export function dispatch_permapinPopup(props: State, ipfsHash) {
  dispatch(Events.render, {
    type: RenderType.permapinPopup,
    props: { ...props, ipfsHash },
  });
}

export function dispatch_walletPopup(props: State) {
  dispatch(Events.render, {
    type: RenderType.walletPopup,
    props: { ...props },
  });
}

export function dispatch_emptyWalletDropper(props: State) {
  dispatch(Events.render, {
    type: RenderType.emptyWalletDropper,
    props,
  });
}

export function dispatch_addNewAccountPopup(
  props: State,
  Account: ArrayBuffer,
  name: string
) {
  dispatch(Events.render, {
    type: RenderType.addNewAccountPopup,
    props: { ...props, tmp: { Account, name } },
  });
}

export function dispatch_showAccountPopup(
  props: State,
  balance: string,
  address: string
) {
  dispatch(Events.render, {
    type: RenderType.showAccountPopup,
    props: { ...props, tmp: { balance, address } },
  });
}

export function dispatch_switch_Accounts(props: State) {
  dispatch(Events.render, {
    type: RenderType.switchAccounts,
    props,
  });
}

export function dispatch_renderTransferPage(props: State) {
  dispatch(Events.render, {
    type: RenderType.transferPage,
    props,
  });
}

export function dispatch_renderTransferSummaryPage(
  props: State,
  mainTransaction: any,
  amountToSend: string,
  sendTip: boolean,
  tipAmount: string,
  tipTransaction: any,
  jwk: any
) {
  dispatch(Events.render, {
    type: RenderType.transferSummaryPage,
    props: {
      ...props,
      tmp: {
        mainTransaction,
        amountToSend,
        sendTip,
        tipAmount,
        tipTransaction,
        jwk,
      },
    },
  });
}

export function dispatch_renderPermapinSummaryPage(
  props: State,
  pinTransaction: any,
  sendTip: boolean,
  tipTransaction: any
) {
  dispatch(Events.render, {
    type: RenderType.permapinSummaryPage,
    props: { ...props, tmp: { pinTransaction, sendTip, tipTransaction } },
  });
}

export function dispatch_renderTxId(to: string, txId: any) {
  dispatch(Events.render, {
    type: RenderType.txId,
    props: { to, txId },
  });
}

export function dispatch_renderVerifyContract(props: State) {
  dispatch(Events.render, {
    type: RenderType.verifyContract,
    props,
  });
}

export function dispatch_verificationState(
  verificationState: VerificationState
) {
  dispatch(Events.render, {
    type: RenderType.verificationState,
    props: { tmp: { verificationState } },
  });
}

export function dispatch_renderCreateProposalPage(props: State) {
  dispatch(Events.render, {
    type: RenderType.createProposalPage,
    props,
  });
}

export function dispatch_renderReviewAndVotePage(props: State) {
  dispatch(Events.render, {
    type: RenderType.reviewAndVotePage,
    props,
  });
}

export function dispatch_permawebselectActions(props: State) {
  dispatch(Events.render, {
    type: RenderType.permawebSelectActions,
    props,
  });
}

export function dispatch_uploadProposal(props: State, step: PopupState) {
  dispatch(Events.render, {
    type: RenderType.uploadProposal,
    props: { ...props, tmp: { step } },
  });
}

export function dispatch_initializeCreateRicardian(
  props: State,
  pageProps: CreateRicardianPageProps
) {
  dispatch(Events.render, {
    type: RenderType.initializeCreateRicardian,
    props: { ...props, tmp: { pageProps } },
  });
}

export function dispatch_initializeProposalUpload(
  props: State,
  tmp: {
    nameEl: HTMLInputElement;
    artifactEl: HTMLInputElement;
    termsEl: HTMLInputElement;
    gitEl: HTMLInputElement;
    frontEndEl: HTMLInputElement;
    networkEl: HTMLSelectElement;
    categoryEl: HTMLSelectElement;
    implementsSimpleTerms: HTMLInputElement;
  }
) {
  dispatch(Events.render, {
    type: RenderType.initializeProposalUpload,
    props: { ...props, tmp },
  });
}

export function dispatch_proposeNewRank(hasOpenProposal: boolean) {
  dispatch(Events.render, {
    type: RenderType.proposeNewRank,
    props: { tmp: { hasOpenProposal } },
  });
}

export function dispatch_proposeNewContract() {
  dispatch(Events.render, {
    type: RenderType.proposeNewContract,
    props: {},
  });
}

export function dispatch_manageProposals(props: State) {
  dispatch(Events.render, {
    type: RenderType.manageProposals,
    props,
  });
}

export function dispatch_dismissSidebar() {
  dispatch(Events.render, {
    type: RenderType.dismissSidebar,
    props: {},
  });
}

export function dispatch_renderWrongNetworkPopup(props: State) {
  dispatch(Events.render, {
    type: RenderType.renderWrongNetworkPopup,
    props,
  });
}
// TODO :refactor this to 4 separate renders
export function dispatch_renderMyProposals(
  props: State,
  paginatedProposals: PaginatedProposals,
  fetchedProposals: FetchedProposals,
  blockNumber: number
) {
  dispatch(Events.render, {
    type: RenderType.renderMyProposals,
    props: {
      ...props,
      tmp: { paginatedProposals, fetchedProposals, blockNumber },
    },
  });
}

export function dispatch_renderMyRankProposals(
  props: State,
  blockNumber: number,
  rankPage: [RankProposal[], string[], PaginatedProposal]
) {
  dispatch(Events.render, {
    type: RenderType.renderMyRankProposals,
    props: {
      ...props,
      tmp: { blockNumber, rankPage },
    },
  });
}

export function dispatch_renderReviewRankProposals(
  props: State,
  blockNumber: number,
  rankPage: [RankProposal[], string[], PaginatedProposal]
) {
  dispatch(Events.render, {
    type: RenderType.renderReviewRankProposals,
    props: { ...props, tmp: { rankPage, blockNumber } },
  });
}

export function dispatch_renderLoadedValue(
  props: State,
  loadedValue: any,
  renderTo: HTMLElement
) {
  dispatch(Events.render, {
    type: RenderType.renderLoadedValue,
    props: { ...props, tmp: { loadedValue, renderTo } },
  });
}

export function dispatch_renderPermapinnedDashboardData(
  props: State,
  nodes: any
) {
  dispatch(Events.render, {
    type: RenderType.pinnedDashboardData,
    props: { ...props, tmp: { nodes } },
  });
}

export function dispatch_enableStakingButtons(
  props: State,
  enableStakingButton: boolean,
  enableAllowanceButton: boolean,
  ricBalance: string,
  isStaking: boolean
) {
  dispatch(Events.render, {
    type: RenderType.stakingButtons,
    props: {
      ...props,
      tmp: {
        enableStakingButton,
        enableAllowanceButton,
        ricBalance,
        isStaking,
      },
    },
  });
}

export function dispatch_feeProposals(props: State) {
  dispatch(Events.render, {
    type: RenderType.feeProposalsPage,
    props,
  });
}
export function dispatch_PSTPage(props: State) {
  dispatch(Events.render, {
    type: RenderType.pstPage,
    props,
  });
}
export function dispatch_tokenSale(props: State) {
  dispatch(Events.render, {
    type: RenderType.tokenSalePage,
    props,
  });
}
export function dispatch_vaultPage(props: State) {
  dispatch(Events.render, {
    type: RenderType.vaultPage,
    props,
  });
}

export function dispatch_trailsPage(props: State) {
  dispatch(Events.render, {
    type: RenderType.trailsPage,
    props,
  });
}

export function dispatch_tokenSalePageInit(
  props: State,
  ricLeft: string,
  rate: string,
  tokensSold: string,
  purchasedAlready: boolean
) {
  dispatch(Events.render, {
    type: RenderType.tokenSalePageInit,
    props: {
      ...props,
      tmp: { ricLeft, rate, tokensSold, purchasedAlready },
    },
  });
}

export function dispatch_renderSellAmount(props: State, rate: number) {
  dispatch(Events.render, {
    type: RenderType.renderSellAmount,
    props: { ...props, tmp: { rate } },
  });
}

export function dispatch_renderVaultLockedTokens(
  props: State,
  lockedTokens: LockedTokens[],
  blocks: number,
  firstIndex: number,
  lastIndex: number,
  currentPage: number,
  totalPages: number
) {
  dispatch(Events.render, {
    type: RenderType.renderVaultLockedTokens,
    props: {
      ...props,
      tmp: {
        lockedTokens,
        blocks,
        firstIndex,
        lastIndex,
        currentPage,
        totalPages,
      },
    },
  });
}

export function dispatch_renderMyRicBalance(props: State, balance: string) {
  dispatch(Events.render, {
    type: RenderType.renderMyRicBalance,
    props: { ...props, tmp: { balance } },
  });
}

export function dispatch_renderCurrentBlock(block: number) {
  dispatch(Events.render, {
    type: RenderType.renderCurrentBlock,
    props: { tmp: { block } },
  });
}

export function dispatch_renderApprovedSpend(spend: string) {
  dispatch(Events.render, {
    type: RenderType.renderApprovedSpend,
    props: { tmp: { spend } },
  });
}

export function dispatch_collectRewardPage(props: State) {
  dispatch(Events.render, {
    type: RenderType.collectRewardsPage,
    props,
  });
}

export function dispatch_renderPSArweaveAddress(props: State, address: string) {
  dispatch(Events.render, {
    type: RenderType.PSArweaveAddress,
    props: { ...props, tmp: { address } },
  });
}

export function dispatch_vaultHistoryEmpty() {
  dispatch(Events.render, {
    type: RenderType.vaultHistoryEmpty,
    props: {},
  });
}

export function dispath_trailsTabs(
  props: State,
  tab: "create" | "search",
  trails: Contract,
  addr: string
) {
  dispatch(Events.render, {
    type: RenderType.trailsTabs,
    props: { ...props, tmp: { tab, trails, addr } },
  });
}

export function dispatch_trailsDetails(
  props: State,
  name: string,
  caller: string,
  trails: Contract,
  trailDetails: TrailDetails
) {
  dispatch(Events.render, {
    type: RenderType.trailsDetails,
    props: {
      ...props,
      tmp: { name, caller, trails, trailDetails },
    },
  });
}

export function dispatch_addCommentPopup(props: State) {
  dispatch(Events.render, {
    type: RenderType.addCommentPopup,
    props: { ...props },
  });
}

export function dispatch_renderArweaveTxSummary(
  transaction: any,
  props: State,
  hasTip: boolean,
  tipTransaction: any
) {
  dispatch(Events.render, {
    type: RenderType.arweaveTxSummary,
    props: { ...props, tmp: { transaction, hasTip, tipTransaction } },
  });
}

export function dispatch_renderTrailDataPage(
  props: State,
  dataPage: ArweaveDataPage,
  creatorCalls: boolean,
  caller: string,
  trails: Contract,
  trailId: string,
  trailDetails: TrailDetails
) {
  dispatch(Events.render, {
    type: RenderType.trailDataPage,
    props: {
      ...props,
      tmp: { dataPage, creatorCalls, caller, trails, trailId, trailDetails },
    },
  });
}

export function dispatch_navigateTo(queryStrings: QueryStrings, value: string) {
  dispatch(Events.render, {
    type: RenderType.navigateToQueryString,
    props: { tmp: { value, queryStrings } },
  });
}

export function dispatch_ipfsConfig(props: State) {
  dispatch(Events.render, {
    type: RenderType.renderIpfsConfig,
    props,
  });
}
