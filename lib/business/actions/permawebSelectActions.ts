import {
  dispatch_addNewAccountPopup,
  dispatch_disableButtonElement,
  dispatch_discardFile,
  dispatch_emptyWalletDropper,
  dispatch_hideElement,
  dispatch_promptError,
  dispatch_promptSuccess,
  dispatch_removeError,
  dispatch_removeLoadingIndicator,
  dispatch_renderArweaveTxSummary,
  dispatch_renderError,
  dispatch_renderLoadingIndicator,
  dispatch_renderPermapinSummaryPage,
  dispatch_renderTransferSummaryPage,
  dispatch_renderTxId,
  dispatch_renderUploadStatus,
  dispatch_renderUploadSummary,
} from "../../dispatch/render";
import {
  HashWithIds,
  HashWithTransaction,
  PopupState,
  RenderDispatchArgs,
  State,
  Status,
  TrailDetails,
  WalletDropperType,
} from "../../types";
import {
  ArToWinston,
  createFileTransaction,
  createWallet,
  getProfitSharingTransaction,
  getTip,
  getTrailTransaction,
  getTransferTransaction,
  getWalletAddress,
  getWalletBalance,
  postTransaction,
  uploadData,
} from "../../wallet/arweave";
import {
  copyAddressToClipboard,
  copyStringToClipboard,
  getById,
  newTab,
  readFile,
  readWalletFile,
} from "../../view/utils";
import { addHash } from "../../wallet/permapin/ipfsArweave";
import { decryptWallet, encryptWallet } from "../../crypto";
import { downloadBlob } from "../../view/render";
import {
  dispatch_setNewAccount,
  dispatch_setPopupState,
  dispatch_stashIpfsCID,
} from "../../dispatch/stateChange";
import { hasError, OptionsBuilder } from "../utils";
import {
  getTrailDetails,
  getTrailsContract,
} from "../../wallet/trails/contractCalls";
import { getAddress } from "../../wallet/web3";
import { getProfitSharingAddresses } from "../profitSharing";
import {
  acceptedTerms,
  getSignupContractWithoutWallet,
  getTerms,
} from "../../wallet/signup/contractCalls";

export function permawebSelectActions(props: State) {
  const permawebCheckboxToggle = getById(
    "permaweb_checkbox_toggle"
  ) as HTMLInputElement;
  const permawebCheckboxButton = getById("permaweb_checkbox_button");

  permawebCheckboxButton.onclick = function () {
    permawebCheckboxToggle.click();
  };

  const uploadFile = getById("upload-popup-button");
  const permapin = getById("permapin-popup-button");
  const Account = getById("Account-popup-button");
  const uploadProposal = getById("upload-proposal-button");
  const comment = getById("upload-comment");

  comment.onclick = function () {
    dispatch_setPopupState(PopupState.AddComment);
    permawebCheckboxToggle.checked = false;
  };

  uploadProposal.onclick = function () {
    dispatch_setPopupState(PopupState.UploadProposal);
    permawebCheckboxToggle.checked = false;
  };

  uploadFile.onclick = function () {
    dispatch_setPopupState(PopupState.UploadFile);
    permawebCheckboxToggle.checked = false;
  };

  permapin.onclick = function () {
    dispatch_setPopupState(PopupState.Permapin);
    permawebCheckboxToggle.checked = false;
  };

  Account.onclick = async function () {
    if (props.Account === null) {
      dispatch_setNewAccount({ data: null, address: "", balance: "" });
      dispatch_setPopupState(PopupState.ShowAccount);
    } else {
      await goToShowAccountPage(props);
    }
    permawebCheckboxToggle.checked = false;
  };
}

