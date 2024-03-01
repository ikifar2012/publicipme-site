'use client'
import { FC, ReactNode, createContext, useState, Dispatch, SetStateAction } from "react";
interface ResultsContextProps {
    results: any[];
    setResults: Dispatch<SetStateAction<any[]>>;  
}
const ResultsContext = createContext<ResultsContextProps>({
    results: [],
    setResults: () => { },
});
interface ResultsProviderProps {
    children: ReactNode;
}
const ResultsProvider: FC<ResultsProviderProps> = ({ children }) => {
    const [results, setResults] = useState<any[]>([]); // Update type annotation for results
    return (
        <ResultsContext.Provider value={{ results, setResults }}>
            {children}
        </ResultsContext.Provider>
    );
}

export { ResultsProvider, ResultsContext };