import { html } from "lit-html";
import { ContractTypes, PageState } from "../../../types";
import {
  accountLogo,
  arweaveLogo,
  BallotLogo,
  CommentLogo,
  pinLogo,
  SaveLogo,
  uploadLogo,
} from "../components/logos";

export const PermawebDropdown = (
  contractType: ContractTypes,
  page: PageState
) => {
  return html`
    <input
      type="checkbox"
      id="permaweb_checkbox_toggle"
      class="dropdown_checkbox_toggle"
    />
    <button
      class="labelButton dropdown_checkbox_label lightCoral-shadow"
      id="permaweb_checkbox_button"
      for="permaweb_checkbox_toggle"
    >
      ${arweaveLogo()} Permaweb
    </button>
    <ul>
      <li>
        <button id="Account-popup-button" class="dropdown-button">
          <small>${accountLogo()} Account</small>
        </button>
      </li>
      ${getDropdowns(contractType, page)}
    </ul>
  `;
};

function getDropdowns(contractType: ContractTypes, page: PageState) {
  switch (contractType) {
    case ContractTypes.create:
      switch (page) {
        case PageState.CreateRicardian:
          return html`
            <li>
              <button id="upload-popup-button" class="dropdown-button">
                <small>${uploadLogo()} Upload File</small>
              </button>
            </li>
            <li>
              <button id="permapin-popup-button" class="dropdown-button">
                <small>${pinLogo()} Permapin</small>
              </button>
            </li>
          `;
        case PageState.Proposals:
          return html`
            <li>
              <button id="upload-popup-button" class="dropdown-button">
                <small>${uploadLogo()} Upload File</small>
              </button>
            </li>
            <li>
              <button class="dropdown-button" id="upload-proposal-button">
                <small>${BallotLogo()} Upload proposal</small>
              </button>
            </li>
          `;
        case PageState.trails:
          return html` <li>
              <button id="upload-popup-button" class="dropdown-button">
                <small>${uploadLogo()} Upload File</small>
              </button>
            </li>
            <li>
              <button class="dropdown-button" id="upload-comment">
                <small>${CommentLogo()} Add Comment</small>
              </button>
            </li>`;
        default:
          break;
      }
      break;
    default:
      return html`<li>
        <button id="permapin-popup-button" class="dropdown-button">
          <small>${pinLogo()} Permapin</small>
        </button>
      </li>`;
      break;
  }
}
