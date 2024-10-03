import { useLocation, useNavigate } from "react-router-dom";
import styles from "./NavBar.module.scss";
import { useEffect, useState } from "react";
import { closeIcon, logo, menuIcon } from "../../assets";
import { useAccount } from "wagmi";

export default function NavBar() {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { isConnected } = useAccount();
    const [activeTab, setActiveTab] = useState('wallet');
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        if (pathname.includes("rewards"))
            setActiveTab('rewards');
        else
            setActiveTab('home');
    }, [pathname]);

    const handleTabChange = (tab: string) => {
        navigate(`/${tab}`);
        toggleMenu();
    }

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    }

    return (
        <>
            <div className={styles.main}>
                <div className={styles.leftContainer}>
                    <img src={logo} alt="StakeMyETH Logo" />
                    <div className={styles.tabContainer}>
                        {/* HOME */}
                        <div onClick={() => handleTabChange("")} className={`${styles.tab} ${activeTab == "home" ? styles.active : ""}`}>
                            <span>Home</span>
                        </div>
                        {/* REWARDS */}
                        <div onClick={() => handleTabChange("rewards")} className={`${styles.tab} ${activeTab == "rewards" ? styles.active : ""}`}>
                            <span>Rewards</span>
                        </div>
                    </div>
                </div>
                <div className={styles.rightContianer}>
                    <w3m-network-button />
                    {isConnected ? <w3m-account-button /> : <w3m-connect-button />}
                </div>
            </div>
            <div className={styles.mobileMain}>
                <div className={styles.header}>
                    <img src={logo} alt="StakeMyETH Logo" />
                    <img src={menuIcon} alt="Burger Menu" onClick={toggleMenu} />
                </div>
                <div className={`${styles.overlay} ${menuOpen ? styles.open : ""}`}>
                    <div className={styles.tabContainer}>
                        <img src={closeIcon} alt="Close Menu" onClick={toggleMenu} />
                        <div onClick={() => handleTabChange("")} className={`${styles.tab} ${activeTab == "home" ? styles.active : ""}`}>
                            <span>Home</span>
                        </div>
                        <div onClick={() => handleTabChange("rewards")} className={`${styles.tab} ${activeTab == "rewards" ? styles.active : ""}`}>
                            <span>Rewards</span>
                        </div>
                        <w3m-network-button />
                        {isConnected ? <w3m-account-button /> : <w3m-connect-button />}
                    </div>
                </div>
            </div>
        </>
    );
}