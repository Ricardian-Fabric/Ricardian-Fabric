import { html } from "lit-html";
import { ContractTypes, State } from "../../types";
import { BackLogo } from "./components/logos";

export const CreateSummary = (props: State) => {
  const centerText =
    props.contracttype === ContractTypes.create
      ? "Are you sure you want to deploy this agreement?"
      : "Are you sure you want to deploy the proof of signing?";

  return html`
    <style>
      .button-row {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
      }
      #no-button {
        box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
        border-radius: 20px;
        border: none;
        cursor: pointer;
      }
      #yes-button {
        box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
        border-radius: 20px;
        border: none;
        cursor: pointer;
        background: black;
        color: white;
      }
      #yes-button:hover{
       transform: scale(1.01);
       background-color: #ccc;
      }

      .details-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      .auto-overflow {
        overflow: auto;
      }

      .centerText {
        text-align: center;
      }
      .width-100 {
        width: 100px;
      }
    </style>
    <h3 class="centerText">${centerText}</h3>
    <div class="details-container">

      <div class="button-row">
        <button id="no-button" class="width-100">No</button>
        <button class="width-100" id="yes-button">Yes</button>
      </div>
    </div>
  `;
};
