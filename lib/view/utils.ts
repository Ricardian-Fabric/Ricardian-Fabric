import { BlockCountry } from "../business/countryBlock";
import { ERC20Params, Options, Status } from "../types";

export function getById(id: string): HTMLElement {
  const el = document.getElementById(id);

  if (el === null) {
    return document.createElement("div");
  } else {
    return el;
  }
}

export function elementExists(id: string) {
  const el = document.getElementById(id);

  if (el === null) {
    return false;
  } else {
    return true;
  }
}

export function getPage(): HTMLElement {
  return getById("page");
}

export function getCurrentUrl(): string {
  return window.location.href;
}

export function getAcceptableContract() {
  const contractEl = getById("contract-display");
  return contractEl.innerHTML;
}

export function getFromUrl() {
  return window.location.href;
}

export function getPrice() {
  const price = getById("price-input") as HTMLInputElement;
  if (price.value === "" || price.value === "0") {
    return "NONE";
  } else {
    return price.value;
  }
}
export function getRedirectTo() {
  const redirectto = getById("redirectto-input") as HTMLInputElement;
  if (redirectto.value === "") {
    return "NONE";
  } else {
    return handleHTTPS(redirectto.value);
  }
}

export function getSmartContract(): string | "NONE" {
  const smartContract = getById("smartcontract-input") as HTMLInputElement;
  if (smartContract.value === "") {
    return "NONE";
  } else {
    return smartContract.value;
  }
}

export function getERCSmartContractElement(): HTMLInputElement {
  return getById("erc20-address") as HTMLInputElement;
}
export function getOnlySigner() {
  const onlySigner = getById("onlysigner-input") as HTMLInputElement;
  if (onlySigner.value === "") {
    return "NONE";
  } else {
    return onlySigner.value;
  }
}

export function getBlockedCountries() {
  const blockedCountries: BlockCountry[] = [];

  const ofec = getById("ofec_checkbox") as HTMLInputElement;
  const eu = getById("eu-checkbox") as HTMLInputElement;
  const un = getById("un-checkbox") as HTMLInputElement;

  if (ofec.checked) {
    blockedCountries.push(BlockCountry.OFEC);
  }
  if (eu.checked) {
    blockedCountries.push(BlockCountry.EU);
  }
  if (un.checked) {
    blockedCountries.push(BlockCountry.UN);
  }

  const countryCodeBoxes = document.getElementsByClassName(
    "countryCodeCheckboxes"
  );

  for (let i = 0; i < countryCodeBoxes.length; i++) {
    const countryBoxEl = countryCodeBoxes[i] as HTMLInputElement;

    if (countryBoxEl.checked) {
      const countrycode = countryBoxEl.dataset.countrycode as BlockCountry;
      blockedCountries.push(countrycode);
    }
  }

  return blockedCountries;
}

export function getBlockedAddresses(): Options<string[]> {
  const result: Options<string[]> = {
    status: Status.Success,
    data: [],
    error: "",
  };
  const blockkedAddressesEl = getById("blocked-addresses") as HTMLInputElement;
  const blockedAddresses = blockkedAddressesEl.value;

  // Function to remove all
  // spaces from a given string
  function removeSpace(str) {
    str = str.replace(/\s/g, "");
    return str;
  }

  const withoutSpaces = removeSpace(blockedAddresses);
  try {
    result.data = withoutSpaces.split(",");
  } catch (err) {
    result.status = Status.Failure;
    result.error = err.message;
  }
  return result;
}

function handleHTTPS(url: string) {
  if (url === "") {
    return url;
  }
  // get the first 4 characters to see if it's http protocol
  const slice = url.substring(0, 4);
  if (slice === "http") {
    return url;
  } else {
    return "https://" + url;
  }
}

export function didExpire(expires: string): boolean {
  if (expires === "NEVER") {
    return false;
  } else {
    const now = new Date().getTime();
    const expiryDate = new Date(expires).getTime();
    return now > expiryDate;
  }
}

export function getWebhookCheckbox(): boolean {
  const webhook = getById("webhook-checkbox") as HTMLInputElement;
  return webhook.checked;
}

export function getRedirectCheckbox(): boolean {
  const redirect = getById("redirect-checkbox") as HTMLInputElement;
  return redirect.checked;
}
export function getExpires(): string {
  const acceptableTill = getById("expires-input") as HTMLInputElement;
  if (acceptableTill.value === "") {
    return "NEVER";
  }
  return new Date(acceptableTill.value).toISOString();
}

export function getSecret(): string {
  const secret = getById("secret-input") as HTMLInputElement;
  return secret.value;
}

export function redirect(url: string) {
  window.location.replace(url);
}
export function newTab(url: string) {
  window.open(url, "_blank");
}

export async function copyStringToClipboard(str: string) {
  await navigator.clipboard.writeText(str);
}

export function setBannerDisplayBlock() {
  getById("overlay").style.display = "block";
}

export function setBannerDisplayNone() {
  getById("overlay").style.display = "none";
}

export function setTermsAccepted(termsAccepted: boolean) {
  localStorage.setItem("termsAccepted", `${termsAccepted}`);
}

export function getTermsAccepted(): boolean {
  const data = localStorage.getItem("termsAccepted");
  if (data === null) {
    return false;
  } else {
    return data === "true";
  }
}

export function getPromptEl(): HTMLElement {
  return getById("drop-prompt");
}

