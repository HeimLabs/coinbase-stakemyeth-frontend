import { useBuildClaim } from "../../hooks/useBuildClaim";
import { useBuildStake } from "../../hooks/useBuildStake";
import { useBuildUnstake } from "../../hooks/useBuildUnstake";
import { useGetBalances } from "../../hooks/useGetBalances";
import { useGetRewards } from "../../hooks/useGetRewards";
import { useGetValidators } from "../../hooks/useGetValidators";
import styles from "./Home.module.scss";

export default function Home() {
    const { data: balances } = useGetBalances('0xC1Df1c258787B1bd00b1B97c51466387CfB1E4a5', 17000, "shared");
    const { data: rewards } = useGetRewards(['0xC1Df1c258787B1bd00b1B97c51466387CfB1E4a5'], 17000, "shared", 20);
    const { data: validators } = useGetValidators('0xC1Df1c258787B1bd00b1B97c51466387CfB1E4a5', 17000);
    const { buildStakeOperation, transactions: stakeTranasactions, isPending: isStakePending } = useBuildStake('0xC1Df1c258787B1bd00b1B97c51466387CfB1E4a5', 17000, "shared", 1);
    const { buildUnstakeOperation, transactions: unstakeTransactions, isPending: isUnstakePending } = useBuildUnstake('0xC1Df1c258787B1bd00b1B97c51466387CfB1E4a5', 17000, "shared", 1);
    const { buildClaimOperation, transactions: claimTransactions, isPending: isClaimPending } = useBuildClaim('0xC1Df1c258787B1bd00b1B97c51466387CfB1E4a5', 17000, "shared", 1);

    return (
        <div className={styles.main}>
            Home
            Balances: {JSON.stringify(balances)}
            Rewards: {JSON.stringify(rewards)}
            Validators: {JSON.stringify(validators)}

            <div style={{ 'border': '1px solid black' }}>
                <button onClick={buildStakeOperation} disabled={isStakePending}>Build Stake</button>
                Transactions: {JSON.stringify(stakeTranasactions)}
            </div>

            <div style={{ 'border': '1px solid black' }}>
                <button onClick={buildUnstakeOperation} disabled={isUnstakePending}>Build Unstake</button>
                Transactions: {JSON.stringify(unstakeTransactions)}
            </div>

            <div style={{ 'border': '1px solid black' }}>
                <button onClick={buildClaimOperation} disabled={isClaimPending}>Build Claim</button>
                Transactions: {JSON.stringify(claimTransactions)}
            </div>
        </div>
    );
}