import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { appointmentBookingMachine } from "../machines/appBookXstate";
import { useMachine } from "@xstate/react";
import { inspect } from "@xstate/inspect";
import { SilentRequest } from "@azure/msal-browser";
import { useMsal, useIsAuthenticated } from "@azure/msal-react";
import { CreateAppointmentCommand, Api, Pet, AvailableTime, VetService } from '../apiClient/eVetApi';
import { useNavigate } from 'react-router-dom';
import { PickPetContainer } from './appointments/PickPetContainer';
import { PickServiceContainer } from './appointments/PickServiceContainer';
import { PickTimeContainer } from './appointments/PickTimeContainer';
import { PickVeterinarianContainer } from './appointments/PickVeterinarianContainer';
import { LeaveNoteContainer } from './appointments/LeaveNoteContainer';

const steps = ['Pick a Pet', 'Select Service', 'Pick available Veterinarian',
'Pick available Date', 'Pick available Time'];

// inspect({
//     // options
//     url: 'https://statecharts.io/inspect', // (default)
//     iframe: false // open in new window
// });

export default function AppointmentXstate() {

  const client = new Api();

  const {instance, accounts} = useMsal();
  const isAuthenticated = useIsAuthenticated(); 

  const [pets, setPets] = React.useState();
  const [token, setToken] = React.useState<string>("");

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

        const serviceResponse = await client.pets.getPetsUsingGet(requestParams);
        const serviceData = await serviceResponse.json();
        
        setPets(serviceData);
        setToken(token.accessToken);
    };
    getPets();
},[isAuthenticated]);


  const [state, send] = useMachine(appointmentBookingMachine, {
    context: {
      token: token,
      petSelected: undefined,
      step: "0"
    },
    devTools: true
    });

    
  const [activeStep, setActiveStep] = React.useState(0);

  const setStep = (number: number) => {
    setActiveStep(parseInt(state.context.step));
  }

  const isStepOptional = (step: number) => {
    return step === 2;
  };
    

  const [skipped, setSkipped] = React.useState(new Set<number>());

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

    const navigate = useNavigate();
    const navigateBack = React.useCallback(() => navigate("/appointments"), [navigate]);

  const onAdd = async () => {
    // debugger;
    const scopes : string = process.env.REACT_APP_SCOPES ?? "user.read";
    const request : SilentRequest = {
        account: accounts[0],
        scopes: [scopes]
    }
    const token = await instance.acquireTokenSilent(request);
    const requestParams = {headers: { Authorization: `Bearer ${token.accessToken}` }};

   const pet: Pet = state.context.petSelected;
   const date: AvailableTime = state.context.dateSelected;
   const vetService: VetService = state.context.serviceSelected;

    const createAppointmentCommand : CreateAppointmentCommand = {
      vetServiceId: vetService.id,
      availableTimeId: date.id,
      petId: pet.id,
      ownersComment: state.context.note
    };

    const serviceResponse = await client.appointments.createAppointmentUsingPost(createAppointmentCommand, requestParams);
    const serviceData = await serviceResponse.json();
    navigateBack();
  }

 

  return (
    <Box sx={{ width: '100%', padding: 5 }}>
      <Card elevation={4} >

      {/* <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      
        <p/> */}

        {state.matches("pickPet") && pets &&
        <>
            <PickPetContainer

            
                pets={pets} 
                pet={state.context.petSelected} 
                onChange={(event, value) => {
                    send("SELECT", {data: value})
                }}
                onNext={() => send("NEXT", {data: token})}
                onBack={() => send("BACK")}/>
          </>
        }
        {state.matches("pickService") && 
               <>
                  <PickServiceContainer 
                  service={state.context.serviceSelected} 
                  services={state.context.serviceList} 
                  onChange={(event, value) => {
                      send("SELECT", {data: value})}}
                  onNext={() => send("NEXT")}
                  onBack={() => send("BACK")}/>
                  </>
        }
        {state.matches("pickVeterinarian") && 
        <>
              <PickVeterinarianContainer
                  veterinarian={state.context.veterinarianSelected} 
                  veterinarians={state.context.veterinarianList} 
                  onChange={(event, value) => {
                      send("SELECT", {data: value})}}
                  onNext={() => send("NEXT")}
                  onBack={() => send("BACK")}
                  onSkip={() => send("SKIP")}
              />
          </>
        }
            {state.matches("pickDate") && 
               <>
                <PickTimeContainer 
                  date={state.context.dateSelected} 
                  dates={state.context.dateList} 
                  onChange={(event, value) => { send("SELECT", {data: value})}} 
                  onNext={() => send("NEXT")} 
                  onBack={() => send("BACK")}/>
                  </>
              }
              {state.matches("leaveNote") && 
                <LeaveNoteContainer
                  note={state.context.note} 
                  onChange={(event, value) => {
                      send("TAKENOTE", {data: value})
                  }}
                  onNext={() => {
                    send("BOOK");
                    onAdd();
                  }}
                  onBack={() => send("BACK")}
                />
              }
              {state.matches("finish") &&
                <div>
                   
                </div>

              }

      </Card>
    </Box>
  );
}
