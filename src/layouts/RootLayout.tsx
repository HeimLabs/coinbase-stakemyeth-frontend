
import { Outlet } from 'react-router-dom';
import styles from "../styles/Layout.module.scss";
import NavBar from '../components/NavBar';

export default function RootLayout() {
    return (
        <div className={styles.main}>
            {/* NAVBAR */}
            <NavBar />
            {/* PAGE */}
            <main className={styles.outlet}>
                {/* @todo - Shared/Dedicated Tabs */}
                <Outlet />
            </main>
            {/* FOOTER */}
            <div className={styles.footer}>
                FOOTER
            </div>
        </div>
    )
}