import { html, nothing, TemplateResult } from "lit-html";
import { ArweaveDataPage } from "../../../types";
import { helperTooltips } from "../components/helperTooltips";
import {
  arweaveLogo,
  ChevronLeftBlack,
  ChevronRightBlack,
  CommentLogo,
  CopyLogo,
  DownloadLogo,
  RefreshLogo,
  RemoveIcon,
} from "../components/logos";
import {
  getPageButtonEndPoint,
  getPageButtonStartPoint,
} from "../components/paginations";
import DOMPurify from "dompurify";

export const TrailsPage = () => html`
  <h3>Trails</h3>
    <div class="rowStart">
    <div id="permaweb-dropdown"></div>
  </div>
  
  <div class="center" id="search-container">${FindTrail()}</div>
`;

export const FindTrail = () => html`<div class="column">
  <p>
    A Trail is just a name that helps search for and organize files uploaded to
    Arweave. You can comment on a trail, by adding the name to the upload and
    leaving a message. You can link a transaction in comments that can be
    uploaded files, or a comment to reply to.
  </p>
  <table>
    <tr>
      <td>
        <label>Trail Name:</label>
      </td>
      <td><input id="trail-id" type="text" /></td>
      <td>${helperTooltips("The name of the trail to search for.")}</td>
    </tr>
    <tr>
      <td>
        <label>Arweave Address:</label>
      </td>
      <td>
        <input id="trail-creator-address" type="text" />
      </td>
      <td>${helperTooltips("Optional. The address of the uploader.")}</td>
    </tr>
  </table>
  <div class="text-align-center">
    <button class="labelButton width-100" id="trail-find">Find</button>
  </div>
  <div id="trail-search-result"></div>
</div>`;

export const FoundTrail = (name: string, uploaderAddress: string) => {
  return html`<div class="column">
    <hr />
    <h2 class="center">${name}</h2>
    <small class="center">${uploaderAddress}</small>
    <hr />
    <div class="center">
      <button title="Refresh" id="refresh-button" class="labelButton width-50">
        ${RefreshLogo()}
      </button>
      <button
        title="Copy Trail Link"
        class="labelButton width-50 center"
        id="copyTrail"
        data-name="${name}"
        data-address="${uploaderAddress}"
      >
        ${CopyLogo()}
      </button>
      <button
        title="Add Comment"
        class="labelButton width-50 center"
        id="addCommentOnTrailButton"
        data-name="${name}"
        data-address="${uploaderAddress}"
      >
        ${CommentLogo()}
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
  let pageButtons : TemplateResult[] = [];
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
