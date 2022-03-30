import { html } from "lit-html";
import {
  BSCLogo,
  EthLogo,
  HarmonyLogo,
  networkLogo,
  PolygonLogo,
} from "../components/logos";

export const NetworkDropdown = () => html`
  <input
    type="checkbox"
    id="network_checkbox_toggle"
    class="dropdown_checkbox_toggle"
  />
  <button
    class="labelButton dropdown_checkbox_label lightBlue-shadow"
    id="network_checkbox_button"
    for="network_checkbox_toggle"
  >
    ${networkLogo()} Network
  </button>

  <ul>
    <li>
      <button id="network-hmny-mainnet-shard0" class="dropdown-button">
        ${HarmonyLogo()} <small>Harmony Mainnet Shard 0</small>
      </button>
    </li>
    <li>
      <button id="network-hmny-testnet-shard0" class="dropdown-button">
        ${HarmonyLogo()} <small>Harmony Testnet Shard 0</small>
      </button>
    </li>
    <li>
      <button id="ropsten-testnet" class="dropdown-button">
        ${EthLogo("10px")} <small>Ropsten Testnet</small>
      </button>
    </li>
    <li>
      <button id="bsc-testnet" class="dropdown-button">
        ${BSCLogo()} <small>BSC Testnet</small>
      </button>
    </li>
    <li>
      <button id="polygon-testnet" class="dropdown-button">
        ${PolygonLogo()} <small>Polygon Testnet</small>
      </button>
    </li>
    <li>
      <hr />
    </li>
  </ul>
`;
