import { useEffect, useState } from "react";
import styles from "./Home.module.scss";
import { useGlobal } from "../../contexts/global.context";
import { useAccount } from "wagmi";
import { ethereumLogo } from "../../assets";
import { useAppKit } from "@reown/appkit/react";
import { useGetBalances } from "../../hooks/useGetBalances";
import { useStake } from "../../hooks/useStake";
import { useUnstake } from "../../hooks/useUnstake";
import { useClaim } from "../../hooks/useClaim";

// @todo - Handle unsupported network

export default function Home() {
    const { selectedMode } = useGlobal();
    const { isConnected } = useAccount();
    const { open } = useAppKit();

    const [selectedTab, setSelectedTab] = useState("stake");
    const [balance, setBalance] = useState(0);
    const [amount, setAmount] = useState<number>();
    const [isLoading, setIsLoading] = useState(false);

    const { data: balances } = useGetBalances();
    const { initiateStaking, isLoading: isStaking } = useStake(amount || 0);
    const { initiateUnstaking, isLoading: isUnstaking } = useUnstake(amount || 0);
    const { initiateClaiming, isLoading: isClaiming } = useClaim(amount || 0);

    // Reset Tabs
    useEffect(() => {
        setSelectedTab("stake");
    }, [selectedMode]);

    // Handle Available Balance
    useEffect(() => {
        if (balances) {
            if (selectedTab == "stake") setBalance(balances.stakeableBalance);
            if (selectedTab == "unstake") setBalance(balances.unstakeableBalance);
            if (selectedTab == "claim") setBalance(balances.claimableBalance);
        }
        setAmount(undefined);
    }, [balances, selectedTab]);

    // Common Loader
    useEffect(() => {
        setIsLoading(isStaking || isUnstaking || isClaiming);
    }, [isStaking, isUnstaking, isClaiming])

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(Number(e.target.value) || undefined);
    }

    const handleMax = () => {
        if (selectedTab == "stake") setAmount(balances?.stakeableBalance || 0);
        else if (selectedTab == "unstake") setAmount(balances?.unstakeableBalance || 0);
        else if (selectedTab == "claim") setAmount(balances?.claimableBalance || 0);
    }

    const handleAction = async () => {
        try {
            if (selectedTab == "stake") initiateStaking();
            else if (selectedTab == "unstake") initiateUnstaking();
            else if (selectedTab == "claim") initiateClaiming();
        } catch (err) {
            console.error("Failed to perform action: ", err);
        }
    }

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
                            <span className={styles.value}>{Number(balance).toLocaleString(undefined, { maximumFractionDigits: 4 })} ETH</span>
                        </div>
                    }
                    {/* INPUT CONTAINER */}
                    <div className={styles.inputSection}>
                        <span className={styles.title}>{selectedTab}</span>
                        <div className={styles.inputContainer}>
                            <img src={ethereumLogo} alt="Ethereum" />
                            <span className={styles.title}>ETH amount</span>
                            {selectedMode == "dedicated" &&
                                <div onClick={() => setAmount(amount ? amount - 32 : 0)} className={styles.maxButton}>
                                    -
                                </div>
                            }
                            <input
                                type="number"
                                step={0.00001}
                                placeholder={`Enter amount`}
                                onChange={handleAmountChange}
                                value={amount === undefined ? '' : amount}
                                disabled={selectedMode == "dedicated"}
                            />
                            {selectedMode == "dedicated" &&
                                <div onClick={() => setAmount(amount ? amount + 32 : 32)} className={styles.maxButton}>
                                    +
                                </div>
                            }
                            {selectedMode == "shared" &&
                                <div onClick={handleMax} className={styles.maxButton}>
                                    MAX
                                </div>
                            }
                        </div>
                    </div>
                    {/* CONNECT WALLET */}
                    {!isConnected &&
                        <div className={`${styles.primaryButton} ${styles.connectWallet}`} onClick={() => open()}>
                            Connect Wallet
                        </div>
                    }
                    {/* INFORMATION */}
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
                    {/* ACTION */}
                    {isConnected &&
                        <div
                            onClick={handleAction}
                            className={`${styles.primaryButton} ${styles.action} ${isLoading ? styles.loading : ""}`}
                        >
                            {selectedTab}
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}