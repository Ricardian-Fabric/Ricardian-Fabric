import { html } from "lit-html";
import {
  PaginatedProposal,
  RankProposal,
  RemovalProposal,
  SmartContractProposal,
} from "../../../types";
import { VOTINGPERIODBLOCKS } from "../../../wallet/web3";
import { getBlockie } from "../components/getBlockies";
import {
  AddDocumentImage,
  FeeProposalLogo,
  ManageAccountLogo,
  ProfitSharingLogo,
  TandCLogo,
  ThumbsDown,
  ThumbsUp,
  WebAsset,
} from "../components/logos";
import {
  getRankPagingButtons,
  getSmartContractPagingButtons,
  GetStatus,
  getStatusCondition,
} from "./manageProposals";

export function ReviewAndVote() {
  return html`
    <h3>DAO</h3>
    <div class="row">
      <button
        id="create-proposal-button"
        class="labelButton"
        title="Propose a new smart contract"
      >
        ${AddDocumentImage()}
      </button>
      <button id="my-proposals-button" class="labelButton" title="My proposals">
        ${ManageAccountLogo()}
      </button>
      <button
        id="fee-proposals-button"
        class="labelButton"
        title="Fee proposals"
      >
        ${FeeProposalLogo()}
      </button>
      <button id="profit-sharing-button" class="labelButton" title="Ar Sharing">
        ${ProfitSharingLogo()}
      </button>
      <a
        id="terms-and-conditions-button"
        class="labelButton"
        title="Terms and conditions"
        target="_blank"
        rel="noopener"
      >
        ${TandCLogo()}
      </a>
    </div>

    <div id="rank-proposal-table"></div>
    <hr />
    <div id="smart-contract-proposal-table"></div>
    <hr />
    <div id="removal-proposal-table"></div>
    <hr />
  `;
}

export function RankProposalTable(
  ranks: RankProposal[],
  rankIndexes: string[],
  blockNumber: number,
  totalPages: number,
  currentPage: number
) {
  let rankProposalTRs = [];
  for (let i = 0; i < rankIndexes.length; i++) {
    if (rankIndexes[i] !== "0") {
      rankProposalTRs.push({ rank: ranks[i], index: rankIndexes[i] });
    }
  }
  return html`
    <hr />
    <h5>New Rank</h5>
    <hr />
    <div class="overflow-auto">
      <table class="light-shadow width-100Percent minWidth-500px">
        <tr>
          <td><label>Index</label></td>
          <td><label>Creator</label></td>
          <td><label>Link</label></td>
          <td><label>Approve</label></td>
          <td><label>Reject</label></td>
          <td><label>Status</label></td>
          <td><label>Blocks left</label></td>
        </tr>
        ${rankProposalTRs.map((r) =>
          rankProposalTR(r.rank, r.index, blockNumber)
        )}
      </table>
    </div>
    <div>
      ${getRankPagingButtons(
        totalPages,
        currentPage,
        "rankPagePaginationButton"
      )}
    </div>
  `;
}

function rankProposalTR(
  rankProposal: RankProposal,
  index: string,
  blockNumer: number
) {
  const finished = getStatusCondition(blockNumer, rankProposal.createdBlock);
  const [approvalCSS, rejectionCSS] = getCSS(
    { approvals: rankProposal.approvals, rejections: rankProposal.rejections },
    finished
  );

  return html`<tr>
      <td><hr /></td>
      <td><hr /></td>
      <td><hr /></td>
      <td><hr /></td>
      <td><hr /></td>
    </tr>
    <tr>
      <td><label>${index}</label></td>
      <td>${getBlockie(rankProposal.creator, "50px", "")}</td>
      <td>
        <a
          class="labelButton"
          href="${rankProposal.repository}"
          target="_blank"
          rel="noopener"
          title="${rankProposal.repository}"
          >${WebAsset()}</a
        >
      </td>
      <td>
        <button
          class="labelButton rankProposalApproveButton ${approvalCSS}"
          data-index="${index}"
          title="${rankProposal.approvals}"
          ?disabled=${finished}
        >
          ${ThumbsUp()}
        </button>
      </td>
      <td>
        <button
          class="labelButton rankProposalRejectButton ${rejectionCSS}"
          data-index="${index}"
          title="${rankProposal.rejections}"
          ?disabled=${finished}
        >
          ${ThumbsDown()}
        </button>
      </td>
      <td>
        ${rankProposal.closed
          ? "Closed"
          : GetStatus(blockNumer, rankProposal.createdBlock)}
      </td>
      <td>
        <div>
          ${getExpiresElementTitle(rankProposal.createdBlock, blockNumer)}
        </div>
      </td>
    </tr>`;
}

