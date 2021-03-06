import {
  dispatch_promptErrorDOCX,
  dispatch_promptSuccessDOCX,
  dispatch_removeError,
} from "../../dispatch/render";
import { PopupState, State } from "../../types";
import { getById } from "../../view/utils";
import mammoth from "mammoth";
import { dispatch_setPopupState } from "../../dispatch/stateChange";
export function onDocFileDropped(props: State) {
  const editor = props.editor;
  const docxInput = getById("docx-input") as HTMLInputElement;
  const dropZone = getById("docx-dropzone");

  dropZone.onclick = function () {
    if (docxInput.disabled) {
      return;
    }
    docxInput.click();
  };

  docxInput.onchange = function () {
    if (docxInput.disabled) {
      return;
    }
    const file = docxInput.files[0];
    if (
      docxInput.files.length === 1 &&
      file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      // It's valid
      dispatch_promptSuccessDOCX(docxInput.files[0]);
      dispatch_removeError();
      convertToHTML(docxInput.files[0], editor);
      dispatch_setPopupState(PopupState.NONE);
    } else {
      dispatch_promptErrorDOCX("Invalid file,must be a docx file");
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
    if (docxInput.disabled) {
      return;
    }

    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (
      e.dataTransfer.files.length === 1 &&
      file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      docxInput.files = e.dataTransfer.files;
      dispatch_promptSuccessDOCX(e.dataTransfer.files[0]);
      dispatch_removeError();
      convertToHTML(e.dataTransfer.files[0], editor);
      dispatch_setPopupState(PopupState.NONE);
    } else {
      dispatch_promptErrorDOCX("Invalid file, must be a docx file");
    }
    dropZone.classList.remove("drop-zone--over");
  };
}

function convertToHTML(file: File, editor: any) {
  readFileInputEventAsArrayBuffer(file, function (arrayBuffer) {
    mammoth
      .convertToHtml({ arrayBuffer: arrayBuffer })
      .then((result) => {
        editor.setContent(result.value, 0);
      })
      .done();
  });
}

export function convertToHTMLFromArrayBuffer(
  arrayBuffer,
  getTerms: CallableFunction
) {
  mammoth
    .convertToHtml({ arrayBuffer: arrayBuffer })
    .then((result) => getTerms(result.value))
    .done();
}

function readFileInputEventAsArrayBuffer(file, callback) {
  var reader = new FileReader();

  reader.onload = function (loadEvent) {
    var arrayBuffer = loadEvent.target.result;
    callback(arrayBuffer);
  };

  reader.readAsArrayBuffer(file);
}

export function docxImportBackButton() {
  const back = getById("dropper-back-button");
  back.onclick = function () {
    dispatch_setPopupState(PopupState.NONE);
  };
}

export function onDocProposalFileDropped(props: State) {
  const docxInput = getById("docx-input") as HTMLInputElement;
  const dropZone = getById("docx-dropzone");

  dropZone.onclick = function () {
    if (docxInput.disabled) {
      return;
    }
    docxInput.click();
  };

  docxInput.onchange = function () {
    if (docxInput.disabled) {
      return;
    }
    const file = docxInput.files[0];
    if (
      docxInput.files.length === 1 &&
      file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      // It's valid
      dispatch_promptSuccessDOCX(docxInput.files[0]);
      dispatch_removeError();
    } else {
      dispatch_promptErrorDOCX("Invalid file,must be a docx file");
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
    if (docxInput.disabled) {
      return;
    }

    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (
      e.dataTransfer.files.length === 1 &&
      file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      docxInput.files = e.dataTransfer.files;
      dispatch_promptSuccessDOCX(e.dataTransfer.files[0]);
      dispatch_removeError();
    } else {
      dispatch_promptErrorDOCX("Invalid file, must be a docx file");
    }
    dropZone.classList.remove("drop-zone--over");
  };
}
