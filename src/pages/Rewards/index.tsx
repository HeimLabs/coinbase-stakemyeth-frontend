import { useState } from "react";
import Chart from "../../components/Rewards/Chart";
import { useGetRewards } from "../../hooks/useGetRewards";
import styles from "./Rewards.module.scss";
import Validators from "../../components/Rewards/Validators";
import { useGlobal } from "../../contexts/global.context";

export default function Rewards() {
    const [days, setDays] = useState(7);
    const { data: stakingRewards, totalRewards } = useGetRewards(days);
    const { selectedMode } = useGlobal();

    const handleDaysChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setDays(Number(e.target.value))
    }

    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <div className={styles.rewardsHeader}>
                    <div className={styles.earned}>
                        <span className={styles.key}>Total Rewards Earned</span>
                        <span className={styles.value}>{totalRewards} ETH</span>
                    </div>
                    <select name="days" id="days" onChange={handleDaysChange}>
                        <option value={7}>Last 7 days</option>
                        <option value={14}>Last 14 days</option>
                        <option value={30}>Last 30 days</option>
                    </select>
                </div>
                <Chart rewards={stakingRewards || []} />
            </div>
            {selectedMode == "dedicated" && <Validators />}
        </div>
    );
}