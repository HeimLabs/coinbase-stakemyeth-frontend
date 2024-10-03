import { activeIcon, depositIcon, exitIcon, pendingIcon, unavailableIcon, waitIcon, withdrawalIcon } from "../assets";

export const stateStyles = {
    "provisioning": {
        icon: waitIcon,
        style: {
            color: "#C837AB"
        }
    },
    "provisioned": {
        icon: waitIcon,
        style: {
            color: "#C837AB"
        }
    },
    "deposited": {
        icon: depositIcon,
        style: {
            color: "#0074FF"
        }
    },
    "pending_activation": {
        icon: pendingIcon,
        style: {
            color: "#FFB300"
        }
    },
    "active": {
        icon: activeIcon,
        style: {
            color: "#19B400"
        }
    },
    "exiting": {
        icon: exitIcon,
        style: {
            color: "#FF5959"
        }
    },
    "exited": {
        icon: exitIcon,
        style: {
            color: "#FF5959"
        }
    },
    "withdrawal_available": {
        icon: withdrawalIcon,
        style: {
            color: "#0074FF"
        }
    },
    "withdrawal_complete": {
        icon: withdrawalIcon,
        style: {
            color: "#0074FF"
        }
    },
    "unknown": {
        icon: unavailableIcon,
        style: {
            color: "#FFB300"
        }
    },
    "active_slashed": {
        icon: activeIcon,
        style: {
            color: "#19B400"
        }
    },
    "exited_slashed": {
        icon: exitIcon,
        style: {
            color: "#FF5959"
        }
    },
}