import React from 'react'
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import { Link, Outlet } from "react-router-dom";
import { Appointment } from '../apiClient/eVetApi';

type Props = {
    appointment: Appointment
}


export default function AppointmentCard(props: Props) {

  const [appointment, setAppointment] = React.useState<Appointment>(props.appointment);
  const appointmentId = props.appointment.id;

  // const date = new Date("2022");

  return (
    <Card elevation={4} sx={{p: 3}}>
    <h2>{appointment.availableTime?.date?.substring(0, 10)} {appointment.vetService?.name} for {appointment.pet?.name}
    <br/>
    {appointment.availableTime?.date?.substring(11, 16)} vet. {appointment.availableTime?.veterinarian?.name}
    <br/>
    </h2>
    {appointment && appointment.ownersComment && appointment.ownersComment?.length > 0 &&
    <>
    <h3>
    Comment: {appointment.ownersComment}
    </h3>
    </>
    }
    <div>
      {!appointment.canceled
      ?<>
      <Button href={`/appointments/${appointmentId}/reschedule`} variant="text">Reschedule</Button>{" "}
      <Button href={`/appointments/${appointmentId}/cancel`} variant="text">Cancel</Button>
      </>
      :<>
       <h2>CANCELED</h2> 
      </>
      }
    </div>
    <Outlet />
    </Card>
  )
}