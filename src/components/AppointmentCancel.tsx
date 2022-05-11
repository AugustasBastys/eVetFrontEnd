import React from 'react'
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import { Link, Outlet } from "react-router-dom";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useIsAuthenticated, useMsal } from '@azure/msal-react';
import { useParams } from "react-router-dom";
import { Api, CancelAppointmentCommand, } from '../apiClient/eVetApi';
import { SilentRequest } from '@azure/msal-browser';
import { useNavigate } from 'react-router-dom';


export default function AppointmentCancel() {

    const {instance, accounts} = useMsal();

    const {appointmentId} = useParams();
    const id: number = parseInt(appointmentId!);

    const navigate = useNavigate();
    const navigateBack = React.useCallback(() => navigate("/appointments"), [navigate]);

    const handleCancel = async () => {
    
        const client = new Api();
        const scopes : string = process.env.REACT_APP_SCOPES ?? "user.read";
        const request : SilentRequest = {
            account: accounts[0],
            scopes: [scopes]
        }
        const token = await instance.acquireTokenSilent(request);
        const requestParams = {headers: { Authorization: `Bearer ${token.accessToken}` }};
    
        const cancelAppointmentCommand : CancelAppointmentCommand = {
          id: id,
          cancel: true
        };
    
        const serviceResponse = await client.appointments.cancelAppointmentUsingPut(cancelAppointmentCommand, requestParams);
        const serviceData = await serviceResponse.json();
        navigateBack();
        }
      
    

  return (
    <Card elevation={4}>
    <div>
    <h3>Do you want to cancel appointment?</h3>
    </div>
    <Button onClick={handleCancel}>Cancel appointment</Button>
    </Card>
  )
}