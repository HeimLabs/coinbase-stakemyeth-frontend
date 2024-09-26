import { useLocation, useNavigate } from "react-router-dom";
import styles from "./NavBar.module.scss";
import { useEffect, useState } from "react";

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

    return (
        <div className={styles.main}>
            NAVBAR
        </div>
    );
}