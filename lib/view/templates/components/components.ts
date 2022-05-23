import { html } from "lit-html";
import { Chains } from "../../../types";
import { BSCLogo, EthLogo, HarmonyLogo, PolygonLogo } from "./logos";

export const getPriceTemplate = (
  price: string | number,
  fee: number | string
) => {
  if (price !== "NONE") {
    const formattedPrice = price === "NONE" ? "" : `${price} Ar`;
    return html`<tr>
        <td>
          <label>Price:</label>
        </td>
        <td>
          <div aria-label="price">${formattedPrice}</div>
        </td>
      </tr>
      <tr>
        <td>
          <label>Fee:</label>
        </td>
        <td>${fee} Ar</td>
      </tr>`;
  }
};

export const createdDateTemplate = (date: string) => {
  return html`<tr>
    <td>
      <label for="createdDate">Created:</label>
    </td>
    <td><label id="createdDate">${date}</label></td>
  </tr>`;
};

export const signedDateTemplate = (date: string) => {
  return html`<tr>
    <td>
      <label for="signed-date">Signed on:</label>
    </td>
    <td><label id="signed-date">${date}</label></td>
  </tr>`;
};

export const issuerTemplate = (address: string) => {
  return html`
    <tr>
      <td>
        <label for="issuer-address">Issuer:</label>
      </td>
      <td>
        <label id="issuer-address">${address}</label>
      </td>
      <td></td>
    </tr>
  `;
};

export const TrailTemplate = (
  creatorAppLink: string,
  relatedTrail: string,
  arweaveAddress: string
) => {
  const address =
    arweaveAddress.length === 0 ? "" : `&address=${arweaveAddress}`;
  const url = creatorAppLink + "?trail=" + relatedTrail + address;
  return html` <tr>
    <td>
      <label for="Trail">Trail:</label>
    </td>
    <td>
      <a href="${url}" rel="noopener" target="_blank">${relatedTrail}</a>
    </td>
    <td></td>
  </tr>`;
};

export const networkTemplate = (network: string, isFulfilled: boolean) => {
  const chains = {
    [Chains.Ropsten]: getChainButton(
      Chains.Ropsten,
      "Ropsten",
      "Testnet",
      "",
      isFulfilled
    ),
    [Chains.bscTestnet]: getChainButton(
      Chains.bscTestnet,
      "BSC",
      "Testnet",
      "",
      isFulfilled
    ),
    [Chains.bscMainnet]: getChainButton(
      Chains.bscMainnet,
      "Binance Smart Chain",
      "",
      "",
      isFulfilled
    ),
    [Chains.polygonTestnet]: getChainButton(
      Chains.polygonTestnet,
      "Polygon",
      "Testnet",
      "",
      isFulfilled
    ),
    [Chains.polygonMainnet]: getChainButton(
      Chains.polygonMainnet,
      "Polygon",
      "",
      "",
      isFulfilled
    ),
    [Chains.harmonyTestnetShard0]: getChainButton(
      Chains.harmonyTestnetShard0,
      "Harmony",
      "Testnet",
      "Shard 0",
      isFulfilled
    ),
    [Chains.harmonyMainnetShard0]: getChainButton(
      Chains.harmonyMainnetShard0,
      "Harmony",
      "Mainnet",
      "Shard 0",
      isFulfilled
    ),
  };

  const networkEl = chains[network];

  return html`<tr>
    <td>
      <label for="network-id">Network:</label>
    </td>
    <td>
      <label id="network-id"
        >${networkEl === undefined ? network : networkEl}</label
      >
    </td>
    <td></td>
  </tr>`;
};

export function getChainButton(
  chains: Chains,
  chainName: string,
  net: string,
  shard: string,
  disabled: boolean
) {
  if (disabled) {
    return html`${getChainLogo(chains)} ${chainName} ${net} ${shard}`;
  } else {
    return html`<button class="network-button" id="addChainButton">
      ${getChainLogo(chains)} <label>${chainName} ${net} ${shard}</label>
    </button>`;
  }
}

export function getChainLogo(chain: Chains) {
  switch (chain) {
    case Chains.Ropsten:
      return EthLogo("0px");
    case Chains.harmonyTestnetShard0:
      return HarmonyLogo();
    case Chains.harmonyMainnetShard0:
      return HarmonyLogo();
    case Chains.bscTestnet:
      return BSCLogo();
    case Chains.bscMainnet:
      return BSCLogo();
    case Chains.polygonTestnet:
      return PolygonLogo();
    case Chains.polygonMainnet:
      return PolygonLogo();
    default:
      break;
  }
}

export const onlySignerTemplate = (onlySigner: string) => {
  if (onlySigner !== "NONE") {
    return html`<tr>
      <td>Only Signer:</td>
      <td>${onlySigner}</td>
      <td></td>
    </tr>`;
  }
};

export const hashTemplate = (hash: string) => {
  return html`<tr>
    <td>Hash</td>
    <td aria-label="Hash">${hash}</td>
    <td></td>
  </tr>`;
};

export const expiryTemplate = (date: string) => html`<tr>
  <td>
    <label for="expiresDate">Expires:</label>
  </td>
  <td id="expiresDate"><label>${date}</label></td>
  <td></td>
</tr>`;

export const getParticipantFromTemplate = (participant: string) => html`<tr>
  <td>
    <label for="participant">Participant:</label>
  </td>
  <td>
    <label id="participant">${participant}</label>
  </td>
  <td></td>
</tr>`;

export const parentUrl = (url: string) => html`
  <tr>
    <td>
      <label for="parent-url">Parent:</label>
    </td>
    <td id="parent-url">
      <a href="${url}"><label>${url}</label></a>
    </td>
    <td></td>
  </tr>
`;
