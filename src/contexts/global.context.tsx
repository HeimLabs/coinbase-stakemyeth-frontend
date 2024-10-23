import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

type GlobalContextType = {
    selectedMode: "shared" | "dedicated"
    setMode: Dispatch<SetStateAction<"shared" | "dedicated">> | (() => void),
    isSanctioned: boolean,
    setIsSanctioned: Dispatch<SetStateAction<boolean>> | (() => void),
}

const GlobalContext = createContext<GlobalContextType>({
    selectedMode: "shared",
    setMode: (() => { }),
    isSanctioned: false,
    setIsSanctioned: (() => { })
});

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
    const [selectedMode, setMode] = useState<"shared" | "dedicated">("shared");
    const [isSanctioned, setIsSanctioned] = useState(false);

    return <GlobalContext.Provider value={{
        selectedMode,
        setMode,
        isSanctioned,
        setIsSanctioned
    }}>
        {children}
    </GlobalContext.Provider>;
};

export const useGlobal = () => useContext(GlobalContext);