export function uploadFileListener(props: State) {
  const fileInput = getById("file-input") as HTMLInputElement;
  onFileDropped();
  const backbutton = getById("upload-cancel") as HTMLButtonElement;
  const uploadButton = getById("upload-proceed") as HTMLButtonElement;
  const passwordEl = getById("walletPassword") as HTMLInputElement;
  const contentTypeEl = getById("content-type-input") as HTMLInputElement;
  const clearFileButton = getById("clearFileButton") as HTMLButtonElement;

  clearFileButton.onclick = function () {
    dispatch_discardFile(props);
  };

  backbutton.onclick = function () {
    dispatch_setPopupState(PopupState.NONE);
  };
  const termscheckbox = getById("upload-terms-checkbox") as HTMLInputElement;

  termscheckbox.onclick = async function () {
    await handleTermsCheckbox(termscheckbox);
  };

  uploadButton.onclick = async function () {
    if (fileInput.files.length !== 1) {
      dispatch_renderError("You need to select a single file to upload!");
      return;
    }

    const password = passwordEl.value;

    if (password.length < 8) {
      dispatch_renderError("Missing password.");
      return;
    }

    if (termscheckbox.checked === false) {
      dispatch_renderError("You need to accept the terms!");
      return;
    }

    const decryptOptions = await decryptWallet(props.Account.data, password);

    if (decryptOptions.status !== Status.Success) {
      dispatch_renderError(decryptOptions.error);
      return;
    }

    dispatch_hideElement(uploadButton, true);
    readFile(fileInput.files[0], async (data) => {
      uploadButton.disabled = true;
      dispatch_renderLoadingIndicator("upload-loading-indicator");
      const contentType = contentTypeEl.value;
      try {
        const tx = await createFileTransaction(
          contentType,
          data,
          props.version,
          decryptOptions.data
        );

        const pstAddress = await getProfitSharingAddresses();
        if (pstAddress === undefined) {
          dispatch_renderUploadSummary(
            fileInput.files[0],
            tx,
            contentType,
            data,
            props,
            false,
            ""
          );
        } else {
          const tipTransaction = await getProfitSharingTransaction(
            pstAddress.to,
            decryptOptions.data,
            props.version
          );
          dispatch_renderUploadSummary(
            fileInput.files[0],
            tx,
            contentType,
            data,
            props,
            true,
            tipTransaction
          );
        }
      } catch (err) {
        dispatch_removeLoadingIndicator("upload-loading-indicator");
        uploadButton.disabled = false;
        dispatch_renderError("Failed to create the transaction!");
        dispatch_hideElement(uploadButton, false);
      }
    });
  };
}

export function onFileDropped() {
  const fileInput = getById("file-input") as HTMLInputElement;
  const dropZone = getById("file-dropzone");
  const contentTypeEl = getById("content-type-input") as HTMLInputElement;

  dropZone.onclick = function () {
    fileInput.click();
  };

  fileInput.onchange = function () {
    if (fileInput.files.length === 1) {
      // It's valid
      dispatch_promptSuccess(fileInput.files[0]);
      contentTypeEl.value = fileInput.files[0].type;
      dispatch_removeError();
    } else {
      dispatch_promptError("You can only upload a single file.");
    }
  };

  dropZone.ondragover = function (e: Event) {
    e.preventDefault();
    dropZone.classList.add("drop-zone--over");
  };
  dropZone.ondragleave = function (e: Event) {
    dropZone.classList.remove("drop-zone--over");
  };
  dropZone.ondragend = function (e: Event) {
    dropZone.classList.remove("drop-zone--over");
  };
  dropZone.ondrop = function (e: DragEvent) {
    e.preventDefault();

    if (e.dataTransfer.files.length === 1) {
      fileInput.files = e.dataTransfer.files;
      dispatch_promptSuccess(e.dataTransfer.files[0]);
      contentTypeEl.value = fileInput.files[0].type;
      dispatch_removeError();
    } else {
      dispatch_promptError("You can only upload a single filezs");
    }
    dropZone.classList.remove("drop-zone--over");
  };
}

export function uploadSummaryActions(
  transaction: any,
  props: State,
  redirectTo: PopupState,
  sendTip: boolean,
  tipTransaction: any
) {
  const back = getById("uploadSummary-cancel");
  const proceed = getById("uploadSummary-proceed");
  const transactiondisplay = getById("uploadSummary-tx");
  const copyButton = getById("copy-transaction");
  copyButton.onclick = async function () {
    const txId = copyButton.dataset.txid;
    await copyStringToClipboard(txId);
  };

  back.onclick = function () {
    dispatch_setPopupState(redirectTo);
  };

  proceed.onclick = async function () {
    dispatch_hideElement(proceed, true);
    dispatch_hideElement(back, true);
    try {
      const res = await uploadData(transaction, (uploader) => {
        dispatch_renderUploadStatus(
          props,
          `${uploader.pctComplete}% complete, ${uploader.uploadedChunks}/${uploader.totalChunks}`
        );
      });
      if (sendTip) {
        const secondTX = (await postTransaction(tipTransaction).catch((err) => {
          dispatch_renderError(err);
        })) as {
          status: number;
          statusText: string;
          data: any;
        };
      }

      if (res.status === Status.Failure) {
        dispatch_renderError(res.error);
        dispatch_hideElement(proceed, false);
        dispatch_hideElement(transactiondisplay, false);
      }
      dispatch_hideElement(back, false);
    } catch (err) {
      dispatch_renderError(err);
      dispatch_hideElement(proceed, false);
      dispatch_hideElement(back, false);
    }
  };
}

