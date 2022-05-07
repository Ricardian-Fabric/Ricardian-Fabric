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
  IPFSLogo,
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
    title: "Total Supply (OneRIC)",
    id: "ric-total-supply",
    desc: "All the tokens were created and it's not possible to mint more.",
    logo: GoldBarsLogo(),
  },
  {
    title: "Locked in Vault (OneRIC)",
    id: "ric-in-vault",
    desc: "The amount of OneRIC currently locked in the vault.",
    logo: CryptoVaultLogo(),
  },
  {
    title: "For sale (OneRIC)",
    id: "ric-left-for-sale",
    desc: "Join the community by purchasing the native token, OneRIC.",
    logo: CardLookingLogo(),
  },
  {
    title: "Token Sale Rate",
    id: "ric-sale-rate",
    desc: "The amount of OneRIC for 1 ONE.",
    logo: RateLogo(),
  },
  {
    title: "Contributor Rewards (OneRIC)",
    id: "available-reward-amount",
    desc: "The rewards available for the catalogue contributors!",
    logo: Rewardhand(),
  },
  {
    title: "Available Contracts",
    id: "catalogue-contracts-amount",
    desc: "The amount of content in the smart contract catalogue",
    logo: AcceptedSmartContractLogo(),
  },
  {
    title: "Submitted Proposals",
    id: "smart-contract-proposals-amount",
    desc: "The amount of proposals submitted by contributors",
    logo: AllProposalsLogo(),
  },
  {
    title: "Contributor Stake (OneRIC)",
    id: "total-staking-amount",
    desc: "The amount of OneRIC securing the catalogue.",
    logo: StakingLogo("50"),
  },
  {
    title: "ONE Fees",
    id: "fees-collected-amount",
    desc: "Total amount of Harmony ONE Fees collected by the catalog apps that were submitted by the contributors.",
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
    <button
      title="Configure IPFS"
      class="labelButton"
      id="configure-ipfs-button"
    >
      ${IPFSLogo()}
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
  <slot id="permapinned-data-slot"></slot>
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

export const PermaPinnedData = (ipfsV2Url: string, nodes: any) => {
  return html`
    <div class="center"><h3>Latest pinned contracts</h3></div>
    <div class="overflow-auto card-shadow">
      <ul class="maxHeight-100px listStyleType-disclosureClosed">
        ${nodes.map((node) => {
          const [issuer, ipfsCID] = findTags(node.tags);
          return html`<li class="marginTop-50">
            <div class="column">
              <a
                href="https://${ipfsCID}.${ipfsV2Url}"
                target="_blank"
                rel="noopener"
                >${ipfsCID}</a
              >
              <div><label>Issued by: ${issuer}</label></div>
            </div>
          </li>`;
        })}
      </ul>
      <hr />
    </div>
  `;
};
function findTags(
  tags: Array<{ name: string; value: string }>
): [string, string] {
  let issuer = "";
  let ipfsCID = "";
  for (let i = 0; i < tags.length; i++) {
    if (tags[i].name === "Issuer") {
      issuer = tags[i].value;
    }
    if (tags[i].name === "IPFS-Add") {
      ipfsCID = tags[i].value;
    }
  }
  return [issuer, ipfsCID];
}
