import {
  BlockCountry,
  ContractTypes,
  ERC20Params,
  SelectedWallet,
} from "../types";

export function getRedirectToDataProp(page: HTMLElement): string {
  return page.dataset.redirectto;
}

export function getIssuerDataProp(page: HTMLElement): string {
  return page.dataset.issuer;
}

export function getCurrentPageDataProp(page: HTMLElement) {
  const contractType = page.dataset.contracttype;

  return contractType as ContractTypes;
}

export function getPriceFromDataProp(page: HTMLElement): string {
  return page.dataset.price;
}

export function getCreatedDateFromDataProp(page: HTMLElement): string {
  return page.dataset.created;
}

export function getExpiresFromDataProp(page: HTMLElement): string {
  return page.dataset.expires;
}

export function getVersionFromDataProp(page: HTMLElement): string {
  return page.dataset.version;
}

export function getOnlySignerFromDataProp(page: HTMLElement): string {
  return page.dataset.onlysigner;
}

export function getSourceFromDataProp(page: HTMLElement): string {
  return page.dataset.dependency;
}

export function getNetworkFromDataProp(page: HTMLElement): string {
  return page.dataset.network;
}

export function getHashFromDataProp(page: HTMLElement): string {
  return page.dataset.hash;
}

export function getIssuerSignatureFromDataProp(page: HTMLElement): string {
  return page.dataset.issuersignature;
}

export function getSmartContractFromDataProp(page: HTMLElement): string {
  return page.dataset.smartcontract;
}

export function getIsERC20FromDataProp(page: HTMLElement): ERC20Params {
  const erc20 = page.dataset.erc20;
  if (erc20 === undefined) {
    return {} as ERC20Params;
  }
  return JSON.parse(page.dataset.erc20) as ERC20Params;
}

export function getBlockCountriesFromDataProp(
  page: HTMLElement
): BlockCountry[] {
  const array = page.dataset.blockedcountries;
  if (array === undefined) {
    return [] as BlockCountry[];
  }
  return JSON.parse(array) as BlockCountry[];
}

export function getSelectedWalletFromDataProp(
  page: HTMLElement
): SelectedWallet {
  return page.dataset.selectedwallet as SelectedWallet;
}
