import { html, nothing } from "lit-html";
import { State } from "../../../types";
import { didExpire } from "../../utils";
import { SupportedWallets } from "../pages/connectWalletPage";

export const acceptTools = (props: State) => {
  //Determine if expires is in the past or never
  const expired = didExpire(props.expires);

  return html`
    <style>
      .outter {
        display: flex;
        flex-direction: column;
      }
      .red {
        color: red;
      }
      #accept-button {
        box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
        border-radius: 20px;
        border: none;
        cursor: pointer;
      }
      #accept-button:hover {
        transform: scale(1.01);
      }
    </style>
    ${expired
      ? html` <div class="center red" id="error-display">Expired</div> `
      : html` <table class="center">
            <tr>
              <th></th>
              <th></th>
            </tr>
          </table>

          <div id="button-slot"></div>`}
  `;
};

export const AcceptButton = (positionNeeded: boolean) => {
  const labelEl = positionNeeded
    ? html`<div class="accept-button-label">
  This contract is not available in all countries.
</div>`
    : nothing;
  const buttonText = positionNeeded ? "Add location" : "Accept with ";
  return html`
    <style>
      .width-200 {
        width: 200px;
      }
      .ac-location {
        display: flex;
        flex-direction: column;
      }
      .accept-button-label {
        font-size: 0.8rem;
        color: grey;
        margin-bottom: 5px;
      }
      #accept-button{
        font-size: larger;
        background-color: !important white;
        color: !important black;
      }
    </style>
    <div class="ac-location">
      ${labelEl}
      <button name="Accept contract" id="accept-button" class="center width-200">
        ${buttonText}     ${SupportedWallets()}

      </button>
    </div>
    <hr/>
  `;
};
