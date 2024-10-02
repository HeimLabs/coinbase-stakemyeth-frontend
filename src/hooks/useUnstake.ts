import { useMutation, useQueryClient } from "@tanstack/react-query"
import { buildUnstakeOperation } from "../api"
import { useEffect, useState } from "react";
import { Transaction } from "../types/api.types";
import { useAccount, useSendTransaction, useWaitForTransactionReceipt } from "wagmi";
import { useGlobal } from "../contexts/global.context";
import { holesky } from "viem/chains";

export const useUnstake = (amount: number) => {
    const queryClient = useQueryClient();
    const { address, chainId } = useAccount();
    const { selectedMode: mode } = useGlobal();
    const { sendTransactionAsync } = useSendTransaction();
    const [transaction, setTransaction] = useState<Transaction>();
    const [unstakeTxnHash, setTxnHash] = useState<`0x${string}`>();
    const { isFetching: isTxnFetching, isSuccess: isTxnSuccess } = useWaitForTransactionReceipt({ confirmations: 1, hash: unstakeTxnHash });

    const buildMutation = useMutation({
        mutationFn: async () => await buildUnstakeOperation({
            address: address as string,
            chainId: chainId || holesky.id,
            mode,
            amount
        }),
        onSuccess: (data) => setTransaction(data.data.transactions[0]),
    });

    const sendTransactionMutation = useMutation({
        mutationFn: async () => {
            if (!transaction) return;
            const tx = await sendTransactionAsync({
                to: transaction.to,
                data: transaction.data,
                value: transaction.value,
                chainId: Number(transaction.chainId),
                maxFeePerGas: transaction.maxFeePerGas,
                maxPriorityFeePerGas: transaction.maxPriorityFeePerGas,
                nonce: transaction.nonce,
            });
            setTxnHash(tx);
        }
    });

    useEffect(() => {
        if (buildMutation.isSuccess && transaction)
            sendTransactionMutation.mutate();
    }, [buildMutation.isSuccess, transaction]);

    useEffect(() => {
        const handleSuccess = async () => {
            try {
                await queryClient.invalidateQueries({ queryKey: ['getBalances'] })
            } catch (err) {
                console.error(err);
            }
        }
        if (isTxnSuccess) handleSuccess();
    }, [isTxnSuccess])

    const reset = () => {
        buildMutation.reset();
        sendTransactionMutation.reset();
        setTransaction(undefined);
        setTxnHash(undefined);
    }

    return {
        initiateUnstaking: buildMutation.mutate,
        isUnstakeBuilding: buildMutation.isPending,
        isUnstakeWaiting: sendTransactionMutation.isPending,
        isUnstakeSubmitting: isTxnFetching,
        isUnstakeSuccess: isTxnSuccess,
        isUnstakeError: buildMutation.isError || sendTransactionMutation.isError,
        unstakeTxnHash,
        resetUnstake: reset
    }
}