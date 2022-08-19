import {
  Events,
  EventType,
  Account,
  PopupState,
  SelectedWallet,
  StashedDetails,
  PageState,
  CreateRicardianPageProps,
  ProposalFormat,
} from "../types";
import { dispatch } from "./dispatch";

export function dispatch_setInit() {
  dispatch(Events.stateChange, {
    type: EventType.init,
    value: {},
  });
}


export function dispatch_setSelectedDate(date: Date | string) {
  dispatch(Events.stateChange, {
    type: EventType.setSelectedDate,
    value: { date },
  });
}

export function dispatch_stashPage(page: string) {
  dispatch(Events.stateChange, {
    type: EventType.stashPage,
    value: { page },
  });
}

export function dispatch_stashDetails(value: StashedDetails) {
  dispatch(Events.stateChange, {
    type: EventType.stashDetails,
    value,
  });
}

export function dispatch_setPosition(position: GeolocationPosition) {
  dispatch(Events.stateChange, {
    type: EventType.setPosition,
    value: { position },
  });
}

export function dispatch_setSelectedWallet(to: SelectedWallet) {
  dispatch(Events.stateChange, {
    type: EventType.setSelectedWallet,
    value: to,
  });
}

export function dispatch_setNewAccount(value: Account) {
  dispatch(Events.stateChange, {
    type: EventType.setNewAccount,
    value,
  });
}

export function dispatch_setPopupState(to: PopupState) {
  dispatch(Events.stateChange, {
    type: EventType.setPopupState,
    value: to,
  });
}

export function dispatch_editFinished(done: boolean) {
  dispatch(Events.stateChange, {
    type: EventType.setEditFinished,
    value: done,
  });
}

export function dispatch_setEditor(editor: any) {
  dispatch(Events.stateChange, {
    type: EventType.setEditor,
    value: editor,
  });
}

export function dispatch_setPage(pageState: PageState) {
  dispatch(Events.stateChange, {
    type: EventType.setPageState,
    value: pageState,
  });
}

export function dispatch_setCreateRicardianState(
  pageData: CreateRicardianPageProps
) {
  dispatch(Events.stateChange, {
    type: EventType.setCreateRicardianPageProps,
    value: pageData,
  });
}

export function dispatch_setUploadProposalProps(proposalProps: ProposalFormat) {
  dispatch(Events.stateChange, {
    type: EventType.saveToStateUploadProposalProps,
    value: proposalProps,
  });
}

export function dispatch_setBlockPollingInterval(intervalVal: NodeJS.Timer) {
  dispatch(Events.stateChange, {
    type: EventType.blockPollingInterval,
    value: intervalVal,
  });
}
