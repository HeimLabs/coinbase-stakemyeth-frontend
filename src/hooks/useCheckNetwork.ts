import { useAccount, useSwitchChain } from "wagmi";
import { useEffect, useState } from "react";
import { networks } from "../config/reown.config";

export const useCheckNetwork = () => {
    const { chainId } = useAccount();
    const { switchChain, isPending } = useSwitchChain();
    const [isWrongNetwork, setIsWrongNetwork] = useState(false);

    useEffect(() => {
        if (!networks.some(network => network.id === chainId))
            setIsWrongNetwork(true);
        else
            setIsWrongNetwork(false);
    }, [chainId])

    return {
        isWrongNetwork,
        switchChain: () => switchChain({ chainId: networks[1].id }),
        isPending
    }
}