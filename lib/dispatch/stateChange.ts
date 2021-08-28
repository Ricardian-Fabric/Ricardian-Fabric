import { Events, EventType } from "../types";
import { dispatch } from "./dispatch";

export function dispatch_getArweave(arweave: any) {
  dispatch(Events.stateChange, {
    type: EventType.setArweave,
    value: arweave,
  });
}

export function dispatch_setBalance(arg: { balance: number; address: string }) {
  dispatch(Events.stateChange, {
    type: EventType.setBalance,
    value: arg,
  });
}

export function dispatch_setSelectedDate(date: Date | string) {
  dispatch(Events.stateChange, {
    type: EventType.setSelectedDate,
    value: { date },
  });
}
