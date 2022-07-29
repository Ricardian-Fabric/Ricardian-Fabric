import {
  dispatch_renderError,
  dispatch_renderMyRicBalance,
  dispatch_renderRewardTokenRowWithBalances,
  dispatch_renderRewardTokenSelected,
  dispatch_renderRewardTokenWithdraw,
} from "../../dispatch/render";
import { PageState, State, Token } from "../../types";
import { getById } from "../../view/utils";
import {
  calculateETHWithdraw,
  calculateWithdraw,
  getCurrentbalance,
  getFeeDaoContract,
  getTokens,
  withdrawETH,
  withdrawOne,
} from "../../wallet/feeDao/contractCalls";
import {
  allowance,
  approve,
  balanceOf,
  getERC20,
  getRicContract,
} from "../../wallet/ric/contractCalls";
import { FEEDAOADDRESS, getAddress, RICVAULTADDRESS } from "../../wallet/web3";
import { hasError, OptionsBuilder } from "../utils";
import { Contract } from "web3-eth-contract";
import { dispatch_setPage } from "../../dispatch/stateChange";
import Web3 from "web3";
import { getError } from "../../wallet/errors";
const MATICREWARDADDRESS = "Polygon Matic"; // Native token so address is not specified

export async function collectRewardsPageActions(props: State) {
  const feeDaoOptions = await OptionsBuilder(() => getFeeDaoContract());

  if (hasError(feeDaoOptions)) {
    return;
  }

  const myAddressOpts = await OptionsBuilder(() => getAddress());

  if (hasError(myAddressOpts)) {
    return;
  }

  const tokensOpts = await OptionsBuilder(() =>
    getTokens(feeDaoOptions.data, myAddressOpts.data)
  );

  if (hasError(tokensOpts)) {
    return;
  }

  const currentBalanceOpts = await OptionsBuilder(() =>
    getCurrentbalance(feeDaoOptions.data, myAddressOpts.data)
  );

  if (hasError(currentBalanceOpts)) {
    return;
  }

  const tokenBalances = [
    {
      name: "Polygon",
      balance: currentBalanceOpts.data,
      address: MATICREWARDADDRESS,
    },
  ];
  const tokens = tokensOpts.data as Token[];
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    const getERC20Opts = await OptionsBuilder(() => getERC20(token.token));

    if (hasError(getERC20Opts)) {
      return;
    }
    // Check how much the feedao has of the tokens!
    const balanceOpts = await OptionsBuilder(() =>
      balanceOf(getERC20Opts.data, FEEDAOADDRESS, myAddressOpts.data)
    );

    if (hasError(balanceOpts)) {
      return;
    }

    const balance = balanceOpts.data;

    tokenBalances.push({
      name: token.name,
      address: token.token,
      balance: balance,
    });
  }
  dispatch_renderRewardTokenRowWithBalances(props, tokenBalances);
}

