import { html } from "lit-html";
import { catalogLogo, HarmonyLogo, SmartContractLogo } from "../components/logos";

export const CatalogDropdown = () => html`
  <input type="checkbox" id="catalog_checkbox_toggle" class="dropdown_checkbox_toggle" />
  <label id="catalog_checkbox_label" class="labelButton dropdown_checkbox_label lightGreenish-shadow"
    for="catalog_checkbox_toggle">${catalogLogo()}Catalog</label>
  <ul>
    <li>
      <button id="smart-contracts-button" class="dropdown-button">
        ${SmartContractLogo()}<small>Smart Contracts</small>
      </button>
    </li>
    <li>
      <button id="view-proposals-button" class="dropdown-button">
        ${HarmonyLogo()}<small>Proposals(COMING SOON)</small>
      </button>
    </li>
    <li>
      <button id="create-proposal-button" class="dropdown-button">
        ${HarmonyLogo()}<small>Create proposal(COMING SOON)</small>
      </button>
    </li>
  </ul>
`;

