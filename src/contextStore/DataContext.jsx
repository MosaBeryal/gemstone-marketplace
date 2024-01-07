import { createContext, useState } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [productsData, setProductsData] = useState([]);
  return (
    <DataContext.Provider 
    value={
      {
        productsData,
        setProductsData
      }
    }
    >
      {children}
    </DataContext.Provider>
  );
};
export default DataContext;
