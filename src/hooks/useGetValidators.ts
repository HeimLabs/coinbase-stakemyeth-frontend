import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getValidators } from "../api";
import { useAccount } from "wagmi";
import { holesky } from "viem/chains";

export const useGetValidators = () => {
    const { chainId } = useAccount();

    return useQuery({
        queryKey: ["getValidators", chainId],
        queryFn: async () => getValidators({chainId: chainId || holesky.id}),
        select: (data) => data.data.validators,
        placeholderData: keepPreviousData,
        refetchOnWindowFocus: false,
        enabled: !!chainId
    });
}