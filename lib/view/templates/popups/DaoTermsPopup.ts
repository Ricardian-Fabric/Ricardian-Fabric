import { html } from "lit-html";
import { BackLogo } from "../components/logos";

export function DaoTermsPopup(url: string | null) {
  return html`<h4>You need to sign the proposal creation terms.</h4>
    <hr />
    <div>
      ${url === null
        ? null
        : html`<a href="${url}" target="_blank" rel="noopener">Here</a>`}
    </div>
    <hr />
    <div class="row">
      <button class="labelButton" id="dao-terms-back">
        ${BackLogo()} Back
      </button>
      <button class="labelButton" id="refresh-button">Refresh page</button>
    </div>
    <hr />
    <hr /> `;
}
