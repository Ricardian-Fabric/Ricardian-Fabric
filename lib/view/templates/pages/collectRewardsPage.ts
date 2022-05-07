import { html } from "lit-html";
import { SelectedRewardDetails, TokenWithBalance } from "../../../types";
import { getBlockie } from "../components/getBlockies";
import { HarmonyLogoSizeable, SpendLogo } from "../components/logos";
import { balanceDisplay } from "./tokenSalePage";

export const CollectRewardsPage = () => html`${CollectRewardsContent()}`;

export const CollectRewardsContent = () => html` <h3>Collect Rewards</h3>
  ${balanceDisplay()}
  <small
    >Fees from deployed smart contracts accumulate in the Fee Dao
    contract.</small
  >
  <small>You can withdraw some in exchange for locking up OneRIC.</small>
  <table>
    <tr>
      <td><label for="ricAmount">Lock </label></td>
      <td><input id="ricAmount" type="number" value="ricAmount" /></td>
      <td><label for="ricAmount">OneRIC </label></td>
      <td>
        <button
          class="labelButton light-shadow"
          id="approve-ric-spend"
          title="Approve the 1ric for spending"
        >
          ${SpendLogo()} Approve
        </button>
      </td>
    </tr>
  </table>

  <hr />
  <div id="rewardTokenRow" class="tokenRow placeholder-item"></div>
  <hr />
  <div id="rewardWithdrawSelected"></div>
  <hr />`;

export function SelectedNone() {
  return html`  
    <tr>
    <td>None</td>
    <td>0</td>
    <td><button class="labelButton" disabled>Nothing</button></td>
  </tr></table>`;
}

export function getSelected(
  selected: "none" | "single" | "triple",
  details: Array<SelectedRewardDetails>
) {
  let res;
  switch (selected) {
    case "none":
      res = SelectedNone();
      break;
    case "single":
      res = SelectedSingle(details[0]);
      break;
    default:
      res = html`nothing`;
      break;
  }
  return html`<table class="width-100Percent">
    <tr>
      <td><label>Selected</label></td>
      <td><label>Balance</label></td>
      <td><label>You can claim</label></tdz>
    </tr>${res}</table>`;
}

export function SelectedSingle(details: SelectedRewardDetails) {
  return html` <tr>
    <td>${details.name}</td>
    <td>${details.balance}</td>
    <td>
      <button
        data-name="${details.name}"
        data-address="${details.address}"
        class="labelButton"
        id="withdraw-reward-button"
      >
        ${details.canWithdraw}
      </button>
    </td>
  </tr>`;
}

export function TokenRow(tokens: Array<TokenWithBalance>) {
  return tokens.map((t) => renderTokens(t.name, t.address, t.balance));
}

function renderTokens(
  tokenName: string,
  tokenAddress: string,
  balance: string
) {
  return html`
    <div
      id="${tokenName}-${tokenAddress}-id"
      data-name="${tokenName}"
      data-address="${tokenAddress}"
      data-balance="${balance}"
      class="box width-100 cursor-pointer hoverccc feeTokenDisplayButton unselectable"
    >
      <hr />
      <div class="text-align-center">
        ${tokenName === "ONE"
          ? HarmonyLogoSizeable("50px")
          : getBlockie(tokenAddress, "50px", "")}
      </div>
      <div class="text-align-center overflow-auto">
        <small>${tokenName}</small>
      </div>
    </div>
  `;
}

export function DraggedReward(token: {
  name: string;
  address: string;
  balance: string;
}) {
  return html`<div
    draggable="true"
    data-name="${token.name}"
    data-address="${token.address}"
    data-balance="${token.balance}"
    class="width-100 cursor-pointer hoverccc feeTokenDisplayButton unselectable"
  >
    <hr />
    <div class="text-align-center">
      ${token.name === "ONE"
        ? HarmonyLogoSizeable("50px")
        : getBlockie(token.address, "50px", "")}
    </div>
    <div class="text-align-center">
      <small>${token.balance} ${token.name}</small>
    </div>
  </div>`;
}
