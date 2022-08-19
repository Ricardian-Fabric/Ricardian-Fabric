import { html, TemplateResult } from "lit-html";
import { DashboardUIElement } from "../../../types";
import { helperTooltips } from "../components/helperTooltips";
import {
  AcceptedSmartContractLogo,
  AllProposalsLogo,
  CardLookingLogo,
  contractFeesLogo,
  CryptoVaultLogo,
  GoldBarsLogo,
  RateLogo,
  Rewardhand,
  StakingLogo,
  TandCLogo,
  TokenPileLogo,
  VerificationLogo,
} from "../components/logos";
import { Marquee } from "../components/marquee";

export const dashBoardElementsTitles: DashboardUIElement[] = [
  {
    title: "Total Supply (PolyRIC)",
    id: "ric-total-supply",
    desc: "All the tokens were created and it's not possible to mint more.",
    logo: GoldBarsLogo(),
  },
  {
    title: "Locked in Vault (PolyRIC)",
    id: "ric-in-vault",
    desc: "The amount of PolyRIC currently locked in the vault.",
    logo: CryptoVaultLogo(),
  },
  {
    title: "For sale (PolyRIC)",
    id: "ric-left-for-sale",
    desc: "Join the community by purchasing the native token, PolyRIC.",
    logo: CardLookingLogo(),
  },
  {
    title: "Token Sale Rate",
    id: "ric-sale-rate",
    desc: "The amount of PolyRIC for 1 MATIC.",
    logo: RateLogo(),
  },
  {
    title: "Contributor Rewards (PolyRIC)",
    id: "available-reward-amount",
    desc: "The rewards available for the catalog contributors!",
    logo: Rewardhand(),
  },
  {
    title: "Available Contracts",
    id: "catalogue-contracts-amount",
    desc: "The amount of content in the smart contract catalog",
    logo: AcceptedSmartContractLogo(),
  },
  {
    title: "Submitted Proposals",
    id: "smart-contract-proposals-amount",
    desc: "The amount of proposals submitted by contributors",
    logo: AllProposalsLogo(),
  },
  {
    title: "Contributor Stake (PolyRIC)",
    id: "total-staking-amount",
    desc: "The amount of PolyRIC securing the catalog.",
    logo: StakingLogo("50"),
  },
  {
    title: "Polygon Fees",
    id: "fees-collected-amount",
    desc: "Total amount of Polygon MATIC Fees collected by the catalog apps that were submitted by the contributors.",
    logo: contractFeesLogo(),
  },
  {
    title: "Tokens for Fees",
    id: "token-fees-collected-amount",
    desc: "Available tokens to use when collecting fees.",
    logo: TokenPileLogo(),
  },
];
export const DashboardPage = () => html`
  <hr />
  ${Marquee()}
  <h3>Dashboard</h3>
  <div class="dashboard-layout">
    ${dashBoardElementsTitles.map((elmnts) =>
      dashEl(elmnts.title, elmnts.id, elmnts.desc, elmnts.logo)
    )}
  </div>
  <hr />

  <div class="row">
    <button
      title="Verify an acceptable contract"
      class="labelButton"
      id="verify-contract-button"
    >
      ${VerificationLogo()}
    </button>
    <a
      title="Terms and conditions"
      class="labelButton"
      id="terms-and-conditions-link"
      target="_blank"
      rel="noopener"
      >${TandCLogo()}</a
    >
  </div>
`;
// The dashboard elements will have a loading indicator at the id, then the value.
// It will side-effect like render it in an init function one by one as they fetch
export const dashEl = (
  title: string,
  id: string,
  tooltip: string,
  logo: TemplateResult
) => html`
  <div class="box rowSpacer">
    <div class="column width-100">${logo}</div>
    <div class="column">
      <div class="box-title text-align-center">
        <label>${title}</label>
        ${helperTooltips(tooltip)}
      </div>
      <div
        id="${id}"
        class="unselectable text-align-center placeholder-item height50 "
      ></div>
    </div>
  </div>
`;

export const loadedValueEl = (loadedValue) => html` <h4>${loadedValue}</h4>`;
