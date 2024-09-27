import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getBalances } from "../api";

export const useGetBalances = (address: string, chainId: number, mode: 'shared' | 'dedicated') => {
    return useQuery({
        queryKey: ["getBalances", address, chainId, mode],
        queryFn: async () => getBalances({ address, chainId, mode }),
        select: (data) => data.data,
        placeholderData: keepPreviousData,
        refetchOnWindowFocus: false,
        enabled: !!address && !!chainId && !!mode
    });
}