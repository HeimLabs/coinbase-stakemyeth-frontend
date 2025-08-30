import { useMutation, useQueryClient } from "@tanstack/react-query"
import { buildClaimOperation } from "../api"
import { useEffect, useState } from "react";
import { Transaction } from "../types/api.types";
import { useAccount, useEstimateGas, useGasPrice, useSendTransaction, useWaitForTransactionReceipt } from "wagmi";
import { useGlobal } from "../contexts/global.context";
import { hoodi } from "@reown/appkit/networks";

export const useClaim = (amount: number) => {
    const queryClient = useQueryClient();
    const { address, chainId } = useAccount();
    const { selectedMode: mode } = useGlobal();
    const { sendTransactionAsync } = useSendTransaction();
    const [transaction, setTransaction] = useState<Transaction>();
    const { data: gas } = useEstimateGas({ data: transaction?.data, to: transaction?.to, value: transaction?.value });
    const { data: gasPrice } = useGasPrice();
    const [claimTxnFee, setTxnFee] = useState(0);
    const [claimTxnHash, setTxnHash] = useState<`0x${string}`>();
    const { isFetching: isTxnFetching, isSuccess: isTxnSuccess } = useWaitForTransactionReceipt({ confirmations: 1, hash: claimTxnHash });

    const buildMutation = useMutation({
        mutationFn: async () => await buildClaimOperation({
            address: address as string,
            chainId: chainId || hoodi.id,
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
    }, [isTxnSuccess]);

    // Handle Txn Fee
    useEffect(() => {
        if (gas && gasPrice) {
            const _txnFee = (Number(gas) * Number(gasPrice)) / 10 ** 18;
            setTxnFee(_txnFee);
        }
    }, [gas, gasPrice]);

    const reset = () => {
        buildMutation.reset();
        sendTransactionMutation.reset();
        setTransaction(undefined);
        setTxnHash(undefined);
    }

    return {
        initiateClaiming: buildMutation.mutate,
        isClaimBuilding: buildMutation.isPending,
        isClaimWaiting: sendTransactionMutation.isPending,
        isClaimSubmitting: isTxnFetching,
        isClaimSuccess: isTxnSuccess,
        isClaimError: buildMutation.isError || sendTransactionMutation.isError,
        claimTxnFee,
        claimTxnHash,
        resetClaim: reset
    }
}