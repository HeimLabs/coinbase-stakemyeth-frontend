import { useMutation } from "@tanstack/react-query"
import { buildUnstakeOperation } from "../api"
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Transaction } from "../types/api.types";
import { useAccount, useSendTransaction } from "wagmi";
import { useGlobal } from "../contexts/global.context";
import { holesky } from "viem/chains";

export const useUnstake = (amount: number) => {
    const { address, chainId } = useAccount();
    const { selectedMode: mode } = useGlobal();
    const { sendTransactionAsync } = useSendTransaction();
    const [transactions, setTransactions] = useState<Transaction[]>();

    const buildMutation = useMutation({
        mutationFn: async () => await buildUnstakeOperation({
            address: address as string,
            chainId: chainId || holesky.id,
            mode,
            amount
        }),
        onSuccess: (data) => setTransactions(data.data.transactions),
    });

    useEffect(() => {
        if (buildMutation.isSuccess && transactions && transactions.length>0)
            sendTransactions();
    }, [buildMutation.isSuccess, transactions]);

    const sendTransactionMutation = useMutation({
        mutationFn: async () => {
            if (!transactions) return;
            for await (const txnData of transactions) {
                const tx = await sendTransactionAsync({
                    to: txnData.to,
                    data: txnData.data,
                    value: txnData.value,
                    chainId: Number(txnData.chainId),
                    maxFeePerGas: txnData.maxFeePerGas,
                    maxPriorityFeePerGas: txnData.maxPriorityFeePerGas,
                    nonce: txnData.nonce,
                });
                console.log(tx);
                // @todo - Wait for transaction
            }
        }
    });

    const initiateUnstaking = async () => {
        const _promise = buildMutation.mutateAsync();
        toast.promise(_promise, {
            pending: "Building Unstake transaction...",
            success: "Transaction received!",
            error: "Transaction build failed, please try again!"
        });
    }

    const sendTransactions = async () => {
        const _promise = sendTransactionMutation.mutateAsync();
        toast.promise(_promise, {
            pending: "Submitting transaction...",
            success: "Transaction submitted!",
            error: "Transaction failed, please try again!"
        });
    }

    return {
        initiateUnstaking,
        transactions,
        isLoading: buildMutation.isPending || sendTransactionMutation.isPending
    }
}