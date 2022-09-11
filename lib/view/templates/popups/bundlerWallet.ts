import { html } from "lit-html";
import { helperTooltips } from "../components/helperTooltips";
import { loadingIndicator } from "../components/loadingIndicator";

export const BundlerNetworkLoadingPopup = () => html`
  <h2>Bundlr Network</h2>
  <small
    >Upload files and ricardian contracts using the Bundlr network. You can
    upload to arweave and pay for it with MATIC.</small
  >
  <div id="detailsContainer">${loadingIndicator}</div>
  <hr />
`;

export const BundlerLoadedPopup = (loadedBalance: string) => html`
  <table class="center width-100Percent">
    <tr>
      <th></th>
      <th></th>
      <th></th>
    </tr>
    <tr>
      <td>
        <label>Balance: (MATIC) </label>
      </td>
      <td>${loadedBalance}</td>
      <td>
        ${helperTooltips(
          "Your balance in MATIC to spend on the Bundlr network."
        )}
      </td>
    </tr>
    <tr>
      <td><label for="topUpAmount">Add Balance:</label></td>
      <td><input id="topUpAmount" type="number" /></td>
      <td><button id="topUpButton" class="labelButton">Top Up</button></td>
    </tr>
    <tr>
      <td><label for="withdrawAmount">Withdraw Balance:</label></td>
      <td><input id="withdrawAmount" type="number" /></td>
      <td><button id="withdrawButton" class="labelButton">Withdraw</button></td>
    </tr>
  </table>
  <small
    >When withdrawing you need to consider GAS fees. Make sure to leave enough
    in your balance or the transaction will fail.</small
  >
  <hr />
  <div class="center">
    <button id="backButton" class="labelButton">Back</button>
  </div>
  <hr />
`;
