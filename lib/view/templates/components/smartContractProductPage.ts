import { html, nothing } from "lit-html";
import { ProposalFormat } from "../../../types";
import { getBlockie } from "./getBlockies";
import { BugLogo, DownloadLogo, RocketLogo } from "./logos";

export function smartContractProductPage(
  arweaveTxId: string,
  proposal: ProposalFormat,
  preview: boolean,
  index: string
) {
  return html`
    <div class="row">
      <div id="termsContent" class="column width-70Percent"></div>
      <div class="display-block width-30Percent">
        <hr />
        <div class="text-align-center">
          ${getBlockie(arweaveTxId, "40px", "")}
        </div>
        <hr />
        <table>
          <tr>
            <th></th>
            <th></th>
          </tr>
          <tr>
            <td><label>Name:</label></td>
            <td><small>${proposal.name}</small></td>
          </tr>
          <tr>
            <td>
              <label>Category:</label>
            </td>
            <td><small>${proposal.category}</small></td>
          </tr>
          <tr>
            <td><label>Network:</label></td>
            <td><small>${proposal.network}</small></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
          </tr>
        </table>
        <div class="text-align-center">
          ${proposal.simpleterms
            ? html` <label>Implements Simple terms</label> `
            : nothing}
        </div>
        <hr />
        <div class="text-align-center">
          <a href="${proposal.git}" target="_blank" rel="noopener">Github</a>
        </div>
        ${proposal.frontEnd !== ""
          ? html` <div class="text-align-center column">
              <a href="${proposal.frontEnd}" target="_blank" rel="noopener"
                >Front End</a
              >
            </div>`
          : nothing}
        <hr />
        ${preview
          ? nothing
          : html` <div class="text-align-center">
              <button
                data-arweavetxid="${arweaveTxId}"
                data-name="${proposal.name}"
                id="deploy-button"
                class="labelButton width-100"
                ?disabled=${preview}
              >
                ${RocketLogo()} Deploy
              </button>
            </div>`}
        <hr />
        ${preview || proposal.terms === ""
          ? nothing
          : html` <div class="text-align-center">
              <button id="download-terms-button" class="labelButton width-100">
                ${DownloadLogo()}Downloads
              </button>
            </div>`}
        <hr />
        ${preview
          ? nothing
          : html` <div class="text-align-center">
              <button
                id="remove-sc-button"
                class="labelButton width-100"
                data-index="${index}"
              >
                ${BugLogo()} Report
              </button>
            </div>`}
        <hr />
      </div>
    </div>
    <hr />
    <hr />
    <hr />
  `;
}
