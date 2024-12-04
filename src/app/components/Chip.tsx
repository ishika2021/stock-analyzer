import * as React from "react";
import Chip from "@mui/material/Chip";
import "./styles.scss";

export default function BasicChips({ value }) {
  return <Chip label={value} variant="outlined" className="chip-wrapper" />;
}
