import { html, nothing } from "lit-html";
import { ContractTypes, State } from "../../../types";
import { WinstonToAr } from "../../../wallet/arweave";
import { arweaveLogo } from "./logos";

export const CreateSummary = (props: State) => {
  let feeInWinston = parseFloat(props.stashedDetails?.arweaveTx.reward);
  feeInWinston += parseFloat(props.stashedDetails?.tipTransaction.reward);
  feeInWinston += parseFloat(props.stashedDetails?.tipTransaction.quantity);

  const centerText =
    props.contracttype === ContractTypes.create
      ? "Are you sure you want to deploy this Ricardian Contract?"
      : "Are you sure you want to sign this contract?";

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
 <hr/>
 ${props.contracttype === ContractTypes.create ? html`
 <table class="center">
  <tr>
    <td>
      <label>Arweave Transaction Fee: </label>
    </td>
    <td>
      <label>${WinstonToAr(feeInWinston.toString())} ${arweaveLogo()}</label>
    </td>
  </tr>
</table>` : nothing}

 <hr/>
    <div class="details-container">

      <div class="button-row">
        <button id="no-button" class="width-100">No</button>
        <button class="width-100" id="yes-button">Yes</button>
      </div>
    </div>
  `;
};
