"use client";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../context/DataContext.js";
import Chip from "../../components/Chip.jsx";
import CheckboxList from "../../components/CheckboxList.jsx";
import { SelectedCompaniesContext } from "../../context/SelectedCompaniesContext";
import Button from "../../components/Button.jsx";
import styles from "./styles.scss";

const Sidebar = () => {
  const { data, loading } = useContext(DataContext);
  const [companies, setCompanies] = useState([]);
  const { selectedCompanies, updateCompanies } = useContext(
    SelectedCompaniesContext
  );

  useEffect(() => {
    console.log(data);
    if (data) {
      setCompanies(data.companies);
    }
  }, [data]);

  const handleClearAll = () => {
    updateCompanies([]);
  };

  return (
    <section className="sidebar-wrapper">
      <div className="selected-company-list">
        {selectedCompanies.length > 0 ? (
          selectedCompanies.map((company, index) => (
            <Chip value={company.company_name} />
          ))
        ) : (
          <p>No Selection..</p>
        )}
      </div>
      {selectedCompanies.length > 0 && (
        <div>
          <Button label="Clear All" action={handleClearAll} />
        </div>
      )}
      <div className="company-list-wrapper">
        {loading ? <div>....Loading</div> : <CheckboxList list={companies} />}
      </div>
    </section>
  );
};

export default Sidebar;
