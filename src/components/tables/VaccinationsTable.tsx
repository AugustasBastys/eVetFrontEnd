import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Vaccination } from '../../apiClient/eVetApi';

type Props = {
  vaccinations: Vaccination[]
}

export default function VaccinationsTable(props: Props) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Type</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Next&nbsp;Due</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          
          {props.vaccinations.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.vaccineType}
              </TableCell>
              <TableCell align="right">{row.visit?.date?.substring(0, 10)} {row.visit?.date?.substring(11, 16)}</TableCell>
              <TableCell align="right">{row.nextDue?.substring(0, 10)}</TableCell>
            </TableRow>
          ))}
          
        </TableBody>
      </Table>
    </TableContainer>
  );
}