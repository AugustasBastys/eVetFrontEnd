import React from 'react'
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import { useParams } from "react-router-dom";
import { getAppointment } from '../data/DataAppointment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import AvailableTimesTable from './tables/AvailableTimesTable';
import { AvailableTime, Appointment, Api, RescheduleAppointmentCommand } from '../apiClient/eVetApi';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useIsAuthenticated, useMsal } from '@azure/msal-react';
import { SilentRequest } from '@azure/msal-browser';
import { useNavigate } from 'react-router-dom';

export default function AppointmentReschedule() {

    const navigate = useNavigate();
    const navigateBack = React.useCallback(() => navigate(`/appointments`), [navigate]);
 
    const {appointmentId} = useParams();
    const id: number = parseInt(appointmentId!);
    const [appointment, setAppointment] = React.useState<Appointment>();

    const {instance, accounts} = useMsal();
    const isAuthenticated = useIsAuthenticated();

    const [selectedAvailableTime, setSelectedAvailableTime] = React.useState<AvailableTime>({});
  
    const childToParent = (childdata: AvailableTime) => {
      setSelectedAvailableTime(childdata);
    }

   const rescheduleAppointment = async () => {
      const client = new Api();
      const scopes : string = process.env.REACT_APP_SCOPES ?? "user.read";
      const request : SilentRequest = {
          account: accounts[0],
          scopes: [scopes]
      }
      const token = await instance.acquireTokenSilent(request);
      const requestParams = {headers: { Authorization: `Bearer ${token.accessToken}` }};
  
      const rescheduleAppointmentCommand : RescheduleAppointmentCommand = {
        id: id,
        availableTimeId: selectedAvailableTime.id
      };
  
      const serviceResponse = await client.appointments.rescheduleAppointmentUsingPut(rescheduleAppointmentCommand, requestParams);
      const serviceData = await serviceResponse.json();
      navigateBack();
    }

    const onSubmit = () => {
      console.log("cia")
      if(selectedAvailableTime.id != null) {
        rescheduleAppointment();
      } else {
          alert("Available time must be selected");
      }
    }

    React.useEffect(() => {
      const client = new Api();
      const getAppointment = async () => {
          const scopes : string = process.env.REACT_APP_SCOPES ?? "user.read";
          const request : SilentRequest = {
              account: accounts[0],
              scopes: [scopes]
          }

          const token = await instance.acquireTokenSilent(request);
          const requestParams = {headers: { Authorization: `Bearer ${token.accessToken}` }};
            
          const serviceResponse = await client.appointments.getAppointmentUsingGet(id, requestParams);
          const serviceData = await serviceResponse.json();
          //debugger;
          setAppointment(serviceData);
          
      };
      getAppointment();
    
  },[isAuthenticated]);

  return (
    <Card elevation={4}>
    <h2>Pick a new date for {appointment?.pet?.name} appointment</h2>
    <div>
    <AvailableTimesTable childToParent={childToParent} appointment={appointment} />
    </div>
    <div>
    <Button onClick={onSubmit}>Submit</Button>
    </div>
    </Card>
  )
}