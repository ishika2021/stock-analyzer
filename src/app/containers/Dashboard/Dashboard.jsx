"use client";
import "./styles.scss";
import Button from "../../components/Button";
import Table from "../../components/Table";
import { SelectedCompaniesContext } from "../../context/SelectedCompaniesContext";
import { useEffect, useState, useContext } from "react";
import BarChart from "../../components/BarChart";
import LineChart from "../../components/LineChart";
import ExportModal from "../ExportModal/ExportModal";
const Dashboard = () => {
  const [headers, setHeaders] = useState([
    "date",
    "total_shares",
    "promoters_holding",
    "revenue",
    "pat",
    "ebitda",
    "fixed_assets",
    "liabilities",
    "number_of_employees",
    "last_dividend_per_share",
    "revenue_growth_qoq",
    "revenue_growth_yoy",
    "last_updated_date",
  ]);
  const [rows, setRows] = useState([]);
  const { selectedCompanies } = useContext(SelectedCompaniesContext);

  useEffect(() => {
    if (selectedCompanies.length) {
      const allCompanies = [];
      selectedCompanies.forEach((company) => {
        const averageData = getAverage(company.data);
        allCompanies.push({
          name: company.company_name,
          data: averageData,
        });
      });
      setRows(allCompanies);
    }else {
        setRows([])
    }
  }, [selectedCompanies]);


  const getAverage = (data) => {
    if (!data.length) {
      return [];
    }

    const result = data.reduce((acc, curr) => {
      Object.keys(curr).forEach((key) => {
        if (
          key === "date" ||
          key === "last_updated_date" ||
          key === "total_shares"
        ) {
          acc[key] = curr[key];
        } else {
          acc[key] = (acc[key] || 0) + curr[key];
        }
      });
      return acc;
    }, {});

    Object.keys(result).forEach((key) => {
      if (
        key !== "date" &&
        key !== "last_updated_date" &&
        key !== "total_shares"
      ) {
        result[key] /= data.length;
      }
    });
    return result;
  };
  return (
    <section className="dashboard-wrapper">
      <div className="header">
        <ExportModal />
      </div>
      <div className={rows.length<=0?'no-data':'board'}>
        {rows.length > 0 ? (
          <>
            <Table headers={headers} rows={rows} />
            <BarChart companies={rows} />
            <LineChart companies={rows} />
          </>
        ):(
            <p>Select a company to show the statistics......</p>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
