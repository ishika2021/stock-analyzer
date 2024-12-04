"use client"
import { createContext, useState } from "react";

interface SelectedCompaniesContextType {
    selectedCompanies: Company[];
    setSelectedCompanies?: (selectedCompanies: Company[]) => void;
    updateCompanies: (companies: Company[])=> void;
}

export const SelectedCompaniesContext = createContext<SelectedCompaniesContextType>({
    selectedCompanies: [],
    setSelectedCompanies: () => {},
    updateCompanies: undefined
});

export const SelectedCompaniesProvider = ({children}) => {
    const [selectedCompanies, setSelectedCompanies] = useState([]);
    
    const updateCompanies = (companies: Company[]) => {
        if(companies){
            setSelectedCompanies(companies)
        }
    }
    
    return (
        <SelectedCompaniesContext.Provider value={{selectedCompanies,updateCompanies}}>
            {children}
        </SelectedCompaniesContext.Provider>
    )
}