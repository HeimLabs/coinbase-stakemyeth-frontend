import { useMutation } from "@tanstack/react-query"
import { buildStakeOperation } from "../api"
import { toast } from "react-toastify";
import { useState } from "react";
import { Transaction } from "../types/api.types";

export const useBuildStake = (address: string, chainId: number, mode: 'shared' | 'dedicated', amount: number) => {
    const [transactions, setTransactions] = useState<Transaction[]>();

    const mutation = useMutation({
        mutationFn: async () => await buildStakeOperation({ address, chainId, mode, amount }),
        onSuccess: (data) => setTransactions(data.data.transactions),
    });

    const _buildStakeOperation = () => {
        const _promise = mutation.mutateAsync();
        toast.promise(_promise, {
            pending: "Building stake transaction...",
            success: "Transaction received!",
            error: "Transaction build failed, please try again!"
        })
    }

    return {
        buildStakeOperation: _buildStakeOperation,
        transactions,
        ...mutation
    }
}