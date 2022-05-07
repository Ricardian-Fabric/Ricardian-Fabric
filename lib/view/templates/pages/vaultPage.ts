import { html, nothing } from "lit-html";
import { LockedTokens } from "../../../types";
import {
  ChevronLeftBlack,
  ChevronRightBlack,
  KeyImage,
  LockImage,
  SpendLogo,
  TokenLogoIcon,
  ToyBlocks,
} from "../components/logos";
import {
  getPageButtonEndPoint,
  getPageButtonStartPoint,
} from "../components/paginations";
import { balanceDisplay } from "./tokenSalePage";

export const VaultPage = () => html`<h3>Vault</h3>
  ${balanceDisplay()} ${blockDisplay()}
  <h6>
    You can lock Ric and release it after the blocks specified. The Ric you use
    while claiming Fees will go here.
  </h6>
  <hr />
  <div class="text-align-center center">
    <table class="width-200 box">
      <tr>
        <th></th>
        <th></th>
        <th></th>
      </tr>
      <tr>
        <td>Lock</td>
        <td>
          <input
            type="number"
            id="lock-amount"
            class="width-50"
            placeholder="0"
          />
        </td>
        <td>${TokenLogoIcon()} OneRIC</td>
      </tr>
      <tr>
        <td>For</td>
        <td>
          <input
            type="number"
            id="lock-time"
            class="width-50"
            placeholder="0"
          />
        </td>
        <td>${ToyBlocks()} Blocks</td>
      </tr>
      <tr>
        <td class="width-50">
          <button
            id="approve-vault-button"
            title="Approve spend for the vault"
            class="labelButton"
          >
            ${SpendLogo()} Approve
          </button>
        </td>
        <td><hr /></td>
        <td class="width-50">
          <button class="labelButton" id="lock-button" title="Lock Ric">
            ${LockImage()} Lock
          </button>
        </td>
      </tr>
    </table>
    <small
      >Approved <span class="placeholder-item" id="spend"> </span> RIC to
      spend</small
    >
  </div>
  <hr />
  <div id="vault-item-container" class="placeholder-item">
    <hr />
    <h3 class="center">Loading Vault</h3>
    <hr />
  </div> `;

export const VaultItems = (
  lockedTokens: LockedTokens[],
  firstIndex: number,
  lastIndex: number,
  currentPage: number,
  totalPages: number
) => {
  let indexes = [];
  for (let i = firstIndex; i <= lastIndex; i++) {
    indexes.push(i);
  }

  return html`<hr />
    <div class="rowAround text-align-center">
      ${lockedTokens.map((token) =>
        VaultItem(token, indexes[lockedTokens.indexOf(token)], currentPage)
      )}
    </div>
    <hr />
    <div class="text-align-center">
      ${getVaultPagingButtons(totalPages, currentPage, "vaultPagingButtons")}
    </div> `;
};

export const VaultItem = (
  lockedToken: LockedTokens,
  index: number,
  currentpage: number
) => html` <div class="box padding-20 marginBottom-10">
  <div
    data-forperiod="${lockedToken.period}"
    data-created="${lockedToken.created}"
    data-index="${index}"
    data-released="${lockedToken.released}"
    class="all-blocks-left"
    id="${"blocksleft" + index}"
  ></div>
  <div class="box-title">
    Amount: ${TokenLogoIcon()}${lockedToken.lockedAmount} OneRIC
  </div>
  <div>
    ${lockedToken.released
      ? html`<p>Relased</p>`
      : html`<button
          disabled
          data-lockindex="${index}"
          data-currentpage=${currentpage}
          class="labelButton vaultReleaseButtons"
          id="vaultRelease_${index}"
        >
          ${KeyImage()} Release
        </button>`}
  </div>
</div>`;

export const blockDisplay = () => html`
  <div>
    Current block: ${ToyBlocks()}
    <span id="current-block" class="placeholder-item"></span>
  </div>
`;

export function getVaultPagingButtons(
  totalPages: number,
  currentPage: number,
  cssselector: string
) {
  let pageButtons = [];
  const start = getPageButtonStartPoint(totalPages, currentPage);
  const end = getPageButtonEndPoint(totalPages, currentPage);

  for (let i = start; i <= end; i++) {
    pageButtons.push(
      html` <button
        data-vaultpage="${i}"
        class="${cssselector} labelButton ${currentPage === i
          ? "light-shadow"
          : null}"
      >
        ${i}
      </button>`
    );
  }

  if (pageButtons.length === 1) {
    return null;
  }

  return html`
    <button
      id="vault-first-page"
      data-vaultpage="${currentPage}"
      data-totalpages="${totalPages}"
      class="labelButton ${currentPage === 1
        ? "background-ccc cursor-notallowed"
        : nothing}"
    >
      First page
    </button>
    <button
      id="vault-page-left"
      data-vaultpage="${currentPage}"
      data-totalpages="${totalPages}"
      class="labelButton ${currentPage === 1
        ? "background-ccc cursor-notallowed"
        : nothing}}"
    >
      ${ChevronLeftBlack()}</button
    >${pageButtons.map((res) => res)}<button
      id="vault-page-right"
      data-vaultpage="${currentPage}"
      data-totalpages="${totalPages}"
      class="labelButton ${currentPage === totalPages
        ? "background-ccc cursor-notallowed"
        : nothing}"
    >
      ${ChevronRightBlack()}
    </button>
    <button
      id="vault-last-page"
      data-vaultpage="${currentPage}"
      data-totalpages="${totalPages}"
      class="labelButton ${currentPage === totalPages
        ? "background-ccc cursor-notallowed"
        : nothing}"
    >
      Last page
    </button>
  `;
}

export const LoadingVault = () => html` <hr />
  <h3 class="center">Loading Vault</h3>
  <hr />`;

export const EmptyVault = () => html` <hr />
  <h3 class="center">No vault history</h3>
  <hr />`;
