import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getBalances } from "../api";
import { useAccount } from "wagmi";
import { useGlobal } from "../contexts/global.context";
import { holesky } from "viem/chains";

export const useGetBalances = () => {
    const { address, chainId } = useAccount();
    const { selectedMode: mode } = useGlobal();

    return useQuery({
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
        enabled: !!address && !!chainId && !!mode
    });
}