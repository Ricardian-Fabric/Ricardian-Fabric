import { html } from "lit-html";
import { TIP, WinstonToAr } from "../../../wallet/arweave";
import { helperTooltips } from "../components/helperTooltips";
import { BackLogo, CopyLogo, pinLogoWhite } from "../components/logos";

export const PermapinPopup = () => html`
  <style>
    #permapin-proceed {
      padding-right: 10px;
    }
  </style>
  <h2>Permapin a Contract</h2>
  <small
    >You can permapin the IPFS content on Arweave to store it forever.</small
  >
  <small>Only content created with Ricardian Fabric is allowed.</small>
  <hr />
  <div>
    <button id="permapin-account-button" class="labelButton">Account</button>
  </div>
  <table>
    <thead>
      <tr>
        <th></th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><label for="CID-input-permapin">IPFS Content Identifier</label></td>
        <td>
          <input id="CID-input-permapin" type="text" />
        </td>
        <td>${helperTooltips("The IPFS content identifier, V0 or V1")}</td>
      </tr>
      <tr>
        <td><label for="walletPassword">Password:</label></td>
        <td>
          <input
            readonly
            onfocus="this.removeAttribute('readonly');"
            autocomplete="off"
            id="walletPassword"
            type="password"
          />
        </td>
        <td>${helperTooltips("The password of the key file")}</td>
      </tr>
      <tr>
        <td>
          <label>I accept the terms.</label>
        </td>
        <td><input id="permapin-terms-checkbox" type="checkbox" /></td>
      </tr>
    </tbody>
  </table>
  <hr />
  <div id="permapin-loading-indicator"></div>
  <div class="wide-row">
    <button class="backButton" id="permapin-back">${BackLogo()} Back</button>
    <button class="NextButton" id="permapin-proceed">
      ${pinLogoWhite()} <strong>PIN!</strong>
    </button>
  </div>
  <hr />
`;

export const PermapinSummaryPage = (arg: {
  permapinTx: any;
  sendTip: boolean;
  tipTx: any;
}) => {
  const getFee = () => {
    let reward = parseFloat(arg.permapinTx.tx.reward);
    if (arg.sendTip) {
      reward += parseFloat(arg.tipTx.reward);
      reward += parseFloat(arg.tipTx.quantity);
    }
    const rewardInAr = WinstonToAr(reward.toString());
    return html`<div>${rewardInAr} Ar</div>`;
  };

  return html`<h2>Permapin Summary</h2>
    <table>
      <thead>
        <tr>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Fee:</td>
          <td>${getFee()}</td>
        </tr>
      </tbody>
    </table>
    <div id="transaction-loading"></div>
    <hr />
    <button
      id="copy-transaction"
      data-txid="${arg.permapinTx.tx.id}"
      class="text-align-center labelButton"
      title="Copy Transaction ID"
      labelButton
    >
      ${CopyLogo()}
    </button>
    <div class="wide-row">
      <button class="backButton" id="permapinPost-back">
        ${BackLogo()} Back
      </button>
      <button class="NextButton" id="permapinPost-proceed">
        Post Transaction
      </button>
    </div>
    <hr />`;
};