export async function onRewardTokenRowClicks(props: State) {
  const ricAmountEl = getById("ricAmount") as HTMLInputElement;
  const approveButton = getById("approve-ric-spend") as HTMLButtonElement;
  const feeTokenDisplayButtons = document.getElementsByClassName(
    "feeTokenDisplayButton"
  );

  const feeDaoOpts = await OptionsBuilder(() => getFeeDaoContract());
  if (hasError(feeDaoOpts)) {
    return;
  }
  const addressOptions = await OptionsBuilder(() => getAddress());

  if (hasError(addressOptions)) {
    return;
  }
  const myaddress = addressOptions.data;

  //dispatch init from state for selected tokens
  const ricOptions = await OptionsBuilder(() => getRicContract());

  if (hasError(ricOptions)) {
    return;
  }
  const ricBalanceOptions = await OptionsBuilder(() =>
    balanceOf(ricOptions.data, myaddress, myaddress)
  );
  if (hasError(ricBalanceOptions)) {
    return;
  }
  dispatch_renderMyRicBalance(props, ricBalanceOptions.data);

  approveButton.onclick = async function () {
    const amount = ricAmountEl.value;
    const onError = (err) => {
      dispatch_renderError(getError(err.message));
    };
    const onReceipt = (res) => {};

    await approve(
      ricOptions.data,
      RICVAULTADDRESS,
      Web3.utils.toWei(amount),
      myaddress,
      onError,
      onReceipt
    );
  };

  ricAmountEl.onchange = async function () {
    // check what elements are selected, if 1 is, then rerender that
    if (isNaN(parseInt(ricAmountEl.value))) {
      dispatch_renderError("Invalid amount to lock");
      return;
    }

    if (!(parseInt(ricAmountEl.value) <= parseInt(ricBalanceOptions.data))) {
      dispatch_renderError("Not enough balance");
      dispatch_renderRewardTokenWithdraw(props, "none", []);
      return;
    }
    const selectedElements = document.getElementsByClassName("rewardSelected");
    if (selectedElements.length === 1) {
      const selected = selectedElements[0] as HTMLElement;
      // if there is one selected
      const name = selected.dataset.name;
      const tokenaddress = selected.dataset.address;
      const balance = selected.dataset.balance;
      const withdraw = await getWithdraw(
        tokenaddress,
        feeDaoOpts.data,
        ricAmountEl.value,
        myaddress
      );

      dispatch_renderRewardTokenWithdraw(props, "single", [
        {
          name,
          balance,
          address: tokenaddress,
          canWithdraw: withdraw,
        },
      ]);
    }
    //if nothing is selected, it will render nothing
  };

  for (let i = 0; i < feeTokenDisplayButtons.length; i++) {
    const feetokenBttn = feeTokenDisplayButtons[i] as HTMLElement;

    feetokenBttn.onclick = async function () {
      // if feetokenBttn is selected, I unselect
      if (feetokenBttn.classList.contains("rewardSelected")) {
        dispatch_renderRewardTokenSelected(props, feetokenBttn.id);
        dispatch_renderRewardTokenWithdraw(props, "none", []);
        return;
      }
      // otherwise I unselect whatever was selected
      const selected = document.getElementsByClassName("rewardSelected");
      for (let i = 0; i < selected.length; i++) {
        const el = selected[i] as HTMLInputElement;
        // This should unselect them
        dispatch_renderRewardTokenSelected(props, el.id);
      }
      // validate the amount input
      if (isNaN(parseInt(ricAmountEl.value))) {
        dispatch_renderError("Invalid amount to lock");
        return;
      }

      if (!(parseInt(ricAmountEl.value) <= parseInt(ricBalanceOptions.data))) {
        dispatch_renderError("Not enough balance");
        return;
      }
      // get the details of the selected token
      const name = feetokenBttn.dataset.name;
      const tokenaddress = feetokenBttn.dataset.address;
      const balance = feetokenBttn.dataset.balance;
      const withdraw = await getWithdraw(
        tokenaddress,
        feeDaoOpts.data,
        ricAmountEl.value,
        myaddress
      );
      // if the address is harmony one , I need to calculateEthWithdraw

      dispatch_renderRewardTokenSelected(props, feetokenBttn.id);
      // now I render the withdraw
      dispatch_renderRewardTokenWithdraw(props, "single", [
        { name, address: tokenaddress, balance, canWithdraw: withdraw },
      ]);
    };
  }
}

async function getWithdraw(
  tokenaddress: string,
  feeDao: Contract,
  ricAmount: string,
  myaddress: string
) {
  let withdraw = "";
  if (tokenaddress === MATICREWARDADDRESS) {
    const canWithdrawOpts = await OptionsBuilder(() =>
      calculateETHWithdraw(feeDao, ricAmount, myaddress)
    );
    if (hasError(canWithdrawOpts)) {
      return;
    }
    withdraw = canWithdrawOpts.data;
  } else {
    // Otherwise I calculate token withdraw
    const canWithdrawOpts = await OptionsBuilder(() =>
      calculateWithdraw(feeDao, tokenaddress, ricAmount, myaddress)
    );
    if (hasError(canWithdrawOpts)) {
      return;
    }
    withdraw = canWithdrawOpts.data;
  }
  return withdraw;
}

export async function tokenWithdrawActions(props: State, selected: string) {
  const ricAmountEl = getById("ricAmount") as HTMLInputElement;

  const withdrawRewardButton = getById("withdraw-reward-button");
  const feeDaoOpts = await OptionsBuilder(() => getFeeDaoContract());
  if (hasError(feeDaoOpts)) {
    return;
  }
  const ricOptions = await OptionsBuilder(() => getRicContract());

  if (hasError(ricOptions)) {
    return;
  }
  const addressOptions = await OptionsBuilder(() => getAddress());

  if (hasError(addressOptions)) {
    return;
  }
  const myaddress = addressOptions.data;

  const onError = function (error, receipt) {
    dispatch_renderError(error.message);
  };
  const onReceipt = function (receipt) {
    dispatch_setPage(PageState.rewards);
    const selected = document.getElementsByClassName("rewardSelected");
    dispatch_renderRewardTokenSelected(props, selected[0].id);
    dispatch_renderRewardTokenWithdraw(props, "none", []);
  };

  withdrawRewardButton.onclick = async function () {
    //check for the Ric spend allowance

    const allowanceOpts = await OptionsBuilder(() =>
      allowance(ricOptions.data, myaddress, RICVAULTADDRESS, myaddress)
    );
    if (hasError(allowanceOpts)) {
      return;
    }

    if (!(allowanceOpts.data >= ricAmountEl.value)) {
      dispatch_renderError("Not enough allowance. Press approve.");
      return;
    }

    const tokenaddress = withdrawRewardButton.dataset.address;

    if (tokenaddress === MATICREWARDADDRESS) {
      await withdrawETH(
        feeDaoOpts.data,
        Web3.utils.toWei(ricAmountEl.value),
        myaddress,
        onError,
        onReceipt
      );
    } else {
      await withdrawOne(
        feeDaoOpts.data,
        tokenaddress,
        Web3.utils.toWei(ricAmountEl.value),
        myaddress,
        onError,
        onReceipt
      );
    }
  };
}
