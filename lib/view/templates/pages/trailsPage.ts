import { html, nothing } from "lit-html";
import { ArweaveDataPage } from "../../../types";
import { helperTooltips } from "../components/helperTooltips";
import {
  ChevronLeftBlack,
  ChevronRightBlack,
  CopyLogo,
  DownloadLogo,
  Footsteps,
  RefreshLogo,
  RemoveIcon,
  SearchLogo,
  SignPost,
} from "../components/logos";
import {
  getPageButtonEndPoint,
  getPageButtonStartPoint,
} from "../components/paginations";
import DOMPurify from "dompurify";

export const TrailsPage = () => html`<h3>Trails</h3>
  <small>Create a new trail or search for an existing one</small>
  <div class="row">
    <div id="permaweb-dropdown"></div>
    <button id="search-trail-tab" class="labelButton" title="Search">
      ${SearchLogo()}
    </button>
    <button id="create-trail-tab" class="labelButton" title="Create new trail">
      ${SignPost()}
    </button>
  </div>
  <hr />
  <div class="center">${Footsteps()}</div>
  <div class="center" id="search-container">${FindTrail()}</div>
  <div class="center display-none" id="create-container">
    ${CreateTrail()}
  </div> `;

const CreateTrail = () => html`
  <div class="column">
    <h4>Create a new Trail</h4>
    <table>
      <tr>
        <th></th>
        <th></th>
        <th></th>
      </tr>
      <tr>
        <td><input type="text" id="new-trail-input" /></td>
        <td></td>
        <td>
          ${helperTooltips(
            "The trail identifier, can be any human readable text.."
          )}
        </td>
      </tr>
      <tr>
        <td><label for="access-input">Private</label></td>
        <td><input type="checkbox" id="access-input" /></td>
        <td>
          ${helperTooltips(
            "Private means, only the creator's comments will be visible, if this is unchecked, anyone can comment on the trail!"
          )}
        </td>
      </tr>
    </table>
    <button id="add-new-trail" class="labelButton">Create the trail!</button>
  </div>
`;

export const FindTrail = () => html`<div class="column">
  <h4>Search for a trail</h4>
  <input id="trail-id" type="text" />
  <button class="labelButton" id="trail-find">Find</button>

  <hr />

  <div id="trail-search-result"></div>
</div>`;

export const FoundTrail = (
  name: string,
  access: string,
  creatorCalls: boolean
) => {
  let creatorUi = nothing;
  if (access === "private" && creatorCalls) {
    creatorUi = html`
      <table>
        <tr>
          <th></th>
          <th></th>
          <th></th>
        </tr>
        <tr>
          <td><label for="add-tx-input">TransactionId:</label></td>
          <td><input type="text" id="add-tx-input" /></td>
          <td>
            <button class="labelButton" id="private-add-txid">Add</button>
          </td>
        </tr>
      </table>
    `;
  }
  return html`<div class="column">
    <hr />
    <h2 class="center">${name}</h2>
    <small class="center">This is a ${access} trail.</small>
    ${creatorUi}
    <hr />
    <div class="center">
      <button title="Refresh" id="refresh-button" class="labelButton width-50">
        ${RefreshLogo()}
      </button>
    </div>
    <div id="trail-content-display" class="placeholder-item"></div>
  </div>`;
};
export const TrailData = (dataPage: ArweaveDataPage, creatorCalls: boolean) => {
  const url = "https://arweave.net/";

  const display = dataPage.currentContent.map(
    (content) => html`<li class="trailListElement">
      <div class="row-spaceBetween">
        <div class="overflow-auto width-100Percent">
          <div class="height-100Percent width-100Percent">
            <button
              data-txid="${content.txId}"
              class="text-align-center labelButton copy-txid-buttons"
              title="Copy transaction id"
            >
              ${CopyLogo()}
            </button>
            ${content.linkedTransaction === ""
              ? nothing
              : html` <a
                  class="labelButton"
                  href="${url}${content.linkedTransaction}"
                  target="_blank"
                  rel="noopener"
                  title="Download linked transaction."
                  >${DownloadLogo()}</a
                >`}
            <div class="overflow-auto">
              <pre>${content.txId}</pre>
            </div>
          </div>
        </div>

        ${creatorCalls
          ? html`<button
              data-txid="${content.txId}"
              class="border-none cursor-pointer blacklist-button"
            >
              ${RemoveIcon()}
            </button>`
          : nothing}
      </div>

      <small>${content.created}</small>

      <hr />
      <div class="overflow-auto">
        ${content.metadisplay === ""
          ? nothing
          : html`<label
              >${content.linkedContractType === "Trail"
                ? html`<strong>Replying to:</strong>`
                : html`<strong>Linked Content-Type:</strong>`}
              ${content.metadisplay}</label
            >`}
      </div>
      <hr />
      <div class="comment-display">
        <small class="overflow-auto">
          ${content.hadError
            ? "Error occurred while loading the transaction!"
            : DOMPurify.sanitize(content.comment)}
        </small>
      </div>
      <hr />
    </li>`
  );

  return html`<ul id="trailUl" class="trailList">
      ${display}
    </ul>
    <div class="text-align-center">
      ${getTrailPagingButtons(
        dataPage.totalPages,
        dataPage.currentPage,
        "trail-paging-buttons"
      )}
    </div>`;
};

export function getTrailPagingButtons(
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
        data-trailpage="${i}"
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

  return html` <button
      id="trail-first-page"
      data-trailpage="${currentPage}"
      data-totalpages="${totalPages}"
      class="labelButton ${currentPage === 1
        ? "background-ccc cursor-notallowed"
        : nothing}"
    >
      First page
    </button>
    <button
      id="trail-page-left"
      data-trailpage="${currentPage}"
      data-totalpages="${totalPages}"
      class="labelButton ${currentPage === 1
        ? "background-ccc cursor-notallowed"
        : nothing}}"
    >
      ${ChevronLeftBlack()}</button
    >${pageButtons.map((res) => res)}<button
      id="trail-page-right"
      data-trailpage="${currentPage}"
      data-totalpages="${totalPages}"
      class="labelButton ${currentPage === totalPages
        ? "background-ccc cursor-notallowed"
        : nothing}"
    >
      ${ChevronRightBlack()}
    </button>
    <button
      id="trail-last-page"
      data-trailpage="${currentPage}"
      data-totalpages="${totalPages}"
      class="labelButton ${currentPage === totalPages
        ? "background-ccc cursor-notallowed"
        : nothing}"
    >
      Last page
    </button>`;
}
