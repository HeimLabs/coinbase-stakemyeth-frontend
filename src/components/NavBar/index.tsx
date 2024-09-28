import { useLocation, useNavigate } from "react-router-dom";
import styles from "./NavBar.module.scss";
import { useEffect, useState } from "react";
import { logo } from "../../assets";

export default function NavBar() {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [activeTab, setActiveTab] = useState('wallet');

    useEffect(() => {
        if (pathname.includes("rewards"))
            setActiveTab('rewards');
        else
            setActiveTab('home');
    }, [pathname]);

    const handleTabChange = (tab: string) => {
        navigate(`/${tab}`);
    }

    return (
        <div className={styles.main}>
            <div className={styles.leftContainer}>
                <img src={logo} alt="StakeMyETH Logo" />
                <div className={styles.tabContainer}>
                    {/* HOME */}
                    <div onClick={() => handleTabChange("")} className={`${styles.tab} ${activeTab == "home" ? styles.active : ""}`}>
                        <span>Home</span>
                    </div>
                    {/* REWARDS */}
                    <div onClick={() => handleTabChange("")} className={`${styles.tab} ${activeTab == "rewards" ? styles.active : ""}`}>
                        <span>Rewards</span>
                    </div>
                </div>
            </div>
            <div className={styles.rightContianer}>
                <button>Network</button>
                <button>Connect Wallet</button>
            </div>
        </div>
    );
}