// I'm gonna add all the catalog dao functions here
import { getCatalogDAOAbi } from "../abi/catalogDAOABI";
import { Contract } from "web3-eth-contract";
import {
  AcceptedSmartContractProposal,
  MyProposals,
  RankProposal,
  RemovalProposal,
  SmartContractProposal,
} from "../../types";
import { CATALOGDAOADDRESS, metamask_web3, rpc_web3 } from "../web3";

export async function getCatalogDAOContractWithWallet() {
  return await new metamask_web3.eth.Contract(
    getCatalogDAOAbi(),
    CATALOGDAOADDRESS
  );
}

export async function getCatalogDAOContractWithRPC() {
  return await new rpc_web3.eth.Contract(getCatalogDAOAbi(), CATALOGDAOADDRESS);
}

// State setters
export async function proposeNewRank(
  catalogDAO: Contract,
  repository: string,
  from: string,
  onError: any,
  onReceipt: any
) {
  await catalogDAO.methods
    .proposeNewRank(repository)
    .send({ from })
    .on("error", onError)
    .on("receipt", onReceipt);
}

export async function voteOnNewRank(
  catalogDAO: Contract,
  rankIndex: string,
  accepted: boolean,
  from: string,
  onError: any,
  onReceipt: any
) {
  await catalogDAO.methods
    .voteOnNewRank(rankIndex, accepted)
    .send({ from })
    .on("error", onError)
    .on("receipt", onReceipt);
}

export async function closeRankProposal(
  catalogDAO: Contract,
  rankIndex: string,
  from: string,
  onError: any,
  onReceipt: any
) {
  await catalogDAO.methods
    .closeRankProposal(rankIndex)
    .send({ from })
    .on("error", onError)
    .on("receipt", onReceipt);
}

export async function proposeNewSmartContract(
  catalogDAO: Contract,
  _arweaveTxId: string,
  _hasFrontEnd: boolean,
  _hasFees: boolean,
  isUpdate: boolean,
  updateOf: string,
  from: string,
  onError: any,
  onReceipt: any
) {
  await catalogDAO.methods
    .proposeNewSmartContract(
      _arweaveTxId,
      _hasFrontEnd,
      _hasFees,
      isUpdate,
      updateOf
    )
    .send({ from })
    .on("error", onError)
    .on("receipt", onReceipt);
}

export async function voteOnNewSmartContract(
  catalogDAO: Contract,
  sCIndex: string,
  accepted: boolean,
  suspicious: boolean,
  from: string,
  onError: any,
  onReceipt: any
) {
  await catalogDAO.methods
    .voteOnNewSmartContract(sCIndex, accepted, suspicious)
    .send({ from })
    .on("error", onError)
    .on("receipt", onReceipt);
}

export async function closeSmartContractProposal(
  catalogDAO: Contract,
  sCIndex: string,
  from: string,
  onError: any,
  onReceipt: any
) {
  await catalogDAO.methods
    .closeSmartContractProposal(sCIndex)
    .send({ from })
    .on("error", onError)
    .on("receipt", onReceipt);
}

export async function closeSuspiciousProposal(
  catalogDAO: Contract,
  sCIndex: string,
  from: string,
  onError: any,
  onReceipt: any
) {
  await catalogDAO.methods
    .closeSuspiciousProposal(sCIndex)
    .send({ from })
    .on("error", onError)
    .on("receipt", onReceipt);
}

export async function proposeContractRemoval(
  catalogDAO: Contract,
  discussionUrl: string,
  acceptedSCIndex: string,
  malicious: boolean,
  from: string,
  onError: any,
  onReceipt: any
) {
  await catalogDAO.methods
    .proposeContractRemoval(discussionUrl, acceptedSCIndex, malicious)
    .send({ from })
    .on("error", onError)
    .on("receipt", onReceipt);
}

export async function voteOnRemoval(
  catalogDAO: Contract,
  removalIndex: string,
  accepted: boolean,
  from: string,
  onError: any,
  onReceipt: any
) {
  await catalogDAO.methods
    .voteOnRemoval(removalIndex, accepted)
    .send({ from })
    .on("error", onError)
    .on("receipt", onReceipt);
}

export async function closeRemovalProposal(
  catalogDAO: Contract,
  removalIndex: string,
  from: string,
  onError: any,
  onReceipt: any
) {
  await catalogDAO.methods
    .closeRemovalProposal(removalIndex)
    .send({ from })
    .on("error", onError)
    .on("receipt", onReceipt);
}

export async function expressOpinion(
  catalogDAO: Contract,
  _index_: string,
  likedIt: boolean,
  from: string,
  onError: any,
  onReceipt: any
) {
  await catalogDAO.methods
    .expressOpinion(_index_, likedIt)
    .send({ from })
    .on("error", onError)
    .on("receipt", onReceipt);
}

// View functions

export async function getAllAccepted(catalogDAO: Contract): Promise<string[]> {
  return await catalogDAO.methods.getAllAccepted().call();
}

