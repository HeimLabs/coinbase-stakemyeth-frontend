import { useMutation } from "@tanstack/react-query"
import { buildClaimOperation } from "../api"
import { toast } from "react-toastify";
import { useState } from "react";
import { Transaction } from "../types/api.types";

export const useBuildClaim = (address: string, chainId: number, mode: 'shared' | 'dedicated', amount: number) => {
    const [transactions, setTransactions] = useState<Transaction[]>();

    const mutation = useMutation({
        mutationFn: async () => await buildClaimOperation({ address, chainId, mode, amount }),
        onSuccess: (data) => setTransactions(data.data.transactions),
    });

    const _buildClaimOperation = () => {
        const _promise = mutation.mutateAsync();
        toast.promise(_promise, {
            pending: "Building claim transaction...",
            success: "Transaction received!",
            error: "Transaction build failed, please try again!"
        })
    }

    return {
        buildClaimOperation: _buildClaimOperation,
        transactions,
        ...mutation
    }
}