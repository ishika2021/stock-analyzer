"use client"
import { createContext, useState, useEffect, ReactNode } from "react";

interface DataContextType {
  data: any;
  setData?: (data: any) => void;
  loading: boolean;
  setLoading?: (data: boolean) => void;
}

interface DataProviderType {
  children: ReactNode;
}

export const DataContext = createContext<DataContextType>({
  data: null,
  setData:()=>{},
  loading: false,
  setLoading: () => {}
});

export const DataProvider = ({ children }: DataProviderType) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch("https://dev-l0txzp7vr8mu6a0.api.raw-labs.com/api/3"); 
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (err) {
        console.log(err)
      }
    };
    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ data, loading }}>
      {children}
    </DataContext.Provider>
  );
};

