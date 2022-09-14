// This is a notification to show the smartcontract is missing and it can be deployed.

import { html } from "lit-html";

export function missingContractPopup() {
  return html`<h2>Missing Smart Contract</h2>
<p>You need to use a Smart Contract with the Ricardian Contract.</p>
<p>Add it to the configuration or deploy it now!</p>
<div class="row">
  <button class="labelButton" id="deploySCButton">
    Deploy Smart Contract
  </button>
  <button class="labelButton" id="closePopupButton">Close</button>
</div>
<hr />
    `;
}
