import { html } from "lit-html";
import { AppType, State } from "../../../types";
import {
  AgreementLogo,
  catalogLogo,
  Dashboard2,
  RewardsPageIcon,
  TokenSaleLogo,
  TrailsLogo,
  VaultLogo,
  VotingLogo,
} from "../components/logos";

export function MenuPage(state: State) {
  const DeploymentsPage = () => html`<hr />

<div class="text-align-center">
  <button class="lightSlateGray-shadow  labelButton" id="create-contract-button" title="Create a Ricardian contract">
    ${AgreementLogo()}
  </button>
</div>
<div class="text-align-center">
  <button title="Trails" class="lightSlateGray-shadow labelButton" id="trails-page-button">
    ${TrailsLogo()}
  </button>
</div>`;
  const DAOPage = () => html`
    <div class="text-align-center">
      <button class="lightSlateGray-shadow  labelButton" id="dashboard-button" title="Dashboard">
        ${Dashboard2()}
      </button>
    </div>
    <div class="text-align-center">
      <button title="DAO" class="lightSlateGray-shadow  labelButton" id="review-and-vote-button">
        ${VotingLogo()}
      </button>
      <div class="text-align-center">
        <button title="Fees" class="lightSlateGray-shadow labelButton" id="fees-button">
          ${RewardsPageIcon()}
        </button>
      </div>
      <div class="text-align-center">
        <button title="Vault" class="lightSlateGray-shadow labelButton" id="vault-button">
          ${VaultLogo()}
        </button>
      </div>
      <div class="text-align-center">
        <button title="Trails" class="lightSlateGray-shadow labelButton" id="trails-page-button">
          ${TrailsLogo()}
        </button>
      </div>
    </div>
  `;

  if (state.appType === AppType.deployments) {
    return DeploymentsPage();
  } else if (state.appType === AppType.dao) {
    return DAOPage();
  }
};
