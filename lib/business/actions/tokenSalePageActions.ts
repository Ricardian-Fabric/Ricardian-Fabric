import Web3 from "web3";
import Decimal from "decimal.js";
import {
  dispatch_renderError,
  dispatch_renderMyRicBalance,
  dispatch_renderSellAmount,
  dispatch_tokenSalePageInit,
} from "../../dispatch/render";
import { dispatch_setPage } from "../../dispatch/stateChange";
import { PageState, State, Status } from "../../types";
import { getById } from "../../view/utils";
import {
  balanceOf,
  getRicContract,
  RICPARAMS,
} from "../../wallet/ric/contractCalls";
import {
  buyTokens,
  getCurrentRate,
  getRicSaleContract,
  getTokensSold,
  remainingTokens,
} from "../../wallet/ricSale/contractCalls";
import { getAddress, watchAsset } from "../../wallet/web3";
import { hasError, OptionsBuilder } from "../utils";
import { getError } from "../../wallet/errors";

export async function tokenSalePageActions(props: State) {
  const buyButton = getById("buy-ric");
  const addToWalletButton = getById("add-to-wallet");
  const amountEl = getById("buy-amount") as HTMLInputElement;

  const addressOptions = await OptionsBuilder(() => getAddress());

  if (hasError(addressOptions)) {
    return;
  }
  const address = addressOptions.data;

  const ricOptions = await OptionsBuilder(() => getRicContract());
  if (hasError(ricOptions)) {
    return;
  }
  const ricsaleOptions = await OptionsBuilder(() => getRicSaleContract());

  if (hasError(ricsaleOptions)) {
    return;
  }
  const ricsale = ricsaleOptions.data;
  const ricLeftOptions = await OptionsBuilder(() =>
    remainingTokens(ricsale, address)
  );
  if (hasError(ricLeftOptions)) {
    return;
  }

  const ricLeft = ricLeftOptions.data;

  const ricBalanceOptions = await OptionsBuilder(() =>
    balanceOf(ricOptions.data, address, address)
  );
  if (hasError(ricBalanceOptions)) {
    return;
  }
  let tokensSoldOptions = await OptionsBuilder(() =>
    getTokensSold(ricsale, address)
  );

  if (hasError(tokensSoldOptions)) {
    return;
  }

  const tokensSold = tokensSoldOptions.data;
  const ricRateOptions = await OptionsBuilder(() =>
    getCurrentRate(ricsale, address)
  );
  if (hasError(ricRateOptions)) {
    return;
  }

  const rate = ricRateOptions.data;
  const balance = ricBalanceOptions.data;
  dispatch_renderMyRicBalance(props, balance);
  dispatch_tokenSalePageInit(props, ricLeft, rate, tokensSold);
  const ricSaleOptions = await OptionsBuilder(() => getRicSaleContract());
  if (hasError(ricSaleOptions)) {
    return;
  }

  function setSellAmount(amount: string) {
    if (amount === "") {
      return;
    }
    const sellAmountDec = new Decimal(rate).times(amount); //.mul(amount);
    const sellAmount: number = sellAmountDec.toNumber();
    if (sellAmount < 0) {
      dispatch_renderError("Invalid amount entered");
      return;
    }
    if (sellAmount > 100000) {
      dispatch_renderError("Max buy amount exceeded");
      return;
    }
    dispatch_renderSellAmount(props, sellAmount);
  }

  setSellAmount("0");

  addToWalletButton.onclick = async function () {
    await watchAsset(RICPARAMS, () => {
      dispatch_renderError("Couldn't add token to wallet.");
    });
  };

  buyButton.onclick = async function () {
    const onError = (error: any, receipt: any) => {
      dispatch_renderError(getError(error.message));
    };
    const onReceipt = async (receipt: any) => {
      dispatch_setPage(PageState.tokenSale);
    };

    // If max price is not exceeded
    const getAmount = amountEl.value;
    if (parseFloat(getAmount) < 0) {
      dispatch_renderError("Invalid amount entered");
    }
    try {
      const weiAmount = Web3.utils.toWei(getAmount);
      buyTokens(ricSaleOptions.data, weiAmount, address, onError, onReceipt);
    } catch (err) {
      dispatch_renderError(err.message);
    }
  };

  amountEl.onchange = async function (ev: Event) {
    try {
      //@ts-ignore
      setSellAmount(ev.target.value);
    } catch (err) {
      dispatch_renderError(err.message);
      return;
    }
  };
}