export function permapinPopupActions(props: any) {
  const back = getById("permapin-back");
  const proceed = getById("permapin-proceed") as HTMLButtonElement;
  const CIDEl = getById("CID-input-permapin") as HTMLInputElement;
  const passwordEl = getById("walletPassword") as HTMLInputElement;
  const accountBttn = getById("permapin-account-button");
  const termsEl = getById("permapin-terms-checkbox") as HTMLInputElement;

  termsEl.onclick = async function () {
    await handleTermsCheckbox(termsEl);
  };
  accountBttn.onclick = async function () {
    dispatch_setPopupState(PopupState.ShowAccount);
  };

  if (props?.ipfsHash !== undefined) {
    CIDEl.value = props.ipfsHash;
  }

  back.onclick = function () {
    dispatch_setPopupState(PopupState.NONE);
  };

  proceed.onclick = async function () {
    if (props.Account.data === null) {
      dispatch_renderError("You must add an arweave key first!");
      return;
    }

    if (CIDEl.value === "") {
      dispatch_renderError("You must add an ipfs identifier!");
      return;
    }

    if (termsEl.checked === false) {
      dispatch_renderError("You must accept the terms!");
      return;
    }

    if (passwordEl.value.length < 8) {
      dispatch_renderError("Missing password");
      return;
    }
    const password = passwordEl.value;

    const decryptOptions = await decryptWallet(props.Account.data, password);

    if (decryptOptions.status !== Status.Success) {
      dispatch_renderError(decryptOptions.error);
      return;
    }

    const ipfsHash = CIDEl.value;

    dispatch_disableButtonElement(proceed, true);
    dispatch_renderLoadingIndicator("permapin-loading-indicator");

    const result = await addHash(ipfsHash, props.ipfs, decryptOptions.data);
    dispatch_disableButtonElement(proceed, false);
    dispatch_removeLoadingIndicator("permapin-loading-indicator");
    if (result.status === Status.Failure) {
      const err = result as HashWithIds;
      dispatch_renderError(err.message);

      return;
    }
    if (result.status === Status.AlreadyExists) {
      const err = result as HashWithIds;
      dispatch_renderError(err.message);
    }

    if (result.status === Status.Success) {
      const txRes = result as HashWithTransaction;

      const pstAddress = await getProfitSharingAddresses();
      let tipTransaction;

      if (pstAddress === undefined) {
        dispatch_renderPermapinSummaryPage(props, txRes, false, tipTransaction);
      } else {
        // Dispatch the Permapin transaction and the TIP transaction summary Page!
        tipTransaction = await getProfitSharingTransaction(
          pstAddress.to,
          decryptOptions.data,
          props.version
        );
        dispatch_renderPermapinSummaryPage(props, txRes, true, tipTransaction);
      }
    }
  };
}

export function permawebTransactionAction(props: State, hash: string) {
  //This is called on the acceptable page, TODO: refactor

  const permapinButton = getById("permapin-deployed-button");
  permapinButton.onclick = function () {
    dispatch_stashIpfsCID(hash);
    dispatch_setPopupState(PopupState.Permapin);
  };
}