export function getExpiresElementTitle(
  createdBlock: string,
  blockNumber: number
) {
  if (!getStatusCondition(blockNumber, createdBlock)) {
    return html`<small
      >${parseInt(createdBlock) + VOTINGPERIODBLOCKS - blockNumber}</small
    >`;
  } else {
    return "";
  }
}

export function RemovalProposalsTable(
  blockNumber: number,
  removalProposals: RemovalProposal[],
  indexes: string[],
  paging: PaginatedProposal
) {
  let removalProposalTRs = [];
  for (let i = 0; i < indexes.length; i++) {
    if (indexes[i] !== "0") {
      removalProposalTRs.push({
        removalProposals: removalProposals[i],
        index: indexes[i],
      });
    }
  }
  return html` <hr />
    <h5>Removal Requests</h5>
    <hr />
    <div class="overflow-auto">
      <table class="light-shadow width-100Percent minWidth-500px">
        <tr>
          <td><label>Index</label></td>
          <td><label>Creator</label></td>
          <td>
            <label
              title="Shows the index of the accepted proposal that is getting removed"
              >Removing</label
            >
          </td>
          <td><label>Discussion</label></td>
          <td><label>Malicious</label></td>
          <td><label>Approve</label></td>
          <td><label>Reject</label></td>
          <td><label>Status</label></td>
          <td><label>Blocks left</label></td>
        </tr>
        ${removalProposalTRs.map((c) =>
          RemovalRequestBuilder(c.removalProposals, c.index, blockNumber)
        )}
      </table>
    </div>
    <div>
      ${getSmartContractPagingButtons(
        paging.totalPages,
        paging.currentPage,
        "removalProposalPaginationButton",
        "removalProposal"
      )}
    </div>`;
}

export function RemovalRequestBuilder(
  proposal: RemovalProposal,
  index: string,
  blockNumber: number
) {
  const finished = getStatusCondition(blockNumber, proposal.createdBlock);
  const [approvalCSS, rejectionCSS] = getCSS(
    {
      approvals: proposal.approvals,
      rejections: proposal.rejections,
    },
    finished
  );
  return html`<tr>
    <td><label>${index}</label></td>
    <td>${getBlockie(proposal.creator, "50px", "")}</td>
    <td><label>${proposal.acceptedIndex}</label></td>
    <td>
      <a
        class="labelButton"
        href="${proposal.discussionUrl}"
        target="_blank"
        rel="noopener"
        title="${proposal.discussionUrl}"
        >${WebAsset()}</a
      >
    </td>
    <td><label>${proposal.malicious ? "YES" : "NO"}</label></td>
    <td>
      <button
        class="labelButton removalProposalApproveButton ${approvalCSS}"
        data-index="${index}"
        title="${proposal.approvals}"
        ?disabled="${finished}"
      >
        ${ThumbsUp()}
      </button>
    </td>
    <td>
      <button
        class="labelButton removalProposalRejectButton ${rejectionCSS}"
        data-index="${index}"
        title="${proposal.rejections}"
        ?disabled="${finished}"
      >
        ${ThumbsDown()}
      </button>
    </td>
    <td>
      ${proposal.closed
        ? "Closed"
        : GetStatus(blockNumber, proposal.createdBlock)}
    </td>
    <td>${getExpiresElementTitle(proposal.createdBlock, blockNumber)}</td>
  </tr> `;
}

export function SmartContractProposalsTable(
  blockNumber: number,
  smartContracts: SmartContractProposal[],
  indexes: string[],
  paging: PaginatedProposal
) {
  let smartContractProposalTRs = [];
  for (let i = 0; i < indexes.length; i++) {
    if (indexes[i] !== "0") {
      smartContractProposalTRs.push({
        smartContract: smartContracts[i],
        index: indexes[i],
      });
    }
  }

  return html` <hr />
    <h5>New smart contract proposals</h5>
    <hr />
    <div class="overflow-auto">
      <table class="light-shadow width-100Percent minWidth-500px">
        <tr>
          <td><label>Index</label></td>
          <td><label>Creator</label></td>
          <td><label>Contract</label></td>
          <td><label>Front end</label></td>
          <td><label>Fees</label></td>
          <td><label>Update </label></td>
          <td><label>Approve</label></td>
          <td><label>Reject</label></td>
          <td><label>Status</label></td>
          <td><label>Blocks left</label></td>
        </tr>
        ${smartContractProposalTRs.map((c) =>
          smartContractProposalTR(c.smartContract, c.index, blockNumber)
        )}
      </table>
    </div>
    <div>
      ${getSmartContractPagingButtons(
        paging.totalPages,
        paging.currentPage,
        "smartContractPagePaginationButton",
        "smartcontract"
      )}
    </div>`;
}

