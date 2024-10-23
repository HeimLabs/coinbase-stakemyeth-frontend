import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getBalances } from "../api";
import { useAccount } from "wagmi";
import { useGlobal } from "../contexts/global.context";
import { holesky } from "viem/chains";
import { useEffect } from "react";
import { AxiosError } from "axios";

export const useGetBalances = () => {
    const { address, chainId } = useAccount();
    const { selectedMode: mode, setIsSanctioned } = useGlobal();

    const query = useQuery({
        queryKey: ["getBalances", address, chainId, mode],
        queryFn: async () => getBalances({
            address: address as string,
            chainId: chainId || holesky.id,
            mode
        }),
        select: (data) => data.data,
        placeholderData: keepPreviousData,
        refetchOnWindowFocus: false,
        refetchInterval: 60000, // 1 minute
        enabled: !!address && !!chainId && !!mode,
        retry: false
    });

    useEffect(() => {
        if (query.error && (query.error as AxiosError).status && (query.error as AxiosError).status == 403)
            setIsSanctioned(true);
    }, [query.error])

    return query;
}