export function walletCreateActions(props: State) {
  let accordionOpen = false;

  const backbutton = getById("wallet-cancel");
  const proceed = getById("wallet-proceed");
  const password = getById("wallet-password-once") as HTMLInputElement;
  const passwordAgain = getById("wallet-password-twice") as HTMLInputElement;
  const fileInput = getById("wallet-input") as HTMLInputElement;
  const dropzone = getById("wallet-dropzone");
  const accordionButton = getById("import-arweave-accordion-button");

  //Hide the dropzone first.
  dispatch_hideElement(dropzone, true);

  accordionButton.onclick = function () {
    if (accordionOpen) {
      dispatch_hideElement(dropzone, true);
      accordionOpen = false;
    } else {
      dispatch_hideElement(dropzone, false);
      accordionOpen = true;
    }
  };

  // If proceed was hidden, I need to show it again.
  dispatch_hideElement(proceed, false);

  onWalletFileDropped(props, WalletDropperType.PLAINTEXT);

  //On init I empty the password fields, even tho the browser will substitute something in.ZP
  password.value = "";
  passwordAgain.value = "";

  backbutton.onclick = async function () {
    await goToShowAccountPage(props);
    dispatch_emptyWalletDropper(props);
  };

  proceed.onclick = async function () {
    const pass1 = password.value;
    const pass2 = passwordAgain.value;
    if (pass1 !== pass2) {
      dispatch_renderError("The passwords don't match");
      return;
    }
    if (pass1.length < 8) {
      dispatch_renderError("The passwords must be at least 8 characters long.");
      return;
    }

    const keyFound = async (key: any) => {
      dispatch_hideElement(proceed, true);
      const address = await getWalletAddress(key);
      const encryptedBlob = await encryptWallet(key, pass1);
      downloadBlob(encryptedBlob, address + ".enc");
      // after the blob is downloaded I redirect to Account, and set the blob
      dispatch_addNewAccountPopup(
        props,
        await encryptedBlob.arrayBuffer(),
        address
      );
    };

    if (fileInput.files.length > 0) {
      if (fileInput.files.length !== 1) {
        dispatch_renderError("You can import only one file");
        return;
      }

      if (fileInput.files[0].type !== "application/json") {
        dispatch_renderError(
          "File type is invalid. Must be unencrypted arweave wallet file."
        );
        return;
      }

      readWalletFile(fileInput.files, async (key) => {
        if (key !== undefined && key.kty === "RSA") {
          keyFound(key);
        } else {
          dispatch_renderError(
            "File type is invalid. Must be unencrypted arweave wallet file."
          );
        }
      });
    } else {
      const key = await createWallet();
      keyFound(key);
    }
  };
}

export function onWalletFileDropped(props: State, type: WalletDropperType) {
  const walletInput = getById("wallet-input") as HTMLInputElement;
  const dropZone = getById("wallet-dropzone");
  const requiredType =
    type === WalletDropperType.PLAINTEXT ? "application/json" : "";

  dropZone.onclick = function () {
    walletInput.click();
  };

  walletInput.onchange = function () {
    const file = walletInput.files[0];

    if (walletInput.files.length === 1 && file.type === requiredType) {
      // It's valid
      dispatch_promptSuccess(walletInput.files[0]);
      dispatch_removeError();
    } else {
      dispatch_promptError("Invalid File");
    }
  };

  dropZone.ondragover = function (e: Event) {
    e.preventDefault();
    dropZone.classList.add("drop-zone--over");
  };
  dropZone.ondragleave = function (e: Event) {
    dropZone.classList.remove("drop-zone--over");
  };
  dropZone.ondragend = function (e: Event) {
    dropZone.classList.remove("drop-zone--over");
  };

  dropZone.ondrop = function (e: DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (e.dataTransfer.files.length === 1 && file.type === requiredType) {
      walletInput.files = e.dataTransfer.files;
      dispatch_promptSuccess(e.dataTransfer.files[0]);
      dispatch_removeError();
    } else {
      dispatch_promptError("Invalid File");
    }
    dropZone.classList.remove("drop-zone--over");
  };
}

export function AddNewAccountActions(
  props: State,
  Account: ArrayBuffer,
  address: string
) {
  const cancelButton = getById("addNewAccount-cancel");
  const proceedButton = getById("addNewAccount-proceed");

  cancelButton.onclick = function () {
    dispatch_setPopupState(PopupState.NONE);
  };

  proceedButton.onclick = async function () {
    const balance = await getWalletBalance(address);
    dispatch_setNewAccount({ data: Account, address, balance });
    dispatch_setPopupState(PopupState.NONE);
  };
}

export function showAccountActions(props: State) {
  const cancelButton = getById("Account-cancel");
  const proceedButton = getById("switchAccount-proceed");
  const newAccountButton = getById("new-Account");
  const transferButton = getById("transferPage-button");
  const copyButton = getById("copy-address-button");

  transferButton.onclick = async function () {
    dispatch_setPopupState(PopupState.TransferAr);
  };
  cancelButton.onclick = function () {
    if (props.previousPopupState === PopupState.Permapin) {
      dispatch_setPopupState(PopupState.Permapin);
    } else {
      dispatch_setPopupState(PopupState.NONE);
    }
  };

  proceedButton.onclick = function () {
    dispatch_setPopupState(PopupState.SwitchAccount);
  };

  newAccountButton.onclick = function () {
    dispatch_setPopupState(PopupState.NewAccount);
  };

  copyButton.onclick = async function () {
    await copyAddressToClipboard();
  };
}

