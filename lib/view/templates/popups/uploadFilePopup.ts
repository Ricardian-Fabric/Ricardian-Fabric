import { html } from "lit-html";
import { helperTooltips } from "../components/helperTooltips";
import { BackLogo, CopyLogo } from "../components/logos";

export const uploadFilePopup = () => html`
  <h2 class="center">Upload a File</h2>
  <hr />
  <small
    >Upload a file to the permaweb. Pay only once, and it's stored forever and
    served as a website.</small
  >
  <hr />
  <div id="file-dropzone" class="drop-zone width-90Percent">
    <span id="drop-prompt" class="drop-zone__prompt"
      >Drop File here or click to upload</span
    >
    <input type="file" name="file" id="file-input" class="drop-zone__input" />
  </div>
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
        <td></td>
        <td>
          <button id="clearFileButton" class="backButton">Clear File</button>
        </td>
        <td>${helperTooltips("Click this to empty the file dropper.")}</td>
      </tr>
      <tr>
        <td>
          <label
            aria-labelledby="edit content type field"
            for="content-type-input"
            >Content-Type:</label
          >
        </td>
        <td>
          <input
            id="content-type-input"
            type="text"
            placeholder=""
            aria-label="edit content type field"
          />
        </td>
        <td>
          ${helperTooltips(
            "Specify the content type. Importing will fill it out."
          )}
        </td>
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
        <td>${helperTooltips("The password of the encrypted keyfile")}</td>
      </tr>
    </tbody>
  </table>
  <hr />
  <div class="center marginBottom-10">
    <label aria-labelledby="I agree to the terms">I agree to the terms</label>
    <input
      aria-label="I agree to the terms checkbox"
      id="upload-terms-checkbox"
      type="checkbox"
    />
  </div>
  <div id="upload-loading-indicator"></div>
  <div class="wide-row">
    <button class="marginRight-20 backButton" id="upload-cancel">
      ${BackLogo()} Cancel
    </button>
    <button class="marginLeft-20 NextButton" id="upload-proceed">Next</button>
  </div>
  <hr />
`;

export const uploadFileSummary = (
  name: string,
  contentType: string,
  fee: string,
  id: string
) => {
  const url = `https://arweave.net/${id}`;
  return html`
    <h2 class="center">Upload Summary</h2>
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
          <td><label>File Name:</label></td>
          <td>
            <div>${name}</div>
          </td>
        </tr>
        <tr>
          <td><label>Content-Type:</label></td>
          <td>
            <div>${contentType}</div>
          </td>
        </tr>
        <tr>
          <td><label>Upload Fee:</label></td>
          <td>
            <div>${fee} Ar</div>
          </td>
        </tr>
      </tbody>
    </table>
    <hr />
    <label for="uploadSummary-tx"
      >Content will be available at this url after posting it to the
      network:</label
    >
    <small id="uploadSummary-tx"
      ><a href="${url}" target="_blank" rel="noopener">${url}</a></small
    >
    <hr />
    <button
      id="copy-transaction"
      data-txid="${id}"
      class="text-align-center labelButton"
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
    <hr />
  `;
};
