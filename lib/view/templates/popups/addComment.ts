import { html } from "lit-html";
import { helperTooltips } from "../components/helperTooltips";
import { BackLogo, CopyLogo } from "../components/logos";

export const AddCommentTrail = () => html`
  <h2>Comment on a trail!</h2>
  <small
    >You upload comments to the Permaweb and they will be added to the
    trail.</small
  >
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
        <td>
          <label for="trail-name">Trail name:</label>
        </td>
        <td>
          <input id="trail-name" type="text" />
        </td>
        <td>
          ${helperTooltips("The trail name is the identifier of the trail")}
        </td>
      </tr>
      <tr>
        <td>
          <label for="linkedTransaction-input">Linked Transaction:</label>
        </td>
        <td>
          <input type="text" id="linkedTransaction-input" />
        </td>
        <td>
          ${helperTooltips(
            "Optional. You can link an arweave transaction to your comment"
          )}
        </td>
      </tr>
      <tr>
        <td>
          <label for="comment-input">Comment:</label>
        </td>
        <td><textarea type="text" id="comment-input"></textarea></td>
        <td>${helperTooltips("Add your comment here")}</td>
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
    <button class="marginRight-20 backButton" id="comment-cancel">
      ${BackLogo()} Cancel
    </button>
    <button class="marginLeft-20 NextButton" id="comment-proceed">
      Add Comment
    </button>
  </div>
  <hr />
`;

export const UploadArweaveTxSummary = (fee: string, id: string) => {
  const url = `https://arweave.net/${id}`;
  return html`<h2 class="center"></h2>
    <hr />
    <table>
      <thead>
        <tr>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><label>Fee:</label></td>
          <td><div>${fee}</div></td>
        </tr>
      </tbody>
    </table>
    <label for="uploadSummary-tx"
      >Content will be available at this url after posting it to the network
    </label>
    <small id="uploadSummary-tx"
      ><a href="${url}" target="_blank" rel="noopener">${url}</a></small
    >
    <hr />
    <button
      id="copy-transaction"
      data-txid="${id}"
      class="text-align-center labelButton"
      title="Copy Transaction ID"
      labelButton
    >
      ${CopyLogo()}
    </button>
    <hr />
    <small id="upload-status"></small>
    <hr />
    <div class="button-row">
      <button class="marginRight-20 backButton" id="uploadSummary-cancel">
        ${BackLogo()} Cancel
      </button>
      <button class="marginLeft-20 NextButton" id="uploadSummary-proceed">
        Post
      </button>
    </div>
    <hr /> `;
};