export function switchAccountsActions(props: State) {
  const cancelButton = getById("Account-cancel");
  const proceedButton = getById("switchAccount-proceed");
  onWalletFileDropped(props, WalletDropperType.ENCRYPTED);
  cancelButton.onclick = async function () {
    await goToShowAccountPage(props);
  };

  proceedButton.onclick = async function () {
    const walletInput = getById("wallet-input") as HTMLInputElement;
    const passwordInput = getById("AccountPassword") as HTMLInputElement;
    // I need to check if a file was selected
    if (walletInput.files.length !== 1) {
      dispatch_renderError("You need to select the file.");
      return;
    }
    // I need to get the password
    if (passwordInput.value.length < 8) {
      dispatch_renderError("You need to add the password.");
      return;
    }
    const file = walletInput.files[0];
    const passwd = passwordInput.value;
    // I need to do the decryptz
    const decryptOptions = await decryptWallet(
      await file.arrayBuffer(),
      passwd
    );

    if (decryptOptions.status !== Status.Success) {
      dispatch_renderError(decryptOptions.error);
      return;
    }
    // if decrypt succeeds, I will fetch the address of the wallet

    const address = await getWalletAddress(decryptOptions.data).catch((err) => {
      dispatch_renderError(err);
      return;
    });

    dispatch_setNewAccount({
      data: await file.arrayBuffer(),
      address: address as string,
      balance: await getWalletBalance(address as string),
    });

    dispatch_setPopupState(PopupState.ShowAccount);
  };
}

export async function transferPageActions(props: State) {
  const backbutton = getById("transferPage-cancel");
  const sendbutton = getById("transferPage-proceed");
  const acceptedTermsEl = getById(
    "transfer-terms-checkbox"
  ) as HTMLInputElement;

  acceptedTermsEl.onclick = async function () {
    await handleTermsCheckbox(acceptedTermsEl);
  };

  backbutton.onclick = async function () {
    await goToShowAccountPage(props);
  };

  sendbutton.onclick = async function () {
    const amountEl = getById("transferAmount") as HTMLInputElement;
    const toEl = getById("transferToAddress") as HTMLInputElement;
    const passwordEl = getById("password") as HTMLInputElement;

    const amount = amountEl.value;

    if (isNaN(parseFloat(amount))) {
      dispatch_renderError("Invalid amount!");
      return;
    }

    if (toEl.value.length !== 43) {
      dispatch_renderError("Wrong address to transfer to.");
      return;
    }

    const password = passwordEl.value;

    if (password.length < 8) {
      dispatch_renderError("Missing password.");
      return;
    }

    const acceptedTerms = acceptedTermsEl.checked;

    if (!acceptedTerms) {
      dispatch_renderError("You must accept the terms.");
      return;
    }
    const decryptOptions = await decryptWallet(props.Account.data, password);

    if (decryptOptions.status !== Status.Success) {
      dispatch_renderError(decryptOptions.error);
      return;
    }

    const balance = await getWalletBalance(props.Account.address);

    const winstonToSend = ArToWinston(amount);
    let summaryInWinston = parseFloat(winstonToSend);

    const balanceInWinston = ArToWinston(balance);

    if (parseFloat(balanceInWinston) < summaryInWinston) {
      dispatch_renderError("Not enough balance.");
      return;
    }
    const target = toEl.value;
    // I'm gonna sign the transaction and dispatch the summary page
    const transaction = await getTransferTransaction(
      target,
      winstonToSend.toString(),
      decryptOptions.data,
      props.version
    );

    const pstAddress = await getProfitSharingAddresses();
    if (pstAddress === undefined) {
      dispatch_renderTransferSummaryPage(
        props,
        transaction,
        winstonToSend,
        false,
        getTip(),
        "",
        decryptOptions.data
      );
    } else {
      const tipTransaction = await getProfitSharingTransaction(
        pstAddress.to,
        decryptOptions.data,
        props.version
      );
      dispatch_renderTransferSummaryPage(
        props,
        transaction,
        winstonToSend,
        true,
        getTip(),
        tipTransaction,
        decryptOptions.data
      );
    }

    //I'm gonna dispatch the summary page with the transaction
  };
}

