import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getRewards } from "../api";

export const useGetRewards = (addresses: string[], chainId: number, mode: 'shared' | 'dedicated', days = 30) => {
    return useQuery({
        queryKey: ["getRewards", addresses, chainId, days],
        queryFn: async () => getRewards({ addresses, chainId, mode, days }),
        select: (data) => data.data,
        placeholderData: keepPreviousData,
        refetchOnWindowFocus: false,
        enabled: !!addresses && !!chainId && !!mode
    });
}