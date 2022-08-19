import {
  dispatch_contractDeployedData,
  dispatch_DisableSCInputs,
  dispatch_EnableSCInputs,
  dispatch_renderError,
  dispatch_setDeployedSCAddress,
} from "../../dispatch/render";
import {
  ChainName,
  PageState,
  PopupState,
  ProposalFormat,
  State,
} from "../../types";
import {
  deployContract,
  findConstructorParameters,
  getAddress,
  prepareType,
  requestAccounts,
  switchNetwork,
  web3Injected,
} from "../../wallet/web3";
import { copyStringToClipboard, getById } from "../../view/utils";
import MetaMaskOnboarding from "@metamask/onboarding";
import {
  dispatch_setCreateRicardianState,
  dispatch_setPage,
  dispatch_setPopupState,
} from "../../dispatch/stateChange";
import { getError } from "../../wallet/errors";

export function constructSCActions(props: State, selected: ProposalFormat) {
  const abi = selected.artifact.abi;
  const bytecode = selected.artifact.bytecode;
  const constructorParams = findConstructorParameters(abi);

  const constructorElements = {};

  //I need to get the inputElements based on the params.
  constructorParams.forEach((param) => {
    const el = getById(`${param.name}-input`) as HTMLInputElement;

    // Under the param name I store the element and the param itself
    constructorElements[param.name] = { param, el };
  });

  const backbutton = getById("SCConstructBackButton");
  const nextButton = getById("SCConstructCreateButton");
  const acceptTerms = getById("agree-to-deploy-sc") as HTMLInputElement;
  backbutton.onclick = function () {
    dispatch_setPopupState(PopupState.NONE);
  };

  nextButton.onclick = async function () {
    // I need to do metamask onboarding if its not installed
    if (!web3Injected()) {
      dispatch_renderError("Found no injected web3, install metamask");
      const onboarding = new MetaMaskOnboarding();
      onboarding.startOnboarding();
      return;
    }
    await requestAccounts();

    if (selected.network !== "All") {
      await switchNetwork(selected.network as ChainName, 0, "Mainnet");
    }

    const empty = inputsEmpty(constructorElements, constructorParams);
    if (empty) {
      dispatch_renderError("You must fill out the empty fields");
      return;
    }

    if (acceptTerms.checked === false) {
      dispatch_renderError("You must accept the terms");
      return;
    }

    dispatch_DisableSCInputs(constructorParams);
    const preparedArgs = prepareArguments(
      constructorElements,
      constructorParams
    );

    const address = await getAddress();

    const onError = (err) => {
      dispatch_renderError(getError(err.message));
      dispatch_EnableSCInputs(constructorParams);
    };

    const onReceipt = async (receipt) => {
      dispatch_setDeployedSCAddress(receipt.contractAddress);
      dispatch_setPopupState(PopupState.contractDeployed);
      if (selected.simpleterms) {
        dispatch_setCreateRicardianState({
          ...props.createRicardianPageProps,
          smartContract: receipt.contractAddress,
        });
      }
      dispatch_contractDeployedData(
        props,
        receipt.contractAddress,
        selected.simpleterms
      );
    };

    await deployContract(
      abi,
      bytecode,
      address,
      preparedArgs,
      onError,
      onReceipt
    );
  };
}

export function inputsEmpty(constructorElements, params): boolean {
  let empty = false;

  params.forEach((par) => {
    const element = constructorElements[par.name].el as HTMLInputElement;
    if (element.value === "") {
      empty = true;
    }
  });

  return empty;
}

export function prepareArguments(constructorElements, params) {
  const preparedArgs: any[] = [];
  params.forEach((par) => {
    const type = constructorElements[par.name].param.type;
    const value = constructorElements[par.name].el.value;
    preparedArgs.push(prepareType(type, value));
  });
  return preparedArgs;
}

export function deploymentDoneActions() {
  const copyButton = getById("copyContractAddress");
  const dismiss = getById("dismiss-popup-button");
  const headOver = getById("head-over-button");
  copyButton.onclick = async function () {
    const address = copyButton.dataset.address as string;
    await copyStringToClipboard(address);
  };

  dismiss.onclick = function () {
    dispatch_setPopupState(PopupState.NONE);
  };

  headOver.onclick = function () {
    dispatch_setPopupState(PopupState.NONE);
    dispatch_setPage(PageState.CreateRicardian);
  };
}