function smartContractProposalTR(
  smartContractProposal: SmartContractProposal,
  index: string,
  blockNumber: number
) {
  const finished = getStatusCondition(
    blockNumber,
    smartContractProposal.createdBlock
  );
  const [approvalCSS, rejectionCSS] = getCSS(
    {
      approvals: smartContractProposal.approvals,
      rejections: smartContractProposal.rejections,
    },
    finished
  );
  return html`<tr>
      <td><hr /></td>
      <td><hr /></td>
      <td><hr /></td>
      <td><hr /></td>
      <td><hr /></td>
      <td><hr /></td>
      <td><hr /></td>
      <td><hr /></td>
      <td><hr /></td>
    </tr>
    <tr>
      <td><label>${index}</label></td>
      <td>${getBlockie(smartContractProposal.creator, "50px", "")}</td>
      <td>
        <button
          class="contract-page-popup border-none cursor-pointer borderRadius5px"
          data-arweavetx="${smartContractProposal.arweaveTxId}"
          title="Uploaded proposal details"
        >
          ${getBlockie(smartContractProposal.arweaveTxId, "50px", "")}
        </button>
      </td>
      <td>
        <label>${smartContractProposal.hasFrontend ? "YES" : "NO"}</label>
      </td>
      <td>
        <label>${smartContractProposal.hasFees ? "YES" : "NO"}</label>
      </td>
      <td>
        <label
          title="${smartContractProposal.isUpdate
            ? "Update of Accepted Contract number " +
              smartContractProposal.updateOf
            : "Not an update"}"
          >${smartContractProposal.isUpdate
            ? smartContractProposal.updateOf
            : "NO"}</label
        >
      </td>
      <td>
        <button
          class="labelButton smartContractProposalApproveButton ${approvalCSS}"
          data-index="${index}"
          data-arweavetx="${smartContractProposal.arweaveTxId}"
          title="${smartContractProposal.approvals}"
          ?disabled=${finished}
        >
          ${ThumbsUp()}
        </button>
      </td>
      <td>
        <button
          class="labelButton smartContractProposalRejectButton ${rejectionCSS}"
          data-index="${index}"
          data-arweavetx="${smartContractProposal.arweaveTxId}"
          title="${smartContractProposal.rejections}"
          ?disabled=${finished}
        >
          ${ThumbsDown()}
        </button>
      </td>
      <td>
        ${smartContractProposal.closed
          ? "Closed"
          : IfSuspiciousCloseFinished(
              smartContractProposal,
              blockNumber,
              smartContractProposal.createdBlock,
              index
            )}
      </td>
      <td>
        <div>
          ${getExpiresElementTitle(
            smartContractProposal.createdBlock,
            blockNumber
          )}
        </div>
      </td>
    </tr>`;
}
function IfSuspiciousCloseFinished(
  smartContractProposal: SmartContractProposal,
  blockNumber: number,
  createdBlock: string,
  contractindex: string
) {
  if (
    parseInt(smartContractProposal.suspicious) > 9 &&
    !smartContractProposal.penalized
  ) {
    if (getStatusCondition(blockNumber, createdBlock)) {
      // If the condition that I use inside getStatus is true, it should return finished
      // In this case I return a button to close the suspicious proposal!
      return html`<button
        class="labelButton close-suspicious-proposal-buttons"
        data-index="${contractindex}"
      >
        Close
      </button>`;
    } else {
      return GetStatus(blockNumber, createdBlock);
    }
  } else {
    if (smartContractProposal.penalized) {
      return html`Penalized`;
    } else {
      return GetStatus(blockNumber, createdBlock);
    }
  }
}

function getCSS(
  smartContractProposal: { approvals: any; rejections: any },
  finished: boolean
): [string, string] {
  let approvalCSS = "";
  let rejectionCSS = "";
  const approvals = parseInt(smartContractProposal.approvals);
  const rejections = parseInt(smartContractProposal.rejections);

  if (finished) {
    if (approvals < 10) {
      // If the approvals are less than 10, its rejected;
      rejectionCSS = "background-lightcoral";
    } else if (rejections > approvals) {
      rejectionCSS = "background-lightcoral";
    } else if (approvals > rejections) {
      approvalCSS = "background-lightgreen";
    }
  }
  return [approvalCSS, rejectionCSS];
}
