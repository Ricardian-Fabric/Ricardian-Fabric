import { html } from "lit-html";
import { ConnectWalletLogo, MetamaskLogo } from "../components/logos";

export const ConnectWalletPage = () =>
  html`
    <div class="intro-logo">
      <div class="">Ricardian Fabric DAO</div>

      <div class="center height200">
        <button
          id="connectWalletButton"
          class="labelButton width-200 marginTop-50 unselectable light-shadow"
        >
          <h2>Connect Your Wallet!</h2>
          ${ConnectWalletLogo()}
          <hr />
        </button>
      </div>
    </div>
  `;
