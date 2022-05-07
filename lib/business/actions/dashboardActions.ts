import {
  dispatch_renderLoadedValue,
  dispatch_renderPermapinnedDashboardData,
} from "../../dispatch/render";
import { dispatch_setPage } from "../../dispatch/stateChange";
import { getUploadedContracts } from "../../fetch/graphql";
import { PageState, State } from "../../types";
import { getById } from "../../view/utils";
import {
  getAcceptedSmartContractIndex,
  getCatalogDAOContractWithWallet,
  getRankProposalIndex,
  getSmartContractProposalIndex,
  getTerms,
} from "../../wallet/catalogDAO/contractCalls";
import {
  getAvailableReward,
  getDaoStakingContract,
  getTotalStaked,
} from "../../wallet/daoStaking/contractCalls";
import {
  getFeeDaoContract,
  getTokens,
  getTotalBalance,
} from "../../wallet/feeDao/contractCalls";
import { getRicContract, totalSupply } from "../../wallet/ric/contractCalls";
import {
  getCurrentRate,
  getRicSaleContract,
  getTokensSold,
  remainingTokens,
} from "../../wallet/ricSale/contractCalls";
import {
  getRicVaultContract,
  getTotalLocked,
} from "../../wallet/ricVault/contractCalls";
import { getSignupContract } from "../../wallet/signup/contractCalls";
import { getAddress } from "../../wallet/web3";
import { hasError, OptionsBuilder } from "../utils";
import { verifyContractPageTrigger } from "./verifyContractActions";

