import { useChainId } from "wagmi";
import { useGlobal } from "../../contexts/global.context";
import styles from "./Modes.module.scss";
import { useLocation } from "react-router-dom";

export default function Modes() {
    const { selectedMode, setMode } = useGlobal();
    const { pathname } = useLocation();
    const chainId = useChainId();

    return (
        <div className={styles.main}>
            <div className={`${styles.description} ${styles.caution}`}>
                {(chainId != 1 && pathname.includes("rewards")) &&
                    "Rewards data is currently supported on mainnet only"}
            </div>
            <div className={styles.tabsContainer}>
                <div
                    className={`${styles.tab} ${selectedMode == "shared" ? styles.active : ""}`}
                    onClick={() => setMode("shared")}
                >
                    Shared ETH Staking
                </div>
                <div className={`${styles.wrapper} ${import.meta.env.VITE_DEDICATED_ENABLED != "true" ? styles.disabledWrapper : ""}`}>
                    <div
                        className={`
                        ${styles.tab} 
                        ${selectedMode == "dedicated" ? styles.active : ""}
                        ${import.meta.env.VITE_DEDICATED_ENABLED != "true" ? styles.disabled : ""}
                        `}
                        onClick={() => setMode("dedicated")}
                    >
                        Dedicated ETH Staking
                    </div>
                </div>
            </div>
            <div className={styles.description}>
                {selectedMode == "shared"
                    ? "Stake any amount of ETH using a shared validator operated by Coinbase"
                    : "Stake increments of 32 ETH using your own dedicated validator operated by Coinbase"
                } <br />
                By using this app, you agree to Coinbase's <a href="https://www.coinbase.com/legal/privacy">privacy policy</a> 
            </div>
        </div>
    );
}