import { html } from "lit-html";
import {
  BuyIcon,
  CardLookingLogo,
  CrowdfundLogo,
  RateLogo,
  RicardianFabricLogoWithStyle,
  TokenLogoIcon,
} from "../components/logos";
import { dashEl } from "./dashboardPage";

export function TokenSalePage() {
  return  html`<h1>${CrowdfundLogo()} Crowdfund the Hackathon DAO</h1>
  <h3>Buy PolyRIC, The Ricardian Fabric Hackathon Token on Polygon!</h3>
  <p><strong>How does it works?</strong> A total supply of 4 million tokens has been minted. We offer 50% for sale to bootstrap the DAO, to raise 200k at 10 cents/token (Pay with MATIC). The remaining 50% are Hackathon rewards, our DAO smart contracts pay contributors automatically for developing Zero-Code DApps that can be deployed from Ricardian Fabric.</p>
  
  <p> <strong>The Hackathon DAO uses Arweave and Polygon.</strong>The PolyRIC token is used to withdraw fees collected by the smart contracts submitted through the Hackathon and to pay hackathon contributors for their submissions. The more we Buidl, the more it's worth!</p>
  <hr/>
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
      <button style="background-color: lightpink;" class="labelButton" id="buy-ric" title="Buy PolyRIC" disabled>
        ${BuyIcon()}
      </button>
      <hr />

      <button
        id="add-to-wallet"
        class="labelButton"
        title="Add PolyRIC to Wallet"
      >
        Click here to add the ERC-20 tokens to your wallet!
      </button>
    </div>
    <div class="text-align-center">
      <p>If you wish to purchase more than 10% of the total supply (400.000 tokens) you must send us your KYC details to kyc@ricardianfabric.com  . We need this if we want to incorporate the DAO as a legal entity later.</p>
    </div>

    <hr/>
   <div class="text-align-center column">
    <h4 class="text-align-center" style="margin-bottom: 10px;">Hackathon Coming Soon on </h4>
    <div class="rowAround">
      <div class="row">${RicardianFabricLogoWithStyle("margin-top: 12px;margin-right: 5px;")}<h2 class="text-align-center" style="margin-bottom: 20px;">  Ricardian Fabric DAO</h2></div>

    <img src="https://i5sbbx4ospbewtk26avy5l4dlhpaixzxbqfgmbbu3xopsbx2lpba.arweave.net/R2QQ346TwktNWvArjq-DWd4EXzcMCmYENN3c-Qb6W8I" width="200"/>

    </div>
  </div>

  </div> `};

export function balanceDisplay() {
  return  html`
  <div>
    Balance: ${TokenLogoIcon()}
    <span id="ricBalance" class="placeholder-item"></span>
    PolyRIC
  </div>
`};
