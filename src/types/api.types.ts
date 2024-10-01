export type GetBalancesRequest = {
    address: string,
    chainId: number,
    mode: 'shared' | 'dedicated'
}
export type GetBalancesResponse = {
    stakeableBalance: number,
    unstakeableBalance: number,
    claimableBalance: number
}

export type GetRewardsRequest = {
    addresses: string[],
    chainId: number,
    mode: 'shared' | 'dedicated',
    days: number
}
export type StakingReward = {
    date: Date,
    address: string,
    amount: number,
    usdValue: number
}
export type GetRewardsResponse = {
    stakingRewards: StakingReward[]
}

export type GetValidatorsRequest = {
    address: string,
    chainId: number,
}
export type Validator = {
    id: string,
    status: string,
}
export type GetValidatorsResponse = {
    validators: Validator[]
}

export type BuildTransactionRequest = {
    address: string,
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