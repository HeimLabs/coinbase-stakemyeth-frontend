import { useGlobal } from "../../contexts/global.context";
import styles from "./Tabs.module.scss";

export default function Tabs() {
    const { selectedTab, setTab } = useGlobal();

    return (
        <div className={styles.main}>
            <div className={styles.tabsContainer}>
                <div
                    className={`${styles.tab} ${selectedTab == "shared" ? styles.active : ""}`}
                    onClick={() => setTab("shared")}
                >
                    Shared ETH Staking
                </div>
                <div
                    className={`${styles.tab} ${selectedTab == "dedicated" ? styles.active : ""}`}
                    onClick={() => setTab("dedicated")}
                >
                    Dedicated ETH Staking
                </div>
            </div>
        </div>
    );
}