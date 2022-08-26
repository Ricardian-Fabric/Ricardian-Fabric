import { html } from "lit-html";
import { BackLogo } from "./logos";

export function DocXDropper() {
  return html`
  <div id="docx-dropzone" class="drop-zone">
    <span id="drop-prompt-docx" class="drop-zone__prompt">To load template, drop a .docx file here or click to select
      it</span>
    <input type="file" name="docx" id="docx-input" class="drop-zone__input" />
  </div>
  <hr />
  <small>Loading a template will completely override the text area.</small>
  <hr />
  <div>
    <button id="dropper-back-button" class="backButton">
      ${BackLogo()} Back
    </button>
  </div>
  <hr />
`};

export function ProposalDocXDropper() {
  return html`
  <div id="docx-dropzone" class="drop-zone">
    <span id="drop-prompt-docx" class="drop-zone__prompt">To add the terms, drop a .docx file here or click to select
      it</span>
    <input type="file" name="docx" id="docx-input" class="drop-zone__input" />
  </div>
`};
