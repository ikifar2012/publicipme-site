'use client'
import { FC, ReactNode, createContext, useState, Dispatch, SetStateAction } from "react";
interface ResultsContextProps {
    results: any[];
    setResults: Dispatch<SetStateAction<any[]>>;
    DialogState: boolean;
    setDialogState: Dispatch<SetStateAction<boolean>>;
}
const ResultsContext = createContext<ResultsContextProps>({
    results: [],
    setResults: () => { },
    DialogState: false,
    setDialogState: () => { },
});
interface ResultsProviderProps {
    children: ReactNode;
}
const ResultsProvider: FC<ResultsProviderProps> = ({ children }) => {
    const [results, setResults] = useState<any[]>([]); // Update type annotation for results
    const [DialogState, setDialogState] = useState(false);
    return (
        <ResultsContext.Provider value={{ results, setResults, DialogState, setDialogState }}>
            {children}
        </ResultsContext.Provider>
    );
}

export { ResultsProvider, ResultsContext };