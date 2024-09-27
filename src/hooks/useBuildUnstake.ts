import { useMutation } from "@tanstack/react-query"
import { buildUnstakeOperation } from "../api"
import { toast } from "react-toastify";
import { useState } from "react";
import { Transaction } from "../types/api.types";

export const useBuildUnstake = (address: string, chainId: number, mode: 'shared' | 'dedicated', amount: number) => {
    const [transactions, setTransactions] = useState<Transaction[]>();

    const mutation = useMutation({
        mutationFn: async () => await buildUnstakeOperation({ address, chainId, mode, amount }),
        onSuccess: (data) => setTransactions(data.data.transactions),
    });

    const _buildUnstakeOperation = () => {
        const _promise = mutation.mutateAsync();
        toast.promise(_promise, {
            pending: "Building unstake transaction...",
            success: "Transaction received!",
            error: "Transaction build failed, please try again!"
        })
    }

    return {
        buildUnstakeOperation: _buildUnstakeOperation,
        transactions,
        ...mutation
    }
}