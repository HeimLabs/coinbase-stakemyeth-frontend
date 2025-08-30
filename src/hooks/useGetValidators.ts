import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getValidators } from "../api";
import { useAccount } from "wagmi";
import { hoodi } from "@reown/appkit/networks";

export const useGetValidators = () => {
    const { chainId } = useAccount();

    return useQuery({
        queryKey: ["getValidators", chainId],
        queryFn: async () => getValidators({ chainId: chainId || hoodi.id }),
        select: (data) => data.data.validators,
        placeholderData: keepPreviousData,
        refetchOnWindowFocus: false,
        enabled: !!chainId
    });
}