import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Surgery } from '../../apiClient/eVetApi';

type Props = {
  surgeries: Surgery[]
}

export default function SurgeriesTable(props: Props) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="right">Veterinarian</TableCell>
            <TableCell align="right">Note</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.surgeries.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.visit?.appointment?.availableTime?.date?.substring(0, 10)}
                {row.visit?.appointment?.availableTime?.date?.substring(11, 16)}
              </TableCell>
              <TableCell align="right">{row.visit?.appointment?.availableTime?.veterinarian?.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}