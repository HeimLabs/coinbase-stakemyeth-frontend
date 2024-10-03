import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { getBlockchainApiRpcUrl, mainnet, } from "@reown/appkit/networks";
import { CaipNetwork, createAppKit } from "@reown/appkit/react";
import { holesky as _holesky } from "wagmi/chains";

const projectId = import.meta.env.VITE_REOWN_PROJECT_ID;

const holesky: CaipNetwork = {
    id: `eip155:${_holesky.id}`,
    chainId: _holesky.id,
    name: "Holesky",
    currency: "ETH",
    explorerUrl: "https://holesky.etherscan.io",
    rpcUrl: getBlockchainApiRpcUrl(_holesky.id, 'eip155'),
    chainNamespace: "eip155",
}

// 3. Set the networks
export const networks = [mainnet, holesky]

// 4. Create Wagmi Adapter
export const wagmiAdapter = new WagmiAdapter({
    networks,
    projectId,
});

// 5. Create modal
createAppKit({
    adapters: [wagmiAdapter],
    networks,
    projectId,
    themeMode: 'light'
})