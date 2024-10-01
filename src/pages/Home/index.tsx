import { useEffect, useState } from "react";
import styles from "./Home.module.scss";
import { useGlobal } from "../../contexts/global.context";
import { useAccount } from "wagmi";
import { ethereumLogo } from "../../assets";
import { useAppKit } from "@reown/appkit/react";

export default function Home() {
    const { selectedMode } = useGlobal();
    const { isConnected } = useAccount();
    const { open } = useAppKit();
    const [selectedTab, setSelectedTab] = useState("stake");

    useEffect(() => {
        setSelectedTab("stake");
    }, [selectedMode]);

    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <div className={styles.tabsContainer}>
                    <div
                        className={`${styles.tab} ${selectedTab == "stake" ? styles.active : ""}`}
                        onClick={() => setSelectedTab("stake")}
                    >
                        Stake
                    </div>
                    <div
                        className={`${styles.tab} ${selectedTab == "unstake" ? styles.active : ""}`}
                        onClick={() => setSelectedTab("unstake")}
                    >
                        Unstake
                    </div>
                    {selectedMode == "shared" &&
                        <div
                            className={`${styles.tab} ${selectedTab == "claim" ? styles.active : ""}`}
                            onClick={() => setSelectedTab("claim")}
                        >
                            Claim
                        </div>
                    }
                </div>
                <div className={styles.contentContainer}>
                    {/* AVAILABLE BALANCES */}
                    {isConnected &&
                    <div className={styles.availableContainer}>
                        <span className={styles.key}>Available to {selectedTab}</span>
                        <span className={styles.value}>0.1234 ETH</span>
                    </div>
                    }
                    {/* INPUT CONTAINER */}
                    <div className={styles.inputSection}>
                        <span className={styles.title}>{selectedTab}</span>
                        <div className={styles.inputContainer}>
                            <img src={ethereumLogo} alt="Ethereum" />
                            <span className={styles.title}>ETH amount</span>
                            <input type="number" step={0.00001} />
                        </div>
                    </div>
                    {!isConnected &&
                    <div className={styles.connectWallet} onClick={() => open()}>
                        Connect Wallet
                    </div>
                    }
                    <div className={styles.infoContainer}>
                        <div className={styles.row}>
                            <span className={styles.title}>Staking Type</span>
                            <span className={styles.subtitle}>Native</span>
                        </div>
                        <div className={styles.hr} />
                        <div className={styles.row}>
                            <span className={styles.title}>Provider</span>
                            <span className={styles.subtitle}>Coinbase</span>
                        </div>
                        <div className={styles.hr} />
                        <div className={styles.row}>
                            <span className={styles.title}>Transaction Fee</span>
                            <span className={styles.subtitle}>0.00 ETH/$0.00</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}