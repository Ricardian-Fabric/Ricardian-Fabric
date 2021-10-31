import { html } from "lit-html";
import { ContractTypes, State } from "../../../types";

export const transactionUrl = (props: State, url: string) => {
  return html`
    <style>
      .transaction-layout {
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }

      .permapin-button {
        box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
        border-radius: 20px;
        border: none;
        cursor: pointer;
        background: black;
        color: white;
        max-width: 200px;
        margin: 0 auto;
        padding: 5px;
        padding-left: 20px;
        padding-right: 20px;
      }
      .transaction-button-row {
        display: flex;
        flex-direction: row;
        justify-content: center;
      }
      .deploy-again {
        cursor: pointer;
        background-color: #f2f2f2;
        border-radius: 20px;
        padding: 5px;
        color: black !important;
        border: none;
      }
    </style>

    <div class="transaction-layout">
      <a class="center" aria-label="Link copied to clipboard" href="${url}"
        >Link copied to clipboard</a
      >
      <hr />
      <div class="transaction-button-row">
        <button id="permapin-deployed-button" class="permapin-button">
          Permapin to Arweave!
        </button>
        ${props.contracttype === ContractTypes.create
          ? html`
              <hr />
              <button class="deploy-again" id="deploy-again-button">
                Edit page again
              </button>
            `
          : null}
      </div>
      <hr />
    </div>
  `;
};