import styles from "./Sanctioned.module.scss";

export default function Sanctioned() {
    return (
        <div className={styles.main}>
            <span>
                Access not permitted. We are preventing the connected wallet address from interacting with this sample staking app in accordance with regulations established by The Office of Foreign Assets Control ("OFAC") of the US Department of the Treasury.
                For more information, visit the OFAC FAQ website
            </span>
        </div>
    );
}