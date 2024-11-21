"use client"
import { createContext, useState } from "react";
export const SelectedCompaniesContext = createContext();

export const SelectedCompaniesProvider = ({children}) => {
    const [selectedCompanies, setSelectedCompanies] = useState([]);
    
    const updateCompanies = (companies) => {
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