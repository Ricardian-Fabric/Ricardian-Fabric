import {
  createAcceptableContract,
  getCreatorWallet,
} from "../../business/bloc";
import {
  dispatch_removeError,
  dispatch_renderError,
} from "../../dispatch/render";
import { State } from "../../types";
import {
  getById,
  getExpires,
  getPrice,
  getPostTo,
  readFile,
  getWebhookCheckbox,
  getRedirectCheckbox,
  didExpire,
} from "../utils";
export function renderCreateButtonClick(props: State) {
  getById("save-contract").onclick = function () {
    dispatch_removeError();
    const expires = getExpires();
    const expired = didExpire(expires);

    if (expired) {
      dispatch_renderError("Date expired!");
      return;
    }

    const wallet_file = getById("select-file-input") as HTMLInputElement;
    if (wallet_file.files !== null) {
      const getKey = async (key: any) => {
        //Here I call the business logic to do stuff with the key and the other values
        await createAcceptableContract({
          props,
          key,
          data: {
            legalContract: props.editor.getContent(),
            createdDate: new Date().toISOString(),
            price: getPrice(),
            post: getPostTo(),
            webhook: getWebhookCheckbox(),
            redirect: getRedirectCheckbox(),
            expires,
            domParser: props.domParser,
            creatorAddress: await getCreatorWallet(props.arweave, key),
          },
        });
      };
      readFile(wallet_file.files, getKey);
    }
  };
}
