import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

type GlobalContextType = {
    selectedTab: string
    setTab: Dispatch<SetStateAction<string>> | (() => void)
}

const GlobalContext = createContext<GlobalContextType>({
    selectedTab: "shared",
    setTab: (() => {})
});

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
    const [selectedTab, setTab] = useState("shared");

    return <GlobalContext.Provider value={{
        selectedTab,
        setTab
    }}>
        {children}
    </GlobalContext.Provider>;
};

export const useGlobal = () => useContext(GlobalContext);