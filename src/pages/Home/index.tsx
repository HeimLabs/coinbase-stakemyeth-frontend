import { useEffect, useState } from "react";
import styles from "./Home.module.scss";
import { useGlobal } from "../../contexts/global.context";

export default function Home() {
    const { selectedMode } = useGlobal();
    const [selectedTab, setSelectedTab] = useState("stake");

    useEffect(() => {
        setSelectedTab("stake")
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

                </div>
            </div>
        </div>
    );
}