import { html, nothing } from "lit-html";
import { findConstructorParameters } from "../../../wallet/web3";
import { BackLogo, CopyLogo } from "../components/logos";
import { ProposalFormat } from "../../../types";

export function SCConstructorPopup(selected: ProposalFormat) {
  //Find the ABI of the proposal and

  const artifact = selected.artifact as any;

  let constructorParams = findConstructorParameters(artifact.abi);

  const getTypeFromType = (type: string) => {
    let checkedType = type;

    if (type.includes("int")) {
      checkedType = "number";
    }
    if (type.includes("fixed")) {
      checkedType = "number";
    }
    // In case it's address payable...
    if (type.includes("address")) {
      checkedType = "address";
    }

    if (type.includes("byte")) {
      checkedType = "byte";
    }

    switch (checkedType) {
      case "bool":
        return "checkbox";
      case "string":
        return "text";
      case "number":
        return "number";
      case "address":
        return "text";
      case "byte":
        return "text";
      default:
        return "text";
    }
  };

  const list = constructorParams.map((params) => {
    return html`<tr>
      <td>
        <label for="${params.name}-input"
          >${params.name} (${params.type}) :
        </label>
      </td>
      <td>
        <input
          id="${params.name}-input"
          type="${getTypeFromType(params.type)}"
        />
      </td>
      <td></td>
    </tr>`;
  });

  return html`
    <h4>Deploy ${selected.name}</h4>
    ${selected.simpleterms
      ? html`<small
          >This contract uses a Ricardian contract. The contract address will be
          set after deployment</small
        >`
      : nothing}
    <hr />
    ${list.length > 0
      ? html`<p>Constructor parameters:</p>
          <table>
            <thead>
              <tr>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              ${list}
            </tbody>
          </table>
          <small
            >Make sure you enter the correct details.This is
            non-reversible.</small
          >`
      : nothing}
    <div class="row">
      <label for="agree-to-deploy-sc">I agree to the terms.</label>
      <input
        id="agree-to-deploy-sc"
        aria-label="Agree to deploy checkbox"
        type="checkbox"
      />
    </div>
    <hr />
    <div>
      <button id="SCConstructBackButton" class="backButton">
        ${BackLogo()} Cancel
      </button>
      <button id="SCConstructCreateButton" class="NextButton">
        Create contract!
      </button>
    </div>
    <hr />
  `;
}

export function deploymentDonePopup() {
  return html`<h4>Successful deployment!</span></h4>
    <div id="contract-details" class="column width-400"></div>`;
}

export function deploymentDone(contractAddress: string, simpleTerms: boolean) {
  return html`
    <label>Contract is deployed to:</label>
    <div class="row">
      <pre class="overflow-auto">${contractAddress}</pre>
      <button
        class="labelButton"
        data-address="${contractAddress}"
        id="copyContractAddress"
      >
        ${CopyLogo()}
      </button>
    </div>
    <hr />
    ${simpleTerms
      ? html`<p>
          The contract uses a Ricardian Contract. Head over to the Ricardian
          contract editor, the smart contract field has been assigned with the
          address.
        </p>`
      : nothing}
    <div class="rowAround">
      <button
        class="labelButton width-50 text-align-center"
        id="dismiss-popup-button"
      >
        Done
      </button>
      <button id="head-over-button" class="labelButton">Go to Editor</button>
    </div>

    <hr />
  `;
}
