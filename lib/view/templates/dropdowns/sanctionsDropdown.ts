import { html } from "lit-html";
import { AllCountries } from "../../../business/countryBlock";
import { blockLogo } from "../components/logos";

export const SanctionsDropdown = (expand: boolean) => html`
  <input type="checkbox" id="sanctions_checkbox_toggle" />
  <label
    id="sanctions_checkbox_label"
    class="labelButton sanctions_checkbox-label"
    for="sanctions_checkbox_toggle"
  >
    ${blockLogo()} Select</label
  >
  <ul class="maxHeight-300px overflow-auto">
    <li>
      <hr />
      <strong><span class="sanctions-span">SANCTIONS:</span></strong>
      <hr />
    </li>
    <li>
      <input
        aria-labeledby="ofec-span"
        id="ofec_checkbox"
        type="checkbox"
      /><span id="ofec-span" class="sanctions-span"
        >OFEC sanctioned countries</span
      >
    </li>
    <li>
      <input
        aria-label="eu sanctions checkbox"
        id="eu-checkbox"
        type="checkbox"
      /><span class="sanctions-span">EU sanctioned countries</span>
    </li>
    <li>
      <input
        aria-label="UN sanctions checkbox"
        id="un-checkbox"
        type="checkbox"
      /><span class="sanctions-span">UN sanctioned countries</span>
    </li>
    <li>
      <hr />
      <strong><span class="sanctions-span">BLOCK:</span></strong>
      <hr />
    </li>
    ${getLiFromAllCountries()}
  </ul>
`;

export function getLiFromAllCountries() {
  return AllCountries().map(
    (c) => html` <li>
      <input
        aria-label="Block ${c.name}"
        data-countrycode="${c.code}"
        type="checkbox"
        class="countryCodeCheckboxes"
      /><span class="sanctions-span">${c.name}</span>
    </li>`
  );
}
