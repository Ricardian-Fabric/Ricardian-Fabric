import { html } from "lit-html";

export function mainDep(src: string) {
  return html`
  <script id="main-script" src="${src}" crossorigin="anonymous"></script>
`};
