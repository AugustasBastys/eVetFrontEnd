import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Visit } from '../../apiClient/eVetApi';

type Props = {
  visits: Visit[]
}

export default function VisitsTable(props: Props) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="right">Pulse</TableCell>
            <TableCell align="right">Blood&nbsp;Pressure</TableCell>
            <TableCell align="right">Temperature</TableCell>
            <TableCell align="right">Weight</TableCell>
            <TableCell align="right">Diagnosis</TableCell>
            <TableCell align="right">Service</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.visits.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.date?.substring(0, 10)} {row.date?.substring(11, 16)}
              </TableCell>
              <TableCell align="right">{row.pulse}</TableCell>
              <TableCell align="right">{row.bloodPressure}</TableCell>
              <TableCell align="right">{row.temp}</TableCell>
              <TableCell align="right">{row.weight}</TableCell>
              <TableCell align="right">{row.diagnosis}</TableCell>
              <TableCell align="right">{row.appointment?.vetService?.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}