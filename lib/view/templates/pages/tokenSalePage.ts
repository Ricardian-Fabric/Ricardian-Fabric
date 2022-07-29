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
        "PolyRIC for sale",
        "ric-left-for-sale-buy-page",
        "Join the community by purchasing the native token, PolyRIC",
        CardLookingLogo()
      )}
      ${dashEl(
        "Token Sale Rate",
        "ric-rate-buy-page",
        "The amount of PolyRIC you get for 1 MATIC",
        RateLogo()
      )}
    </div>
    <div class="text-align-center width-200 center">
      <h5>
        For <input type="number" id="buy-amount" /> MATIC, you get
        <span id="sell-rate"></span> PolyRIC
      </h5>
      <button class="labelButton" id="buy-ric" title="Buy PolyRIC" disabled>
        ${BuyIcon()}
      </button>
      <hr />

      <button
        id="add-to-wallet"
        class="labelButton"
        title="Add PolyRIC to Wallet"
      >
        <label>Add to Wallet</label>
      </button>
    </div>
  </div> `;

export const balanceDisplay = () => html`
  <div>
    Balance: ${TokenLogoIcon()}
    <span id="ricBalance" class="placeholder-item"></span>
    PolyRIC
  </div>
`;
