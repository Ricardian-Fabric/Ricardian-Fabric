import { html, nothing } from "lit-html";
import { BraveLogo, ConnectWalletLogo, MathWalletLogo, MetamaskLogo } from "../components/logos";

export function ConnectWalletPage() {
  return html`
    <div class="intro-logo">
      <div class="">Ricardian Fabric</div>
    
      <div class="center height200">
        <button id="connectWalletButton" class="labelButton width-200 marginTop-50 unselectable light-shadow">
          <h2>Connect Your Wallet</h2>
          ${SupportedWallets()}
          <hr />
        </button>
      </div>
    </div>
  `};

export const SupportedWallets = () => html`
<div class="column text-align-center">
  <div class="rowAround center">
    ${WindowDotWeb3WalletLogos()}
  </div>
</div>
`;

const WindowDotWeb3WalletLogos = () => html`${MetamaskLogo("40", "40")} ${BraveLogo("40", "40")} ${MathWalletLogo("40", "40")}`