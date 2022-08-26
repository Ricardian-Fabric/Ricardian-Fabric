import { html } from "lit-html";
import { helperTooltips } from "../components/helperTooltips";

export function VerifyContract ()  {
  return html` <h3>Verify a contract</h3>
    <table>
      <thead>
        <tr>
          <th></th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <label for="acceptable-contract-url">Acceptable Contract Url</label>
          </td>
          <td>
            <input id="acceptable-contract-url" type="text" />
          </td>
          <td>
            ${helperTooltips(
              "You should verify a contract before you accept it. Paste here the url."
            )}
          </td>
        </tr>
      </tbody>
    </table>
    <hr />
    <div id="verify-loading-indicator"></div>
    <div id="verify-result-display">
      <p>Add a url and click verify to proceed with the verification.</p>
    </div>
    <div class="wide-row">
      <button class="NextButton" id="verify-proceed">Verify!</button>
    </div>
    <hr />`;
};

export function VerifySuccess () {return html`<p style="color: green">Verification Succeeded! Contract is valid.</p>`};
export function VerifyFailure () {return   html`<p style="color: red">Verification Failed!</p>`};
