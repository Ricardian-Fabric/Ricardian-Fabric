import {  Options, Status } from "../types";

export async function fetchGeoCodingCSV(): Promise<Options<string>> {
  const result: Options<string> = {
    status: Status.Success,
    error: "",
    data: "",
  };
  try {
    const response = await fetch(
      "https://arweave.net/Wl0lmZU2A1D60EqMePwX77PpFpTEIMUdKGSBM-uGlto",
      { method: "get" }
    );
    result.data = await response.text();
  } catch (error: any) {
    result.status = Status.Failure;
    result.error = error.message;
  }
  return result;
}

export async function fetchAcceptableContract(
  url: string
): Promise<Options<string>> {
  const result: Options<string> = {
    status: Status.Success,
    error: "",
    data: "",
  };

  try {
    const response = await fetch(url, { method: "get" });
    result.data = await response.text();
  } catch (error: any) {
    result.status = Status.Failure;
    result.error = error.message;
  }
  return result;
}
// Used with the OptionsBuilder
export async function fetchTransactionBy<T>(id): Promise<T> {
  const response = await fetch(`https://arweave.net/${id}`, { method: "get" });
  const result = await response.json();
  return result as T;
}

export async function fetchText(url: string): Promise<string> {
  const response = await fetch(url, { method: "get" });
  return await response.text();
}

export async function fetchFrontEnd(url): Promise<string> {
  const response = await fetch(url, { method: "get" });
  return await response.text();
}
