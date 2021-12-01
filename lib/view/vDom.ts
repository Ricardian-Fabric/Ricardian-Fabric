import { render } from "lit-html";
import { AcceptablePageProps, FulfilledPageProps } from "../types";
import { acceptablePageLayout } from "./templates/pages/acceptablePage";
import { fulfilledPageLayout } from "./templates/pages/fulfilledPage";
import { initialStringDom } from "./templates/components/initialDom";

export async function getAcceptablePageFromVDOM(
  pageProps: AcceptablePageProps
): Promise<string> {
  const doc = parseDOMfromString(pageProps.domParser, initialStringDom);
  render(acceptablePageLayout(pageProps), doc.body);
  // The legal contract HTML is sanitized by the editor
  doc.getElementById("contract-display").innerHTML = pageProps.legalContract;

  return serialize(doc);
}

export async function getFulfilledPagefromVDOM(pageProps: FulfilledPageProps) {
  const doc = parseDOMfromString(pageProps.domParser, initialStringDom);
  render(fulfilledPageLayout(pageProps), doc.body);
  doc.getElementById("contract-display").innerHTML = pageProps.legalContract;
  return serialize(doc);
}

function parseDOMfromString(parser: DOMParser, initialDom: string): Document {
  return parser.parseFromString(initialDom, "text/html");
}

function serialize(doc: Document): string {
  const XMLS = new XMLSerializer();
  return XMLS.serializeToString(doc);
}
