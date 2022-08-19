import { html, nothing } from "lit-html";
import { ContractTypes } from "../../../types";
import { EditAgainLogo, pinLogo } from "./logos";

export const transactionUrl = (props: any, url: string) => {
  return html`
    <style>
      .transaction-layout {
        display: flex;
        flex-direction: column;
        overflow: hidden;
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
      .deploy-again:hover {
        background-color: #ccc;
        transform: scale(1.01);
      }
    </style>

    <div class="transaction-layout">
      <a class="center" href="${url}" target="_blank" rel="noopener"
        >Link copied to clipboard</a
      >
      <hr />
        ${props.contracttype === ContractTypes.create
          ? html`
              <hr />
              <button class="deploy-again" id="deploy-again-button">
                ${EditAgainLogo()}Edit page again
              </button>
            `
          : nothing}
      <hr />
    </div>
  `;
};

export const TxId = (txId: string) =>
  html`<hr />
    <small>It might take a few minutes for the transaction to be mined.</small>
    <hr />
    <div class="text-align-center">
      <a
        href="https://viewblock.io/arweave/tx/${txId}"
        class="transaction-layout"
        target="_blank"
        rel="noopener"
        >Check it here.</a
      >
    </div>
    <hr />`;
