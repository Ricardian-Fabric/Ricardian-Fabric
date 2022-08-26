import { html } from "lit-html";
import { FulfilledPageProps } from "../../../types";
import {
  getParticipantFromTemplate,
  issuerTemplate,
  networkTemplate,
  parentUrl,
  signedDateTemplate,
} from "../components/components";

export function fulfilledPageLayout(props: FulfilledPageProps) {
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
    .row {
      margin-top: 10px;
      display: flex;
      flex-direction: row;
    }
    #display-table {
      font-family: Arial, Helvetica, sans-serif;
      border-collapse: collapse;
    }

    #display-table tr {
      background-color: white;
    }

    #display-table th {
      padding-top: 12px;
      padding-bottom: 12px;
      text-align: left;
      background-color: white;
      color: white;
    }

    .network-button {
      background-color: white;
      border: none;
      font-size: 16px;
      padding: 10px;
      color: black;
    }
    .circular {
      border-radius: 50%;
    }
  </style>

  <body>
    ${fulfilledPage(props)}
  </body>
`};
export function fulfilledPage(props: FulfilledPageProps) {
  return html`
  <div data-contracttype="fulfilled" data-version="${props.version}" data-signedon="${props.signedDate}"
    data-created="${props.createdDate}" data-expires="${props.expires}" data-redirectto="${props.redirectto}"
    data-parentUrl="${props.parentUrl}" data-network="${props.network}" data-issuer="${props.issuer}"
    data-issuersignature="${props.issuerSignature}" data-participant="${props.participant}"
    data-participantsignature="${props.participantSignature}" data-smartcontract="${props.smartContract}"
    data-erc20="${props.ERC20}" data-blockedcountries="${JSON.stringify(props.blockedCountries)}"
    data-blockedaddresses="${JSON.stringify(props.blockedAddresses)}" id="page">
    <div id="contract-display"></div>
    <table id="display-table">
      <tr>
        <th></th>
        <th></th>
        <th></th>
      </tr>
      ${signedDateTemplate(props.createdDate)}
      ${networkTemplate(props.network, true)} ${issuerTemplate(props.issuer)}
      ${getParticipantFromTemplate(props.participant)}
      ${parentUrl(props.parentUrl)}
    </table>
    <hr />
  </div>
`};
