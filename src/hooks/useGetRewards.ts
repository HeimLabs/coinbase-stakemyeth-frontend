import { useQuery } from "@tanstack/react-query";
import { getRewards } from "../api";
import { useAccount } from "wagmi";
import { useGlobal } from "../contexts/global.context";
import { useEffect, useState } from "react";
import { hoodi } from "@reown/appkit/networks";

export const useGetRewards = (days = 30) => {
    const { address, chainId } = useAccount();
    const { selectedMode: mode } = useGlobal();

    const [totalRewards, setTotalRewards] = useState<number>(0);

    const query = useQuery({
        queryKey: ["getRewards", address, chainId, days, mode],
        queryFn: async () => getRewards({
            address: address as string,
            chainId: chainId || hoodi.id,
            mode,
            days
        }),
        select: (data) => data.data.stakingRewards,
        refetchOnWindowFocus: false,
        enabled: !!address && !!chainId && !!mode
    });


    useEffect(() => {
        if (query.data) setTotalRewards(query.data.reduce((sum, reward) => sum + reward.amount, 0));
        else setTotalRewards(0);
    }, [query.data])

    return { ...query, totalRewards };
}