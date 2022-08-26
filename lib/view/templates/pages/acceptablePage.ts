import { html, nothing } from "lit-html";
import { AcceptablePageProps } from "../../../types";
import {
  createdDateTemplate,
  expiryTemplate,
  issuerTemplate,
  networkTemplate,
  TrailTemplate,
} from "../components/components";
import { mainDep } from "../components/dependencies";
import { loadingIndicator } from "../components/loadingIndicator";
import { verifyLogo } from "../components/logos";

export function acceptablePageLayout(props: AcceptablePageProps) { 
  return html`
  <style>
    body {
      background: radial-gradient(lightgrey 3px, transparent 4px),
        radial-gradient(lightgrey 3px, transparent 4px),
        linear-gradient(#fff 4px, transparent 0),
        linear-gradient(
          45deg,
          transparent 74px,
          transparent 75px,
          #a4a4a4 75px,
          #a4a4a4 76px,
          transparent 77px,
          transparent 109px
        ),
        linear-gradient(
          -45deg,
          transparent 75px,
          transparent 76px,
          #a4a4a4 76px,
          #a4a4a4 77px,
          transparent 78px,
          transparent 109px
        ),
        #fff;
      background-size: 109px 109px, 109px 109px, 100% 6px, 109px 109px,
        109px 109px;
      background-position: 54px 55px, 0px 0px, 0px 0px, 0px 0px, 0px 0px;
      font-family: Sans-Serif;
    }
    svg {
      vertical-align: middle;
      display: inline-block;
    }
    input[type="text"],
    input[type="url"],
    input[type="date"],
    input[type="number"],
    input[type="password"] {
      background-color: transparent;
      border: none;
      border-bottom: 1px solid grey;
      border-radius: 0;
      outline: none;
      height: 3rem;
      width: 100%;
      font-size: 16px;
      margin: 0 0 8px 0;
      padding: 0;
      box-shadow: none;
      box-sizing: content-box;
      transition: box-shadow 0.3s, border 0.3s;
    }

    input[type="text"]:disabled,
    input[type="url"]:disabled,
    input[type="date"]:disabled,
    input[type="password"]::disabled {
      color: rgba(0, 0, 0, 0.42);
      border-bottom: 1px dotted #f2f2f2;
    }

    input[type="text"]:focus,
    input[type="url"]:focus,
    input[type="date"]:focus,
    input[type="number"]:focus,
    input[type="password"]:focus {
      border-bottom: 1px solid darkgrey;
      box-shadow: 0 1px 0 0 darkgrey;
    }
    .center {
      margin: 0 auto;
    }
    #page {
      margin: 0 auto;
      display: flex;
      max-width: 800px;
      min-width: 350px;
      height: 100%;
      flex-direction: column;
      box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px,
        rgba(0, 0, 0, 0.23) 0px 6px 6px;
      padding-bottom: 20px;
      padding-left: 20px;
      padding-right: 20px;
      background-color: white;
    }
    #contract-display {
      max-width: 800px;
    }
    .title {
      color: #f2f2f2;
    }
    .wide-row {
      margin-top: 10px;
      display: flex;
      flex-direction: row;
      width: 100%;
      justify-content: space-around;
    }
    .labelButton {
      border-radius: 25px;
      border: none;
      cursor: pointer;
      padding: 10px;
      margin: 5px;
      overflow: hidden;
    }
    .drop-zone {
      margin: 0 auto;
      max-width: 200px;
      min-width: 200px;
      height: 200px;
      padding: 25px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      font-family: "Quicksand", sans-serif;
      font-weight: 500;
      font-size: 20px;
      cursor: pointer;
      color: #cccccc;
      border: 4px dashed #cccccc;
      border-radius: 10px;
    }
    label {
      font-size: 0.8rem;
      color: grey;
    }

    hr {
      visibility: hidden;
    }

    tr {
      padding: 10px;
    }
    .drop-zone--over {
      border-style: solid;
    }
    .drop-zone__input {
      display: none;
    }
    #display-table {
      font-family: Arial, Helvetica, sans-serif;
      border-collapse: collapse;
    }

    #display-table tr {
      background-color: white;
    }

    #display-table tr:hover {
      background-color: white;
    }

    #display-table th {
      padding-top: 12px;
      padding-bottom: 12px;
      text-align: left;
      background-color: white;
      color: white;
    }

    .ac-locaton {
      color: red;
      display: flex;
      flex-direction: column;
    }
    .accept-button-label {
      font-size: 0.8rem;
      color: grey;
    }
    #error-display {
      visibility: hidden; /* Hidden by default. Visible on click */
      min-width: 250px; /* Set a default minimum width */
      background-color: #333; /* Black background color */
      color: #fff; /* White text color */
      text-align: center; /* Centered text */
      border-radius: 2px; /* Rounded borders */
      padding-top: 16px;
      padding-bottom: 16px;
      position: fixed; /* Sit on top of the screen */
      z-index: 5; /* Add a z-index if needed */
      left: 0;
      bottom: 30px; /*30px from the bottom */
    }

    /* Show the snackbar when clicking on a button (class added with JavaScript) */
    #error-display.show {
      visibility: visible; /* Show the snackbar */
      /* Add animation: Take 0.5 seconds to fade in and out the snackbar.
  However, delay the fade out process for 2.5 seconds */
      -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
      animation: fadein 0.5s, fadeout 0.5s 2.5s;
    }
    .network-button {
      background-color: #f2f2f2;
      border: none;
      font-size: 16px;
      padding: 10px;
      padding-left: 0px;
      cursor: pointer;
    }

    .network-button:hover {
      background-color: white;
    }

    .NextButton {
      cursor: pointer;
      background-color: black;
      border-radius: 20px;
      padding: 5px;
      color: white !important;
      border: none;
    }
    .backButton {
      cursor: pointer;
      background-color: #f2f2f2;
      border-radius: 20px;
      padding: 5px;
      color: black !important;
      border: none;
    }

    #overlay {
      position: fixed;
      display: none;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 2;
    }

    #overlay-layout {
      padding-left: 10px;
      padding-right: 10px;
      /* height: 80%; */
      display: flex;
      flex-direction: column;
      align-items: center;
      background: white;
      max-width: 600px;
      margin: 0 auto;
      margin-top: 30px;
      box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
      border-radius: 10px;
      overflow: auto;
    }
    .terms-button-label {
      cursor: pointer;
      background-color: #f2f2f2;
      border-radius: 20px;
      padding: 5px;
      color: black;
    }
    /* Animations to fade the snackbar in and out */
    @-webkit-keyframes fadein {
      from {
        bottom: 0;
        opacity: 0;
      }
      to {
        bottom: 30px;
        opacity: 1;
      }
    }

    @keyframes fadein {
      from {
        bottom: 0;
        opacity: 0;
      }
      to {
        bottom: 30px;
        opacity: 1;
      }
    }

    @-webkit-keyframes fadeout {
      from {
        bottom: 30px;
        opacity: 1;
      }
      to {
        bottom: 0;
        opacity: 0;
      }
    }

    @keyframes fadeout {
      from {
        bottom: 30px;
        opacity: 1;
      }
      to {
        bottom: 0;
        opacity: 0;
      }
    }
    .row {
      margin-top: 10px;
      display: flex;
      flex-direction: row;
    }
    .dropdown_checkbox_toggle {
      display: none;
      cursor: pointer;
    }

    .dropdown_checkbox_label {
      cursor: pointer;
      background-color: #f2f2f2;
      border-radius: 20px;
      padding: 5px;
      color: black !important;
    }

    .dropdown_checkbox_label:hover {
      background-color: #ccc;
    }

    .dropdown_checkbox_toggle:checked ~ ul {
      display: block;
      list-style-type: none;
      list-style: none;
      list-style-position: inside;
      padding: 8px;
      border-radius: 1px;
      position: absolute;
      background-color: white;
      box-shadow: 1px 1px 1px 1px darkgrey;
      z-index: 3;
    }

    .dropdown_checkbox_toggle ~ ul {
      display: none;
    }

    .dropdown_checkbox_label {
      cursor: pointer;
    }

    .dropdown-button {
      background-color: white;
      border: none;
      font-size: 16px;
      padding: 10px;
      cursor: pointer;
      width: 100%;
      text-align: left;
    }

    .dropdown-button:hover {
      background-color: lightgray;
    }
    .text-align-center {
      text-align: center;
    }

    .cursor-pointer {
      cursor: pointer;
    }
    .circular {
      border-radius: 50%;
    }
  </style>
  <body>
    ${acceptablePage(props)} ${mainDep(props?.mainDep?.src as string)}
  </body>
`};
function acceptablePage (props: AcceptablePageProps) {return  html`
  <div
    data-contracttype="acceptable"
    data-version="${props.version}"
    data-created="${props.createdDate}"
    data-expires="${props.expires}"
    data-redirectto="${props.redirectto}"
    data-maindep="${props?.mainDep?.src}"
    data-blockedcountries="${JSON.stringify(props.blockedCountries)}"
    data-blockedaddresses="${JSON.stringify(props.blockedAddresses)}"
    data-network="${props.network}"
    data-issuer="${props.issuer}"
    data-issuersignature="${props.issuerSignature}"
    data-smartcontract="${props.smartContract}"
    data-erc20="${props.ERC20}"
    data-creatorapplink="${props.creatorAppLink}"
    data-relatedtrail="${props.relatedtrail}"
    data-trailAddress="${props.trailAddress}"
    id="page"
  >
    <div class="row">
      <div class="cursor-pointer" id="verifyContract">${verifyLogo()}</div>
    </div>
    <div id="contract-display"></div>
    <table id="display-table">
      <tr>
        <th></th>
        <th></th>
      </tr>
      ${createdDateTemplate(props.createdDate)} ${expiryTemplate(props.expires)}
      ${networkTemplate(props.network, false)} ${issuerTemplate(props.issuer)}
      ${props.relatedtrail !== ""
        ? TrailTemplate(
            props.creatorAppLink,
            props.relatedtrail,
            props.trailAddress
          )
        : nothing}
    </table>
    <hr />
    <div class="center red" id="error-display"></div>
    <div class="center" id="redirect-display"></div>
    <div class="center" id="transaction-display"></div>
    <div id="overlay">
      <div id="overlay-layout"></div>
    </div>
    <div id="action-container" class="center">${loadingIndicator}  </div>
    <div class="center" id="adblocker-notification">
        <small>Using adblocker can result in degraded performace. Make sure to turn it off.</small>
    </div>
  </div>
`};
