import { html } from "lit-html";

export function createButton(disabled: boolean) {
  if (disabled) {
    return html`
      <button class="center width-200" id="save-contract" role="button" disabled>
        Create Contract
      </button>
    `;
  } else {
    return html`<button class="center width-200" id="save-contract" role="button">
  Create Contract
</button>`;
  }
};
