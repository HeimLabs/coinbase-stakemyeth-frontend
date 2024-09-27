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
    rawTransaction: {
        type: string,
        to: string,
        data: string,
        nonce: number,
        gasLimit: bigint,
        gasPrice: bigint,
        maxPriorityFeePerGas: bigint,
        maxFeePerGas: bigint,
        value: bigint,
        chainId: bigint,
    },
}
export type BuildTransactionResponse = {
    transactions: Transaction[]
}