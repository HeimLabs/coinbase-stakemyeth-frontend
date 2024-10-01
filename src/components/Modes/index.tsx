import { useGlobal } from "../../contexts/global.context";
import styles from "./Modes.module.scss";

export default function Modes() {
    const { selectedMode, setMode } = useGlobal();

    return (
        <div className={styles.main}>
            <div className={styles.tabsContainer}>
                <div
                    className={`${styles.tab} ${selectedMode == "shared" ? styles.active : ""}`}
                    onClick={() => setMode("shared")}
                >
                    Shared ETH Staking
                </div>
                <div
                    className={`${styles.tab} ${selectedMode == "dedicated" ? styles.active : ""}`}
                    onClick={() => setMode("dedicated")}
                >
                    Dedicated ETH Staking
                </div>
            </div>
        </div>
    );
}