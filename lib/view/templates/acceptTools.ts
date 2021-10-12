import { html } from "lit-html";
import { State } from "../../types";
import { didExpire } from "../utils";

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
    </style>
    ${expired
      ? html`
          <div
            aria-label="contract expired"
            class="center red"
            id="error-display"
          >
            Expired
          </div>
        `
      : html` <table class="center">
            <tr>
              <th></th>
              <th></th>
            </tr>
          </table>

          <div id="button-slot"></div>`}
  `;
};

export const AcceptButton = () => html`
  <style>
    .width-200 {
      width: 200px;
    }
  </style>
  <button
    aria-label="Accept and Sign"
    name="sign"
    id="accept-button"
    class="center width-200"
  >
    Accept
  </button>
`;