export async function goToShowAccountPage(props: State) {
  dispatch_setNewAccount({
    data: props.Account.data,
    address: props.Account.address,
    balance: await getWalletBalance(props.Account.address),
  });

  dispatch_setPopupState(PopupState.ShowAccount);
}

export function transferSummaryPageActions(props: RenderDispatchArgs) {
  const { mainTransaction, amountToSend, sendTip, tipAmount, tipTransaction } =
    props.tmp;

  const backbutton = getById("transferSummary-cancel");
  const postIt = getById("transferSummary-proceed");

  backbutton.onclick = async function () {
    await goToShowAccountPage(props);
  };

  postIt.onclick = async function () {
    dispatch_renderLoadingIndicator("transaction-loading");
    dispatch_hideElement(postIt, true);
    const firstTX = (await postTransaction(mainTransaction).catch((err) => {
      dispatch_renderError(err);
    })) as {
      status: number;
      statusText: string;
      data: any;
    };
    if (sendTip) {
      const secondTX = (await postTransaction(tipTransaction).catch((err) => {
        dispatch_renderError(err);
      })) as {
        status: number;
        statusText: string;
        data: any;
      };
    }

    if (firstTX.status === 200) {
      dispatch_removeLoadingIndicator("transaction-loading");
      dispatch_renderTxId("transaction-loading", mainTransaction.id);
    } else {
      dispatch_removeLoadingIndicator("transaction-loading");
      dispatch_renderError(firstTX.statusText);
      dispatch_hideElement(postIt, false);
      return;
    }
  };
}

export function permapinSummaryActions(arg: {
  permapinTx: any;
  sendTip: boolean;
  tipTx: any;
}) {
  const back = getById("permapinPost-back");
  const next = getById("permapinPost-proceed");

  const copyButton = getById("copy-transaction");
  copyButton.onclick = async function () {
    const txId = copyButton.dataset.txid;
    await copyStringToClipboard(txId);
  };
  back.onclick = function () {
    dispatch_setPopupState(PopupState.Permapin);
  };

  next.onclick = async function () {
    dispatch_renderLoadingIndicator("transaction-loading");
    dispatch_hideElement(next, true);
    // I take the transaction and just post it
    const firstTx = (await postTransaction(arg.permapinTx.tx).catch((err) => {
      dispatch_renderError(err);
    })) as { status: number; statusText: string; data: any };

    if (arg.sendTip) {
      const secondTx = await postTransaction(arg.tipTx).catch((err) => {
        dispatch_renderError(err);
      });
    }
    if (firstTx.status === 200) {
      //I need to render the transaction id to the page
      dispatch_removeLoadingIndicator("transaction-loading");
      dispatch_renderTxId("transaction-loading", arg.permapinTx.tx.id);
      dispatch_renderTxId("transaction-loading", arg.permapinTx.tx.id);
    } else {
      dispatch_renderError(firstTx.statusText);
      dispatch_removeLoadingIndicator("transaction-loading");
      dispatch_hideElement(next, false);
      return;
    }
  };
}

