import { html, render } from "lit-html";
import { AcceptablePageProps, FulfilledPageProps } from "../types";
import { acceptablePageLayout } from "./templates/acceptablePage";
import { fulfilledPageLayout } from "./templates/fulfilledPage";
import { initialStringDom } from "./templates/initialDom";

export async function getAcceptablePage(
  pageProps: AcceptablePageProps
): Promise<string> {
  const doc = parseDOMfromString(pageProps.domParser, initialStringDom);
  render(acceptablePageLayout(pageProps), doc.body);
  // The legal contract HTML is sanitized by the editor
  doc.getElementById("contract-display").innerHTML = pageProps.legalContract;
  return serialize(doc);
}

export async function getFulfilledPage(pageProps: FulfilledPageProps) {
  const doc = parseDOMfromString(pageProps.domParser, initialStringDom);
  render(fulfilledPageLayout(pageProps), doc.body);
  return serialize(doc);
}

function parseDOMfromString(parser: DOMParser, initialDom: string): Document {
  const doc = parser.parseFromString(initialDom, "text/html");
  return doc;
}

function serialize(doc: Document): string {
  const XMLS = new XMLSerializer();
  return XMLS.serializeToString(doc);
}