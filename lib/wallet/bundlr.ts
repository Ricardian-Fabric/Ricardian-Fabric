// example imports 
// import WebBundlr
import {Web3Provider} from "@ethersproject/providers";
import { WebBundlr } from "@bundlr-network/client";

const BUNDLRURL = "https://node1.bundlr.network";
const CURRENCY = "matic";

export async function initialiseBundlr() {
  //@ts-ignore
  await window.ethereum.enable();
  //@ts-ignore
  const provider = new Web3Provider(window.ethereum);
  await provider._ready()

  const bundlr = new WebBundlr(BUNDLRURL, CURRENCY, provider);
  await bundlr.ready();

  return bundlr; // done!
}

export async function getLoadedBalance(bundlr: WebBundlr){
    return await  bundlr.getLoadedBalance();
}

export async function getBalance(bundlr){
    return await bundlr.getBalance();
} 

export async function getBundlerAddress(bundlr){
    console.log(bundlr);
    return await bundlr.getBundlerAddress();
}