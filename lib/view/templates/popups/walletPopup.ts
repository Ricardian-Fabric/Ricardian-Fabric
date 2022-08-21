import { html } from "lit-html";
import { TIP, WinstonToAr } from "../../../wallet/arweave";
import { helperTooltips } from "../components/helperTooltips";
import { BackLogo, CopyLogo } from "../components/logos";

export const WalletPopup = () => html`<h2>Welcome to the Permaweb</h2>
<small>You need to use a password protected key file with Ricardian Fabric.</small>
<button id="import-arweave-accordion-button" class="backButton">
  Import Arweave Key(optional)
</button>
<div id="wallet-dropzone" class="drop-zone">
  <span id="drop-prompt" class="drop-zone__prompt">Drop Your Arweave Key File Here</span>
  <input type="file" name="wallet" id="wallet-input" class="drop-zone__input" />
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
      <td><label for="wallet-password-once">Password:</label></td>
      <td>
        <input readonly onfocus="this.removeAttribute('readonly');" autocomplete="off" id="wallet-password-once"
          type="password" />
      </td>
    </tr>
    <tr>
      <td><label for="wallet-password-twice">Password again:</label></td>
      <td>
        <input readonly onfocus="this.removeAttribute('readonly');" autocomplete="off" id="wallet-password-twice"/
          type="password">
      </td>
    </tr>
  </tbody>
</table>
<div class="wide-row">
  <button class="marginRight-20 backButton" id="wallet-cancel">
    ${BackLogo()} Cancel
  </button>
  <button class="marginLeft-20 NextButton" id="wallet-proceed">
    Create Account
  </button>
</div>
<hr />`;

export const AddNewAccountPopup = (address: string) => html`
  <h2>Add New Account?</h2>
  <h5>Address: ${address}</h5>
  <div class="center">
    <small>Your account is an encrypted Arweave key. Make sure to save the file.
      This should not be your main Arweave address. Top it up as needed.</small>
  </div>
  
  <div class="wide-row">
    <button class="marginRight-20 backButton" id="addNewAccount-cancel">
      Cancel
    </button>
    <button class="marginLeft-20 NextButton" id="addNewAccount-proceed">
      Add Account
    </button>
  </div>
  <hr />
`;

export const ShowAccountPopup = (address: string, balance: string) => html`
  <h2>Account</h2>
  
  <h5>
    <button class="labelButton" id="copy-address-button" title="Copy address">
      ${CopyLogo()}
    </button>
    Address:
    <span id="arweave-address" data-address="${address}">${address}</span>
    <button class="marginLeft-20 backButton" id="new-Account">New</button>
  </h5>
  ${address === ""
  ? null
  : html`<h5>
    Balance: ${balance} Ar
    <button id="transferPage-button" class="marginLeft-20 backButton">
      Transfer
    </button>
  </h5>`}
  
  <div class="wide-row">
    <button class="marginRight-20 backButton" id="Account-cancel">
      ${BackLogo()} Back
    </button>
  
    <button class="marginLeft-20 NextButton" id="switchAccount-proceed">
      Import
    </button>
  </div>
  <hr />
`;

export const SwitchAccounts = () => html`
  <h2>Import Accounts</h2>
  <div id="wallet-dropzone" class="drop-zone">
    <span id="drop-prompt" class="drop-zone__prompt">Drop Your Encrypted Key File Here To Import Accounts</span>
    <input type="file" name="wallet" id="wallet-input" class="drop-zone__input" />
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
        <td><label for="AccountPassword">Password</label></td>
        <td>
          <input readonly onfocus="this.removeAttribute('readonly');" autocomplete="off" id="AccountPassword"
            type="password" />
        </td>
      </tr>
    </tbody>
  </table>
  <div class="wide-row">
    <button class="marginRight-20 backButton" id="Account-cancel">
      ${BackLogo()} Back
    </button>
    <button class="marginLeft-20 NextButton" id="switchAccount-proceed">
      Import!
    </button>
  </div>
  <hr />
`;

export const TransferPage = (balance: string) => html`<h2>Transfer</h2>
<table>
  <thead>
    <tr>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><label>Balance:</label></td>
      <td><small>${balance} Ar</small></td>
      <td>${helperTooltips("Your current balance.")}</td>
    </tr>
    <tr>
      <td><label for="transferAmount">Amount:</label></td>
      <td><input id="transferAmount" type="number" /></td>
      <td>${helperTooltips("The amount to transfer to address.")}</td>
    </tr>
    <tr>
      <td><label for="transferToAddress">To:</label></td>
      <td><input id="transferToAddress" type="text" /></td>
      <td>${helperTooltips("The Arweave address to transfer to.")}</td>
    </tr>
    <tr>
      <td>
        <label for="password">Password:</label>
      </td>
      <td>
        <input id="password" type="password" />
      </td>
      <td>${helperTooltips("Unlock the key with the password.")}</td>
    </tr>
    <!-- <tr>
        <td><label for="tipcheckbox">Send a tip:</label></td>
        <td>
          <input id="tipcheckbox" type="checkbox" checked />
        </td>
        <td>${helperTooltips(`Support us by sending a tip. ${TIP} Ar`)}</td>
      </tr> -->
    <tr>
      <td>
        <label id="terms-button" class="terms-button-label">I accept the terms.</label>
      </td>
      <td><input id="transfer-terms-checkbox" type="checkbox" /></td>
    </tr>
  </tbody>
</table>
<div class="wide-row">
  <button class="marginRight-20 backButton" id="transferPage-cancel">
    ${BackLogo()} Back
  </button>
  <button class="marginLeft-20 NextButton" id="transferPage-proceed">
    Send
  </button>
</div>

<hr />`;

export const TransferSummaryPage = (arg: {
  mainTransaction: any;
  amountToSend: string;
  sendTip: boolean;
  tipAmount: string;
  tipTransaction: any;
}) => {
  const getFee = () => {
    let reward = parseFloat(arg.mainTransaction.reward);
    if (arg.sendTip) {
      reward += parseFloat(arg.tipTransaction.reward);
      reward += parseFloat(arg.tipTransaction.quantity);
    }

    const rewardInAr = WinstonToAr(reward.toString());
    return html`<div>${rewardInAr} Ar</div>`;
  };

  return html`
    <h2>Transfer Summary</h2>
    <table>
      <thead>
        <tr>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><label for="transfer-to">Transfer to:</label></td>
          <td>
            <label>
              <div>${arg.mainTransaction.target}</div>
            </label>
          </td>
        </tr>
        <tr>
          <td>
            <label for="transfer-quantity">Amount</label>
          </td>
          <td>
            <div>${WinstonToAr(arg.amountToSend)} Ar</div>
          </td>
        </tr>
        <tr>
          <td>
            <label for="transferFee">Fee:</label>
          </td>
          <td>${getFee()}</td>
        </tr>
      </tbody>
    </table>
    <div id="transaction-loading"></div>
    <div class="button-row">
      <button class="marginRight-20 backButton" id="transferSummary-cancel">
        ${BackLogo()} Cancel
      </button>
      <button class="marginLeft-20 NextButton" id="transferSummary-proceed">
        Post Transaction
      </button>
    </div>
    <hr />
  `;
};
