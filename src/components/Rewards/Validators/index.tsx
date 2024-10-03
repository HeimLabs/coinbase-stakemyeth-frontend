import { useAccount } from "wagmi";
import { stateStyles } from "../../../config/states.config";
import { useGetValidators } from "../../../hooks/useGetValidators";
import styles from "./Validators.module.scss";
import { holesky, mainnet } from "viem/chains";
import { beaconchainLogo } from "../../../assets";
import Skeleton from "react-loading-skeleton";

export default function Validators() {
    const { data: validators, isFetching } = useGetValidators();
    const { chainId } = useAccount();

    const getBeaconChainLink = (validatorId: `0x${string}` | string) => {
        if (chainId == holesky.id) return `https://holesky.beaconcha.in/validator/${validatorId}`;
        else if (chainId == mainnet.id) return `https://beaconcha.in/validator/${validatorId}`;
        else return "";
    }

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
            {!isFetching
                ? validators?.map((validator) => {
                    return (
                        <>
                            <div className={`${styles.row}`}>
                                <div className={`${styles.validatorCell}`}>
                                    <a href={getBeaconChainLink(validator.id)} target="_blank" rel="noopener noreferrer">
                                        <img src={beaconchainLogo} alt="Beacon Chain" />
                                    </a>
                                    {validator.id}
                                </div>
                                <div className={styles.vr} />
                                <div className={`${styles.statusCell}`}>
                                    <img src={stateStyles[validator.status].icon} alt="" />
                                    <span style={stateStyles[validator.status].style}>{validator.status.replace("_", " ")}</span>
                                </div>
                            </div>
                            <div className={styles.hr} />
                        </>
                    );
                })
                : <>
                    <div className={`${styles.row}`}>
                        <div className={`${styles.validatorCell}`}>
                            <Skeleton width={200} />
                        </div>
                        <div className={styles.vr} />
                        <div className={`${styles.statusCell}`}>
                            <Skeleton width={60} />
                        </div>
                    </div>
                    <div className={styles.hr} />
                    <div className={`${styles.row}`}>
                        <div className={`${styles.validatorCell}`}>
                            <Skeleton width={200} />
                        </div>
                        <div className={styles.vr} />
                        <div className={`${styles.statusCell}`}>
                            <Skeleton width={60} />
                        </div>
                    </div>
                    <div className={styles.hr} />
                </>
            }
        </div>
    );
}