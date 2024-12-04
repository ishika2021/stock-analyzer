"use client";

import { useEffect, useState, useContext } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import { SelectedCompaniesContext } from "../context/SelectedCompaniesContext";
import "./styles.scss";

export default function CheckboxList({ list }) {
  const [checked, setChecked] = useState([]);
  const { updateCompanies, selectedCompanies } = useContext(
    SelectedCompaniesContext
  );

  useEffect(() => {
    if (selectedCompanies.length <= 0) {
      setChecked([]);
    }
  }, [selectedCompanies.length]);

  useEffect(() => {
    updateCompanies(checked);
  }, [checked, updateCompanies]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List
      sx={{ maxWidth: 300, bgcolor: "background.paper" }}
      className="checkbox-list-wrapper"
    >
      {list.map((value) => {
        const labelId = `checkbox-list-label-${value}`;

        return (
          <ListItem
            key={value}
            secondaryAction={
              <IconButton edge="end" aria-label="comments">
                <ShowChartIcon />
              </IconButton>
            }
            disablePadding
          >
            <ListItemButton
              role={undefined}
              onClick={handleToggle(value)}
              dense
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.includes(value)}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <ListItemText
                id={labelId}
                primary={value.company_name}
                className="list-item-text"
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
