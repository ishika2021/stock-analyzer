import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function BasicTable({ rows, headers }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ maxWidth: 450 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Company</TableCell>
            {headers.map((header, index) => (
              <TableCell key={index} align="right">
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              {Object.values(row.data).map((value: string, index:number) => (
                <TableCell key={index} component="th" scope="row">
                  {value}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
