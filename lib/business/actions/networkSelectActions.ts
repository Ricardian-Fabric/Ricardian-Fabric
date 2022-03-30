import { dispatch_renderError } from "../../dispatch/render";
import { switchNetwork, web3Injected } from "../../wallet/web3";
import { getById } from "../../view/utils";
import MetaMaskOnboarding from "@metamask/onboarding";
import { ChainName, Chains, State } from "../../types";

export function networkSelectActions() {
  const switchnetworkToggle = getById(
    "network_checkbox_toggle"
  ) as HTMLInputElement;

  const switchnetworkButton = getById("network_checkbox_button");

  switchnetworkButton.onclick = function () {
    switchnetworkToggle.click();
  };

  switchnetworkToggle.onclick = function () {
    if (!web3Injected()) {
      switchnetworkToggle.checked = false;
      dispatch_renderError("Found no injected web3, install metamask");
      const onboarding = new MetaMaskOnboarding();
      onboarding.startOnboarding();
      return;
    }
  };

  const ropsten = getById("ropsten-testnet");
  const bscTestnet = getById("bsc-testnet");
  const polygonTestnet = getById("polygon-testnet");
  const hmnyTestnetShard0 = getById("network-hmny-testnet-shard0");
  const hmnyMainnetShard0 = getById("network-hmny-mainnet-shard0");

  ropsten.onclick = async function () {
    switchnetworkToggle.checked = false;
    await switchNetwork(ChainName.Ropsten, 0, "Testnet");
  };
  bscTestnet.onclick = async function () {
    switchnetworkToggle.checked = false;
    await switchNetwork(ChainName.BSC, 0, "Testnet");
  };
  polygonTestnet.onclick = async function () {
    switchnetworkToggle.checked = false;
    await switchNetwork(ChainName.Polygon, 0, "Testnet");
  };
  hmnyTestnetShard0.onclick = async function () {
    switchnetworkToggle.checked = false;
    await switchNetwork(ChainName.Harmony, 0, "Testnet");
  };
  hmnyMainnetShard0.onclick = async function () {
    switchnetworkToggle.checked = false;
    await switchNetwork(ChainName.Harmony, 0, "Mainnet");
  };
}

export function addChainButtonListener(props: State) {
  const addChainButton = getById("addChainButton");
  addChainButton.onclick = async function () {
    const chains = {
      [Chains.Ropsten]: async () =>
        await switchNetwork(ChainName.Ropsten, 0, "Testnet"),
      [Chains.bscTestnet]: async () =>
        await switchNetwork(ChainName.BSC, 0, "Testnet"),
      [Chains.polygonTestnet]: async () =>
        await switchNetwork(ChainName.Polygon, 0, "Testnet"),
      [Chains.harmonyTestnetShard0]: async () =>
        await switchNetwork(ChainName.Harmony, 0, "Testnet"),
      [Chains.harmonyMainnetShard0]: async () =>
        await switchNetwork(ChainName.Harmony, 0, "Mainnet"),
    };
    await chains[props.network]();
  };
}
