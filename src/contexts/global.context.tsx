import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

type GlobalContextType = {
    selectedMode: "shared" | "dedicated"
    setMode: Dispatch<SetStateAction<"shared" | "dedicated">> | (() => void)
}

const GlobalContext = createContext<GlobalContextType>({
    selectedMode: "shared",
    setMode: (() => { })
});

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
    const [selectedMode, setMode] = useState<"shared" | "dedicated">("shared");

    return <GlobalContext.Provider value={{
        selectedMode,
        setMode
    }}>
        {children}
    </GlobalContext.Provider>;
};

export const useGlobal = () => useContext(GlobalContext);