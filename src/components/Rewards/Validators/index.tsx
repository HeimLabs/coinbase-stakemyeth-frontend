import { useGetValidators } from "../../../hooks/useGetValidators";
import styles from "./Validators.module.scss";

export default function Validators() {
    const { data: validators } = useGetValidators();

    return (
        <div className={styles.main}>
            {/* HEADER */}
            <div className={`${styles.row} ${styles.header}`}>
                <div className={`${styles.validatorCell}`}>
                    Validator ID
                </div>
                {/* <div className={styles.vr} /> */}
                <div className={`${styles.statusCell}`}>
                    Status
                </div>
            </div>
            <div className={styles.hr} />
            {/* VALIDATORS */}
            {validators?.map((validator) => {
                return (
                    <>
                        <div className={`${styles.row}`}>
                            <div className={`${styles.validatorCell}`}>
                                {validator.id}
                            </div>
                            <div className={styles.vr} />
                            <div className={`${styles.statusCell}`}>
                                {validator.status.replace("_", " ")}
                            </div>
                        </div>
                        <div className={styles.hr} />
                    </>
                );
            })}
        </div>
    );
}