import Image from "next/image";
import "./styles.scss";
import Home from "./views/Home";
import { DataProvider } from "./context/DataContext";
import { SelectedCompaniesProvider } from "./context/SelectedCompaniesContext";

const BaseLayout = () => {
  return (
    <DataProvider>
      <SelectedCompaniesProvider>
        <Home />
      </SelectedCompaniesProvider>
    </DataProvider>
  );
};

export default BaseLayout;
