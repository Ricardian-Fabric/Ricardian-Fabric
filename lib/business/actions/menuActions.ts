import { dispatch_setPage } from "../../dispatch/stateChange";
import { ChainName, PageState, State } from "../../types";
import { getById } from "../../view/utils";
import { currentNetwork, switchNetwork } from "../../wallet/web3";

export async function menuActions(props: State) {
  const createPage = getById("create-contract-button");
  const smartContractButton = getById("smart-contract-catalog-button");
  const reviewAndVoteButton = getById("review-and-vote-button");
  const dashboardButton = getById("dashboard-button");
  const tokenSale = getById("tokensale-button");
  const vaultButton = getById("vault-button");
  const trailsButton = getById("trails-page-button");
  const rewardsButton = getById("fees-button");

  dashboardButton.onclick = async function () {
    await switchToPolygon();

    dispatch_setPage(PageState.Dashboard);
  };

  createPage.onclick = function () {
    dispatch_setPage(PageState.CreateRicardian);
  };

  smartContractButton.onclick = function () {
    dispatch_setPage(PageState.Catalog);
  };

  reviewAndVoteButton.onclick = async function () {
    await switchToPolygon();

    dispatch_setPage(PageState.ReviewAndVote);
  };

  // tokenSale.onclick = async function () {
  //   await switchToPolygon();

  //   dispatch_setPage(PageState.tokenSale);
  // };

  vaultButton.onclick = async function () {
    await switchToPolygon();
    dispatch_setPage(PageState.vault);
  };

  trailsButton.onclick = async function () {
    dispatch_setPage(PageState.trails);
  };

  rewardsButton.onclick = async function () {
    await switchToPolygon();
    dispatch_setPage(PageState.rewards);
  };
}

export async function switchToPolygon() {
  await switchNetwork(ChainName.Polygon, 0, currentNetwork);
}

async function switchToHarmony() {
  await switchNetwork(ChainName.Harmony, 0, currentNetwork);
}
