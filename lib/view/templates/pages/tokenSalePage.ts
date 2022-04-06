import { html } from "lit-html";
import {
  BuyIcon,
  CardLookingLogo,
  RateLogo,
  TokenLogoIcon,
} from "../components/logos";
import { dashEl } from "./dashboardPage";

export const TokenSalePage = () => html`<h3>Join the community</h3>
  ${balanceDisplay()}

  <div class="column">
    <div class="rowAround">
      ${dashEl(
        "RIC for sale",
        "ric-left-for-sale-buy-page",
        "Join the community by purchasing the native token, RIC",
        CardLookingLogo()
      )}
      ${dashEl(
        "Token Sale Rate",
        "ric-rate-buy-page",
        "The amount of RIC you get for 1 ONE",
        RateLogo()
      )}
    </div>
    <div class="text-align-center width-200 center">
      <h5>
        For <input type="number" id="buy-amount" /> ONE, you get
        <span id="sell-rate"></span> RIC
      </h5>
      <button class="labelButton" id="buy-ric" title="Buy RIC" disabled>
        ${BuyIcon()}
      </button>
      <hr />

      <button id="add-to-wallet" class="labelButton" title="Add RIC to Wallet">
        <label>Add to Wallet</label>
      </button>
    </div>
  </div> `;

export const balanceDisplay = () => html`
  <div>
    Balance: ${TokenLogoIcon()}
    <span id="ricBalance" class="placeholder-item"></span>
    RIC
  </div>
`;
