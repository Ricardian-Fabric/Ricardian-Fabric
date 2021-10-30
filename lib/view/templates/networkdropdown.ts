import { html } from "lit-html";

export const NetworkDropdown = () => html`
  <input
    type="checkbox"
    id="network_checkbox_toggle"
    class="dropdown_checkbox_toggle"
  />
  <label
    class="labelButton dropdown_checkbox_label lightBlue-shadow"
    id="network_checkbox_label"
    for="network_checkbox_toggle"
  >
    Eth network
  </label>
  <ul>
    <li>
      <button id="ropsten-testnet" class="dropdown-button">
        Ropsten Testnet
      </button>
    </li>
    <li>
      <button id="bsc-testnet" class="dropdown-button">BSC Testnet</button>
    </li>
    <li>
      <button id="polygon-testnet" class="dropdown-button">
        Polygon Testnet
      </button>
    </li>
    <li>
      <button id="network-hmny-testnet-shard0" class="dropdown-button">
        Harmony Testnet Shard 0
      </button>
    </li>
    <li><hr /></li>
  </ul>
`;

export const HarmonyLogo = () => html` <style>
    .harmony-logo {
      width: 20px;
    }
  </style>
  <svg
    class="harmony-logo"
    id="Layer_1"
    data-name="Layer 1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 180 179.51"
  >
    <defs>
      <linearGradient
        id="linear-gradient"
        x1="202.93"
        y1="544.7"
        x2="203.8"
        y2="545.57"
        gradientTransform="matrix(180, 0, 0, -179.51, -36456, 98005.23)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stop-color="#00aee9" />
        <stop offset="1" stop-color="#69fabd" />
      </linearGradient>
    </defs>
    <title>harmony-one-logo</title>
    <path
      id="Shape"
      d="M201.17,60a38.81,38.81,0,0,0-38.84,38.71v42.92c-4,.27-8.09.44-12.33,0.44s-8.31.17-12.33,0.41V98.71a38.84,38.84,0,0,0-77.67,0V201.29a38.84,38.84,0,0,0,77.67,0V158.37c4-.27,8.09-0.44,12.33-0.44s8.31-.17,12.33-0.41v43.77a38.84,38.84,0,0,0,77.67,0V98.71A38.81,38.81,0,0,0,201.17,60ZM98.83,75.86a22.91,22.91,0,0,1,22.92,22.85v45.45a130.64,130.64,0,0,0-33,9.33,60,60,0,0,0-12.8,7.64V98.71A22.91,22.91,0,0,1,98.83,75.86Zm22.92,125.43a22.92,22.92,0,1,1-45.84,0V191c0-9.09,7.2-17.7,19.27-23.06a113,113,0,0,1,26.57-7.77v41.12Zm79.42,22.85a22.91,22.91,0,0,1-22.92-22.85V155.84a130.64,130.64,0,0,0,33-9.33,60,60,0,0,0,12.8-7.64v62.42A22.91,22.91,0,0,1,201.17,224.14ZM204.82,132a113,113,0,0,1-26.57,7.77V98.71a22.92,22.92,0,1,1,45.84,0V109C224.09,118.05,216.89,126.66,204.82,132Z"
      transform="translate(-60 -60)"
      style="fill:url(#linear-gradient)"
    />
  </svg>`;