export function getPromptElDOCX(): HTMLElement {
  return getById("drop-prompt-docx");
}

export function getTermsCheckbox(): HTMLInputElement {
  return getById("terms-checkbox") as HTMLInputElement;
}

export function getTermsCheckboxLabel(): HTMLInputElement {
  return getById("terms-checkbox-label") as HTMLInputElement;
}

export function getDeployButton(): HTMLInputElement {
  return getById("deploy-simpleterms") as HTMLInputElement;
}

export function getSameAsAboveButton(): HTMLButtonElement {
  return getById("same-contract-button") as HTMLButtonElement;
}

export function getConfigurationButton(): HTMLButtonElement {
  return getById("toggle-configuration-page") as HTMLButtonElement;
}

export function getToMenuButton(): HTMLButtonElement {
  return getById("toMenuButton") as HTMLButtonElement;
}

export function getUploadingWalletCheckboxes(): [
  HTMLInputElement,
  HTMLInputElement
] {
  return [
    getById("bundlrNetworkCheckbox") as HTMLInputElement,
    getById("burnerWalletCheckbox") as HTMLInputElement,
  ];
}

export function changeContainerSlotStyle(to: boolean) {
  const container = getById("action-container");

  if (to) {
    container.classList.remove("center");
  } else {
    container.classList.add("center");
  }
}

export function readFile(file: File, getContent: CallableFunction) {
  const reader = new FileReader();
  reader.readAsArrayBuffer(file);

  reader.onloadend = function (event) {
    getContent(event.target?.result);
  };
}

export function readWalletFile(files: FileList, getContent: CallableFunction) {
  const reader = new FileReader();
  reader.onload = async function (e: ProgressEvent) {
    const data = getKeyFromFile(e);
    await getContent(data);
  };

  reader.onerror = function (e) {
    console.log(e);
  };

  reader.readAsText(files[0], "UFT-8");
}

export function getKeyFromFile(fileEvent: ProgressEvent) {
  try {
    const fileReader: FileReader = fileEvent.target as FileReader;
    const key = JSON.parse(fileReader.result as string);
    return key;
  } catch (e) {
    // TODO: validation error
  }
}

export async function readSolcFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onerror = reject;
    fr.onload = function () {
      resolve(fr.result as string);
    };
    fr.readAsText(file, "UTF-8");
  });
}

export function getERC20Params(): Options<ERC20Params | string> {
  const addToWallet = getById("add-erc20-checkbox") as HTMLInputElement;
  const nameEl = getById("erc20-name") as HTMLInputElement;
  const symbolEl = getById("erc20-symbol") as HTMLInputElement;
  const decimalsEl = getById("erc20-decimals") as HTMLInputElement;
  const addressEl = getById("erc20-address") as HTMLInputElement;
  const options: Options<ERC20Params | string> = {
    error: "",
    data: "",
    status: Status.Success,
  };
  if (addToWallet.checked) {
    try {
      const name = nameEl.value;
      const symbol = symbolEl.value;
      const address = addressEl.value;
      const decimals = parseInt(decimalsEl.value);

      if (name.length === 0) {
        throw new Error("Invalid ERC20 name");
      }

      if (symbol.length === 0) {
        throw new Error("Invalid ERC20 symbol");
      }
      if (isNaN(decimals)) {
        throw new Error("Invalid ERC20 decimals");
      }
      if (address.length === 0) {
        throw new Error("Invalid  ERC20 address");
      }

      options.data = {
        name,
        symbol,
        address,
        decimals,
      };
    } catch (err) {
      options.status = Status.Failure;
      options.error = err.message;
    }
  }

  return options;
}

export function getEditorElementInnerHTML() {
  return getById("editor").innerHTML;
}

export async function copyAddressToClipboard() {
  const addressEl = getById("arweave-address");
  await copyStringToClipboard(addressEl.dataset.address as string);
}

// THANKS TO https://gist.github.com/alisey/4552101
// USED FOR PARSING QUERY STRINGS
// Examples:
// parseQueryString('a=1&a=2')                =>  {a: '2'}
// parseQueryString('a=1', true)              =>  {a: ['1']}
// parseQueryString('a=1&a=2', true)          =>  {a: ['1', '2']}
// parseQueryString('a[][]=1&a[][]=2', true)  =>  {'a[][]': ['1', '2']}
// parseQueryString('?a;b#c')                 =>  {'?a': '', 'b#c': ''}
export function parseQueryString(query: string, groupByName: boolean) {
  var parsed, hasOwn, pairs, pair, name, value;

  if (typeof query != "string") {
    throw "Invalid input";
  }

  parsed = {};
  hasOwn = parsed.hasOwnProperty;
  query = query.replace(/\+/g, " ");
  pairs = query.split(/[&;]/);

  for (var i = 0; i < pairs.length; i++) {
    pair = pairs[i].match(/^([^=]*)=?(.*)/);
    if (pair[1]) {
      try {
        name = decodeURIComponent(pair[1]);
        value = decodeURIComponent(pair[2]);
      } catch (e) {
        throw "Invaid %-encoded sequence";
      }

      if (!groupByName) {
        parsed[name] = value;
      } else if (hasOwn.call(parsed, name)) {
        parsed[name].push(value);
      } else {
        parsed[name] = [value];
      }
    }
  }
  return parsed;
}
