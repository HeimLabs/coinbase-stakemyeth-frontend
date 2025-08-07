import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { mainnet, hoodi } from "@reown/appkit/networks";
import { createAppKit } from "@reown/appkit/react";

const projectId = import.meta.env.VITE_REOWN_PROJECT_ID;

// 3. Set the networks
export const networks = [mainnet, hoodi]

// 4. Create Wagmi Adapter
export const wagmiAdapter = new WagmiAdapter({
    networks,
    projectId,
});

// 5. Create modal
createAppKit({
    adapters: [wagmiAdapter],
    // @ts-expect-error Type compatibility issue between AppKit and wagmi networks
    networks,
    projectId,
    themeMode: 'light'
})