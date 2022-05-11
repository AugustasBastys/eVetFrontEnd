import { Button, Container, Switch } from "@mui/material";
import React from "react";
import FormControlLabel from '@mui/material/FormControlLabel';
import { Outlet, Link } from "react-router-dom";
import AppointmentCard from "../components/AppointmentCard";
import { Appointment, Api } from "../apiClient/eVetApi";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal, useIsAuthenticated } from "@azure/msal-react";
import { SilentRequest } from "@azure/msal-browser";
import { SignInButton } from "../components/SignInButton";

const Appointments = () => {
  const [appointments, setAppointments] = React.useState<Appointment[]>([]);
  
  const {instance, accounts} = useMsal();
  const isAuthenticated = useIsAuthenticated();

  const [showCanceled, setShowCanceled] = React.useState<boolean>(true);

    const filterAppointments = () => {
        setShowCanceled(state => !state);
    }

  React.useEffect(() => {
    const client = new Api();
    const getPets = async () => {
        const scopes : string = process.env.REACT_APP_SCOPES ?? "user.read";
        const request : SilentRequest = {
            account: accounts[0],
            scopes: [scopes]
        }

        const token = await instance.acquireTokenSilent(request);
        const requestParams = {headers: { Authorization: `Bearer ${token.accessToken}` }};

        const serviceResponse = await client.appointments.getAppointmentsUsingGet(requestParams);
        const serviceData = await serviceResponse.json();
        //debugger;
        setAppointments(serviceData);
    };
    getPets();
},[isAuthenticated]);


    return (<Container>
      
        <h2>Appointments</h2>
        <UnauthenticatedTemplate>
            <div>
                <>Here you can provide info about your pets appointmets:</>
                <ul>
                    <li>Add a new appointment</li>
                    <li>View a list of your pets appointments</li>
                    <li>Change your pet's appointment time</li>
                    <li>Cancel your pet's appointment</li>
                </ul>
                <SignInButton />
            </div>            
        </UnauthenticatedTemplate>
        <AuthenticatedTemplate>
        <div>
            <Button href="/appointments/book" variant="contained">Book appointment</Button>
            <FormControlLabel onClick={filterAppointments} control={<Switch sx={{m:2}}/>} label="Show Canceled" />
         </div>
         {appointments.map((appointment) => (
        (!showCanceled || !appointment.canceled) &&
        (
          <div key={appointment.id}>
          <AppointmentCard appointment={appointment} />
          <br/>
        </div>)))}  

        <Outlet />
        </AuthenticatedTemplate>
    </Container>);
};

export default Appointments;