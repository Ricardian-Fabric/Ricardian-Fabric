import { html } from "lit-html";

export const mainDep = (src: string) => html`
  <script id="main-script" src="${src}" crossorigin="anonymous"></script>
`;
