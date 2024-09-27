import axios from "axios";
import { BuildTransactionRequest, BuildTransactionResponse, GetBalancesRequest, GetBalancesResponse, GetRewardsRequest, GetRewardsResponse, GetValidatorsRequest, GetValidatorsResponse } from "../types/api.types";

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_API || "http://localhost:5000",
});

const getBalances = async (data: GetBalancesRequest) =>
    api.get<GetBalancesResponse>("/wallet/balances", { params: data });

const getRewards = async (data: GetRewardsRequest) =>
    api.get<GetRewardsResponse>("/wallet/rewards", { params: data });

const getValidators = async (data: GetValidatorsRequest) =>
    api.get<GetValidatorsResponse>("/wallet/validators", { params: data });

const buildStakeOperation = async (data: BuildTransactionRequest) =>
    api.post<BuildTransactionResponse>("/wallet/stake", data);

const buildUnstakeOperation = async (data: BuildTransactionRequest) =>
    api.post<BuildTransactionResponse>("/wallet/unstake", data);

const buildClaimOperation = async (data: BuildTransactionRequest) =>
    api.post<BuildTransactionResponse>("/wallet/claim", data);

export { api, getBalances, getRewards, getValidators, buildStakeOperation, buildUnstakeOperation, buildClaimOperation };
