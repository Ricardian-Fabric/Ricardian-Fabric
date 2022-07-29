import { html } from "lit-html";
import { Token, TokenProposal } from "../../../types";
import { FEEDAOADDRESS } from "../../../wallet/web3";
import { getBlockie } from "../components/getBlockies";
import { helperTooltips } from "../components/helperTooltips";
import {
  CopyLogo,
  Erc20Logo,
  ThumbsDown,
  ThumbsUp,
  WebAsset,
} from "../components/logos";
import { GetStatus, getStatusCondition } from "./manageProposals";
import { getExpiresElementTitle } from "./reviewAndVotePage";

export const FeeDaoPage = () =>
  html`
    <h3>Fee Dao</h3>
    <div class="row">
      <pre>${FEEDAOADDRESS}</pre>
      <button class="labelButton" id="copyFeeDaoAddress">${CopyLogo()}</button>
    </div>

    <small
      >Propose a new fee token
      <button id="proposeTokenPopupButton" class="labelButton">
        ${Erc20Logo()}
      </button></small
    >
    <small
      >The tokens displayed below can be used for fees in smart contract
      contributions. Implementing fees using a token will yield higher
      contribution rewards. Only Polygon is supported. Click to copy the token
      addresses.
    </small>
    <div id="tokenRow" class="tokenRow"></div>
    <hr />
    <div id="tokenProposals"></div>
  `;

export function proposeTokenPopup() {
  return html`<div class="column width-400">
      <h3>Propose a token</h3>
      <small
        >The token must be an ERC-20 and it must be deployed on Polygon.</small
      >
      <hr />
      <table>
        <tr>
          <th></th>
          <th></th>
          <th></th>
        </tr>
        <tr>
          <td><label class="width-400">Discussion Link:</label></td>
          <td><input type="url" id="discussionLinkInput" /></td>
          <td>
            ${helperTooltips("Link the discussion related to this token.")}
          </td>
        </tr>
        <tr>
          <td>
            <label class="width-400">Address:</label>
          </td>
          <td>
            <input type="text" id="contractProposalAddress" />
          </td>
          <td>
            ${helperTooltips("The address of the token, hosted on Polygon")}
          </td>
        </tr>
      </table>

      <div class="row">
        <button class="labelButton" id="proposalBackButton">Back</button>
        <button class="labelButton" id="proposeTokenButton">
          Propose token
        </button>
      </div>
    </div>
    <hr />`;
}

export function tokenRow(tokens: Token[]) {
  if (tokens.length === 0) {
    return html`<h4>No tokens available. Propose a new one!</h4>`;
  }
  return tokens.map((t) => renderTokens(t.name, t.token));
}

function renderTokens(tokenName: string, tokenAddress: string) {
  return html`
    <button
      data-address="${tokenAddress}"
      class="box width-100 cursor-pointer hoverccc tokenAddressCopy"
    >
      <hr />
      <div class="text-align-center">
        ${getBlockie(tokenAddress, "50px", "")}
      </div>
      <div class="text-align-center"><small>${tokenName}</small></div>
    </button>
  `;
}

export function TokenProposals(
  tokenProposal: TokenProposal[],
  blockNumber: number,
  myaddress: string
) {
  const indexedProposals: Array<{ proposal: TokenProposal; index: number }> =
    tokenProposal.map((p) => ({
      proposal: p,
      index: tokenProposal.indexOf(p),
    }));

  return html` <h6>Proposals</h6>
    <div class="overflow-auto">
      <table class="width-100Percent minWidth-500px">
        <thead>
          <tr>
            <td><label>Creator</label></td>
            <td><label>Name</label></td>
            <td><label>Discussion link</label></td>
            <td><label>Address</label></td>
            <td><label>Approvals</label></td>
            <td><label>Rejections</label></td>
            <td><label>Status</label></td>
            <td><label>Blocks left</label></td>
          </tr>
        </thead>
        <tbody>
          ${indexedProposals
            .slice()
            .reverse()
            .map((p) =>
              getTokenProposalRow(p.proposal, blockNumber, p.index, myaddress)
            )}
        </tbody>
      </table>
    </div>`;
}

function getTokenProposalRow(
  proposal: TokenProposal,
  blockNumber: number,
  index: number,
  myaddress: string
) {
  const finished = getStatusCondition(blockNumber, proposal.created);
  const [approvalCSS, rejectionCSS] = getCSS(
    {
      approvals: proposal.approvals,
      rejections: proposal.rejections,
    },
    finished
  );

  let status;
  if (finished && myaddress === proposal.creator) {
    status = html`<button
      data-index="${index}"
      class="labelButton tokenCloseButton"
    >
      Close
    </button>`;
  } else {
    status = GetStatus(blockNumber, proposal.created);
  }

  return html`<tr>
    <td>${getBlockie(proposal.creator, "50px", "")}</td>
    <td>${proposal.name}</td>
    <td>
      <a
        class="labelButton"
        href="${proposal.discussionURL}"
        target="_blank"
        rel="noopener"
        title="${proposal.discussionURL}"
        >${WebAsset()}</a
      >
    </td>
    <td>${getBlockie(proposal.proposal, "50px", "")}</td>
    <td>
      <button
        class="labelButton tokenApproveButton ${approvalCSS}"
        data-index="${index}"
        title="${proposal.approvals}"
        ?disabled=${finished}
      >
        ${ThumbsUp()}
      </button>
    </td>
    <td>
      <button
        class="labelButton tokenRejectButton ${rejectionCSS}"
        data-index="${index}"
        title="${proposal.rejections}"
        ?disabled=${finished}
      >
        ${ThumbsDown()}
      </button>
    </td>
    <td>${proposal.closed ? "Closed" : status}</td>
    <td><div>${getExpiresElementTitle(proposal.created, blockNumber)}</div></td>
  </tr>`;
}

export function getCSS(
  smartContractProposal: { approvals: any; rejections: any },
  finished: boolean
): [string, string] {
  let approvalCSS = "";
  let rejectionCSS = "";
  const approvals = parseInt(smartContractProposal.approvals);
  const rejections = parseInt(smartContractProposal.rejections);

  if (finished) {
    if (rejections > approvals) {
      rejectionCSS = "background-lightcoral";
    } else if (approvals > rejections) {
      approvalCSS = "background-lightgreen";
    }
  }
  return [approvalCSS, rejectionCSS];
}
