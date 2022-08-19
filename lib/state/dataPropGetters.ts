import { BlockCountry } from "../business/countryBlock";
import {
  AppType,
  ContractTypes,
  ERC20Params,
  SelectedWallet,
} from "../types";

export function getRedirectToDataProp(page: HTMLElement): string {
  return page.dataset.redirectto as string;
}

export function getIssuerDataProp(page: HTMLElement): string {
  return page.dataset.issuer as string;
}

export function getCurrentPageDataProp(page: HTMLElement) {
  const contractType = page.dataset.contracttype;

  return contractType as ContractTypes;
}

export function getPriceFromDataProp(page: HTMLElement): string {
  return page.dataset.price as string;
}

export function getCreatedDateFromDataProp(page: HTMLElement): string {
  return page.dataset.created as string;
}

export function getExpiresFromDataProp(page: HTMLElement): string {
  return page.dataset.expires as string;
}

export function getVersionFromDataProp(page: HTMLElement): string {
  return page.dataset.version as string;
}

export function getOnlySignerFromDataProp(page: HTMLElement): string {
  return page.dataset.onlysigner as string;
}

export function getSourceFromDataProp(page: HTMLElement): string {
  return page.dataset.dependency as string;
}

export function getNetworkFromDataProp(page: HTMLElement): string {
  return page.dataset.network as string;
}

export function getHashFromDataProp(page: HTMLElement): string {
  return page.dataset.hash as string;
}

export function getIssuerSignatureFromDataProp(page: HTMLElement): string {
  return page.dataset.issuersignature as string;
}

export function getSmartContractFromDataProp(page: HTMLElement): string {
  return page.dataset.smartcontract as string;
}

export function getIsERC20FromDataProp(page: HTMLElement): ERC20Params {
  const erc20 = page.dataset.erc20;
  if (erc20 === undefined) {
    return {} as ERC20Params;
  }
  return JSON.parse(page.dataset.erc20 as string) as ERC20Params;
}

export function getAppTypeFromDataProp(page: HTMLElement): AppType {
  return page.dataset.apptype as AppType;
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

export function getBlockedAddressesFromDataProp(page: HTMLElement) {
  const array = page.dataset.blockedaddresses;
  if (array === undefined) {
    return [];
  }
  return JSON.parse(array) as string[];
}

export function getSelectedWalletFromDataProp(
  page: HTMLElement
): SelectedWallet {
  return page.dataset.selectedwallet as SelectedWallet;
}

export function getCreatorAppLinkFromDataProp(page: HTMLElement): string {
  return page.dataset.creatorapplink as string;
}