export async function dashboardActions(props: State) {
  verifyContractPageTrigger(props);
  const ipfsButton = getById("configure-ipfs-button");
  const ricTotalSupplyEl = getById("ric-total-supply");
  const ricLeftEl = getById("ric-left-for-sale");
  const ricSaleRateEl = getById("ric-sale-rate");
  const ricLockedInVaultEl = getById("ric-in-vault");
  const availableRewardEl = getById("available-reward-amount");
  const availableContractsEl = getById("catalogue-contracts-amount");
  const submittedProposalsEl = getById("smart-contract-proposals-amount");
  const contributorStakeEl = getById("total-staking-amount");
  const HarmonyFeesCollectedEl = getById("fees-collected-amount");
  const tokenFeesCollectedEl = getById("token-fees-collected-amount");
  const termsAndConditionsLink = getById(
    "terms-and-conditions-link"
  ) as HTMLAnchorElement;
  const signUpContractOptions = await OptionsBuilder(() => getSignupContract());
  if (hasError(signUpContractOptions)) {
    return;
  }

  const contractURLOptions = await OptionsBuilder(() =>
    getTerms(signUpContractOptions.data)
  );
  if (hasError(contractURLOptions)) {
    return;
  }

  termsAndConditionsLink.href = contractURLOptions.data;

  ipfsButton.onclick = async function () {
    dispatch_setPage(PageState.ipfsConfig);
  };

  const addressOptions = await OptionsBuilder(() => getAddress());

  if (hasError(addressOptions)) {
    return;
  }
  const address = addressOptions.data;

  const ricOptions = await OptionsBuilder(() => getRicContract());

  if (hasError(ricOptions)) {
    return;
  }

  const totalSupplyOptions = await OptionsBuilder(() =>
    totalSupply(ricOptions.data, address)
  );

  if (hasError(totalSupplyOptions)) {
    return;
  }

  const totalSupplyVal = parseFloat(totalSupplyOptions.data).toFixed(0);

  dispatch_renderLoadedValue(props, totalSupplyVal, ricTotalSupplyEl);

  const ricsaleOptions = await OptionsBuilder(() => getRicSaleContract());

  if (hasError(ricsaleOptions)) {
    return;
  }

  const ricsale = ricsaleOptions.data;
  const ricLeftOptions = await OptionsBuilder(() =>
    remainingTokens(ricsale, address)
  );
  if (hasError(ricLeftOptions)) {
    return;
  }

  const ricLeft = parseFloat(ricLeftOptions.data).toFixed(0);
  let tokensSoldOptions = await OptionsBuilder(() =>
    getTokensSold(ricsale, address)
  );
  if (hasError(tokensSoldOptions)) {
    return;
  }

  const tokensSold = tokensSoldOptions.data;
  // tokensSold = ricLeft; // uncomment to see the sale finished UI, redeclare tokensSold with let;
  // TODO: CHANGE THE TOKENS SOLD , NOW I GOT CHAIN SPECIFIC OneRIC!!

  if (tokensSold === "40000000") {
    dispatch_renderLoadedValue(props, "Sale finished", ricLeftEl);
  } else {
    dispatch_renderLoadedValue(props, ricLeft, ricLeftEl);
  }

  const ricRateOptions = await OptionsBuilder(() =>
    getCurrentRate(ricsale, address)
  );
  if (hasError(ricRateOptions)) {
    return;
  }

  const ricRate = ricRateOptions.data;
  // TODO: CHANGE THE TOKENS SOLD , NOW I GOT CHAIN SPECIFIC OneRIC!!
  if (tokensSold === "40000000") {
    dispatch_renderLoadedValue(props, "Sale finished", ricSaleRateEl);
  } else {
    dispatch_renderLoadedValue(props, ricRate + " OneRIC/ONE", ricSaleRateEl);
  }

  const vaultOptions = await OptionsBuilder(() => getRicVaultContract());
  if (hasError(vaultOptions)) {
    return;
  }
  const vault = vaultOptions.data;

  const totalLockedOptions = await OptionsBuilder(() =>
    getTotalLocked(vault, address)
  );
  if (hasError(totalLockedOptions)) {
    return;
  }

  const totalLocked = parseFloat(totalLockedOptions.data).toFixed(0);

  dispatch_renderLoadedValue(props, totalLocked, ricLockedInVaultEl);

  const daoStakingOptions = await OptionsBuilder(() => getDaoStakingContract());
  if (hasError(daoStakingOptions)) {
    return;
  }
  const daoStaking = daoStakingOptions.data;
  const availableRewardOptions = await OptionsBuilder(() =>
    getAvailableReward(daoStaking, address)
  );
  if (hasError(availableRewardOptions)) {
    return;
  }

  const availableReward = parseFloat(availableRewardOptions.data).toFixed(0);

  dispatch_renderLoadedValue(props, availableReward, availableRewardEl);

  const catalogDAOOptions = await OptionsBuilder(() =>
    getCatalogDAOContractWithWallet()
  );
  if (hasError(catalogDAOOptions)) {
    return;
  }
  const catalogDAO = catalogDAOOptions.data;

  const acceptedContractsOptions = await OptionsBuilder(() =>
    getAcceptedSmartContractIndex(catalogDAO, address)
  );
  if (hasError(acceptedContractsOptions)) {
    return;
  }

  const acceptedContracts = parseFloat(acceptedContractsOptions.data).toFixed(
    0
  );

  dispatch_renderLoadedValue(props, acceptedContracts, availableContractsEl);

  const rankProposalsOptions = await OptionsBuilder(() =>
    getRankProposalIndex(catalogDAO, address)
  );
  if (hasError(rankProposalsOptions)) {
    return;
  }

  const rankProposals = rankProposalsOptions.data;

  const smartContractProposalsOptions = await OptionsBuilder(() =>
    getSmartContractProposalIndex(catalogDAO, address)
  );
  if (hasError(smartContractProposalsOptions)) {
    return;
  }

  const smartContractProposals = smartContractProposalsOptions.data;

  dispatch_renderLoadedValue(
    props,
    parseInt(rankProposals) + parseInt(smartContractProposals),
    submittedProposalsEl
  );

  const contributorStakeOptions = await OptionsBuilder(() =>
    getTotalStaked(daoStaking, address)
  );
  if (hasError(contributorStakeOptions)) {
    return;
  }

  const contributorStake = parseFloat(contributorStakeOptions.data).toFixed(0);

  dispatch_renderLoadedValue(props, contributorStake, contributorStakeEl);

  const feeDaoOptions = await OptionsBuilder(() => getFeeDaoContract());
  if (hasError(feeDaoOptions)) {
    return;
  }

  const feeDao = feeDaoOptions.data;

  const feesOptions = await OptionsBuilder(() =>
    getTotalBalance(feeDao, address)
  );
  if (hasError(feesOptions)) {
    return;
  }

  const fees = parseFloat(feesOptions.data).toFixed(0);

  dispatch_renderLoadedValue(props, fees + " ONE", HarmonyFeesCollectedEl);

  const tokensOptions = await OptionsBuilder(() => getTokens(feeDao, address));
  if (hasError(tokensOptions)) {
    return;
  }

  const tokens = tokensOptions.data;

  dispatch_renderLoadedValue(
    props,
    tokens.length + " Tokens",
    tokenFeesCollectedEl
  );

  const uploadsOptions = await getUploadedContracts();
  const last5Permapins = filterUploadOptions(uploadsOptions.data);
  dispatch_renderPermapinnedDashboardData(props, last5Permapins);
}

function filterUploadOptions(data: any) {
  const edges = data.transactions.edges;
  let result: Array<any>[5] = [];
  for (let i = 0; i < edges.length; i++) {
    if (tagsContainContractType(edges[i].node.tags)) {
      if (result.length <= 5) {
        result.push(edges[i].node);
      }
    }
  }
  return result;
}

function tagsContainContractType(tags: Array<{ name: string; value: string }>) {
  let containsAcceptable = false;

  for (let i = 0; i < tags.length; i++) {
    if (tags[i].name === "Contract-Type" && tags[i].value === "acceptable") {
      containsAcceptable = true;
    }
  }
  return containsAcceptable;
}
