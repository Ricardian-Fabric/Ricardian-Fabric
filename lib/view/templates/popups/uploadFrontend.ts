import { html } from "lit-html";
import { helperTooltips } from "../components/helperTooltips";
import { BackLogo } from "../components/logos";

export const uploadNewFrontEndTemplate = (url: string) => html`
  <h2>Upload new Front end</h2>
  <table>
    <thead>
      <tr>
        <th></th>
        <th></th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><label for="frontend-title">Title:</label></td>
        <td><input id="frontend-title" type="text" placeholder="..." /></td>
        <td>${helperTooltips("The title the front end will show.")}</td>
      </tr>
      <tr>
        <td><label for="frontend-contract">Contract</label></td>
        <td>
          <input
            id="frontend-contract"
            type="text"
            placeholder="Smart Contract"
          />
        </td>
        <td>${helperTooltips("The smart contract's address you deployed.")}</td>
      </tr>
      <tr>
        <td><label for="wallet-password">Password:</label></td>
        <td><input type="password" id="wallet-password" /></td>
        <td>${helperTooltips("Your arweave wallet password.")}</td>
      </tr>
      <tr>
        <td><label for="terms-checkbox">I accept the terms:</label></td>
        <td><input id="terms-checkbox" type="checkbox" /></td>
        <td>
          ${helperTooltips(
            "You need to accept the Ricardian Fabric terms to access this."
          )}
        </td>
      </tr>
    </tbody>
  </table>
  <div class="wide-row">
    <button class="marginRight-20 backButton" id="frontend-upload-cancel">
      ${BackLogo()} Cancel
    </button>
    <button
      data-url="${url}"
      class="marginLeft-20 NextButton"
      id="frontend-upload-proceed"
    >
      Upload
    </button>
  </div>
  <hr />
`;
