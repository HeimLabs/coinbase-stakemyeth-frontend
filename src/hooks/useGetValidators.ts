import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getValidators } from "../api";

export const useGetValidators = (address: string, chainId: number) => {
    return useQuery({
        queryKey: ["getValidators", address, chainId],
        queryFn: async () => getValidators({ address, chainId }),
        select: (data) => data.data.validators,
        placeholderData: keepPreviousData,
        refetchOnWindowFocus: false,
        enabled: !!address && !!chainId
    });
}