export function uploadCommentActions(props: State) {
  const backEl = getById("comment-cancel") as HTMLButtonElement;
  const proceedEl = getById("comment-proceed") as HTMLButtonElement;
  const trailNameEl = getById("trail-name") as HTMLInputElement;
  const passwordEl = getById("wallet-password") as HTMLInputElement;
  const termsCheckbox = getById("terms-checkbox") as HTMLInputElement;
  termsCheckbox.onclick = async function () {
    await handleTermsCheckbox(termsCheckbox);
  };

  const linkedTransactionEl = getById(
    "linkedTransaction-input"
  ) as HTMLInputElement;
  const commentEl = getById("comment-input") as HTMLInputElement;
  if (props.Account.data === null) {
    dispatch_renderError("You must add an arweave key first!");
  }

  dispatch_disableButtonElement(proceedEl, false);
  dispatch_disableButtonElement(backEl, false);
  backEl.onclick = function () {
    dispatch_setPopupState(PopupState.NONE);
  };

  proceedEl.onclick = async function () {
    if (props.Account.data === null) {
      dispatch_renderError("You must add an arweave key first!");
      return;
    }
    if (trailNameEl.value === "") {
      dispatch_renderError("Trail id is missing");
      dispatch_disableButtonElement(proceedEl, false);
      dispatch_disableButtonElement(backEl, false);

      return;
    }
    const trailId = trailNameEl.value;
    if (commentEl.value === "") {
      dispatch_renderError("You must add a comment");
      return;
    }
    const comment = commentEl.value;

    if (termsCheckbox.checked === false) {
      dispatch_renderError("You need to accept the terms.");
      return;
    }
    const password = passwordEl.value;

    if (password.length < 8) {
      dispatch_renderError("Missing password.");
      return;
    }
    const myAddressOptions = await OptionsBuilder(() => getAddress());

    dispatch_disableButtonElement(proceedEl, true);
    dispatch_disableButtonElement(backEl, true);

    if (hasError(myAddressOptions)) {
      dispatch_disableButtonElement(proceedEl, false);
      dispatch_disableButtonElement(backEl, false);

      return;
    }
    const addr = myAddressOptions.data;
    const trailsContractOptions = await OptionsBuilder(() =>
      getTrailsContract()
    );
    const trails = trailsContractOptions.data;

    if (hasError(trailsContractOptions)) {
      dispatch_disableButtonElement(proceedEl, false);
      dispatch_disableButtonElement(backEl, false);

      return;
    }

    const checkIfExistsOptions = await OptionsBuilder(() =>
      getTrailDetails(trails, trailId, addr)
    );

    if (hasError(checkIfExistsOptions)) {
      dispatch_disableButtonElement(proceedEl, false);
      dispatch_disableButtonElement(backEl, false);

      return;
    }
    const trailDetails: TrailDetails = checkIfExistsOptions.data;

    if (!trailDetails.initialized) {
      dispatch_renderError("That trail doesn't exist");
      dispatch_disableButtonElement(proceedEl, false);
      dispatch_disableButtonElement(backEl, false);

      return;
    }

    if (trailDetails.access === "0") {
      //If it's private, I check if the uploading address is the same as the creator
      if (addr !== trailDetails.creator) {
        dispatch_renderError(
          "This is a private trail, your comments will never be displayed."
        );
        dispatch_disableButtonElement(proceedEl, false);
        dispatch_disableButtonElement(backEl, false);

        return;
      }
    }
    if (linkedTransactionEl.value.length !== 0) {
      if (linkedTransactionEl.value.length !== 43) {
        dispatch_renderError("Invalid linked transaction!");
        dispatch_disableButtonElement(proceedEl, false);
        dispatch_disableButtonElement(backEl, false);
        return;
      }
    }

    const linkedtransaction = linkedTransactionEl.value;

    if (props.Account.data?.byteLength === undefined) {
      dispatch_renderError("Invalid account data");
      dispatch_disableButtonElement(proceedEl, false);
      dispatch_disableButtonElement(backEl, false);
      return;
    }
    const decryptOptions = await decryptWallet(props.Account.data, password);
    if (hasError(decryptOptions)) {
      dispatch_disableButtonElement(proceedEl, false);
      dispatch_disableButtonElement(backEl, false);
      return;
    }

    const commentTransaction = await getTrailTransaction(
      trailId,
      decryptOptions.data,
      props.version,
      comment,
      linkedtransaction
    );

    const pstAddress = await getProfitSharingAddresses();

    if (pstAddress === undefined) {
      dispatch_renderArweaveTxSummary(commentTransaction, props, false, "");
    } else {
      const tipTransaction = await getProfitSharingTransaction(
        pstAddress.to,
        decryptOptions.data,
        props.version
      );
      dispatch_renderArweaveTxSummary(
        commentTransaction,
        props,
        true,
        tipTransaction
      );
    }
  };
}

export async function handleTermsCheckbox(termsCheckbox: HTMLInputElement) {
  if (termsCheckbox.checked) {
    const address = await getAddress();
    const signupContract = await getSignupContractWithoutWallet();

    const signedTerms = await acceptedTerms(signupContract, address);
    const contractURL = await getTerms(signupContract);
    // If the terms were not signed, but they exist, I navigate to a new tab here
    if (contractURL.length !== 0) {
      if (!signedTerms) {
        newTab(contractURL);
      }
      termsCheckbox.checked = signedTerms;
    }
  }
}
