import { html } from "lit-html";
import {
  AcceptedSmartContractLogo,
  arweaveLogo,
  bundlrNetworkLogo,
  ContentPasteLogo,
  contractConfigLogo,
  Erc20Logo,
  HourglassLogo,
  importLogo,
  neverLogo,
  PolygonLogoSizeable,
  SmartContractLogo,
  TrailsLogo,
  uploadLogo,
} from "../components/logos";

export function CreatePage() {
  return html`
    <h3>Create a Ricardian Contract</h3>
    <div class="row">
      <div id="network-dropdown"></div>
      <div id="permaweb-dropdown"></div>
      <hr />
      <button id="toggle-configuration-page" class="labelButton light-shadow">
        ${contractConfigLogo("30")} Configure
      </button>
      <button id="import-docx-trigger" class="labelButton">
        ${importLogo()} Import template
      </button>
    </div>
    <hr />
    <div id="create-page-one" style="display: block;">
      <div class="editable-container">
        <div id="editor" aria-label="Editor" class="cursor-text editable"></div>
        <div id="editor-control"></div>
      </div>
    </div>
    <hr />
    <div id="create-page-two" style="display: none;">
      <button class="accordion">
        ${accordionButtonImageAligner(
          () => AcceptedSmartContractLogo("40"),
          "Smart Contract (Required)"
        )}
      </button>
      <div class="panel">
        <small
          >You must use a smart contract. You can deploy it on any EVM
          compatible network.</small
        >
        <table class="input-table" aria-label="input field container table">
          <tr>
            <th></th>
            <th></th>
            <th></th>
          </tr>
          <tr>
            <td>
              <label>Smart Contract :</label>
            </td>
            <td>
              <input
                aria-label="smartcontract to call"
                name="smartcontract"
                id="smartcontract-input"
                type="text"
                placeholder="0x..."
                class="cursor-text"
              />
              <button id="deploy-simpleterms" class="labelButton">
                ${SmartContractLogo()} Deploy
              </button>
            </td>
            <td>
              <span id="smartcontract-tooltip"></span>
            </td>
          </tr>
          <tr>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </table>
        <hr />
      </div>
      <hr />
      <button class="accordion">
        ${accordionButtonImageAligner(HourglassLogo, "Sanctions and Expiry")}
      </button>
      <div class="panel">
        <small
          >Select sanctioned countries to block from signing the contract. You
          can select a group of countries when selecting the sanctions or select
          them one by one.</small
        >
        <table class="input-table" aria-label="input field container table">
          <tr>
            <th></th>
            <th></th>
            <th></th>
          </tr>
          <tr>
            <td>
              <label>Block countries:</label>
            </td>
            <td>
              <div id="sanctions-dropdown"></div>
            </td>
            <td>
              <span id="sanctions-tooltip"></span>
            </td>
          </tr>
          <tr>
            <td>
              <label for="blocked-addresses">Block addresses:</label>
            </td>
            <td>
              <input id="blocked-addresses" type="text" placeholder="0x..." />
            </td>
            <td>
              <span id="blocked-addresses-tooltip"></span>
            </td>
          </tr>
          <tr>
            <td>
              <label for="expires-input">Expires:</label>
            </td>
            <td>
              <input
                aria-label="Expires date input"
                name="expires"
                id="expires-input"
                class="cursor-pointer"
                type="date"
              />
              <button
                aria-label="never expires button"
                name="never"
                class="cursor-pointer labelButton"
                id="expires-reset"
              >
                ${neverLogo()} Never
              </button>
            </td>
            <td>
              <span id="expires-tooltip"></span>
            </td>
          </tr>
          <tr>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </table>
        <small
          >Don't forget to set the expiry date. By default the contract expires
          in 1 day. Select a specific date or click never to disable
          expiry.</small
        >
        <hr />
      </div>
      <hr />
      <button class="accordion">
        ${accordionButtonImageAligner(TrailsLogo, "Trails and Redirect")}
      </button>
      <div class="panel">
        <small
          >Redirect to your website after contract signing. The user will be
          prompted to navigate to the new page.</small
        >
        <table class="input-table" aria-label="input field container table">
          <tr>
            <th></th>
            <th></th>
            <th></th>
          </tr>
          <tr>
            <td>
              <label>Redirects to:</label>
            </td>
            <td>
              <input
                aria-label="post to input"
                name="postto"
                id="redirectto-input"
                type="url"
                placeholder="https://"
                class="cursor-text"
              />
            </td>
            <td>
              <span id="redirectto-tooltip"></span>
            </td>
          </tr>
          <tr>
            <td>
              <label>Trail:</label>
            </td>
            <td>
              <table class="width-100Percent">
                <tr>
                  <td>
                    <input
                      aria-label="Related trail"
                      name="trail"
                      id="trail-input"
                      type="text"
                      placeholder="Trail Name"
                      class="cursor-text"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <input
                      aria-label="Arweave address for trail"
                      name="trail"
                      id="trail-address-input"
                      type="text"
                      placeholder="Arweave address"
                      class="cursor-text"
                    />
                  </td>
                </tr>
              </table>
            </td>
            <td>
              <span id="trail-tooltip"></span>
            </td>
          </tr>
          <tr>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </table>
        <small
          >Trails can be added to unlock commenting on a ricardian contract.
          Users can add comments and link transactions to a trail. When a trail
          is added to the ricardian contract users can navigate to it with a
          link.
        </small>
        <hr />
      </div>

      <hr />

      <button id="erc20configurationButton" class="accordion">
        ${accordionButtonImageAligner(
          () => Erc20Logo("40", "40"),
          "ERC-20 support"
        )}
      </button>
      <div class="panel">
        <small
          >When signing the contract, the user can be prompted to add a new
          ERC-20 token to the wallet.</small
        >
        <table id="erc20-table">
          <tr>
            <th></th>
            <th></th>
            <th></th>
          </tr>
          <tr>
            <td>
              <label for="add-erc20-checkbox">Add ERC20 to wallet?</label>
            </td>
            <td><input id="add-erc20-checkbox" type="checkbox" /></td>
            <td><span id="add-erc20-checkbox-tooltip"></span></td>
          </tr>
          <tr>
            <td>
              <label for="erc20-name">Name</label>
            </td>
            <td>
              <input
                id="erc20-name"
                type="text"
                aria-label="erc20 name input"
                placeholder="..."
              />
            </td>
            <td><span id="erc20-name-tooltip"></span></td>
          </tr>
          <tr>
            <td>
              <label for="erc20-symbol">Symbol</label>
            </td>
            <td>
              <input
                id="erc20-symbol"
                aria-label="erc20 symbol"
                placeholder="..."
                type="text"
              />
            </td>
            <td><span id="erc20-symbol-tooltip"></span></td>
          </tr>
          <tr>
            <td>
              <label for="erc20-decimals">Decimals</label>
            </td>
            <td>
              <input
                aria-label="erc20 decimal input"
                placeholder="18"
                id="erc20-decimals"
                type="number"
              />
            </td>
            <td><span id="erc20-decimal-tooltip"></span></td>
          </tr>
          <tr>
            <td>
              <label for="erc20-address">Contract address</label>
            </td>
            <td>
              <input
                aria-label="erc20 contract address input"
                placeholder="0x"
                id="erc20-address"
                type="text"
              />
              <button
                aria-label="address is same as the above specified"
                name="same"
                class="backButton"
                id="same-contract-button"
              >
                ${ContentPasteLogo()}Same as contract config
              </button>
            </td>
            <td><span id="erc20-address-tooltip"></span></td>
          </tr>
          <tr>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </table>
        <hr />
      </div>

      <hr />
      <button class="accordion">
        ${accordionButtonImageAligner(
          () => uploadLogo("40", "40"),
          "Uploading (Required)"
        )}
      </button>
      <div class="panel">
        <small
          >You must enter your wallet password to upload the legal contract to
          Arweave. If you don't have one, create it using the burner wallet in
          the permaweb dropdown.</small
        >
        <table class="center input-table">
          <tr>
            <th></th>
            <th></th>
            <th></th>
          </tr>
          <tr>
            <td>
              <label
                >Bundlr Network: ${bundlrNetworkLogo("20")}
                ${PolygonLogoSizeable("30")}</label
              ><input id="bundlrNetworkCheckbox" checked type="checkbox" />
            </td>
            <td></td>
            <td><span id="bundlr-network-tooltip" /></td>
          </tr>
          <tr>
            <td>
              <label>Burner Wallet Password: ${arweaveLogo()}</label>
              <input id="burnerWalletCheckbox" type="checkbox" />
            </td>
            <td><input disabled type="password" id="wallet-password" /></td>
            <td><span id="burner-wallet-tooltip"></span></td>
          </tr>
          <tr>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </table>
      </div>
    </div>

    <hr />
    <div class="center marginBottom-10">
      <label id="terms-checkbox-label"
        >I agree to the terms and agreements</label
      >
      <input
        aria-label="I agree to the terms checkbox"
        id="terms-checkbox"
        type="checkbox"
      />
    </div>
    <hr />
    <div
      aria-label="transaction-display-slot"
      class="center"
      id="transaction-display"
    ></div>

    <div id="button-slot"></div>
  `;
}

function accordionButtonImageAligner(logo: any, text: any) {
  return html`<div class="row">
    <div class="width-50 height-100Percent">${logo()}</div>
    <div class="text-align-center">${text}</div>
  </div>`;
}
