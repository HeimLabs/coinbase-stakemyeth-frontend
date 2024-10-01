import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

type GlobalContextType = {
    selectedMode: string
    setMode: Dispatch<SetStateAction<string>> | (() => void)
}

const GlobalContext = createContext<GlobalContextType>({
    selectedMode: "shared",
    setMode: (() => {})
});

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
    const [selectedMode, setMode] = useState("shared");

    return <GlobalContext.Provider value={{
        selectedMode,
        setMode
    }}>
        {children}
    </GlobalContext.Provider>;
};

export const useGlobal = () => useContext(GlobalContext);