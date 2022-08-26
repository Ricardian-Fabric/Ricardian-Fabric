import { html } from "lit-html";
import { RedirectIcon } from "./logos";

export function redirectCounter(count: number) {
  return html`<p>Redirecting in ${count}</p>`
};

export function redirectButton() {
  return html` <style>
    #redirect-button {
      font-size: larger;
    }
  </style>
  <button class="labelButton" id="redirect-button">
    ${RedirectIcon()} Click here to redirect
  </button>
  <hr />`};