export async function getAllRemoved(catalogDAO: Contract): Promise<string[]> {
  return await catalogDAO.methods.getAllRemoved().call();
}

export async function getRank(
  catalogDAO: Contract,
  address: string,
  from: string
): Promise<number> {
  return await catalogDAO.methods.getRank(address).call({ from });
}

export async function getRankProposalIndex(
  catalogDAO: Contract,
  from: string
): Promise<string> {
  return await catalogDAO.methods.getRankProposalIndex().call({ from });
}

export async function getRankProposalsByIndex(
  catalogDAO,
  index: string,
  from: string
): Promise<RankProposal> {
  return await catalogDAO.methods.getRankProposalsByIndex(index).call({ from });
}

export async function votedAlreadyOnRank(
  catalogDAO: Contract,
  rankIndex: string,
  _voter: string,
  from: string
): Promise<boolean> {
  return await catalogDAO.methods
    .votedAlreadyOnRank(rankIndex, _voter)
    .call({ from });
}

export async function getMyProposals(
  catalogDAO: Contract,
  from: string
): Promise<MyProposals> {
  return await catalogDAO.methods.getMyProposals().call({ from });
}

export async function getMyRankProposalsPaginated(
  catalogDAO: Contract,
  from: string,
  first: string,
  second: string,
  third: string,
  fourth: string,
  fifth: string
): Promise<RankProposal[]> {
  return await catalogDAO.methods
    .getMyRankProposalsPaginated(first, second, third, fourth, fifth)
    .call({ from });
}

export async function getMySmartContractProposalsPaginated(
  catalogDAO: Contract,
  from: string,
  first: string,
  second: string,
  third: string,
  fourth: string,
  fifth: string
): Promise<SmartContractProposal[]> {
  return await catalogDAO.methods
    .getMySmartContractProposalsPaginated(first, second, third, fourth, fifth)
    .call({ from });
}

export async function getAcceptedSmartContractProposalsPaginated(
  catalogDAO: Contract,
  from: string,
  first: string,
  second: string,
  third: string,
  fourth: string,
  fifth: string
): Promise<AcceptedSmartContractProposal[]> {
  return await catalogDAO.methods
    .getAcceptedSmartContractProposalsPaginated(
      first,
      second,
      third,
      fourth,
      fifth
    )
    .call({ from });
}

export async function getRemovalProposalsPaginated(
  catalogDAO: Contract,
  from: string,
  first: string,
  second: string,
  third: string,
  fourth: string,
  fifth: string
): Promise<RemovalProposal[]> {
  return await catalogDAO.methods
    .getRemovalProposalsPaginated(first, second, third, fourth, fifth)
    .call({ from });
}

export async function getSmartContractProposalIndex(
  catalogDAO: Contract,
  from: string
): Promise<string> {
  return await catalogDAO.methods
    .getSmartContractProposalIndex()
    .call({ from });
}
export async function getSmartContractProposalsBYIndex(
  catalogDAO: Contract,
  index: string,
  from: string
): Promise<SmartContractProposal> {
  return await catalogDAO.methods
    .getSmartContractProposalsByIndex(index)
    .call({ from });
}

export async function votedAlreadyOnSmartContract(
  catalogDAO: Contract,
  sCIndex: string,
  _voter: string,
  from: string
) {
  return await catalogDAO.methods
    .votedAlreadyOnSmartContract(sCIndex, _voter)
    .call({ from });
}

export async function getAcceptedSmartContractIndex(
  catalogDAO: Contract,
  from: string
): Promise<string> {
  return await catalogDAO.methods
    .getAcceptedSmartContractIndex()
    .call({ from });
}

export async function getAcceptedSCProposalsByIndex(
  catalogDAO: Contract,
  sCIndex: string,
  from: string
): Promise<AcceptedSmartContractProposal> {
  return await catalogDAO.methods
    .getAcceptedSCProposalsByIndex(sCIndex)
    .call({ from });
}

export async function votedAlreadyOnRemoval(
  catalogDAO: Contract,
  removalIndex: string,
  voter: string,
  from: string
): Promise<boolean> {
  return await catalogDAO.methods
    .votedAlreadyOnRemoval(removalIndex, voter)
    .call({ from });
}

export async function getRemovalProposalIndex(
  catalogDAO: Contract,
  from: string
): Promise<string> {
  return await catalogDAO.methods.getRemovalProposalIndex().call({ from });
}

export async function getRemovalProposalByIndex(
  catalogDAO: Contract,
  index: string,
  from: string
): Promise<RemovalProposal> {
  return await catalogDAO.methods
    .getRemovalProposalByIndex(index)
    .call({ from });
}

export async function getTerms(catalogDAO: Contract): Promise<string> {
  return await catalogDAO.methods.getTerms().call();
}

export async function acceptedTerms(
  catalogDAO,
  _address: string
): Promise<boolean> {
  return await catalogDAO.methods.acceptedTerms(_address).call();
}
