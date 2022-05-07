import { html } from "lit-html";
import { getChains } from "../../../wallet/web3";
import { helperTooltips } from "../components/helperTooltips";
import {
  ChevronRightBlack,
  SpendLogo,
  StakingLogo,
  TokenLogoIcon,
} from "../components/logos";

export function createProposalPage() {
  return html`
    <h3>Create a Proposal</h3>
    <div class="row">
      <div id="permaweb-dropdown">Permaweb</div>
      <button
        class="labelButton light-shadow"
        id="stake-3000-ric"
        title="Stake 3000 OneRIC to start contributing to the catalogue."
        disabled
      >
        ${StakingLogo("30")} Stake
      </button>
      <button
        class="labelButton light-shadow"
        id="approve-stake-spend"
        title="Approve 3000 OneRIC to allow staking "
        disabled
      >
        ${SpendLogo()} Approve
      </button>
      <hr />
      <div class="labelButton center">
        ${TokenLogoIcon()}<span id="ricBalance"></span> OneRIC
      </div>
    </div>
    <h4 id="rankHeader"></h4>
    <div id="loading-display" class="text-align-center"></div>
    <div id="proposeNewContract">${proposeNewContract()}</div>
    <div id="proposeNewRank">${proposeGetRank()}</div>
    <div id="proposalPending">${proposalPending()}</div>
  `;
}

function proposalPending() {
  return html` <small
    >You need to close your last proposal before you can create a new
    one!</small
  >`;
}

function proposeGetRank() {
  return html`
    <small>You need to get Rank to propose a new smart contract.</small>
    <small
      >To create a proposal, first you need to stake and approve spend, then add
      the required discussion's link you opened on github.</small
    >
    <hr />

    <div class="row">
      <label for="github-url">Discussion</label>

      <input id="github-url" type="url" />

      <button id="create-rank-proposal" class="labelButton" disabled>
        ${ChevronRightBlack()}
      </button>

      ${helperTooltips("A Link to an open discussion.")}
    </div>

    <hr />
  `;
}

export function getNetworkSelect() {
  const chains = getChains();

  return chains.map((ch) => html`<option value="${ch.id}">${ch.name}</option>`);
}

function proposeNewContract() {
  return html`
    <small
      >You can propose a new smart contract. The DAO will decide if it's
      eligible to be added to the catalog.Proposal data is uploaded to the
      permaweb. Make sure you fill out the form correctly, otherwise your
      proposal will not pass!</small
    >
    <table class="center width-100Percent box-value padding-10px">
      <tr>
        <th></th>
        <th></th>
        <th></th>
      </tr>
      <tr>
        <td><label for="has-frontend-input">Has front end?</label></td>
        <td><input id="has-frontend-input" type="checkbox" /></td>
        <td>
          ${helperTooltips(
            "Does the contract have a front end uploaded to arweave?"
          )}
        </td>
      </tr>
      <tr>
        <td><label for="has-fees-input">Has Fees:</label></td>
        <td><input id="has-fees-input" type="checkbox" /></td>
        <td>${helperTooltips("Does the contract have fees implemented?")}</td>
      </tr>
      <tr>
        <td><label for="is-update-input">is it an Update?</label></td>
        <td><input id="is-update-input" type="checkbox" /></td>
        <td>
          ${helperTooltips("Are you updating a previously added contract?")}
        </td>
      </tr>
      <tr>
        <td><label for="of-update-input">Updating:</label></td>
        <td><input id="of-update-input" type="number" disabled /></td>
        <td>
          ${helperTooltips(
            "The index of the contract that is getting updated!"
          )}
        </td>
      </tr>
      <tr>
        <td><label for="proposal-tx-id">Proposal Tx Id:</label></td>
        <td><input id="proposal-tx-id" type="text" /></td>
        <td>
          <button class="labelButton" id="proposal-submit-button">
            ${ChevronRightBlack()}
          </button>
        </td>
      </tr>
    </table>
  `;
}
