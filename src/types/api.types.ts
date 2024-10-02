export type GetBalancesRequest = {
    address: string | `0x${string}`,
    chainId: number,
    mode: 'shared' | 'dedicated'
}
export type GetBalancesResponse = {
    stakeableBalance: number,
    unstakeableBalance: number,
    claimableBalance: number
}

export type GetRewardsRequest = {
    address: string | `0x${string}`,
    chainId: number,
    mode: 'shared' | 'dedicated',
    days: number
}
export type StakingReward = {
    date: string,
    address: string | `0x${string}`,
    amount: number,
    // usdValue: number | any
}
export type GetRewardsResponse = {
    stakingRewards: StakingReward[]
}

export type GetValidatorsRequest = {
    chainId: number,
}
export type Validator = {
    id: string,
    status: "provisioning" | "provisioned" | "deposited" | "pending_activation"
    | "active" | "exiting" | "exited" | "withdrawal_available"
    | "withdrawal_complete" | "unknown" | "active_slashed" | "exited_slashed",
}
export type GetValidatorsResponse = {
    validators: Validator[]
}

export type BuildTransactionRequest = {
    address: string | `0x${string}`,
    chainId: number,
    mode: 'shared' | 'dedicated',
    amount: number
}
export type Transaction = {
    type: "legacy" | "eip2930" | "eip1559" | "eip4844" | "eip7702" | undefined,
    to: `0x${string}`,
    data: `0x${string}`,
    nonce: number,
    gasLimit: bigint,
    gasPrice: bigint,
    maxPriorityFeePerGas: bigint,
    maxFeePerGas: bigint,
    value: bigint,
    chainId: number,
}
export type BuildTransactionResponse = {
    transactions: Transaction[]
}