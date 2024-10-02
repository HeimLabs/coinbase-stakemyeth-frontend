import { useEffect, useState } from "react";
import styles from "./Home.module.scss";
import { useGlobal } from "../../contexts/global.context";
import { useAccount } from "wagmi";
import { checkIcon, crossIcon, ethereumLogo, etherscanLogo, hourglassIcon, mobileIcon } from "../../assets";
import { useAppKit } from "@reown/appkit/react";
import { useGetBalances } from "../../hooks/useGetBalances";
import { useStake } from "../../hooks/useStake";
import { useUnstake } from "../../hooks/useUnstake";
import { useClaim } from "../../hooks/useClaim";

// @todo - Handle unsupported network

export default function Home() {
    const { selectedMode } = useGlobal();
    const { isConnected, chain } = useAccount();
    const { open } = useAppKit();

    const [selectedTab, setSelectedTab] = useState("stake");
    const [balance, setBalance] = useState(0);
    const [amount, setAmount] = useState<number>();
    const [isBuilding, setIsBuilding] = useState(false);
    const [isWaiting, setIsWaiting] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isFailed, setIsFailed] = useState(false);
    const [txHash, setTxHash] = useState<`0x${string}`>();

    const { data: balances } = useGetBalances();
    const { initiateStaking, isStakeBuilding, isStakeWaiting, isStakeSubmitting, isStakeSuccess, isStakeError, stakeTxnHash, resetStake } = useStake(amount || 0);
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

    // Common State Handler
    useEffect(() => {
        setIsBuilding(isStakeBuilding);
        setIsWaiting(isStakeWaiting);
        setIsSubmitting(isStakeSubmitting);
        setIsSuccess(isStakeSuccess);
        setIsFailed(isStakeError);
        setTxHash([stakeTxnHash].find(v => v !== undefined));
    }, [isStakeBuilding, isStakeWaiting, isStakeSubmitting, isStakeSuccess, isStakeError])

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

    const getStatusImage = () => {
        if (isBuilding) return hourglassIcon;
        if (isWaiting) return mobileIcon;
        if (isSubmitting) return hourglassIcon;
        if (isSuccess) return checkIcon;
        if (isFailed) return crossIcon;
    }

    const getTitleText = () => {
        if (isBuilding && selectedMode == "shared") return "Please wait, your transaction is being set up";
        if (isBuilding && selectedMode == "dedicated") return "Please wait, your validator is being provisioned";
        if (isWaiting) return `Please check your wallet and sign the transactions to complete your ${selectedTab} action`;
        if (isSubmitting) return "Please wait, your transaction is being processed...";
        if (isSuccess) return `Your ${selectedTab} action was successful!`;
        if (isFailed) return `Your ${selectedTab} action was unsuccessful, please try again!`
    }

    const getSubtitleText = () => {
        if (isBuilding && selectedMode == "dedicated") return "This process can take couple of minutes...";
        if (isSuccess) return "The process of staking and unstaking on Ethereum can take multiple days to complete. Please see the latest timings here.";
        else return "";
    }

    const getTransactionLink = () => {
        return `${chain?.blockExplorers?.default.url}/tx/${txHash}`;
    }

    const reset = () => {
        resetStake();
    }

    // TRANSACTION STATE
    if (isBuilding || isWaiting || isSubmitting || isSuccess || isFailed)
        return (
            <div className={styles.main}>
                <div className={`${styles.container} ${styles.status}`}>
                    <img src={getStatusImage()} alt="" />
                    <span className={styles.title}>{getTitleText()}</span>
                    {isSuccess &&
                        <div className={styles.action} onClick={() => window.open(getTransactionLink(), "__blank")}>
                            <img src={etherscanLogo} alt="Etherscan" />
                            <span>View Your Transaction</span>
                        </div>
                    }
                    {(isSuccess || isFailed) &&
                        <div onClick={reset} className={styles.action}>
                            {"< Home"}
                        </div>
                    }
                    <span className={styles.subtitle}>{getSubtitleText()}</span>
                </div>
            </div>
        );
    // DEFAULT STATE
    else
        return (
            <div className={styles.main}>
                <div className={styles.container}>
                    {/* TABS */}
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
                                className={`${styles.primaryButton} ${styles.action}`}
                            >
                                {selectedTab}
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
}