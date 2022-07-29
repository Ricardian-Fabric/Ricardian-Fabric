import { html } from "lit-html";

export function WrongNetworkPopup() {
  return html`<hr />
    <h5>Wrong network</h5>
    <p>You need to switch to Polygon</p>
    <div class="text-align-center">
      <button id="switch-network" class="labelButton">Switch</button>
    </div>
    <hr /> `;
}
