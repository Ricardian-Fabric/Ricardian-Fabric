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
  const el = doc.getElementById("contract-display") as HTMLElement;
  el.innerHTML = pageProps.legalContract;
  return serialize(doc);
}


export async function getFulfilledPagefromVDOM(pageProps: FulfilledPageProps) {
  const doc = parseDOMfromString(pageProps.domParser, initialStringDom);
  render(fulfilledPageLayout(pageProps), doc.body);
  const el = doc.getElementById("contract-display") as HTMLElement;
  el.innerHTML = pageProps.legalContract;
  return serialize(doc);
}

export function deployFromVDOMTemplate(
  pageProps: {
    contract: string;
    title: string;
    domParser: DOMParser;
  },
  fetchedDom: string
) {
  const doc = parseDOMfromString(pageProps.domParser, fetchedDom);
  const body = doc.getElementsByTagName("body");

  body[0].dataset.title = pageProps.title;
  body[0].dataset.contract = pageProps.contract;
  return serialize(doc);
}

function parseDOMfromString(parser: DOMParser, initialDom: string): Document {
  return parser.parseFromString(initialDom, "text/html");
}

function serialize(doc: Document): string {
  const XMLS = new XMLSerializer();
  return XMLS.serializeToString(doc);
}
