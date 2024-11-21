"use client";
import { useState, useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import DateRange from "../../components/DateRange";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import Button from "../../components/Button";
import * as XLSX from "xlsx";
import { SelectedCompaniesContext } from "../../context/SelectedCompaniesContext";
import "./styles.scss";
import dayjs from "dayjs";

export default function BasicModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    clearData();
    setOpen(false);
  };
  const [name, setName] = useState("");
  const [date, setDate] = useState([null, null]);
  const [reason, setReason] = useState("");
  const { selectedCompanies } = useContext(SelectedCompaniesContext);
  const [error, setError] = useState(false);

  useEffect(() => {
    clearData();
  }, []);

  const handleDateChange = (date) => {
    const startDate = date[0] ? dayjs(date[0]).format("YYYY-MM-DD") : "";
    const endDate = date[1] ? dayjs(date[1]).format("YYYY-MM-DD") : "";
    setError(false);
    if (startDate && endDate) {
      setDate([startDate, endDate]);
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    height: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    display: "grid",
    gap: "10px",
  };

  const handleNameChange = (e) => {
    setError(false);
    setName(e.target.value);
  };

  const handleReasonChange = (e) => {
    setError(false);
    setReason(e.target.value);
  };

  const clearData = () => {
    setName("");
    setReason("");
    setDate([null, null]);
    setError(false);
  };

  const formatExportDate = (obj) => {
    const headers = ["Company", ...Object.keys(obj.data[0])];
    const rows = obj.data.map((entry) => {
      return {
        company_name: obj.name,
        ...entry,
      };
    });

    return { headers, rows };
  };

  const filterCompanyData = (range) => {
    const startRange = new Date(range[0]);
    const endRange = new Date(range[1]);
    return selectedCompanies.map((company) => {
      const filteredData = company.data.filter((obj) => {
        const currentDate = new Date(obj.date);

        return currentDate >= startRange && currentDate <= endRange;
      });
      const obj = {
        name: company.company_name,
        data: filteredData,
      };
      return obj;
    });
  };

  const handleDownload = () => {
    if (!name || date.includes(null) || !reason) {
      setError(true);
      return;
    }
    setError(false);
    const exportingCompanies = filterCompanyData(date);
    const allRows = [];

    exportingCompanies.forEach((company) => {
      const formattedCompany = formatExportDate(company);
      if (allRows.length <= 0) {
        allRows.push(formattedCompany.headers);
      }

      formattedCompany.rows.forEach((obj) => {
        allRows.push(Object.values(obj));
      });
    });

    const worksheet = XLSX.utils.aoa_to_sheet(allRows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Companies Data");
    XLSX.writeFile(workbook, "CompaniesData.xlsx");
    handleClose()
  };
  return (
    <div>
      <Button
        label="Export Data"
        action={handleOpen}
        isDisable={selectedCompanies.length > 0 ? false : true}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Export The Data
          </Typography>
          <div className="export-fields">
            <TextField
              id="name"
              label="Name"
              variant="outlined"
              value={name}
              onChange={handleNameChange}
              required
            />
            <DateRange handleChange={handleDateChange} />
            <TextareaAutosize
              minRows={5}
              value={reason}
              onChange={handleReasonChange}
            />
            <div>
              {error && <p>Fill the form to download the data.</p>}
              <Button label="Download" action={handleDownload} />
            </div>
          </div>
          <div className="footer">
            <Button label="Close" action={handleClose} />
          </div>
        </Box>
      </Modal>
    </div>
  );
}
