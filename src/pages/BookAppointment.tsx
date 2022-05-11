import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { getServices } from '../data/DataServices';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal, useIsAuthenticated } from "@azure/msal-react";
import { SilentRequest } from "@azure/msal-browser";
import { useNavigate } from 'react-router-dom';
import { Api, ApiConfig, CreateAppointmentCommand, Pet } from "../apiClient/eVetApi";

const steps = ['Pick a Pet', 'Select Service', 'Pick available Veterinarian',
'Pick available Date', 'Leave a Note'];

const client = new Api();

interface PetAutocomplete {
  /** @format date-time */
  birthday?: string;
  breed?: "Canine" | "Cricetinae" | "Feline" | "Rabbit";
  color?: string;
  gender?: "Female" | "Male";
  hidden?: boolean;

  /** @format int32 */
  id?: number;
  name: string;
  sterilized?: boolean;
}

interface VetServiceAutocomplete {
    /** @format int32 */
id: number;
name: string;

/** @format double */
price?: number;
vetServiceCode?: string;
}
interface VeterinarianAutocomplete {
  /** @format int32 */
  id: number;
  name: string;
  specialty?: "Dentist" | "General" | "Surgeon";
  vetService?: VetServiceAutocomplete;
}
interface AvailableTimeAutocomplete {
booked?: boolean;

/** @format date-time */
date: string;

/** @format int32 */
id?: number;
veterinarian?: VeterinarianAutocomplete;
}

export default function HorizontalLinearStepper() {



  const [pets, setPets] = React.useState<PetAutocomplete[]>([]);
  const [selectedPet, setSelectedPet] = React.useState<PetAutocomplete>();

  const [veterinarians, setVeterinarians] = React.useState<VeterinarianAutocomplete[]>([]);
  const [selectedVeterinarian, setSelectedVeterinarian] = React.useState<VeterinarianAutocomplete>();

  const [availableTimes, setAvailableTimes] = React.useState<AvailableTimeAutocomplete[]>([]);
  const [selectedAvailableTime, setSelectedAvailableTime] = React.useState<AvailableTimeAutocomplete>();

  const [comment, setComment] = React.useState<string>();

  const {instance, accounts} = useMsal();
  const isAuthenticated = useIsAuthenticated();

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());

  const isStepOptional = (step: number) => {
    return step === 2;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const onAdd = async () => {
    
    const scopes : string = process.env.REACT_APP_SCOPES ?? "user.read";
    const request : SilentRequest = {
        account: accounts[0],
        scopes: [scopes]
    }
    const token = await instance.acquireTokenSilent(request);
    const requestParams = {headers: { Authorization: `Bearer ${token.accessToken}` }};

    const createAppointmentCommand : CreateAppointmentCommand = {
     vetServiceId: selectedVetService?.id,
     availableTimeId: selectedAvailableTime?.id,
     petId: selectedPet?.id,
     ownersComment: comment
    };

    const serviceResponse = await client.appointments.createAppointmentUsingPost(createAppointmentCommand, requestParams);
    const serviceData = await serviceResponse.json();
  
  }

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    if(activeStep == 0 && (selectedPet == undefined || selectedPet == null)){
      alert("Pet must be selected");
      return;
    }
    if(activeStep == 1 && (selectedVetService == undefined || selectedVetService == null)){
      alert("Service must be selected");
      return;
    }

    if(activeStep == 3 && (selectedAvailableTime == undefined || selectedAvailableTime == null)){
      alert("Date must be selected");
      return;
    }

    if(activeStep == 4) {
      onAdd();
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {

    if(activeStep == 1) {
      setSelectedVetService(undefined);
    }
    if(activeStep == 2) {
      setSelectedVeterinarian(undefined);
    }
    if(activeStep == 3) {
      setSelectedAvailableTime(undefined);
    }
    if(activeStep == 4) {
      setComment(undefined);
    }

    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const navigate = useNavigate();
  const navigateBack = React.useCallback(() => navigate("/appointments"), [navigate]);
  const onClose = () => navigateBack();

  const getAvailableTimesByVeterinarian = async (id: any) => {
    const scopes : string = process.env.REACT_APP_SCOPES ?? "user.read";
    const request : SilentRequest = {
        account: accounts[0],
        scopes: [scopes]
    }

    const token = await instance.acquireTokenSilent(request);
    const requestParams = {headers: { Authorization: `Bearer ${token.accessToken}` }};
   
    const serviceResponse = await client.availableTimes.getTimesByVeterinarianUsingGet(id, requestParams);
    const serviceData = await serviceResponse.json();
  
    setAvailableTimes(serviceData);
};

  const getAvailableTimesByServices = async () => {
    const scopes : string = process.env.REACT_APP_SCOPES ?? "user.read";
    const request : SilentRequest = {
        account: accounts[0],
        scopes: [scopes]
    }

    const token = await instance.acquireTokenSilent(request);
    const requestParams = {headers: { Authorization: `Bearer ${token.accessToken}` }};

    if(selectedVetService) {
    const serviceResponse = await client.availableTimes.getTimesByServiceUsingGet(selectedVetService.id, requestParams);
    const serviceData = await serviceResponse.json();
    //debugger;
    setAvailableTimes(serviceData);
  }
  };

  const getVeterinarian = async (id: number) => {

    const scopes : string = process.env.REACT_APP_SCOPES ?? "user.read";
    const request : SilentRequest = {
        account: accounts[0],
        scopes: [scopes]
    }

    const token = await instance.acquireTokenSilent(request);
    const requestParams = {headers: { Authorization: `Bearer ${token.accessToken}` }};

   
    const serviceResponse = await client.veterinarians.getVeterinariansUsingGet1(id, requestParams);
    const serviceData = await serviceResponse.json();
  
    setVeterinarians(serviceData);

};

const getServices = async () => {
  const scopes : string = process.env.REACT_APP_SCOPES ?? "user.read";
  const request : SilentRequest = {
      account: accounts[0],
      scopes: [scopes]
  }

  const token = await instance.acquireTokenSilent(request);
  const requestParams = {headers: { Authorization: `Bearer ${token.accessToken}` }};

  const serviceResponse = await client.vetServices.getVetServicesUsingGet(requestParams);
  const serviceData = await serviceResponse.json();

  setvetServices(serviceData);

  //debugger;
};


  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
    onClose();
  };



  const [vetServices, setvetServices] = React.useState<VetServiceAutocomplete[]>([]);
  const [selectedVetService, setSelectedVetService] = React.useState<VetServiceAutocomplete>();


  if(activeStep == 1 && vetServices.length < 1) {
    getServices();
  }

  // if(activeStep == 2) {
  //   getVeterinarian();
  // }

  if(activeStep == 3 && selectedVeterinarian == undefined) {
    getAvailableTimesByServices();
  }

  // if(activeStep == 3 && selectedVeterinarian != undefined) {
  //   getAvailableTimesByVeterinarian();
  // }

  React.useEffect(() => {
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
        //debugger;
        setPets(serviceData);
    };
    getPets();
  },[isAuthenticated]);

  return (
    <Box sx={{ width: '100%' }}>
      <Card elevation={2}>
      <Stepper activeStep={activeStep}>
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

      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            Appoinment created
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Exit</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          
          <Typography sx={{ mt: 2, mb: 1 }}>
            {activeStep == 0 &&
               <Autocomplete
                disablePortal
                id="combo-box-demo"
                value={selectedPet}
                options = {pets}
                onInputChange={(event, value, reason) => {
                  if(reason === "clear"){
                      setSelectedPet(undefined);
                  }
                }}
                onChange={(option, value) => {
                  if(value != null && "name" in value){
                  setSelectedPet(value)
                  }
                }}
                getOptionLabel={option => option.name}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Pet" />}
                />
            }
            {activeStep == 1 &&
               <Autocomplete
                disablePortal
                id="combo-box-demo"
                options = {vetServices}
                value={selectedVetService}
                onInputChange={(event, value, reason) => {
                  if(reason === "clear"){
                      setSelectedVetService(undefined);
                  }
                }}
                onChange={(option, value) => {
                  if(value != null && "name" in value){
                      setSelectedVetService(value);
                      getVeterinarian(value.id);
                  }
                }}
                getOptionLabel={(option) => option.name}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Service" />}
                />
            }
            {activeStep == 2 &&
            <>  
               <Autocomplete
                disablePortal
                id="combo-box-demo"
                options = {veterinarians}
                value={selectedVeterinarian}
                onInputChange={(event, value, reason) => {
                  if(reason === "clear"){
                      setSelectedVeterinarian(undefined);
                  }
                }}
                onChange={(option, value) => {
                  if(value != null && "name" in value){
                      setSelectedVeterinarian(value);
                      getAvailableTimesByVeterinarian(value.id);
                  }
                }}
                getOptionLabel={(option) => option.name}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Veterinarian" />}
                />
                </>
            }
            {activeStep == 3 && selectedVeterinarian &&
            <>
               <Autocomplete
                disablePortal
                id="combo-box-demo"
                value={selectedAvailableTime}
                options = {availableTimes}
                onInputChange={(event, value, reason) => {
                  if(reason === "clear"){
                      setSelectedAvailableTime(undefined);
                  }
                }}
                onChange={(option, value) => {
                  if(value != null && "date" in value){
                  setSelectedAvailableTime(value)
                  }
                }}
                getOptionLabel={option => option.date}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Date" />}
                />
                </>
            }
            {activeStep == 3 && selectedVeterinarian == undefined &&
               <Autocomplete
                disablePortal
                id="combo-box-demo"
                value={selectedAvailableTime}
                options = {availableTimes}
                onInputChange={(event, value, reason) => {
                  if(reason === "clear"){
                      setSelectedAvailableTime(undefined);
                  }
                }}
                onChange={(option, value) => {
                  if(value != null && "date" in value){
                  setSelectedAvailableTime(value)
                  }
                }}
                getOptionLabel={(option: AvailableTimeAutocomplete) => {return (`${option.date.substring(0, 10)} ${option.date.substring(0, 10)}`)}}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Date" />}
                />
            }
            {activeStep == 4 &&
              <TextField
              placeholder="Comment"
              multiline
              rows={2}
              maxRows={4}
              onChange={(e) => {
                    setComment(e.target.value);
              }}
              style={{ width: 500 }}
            />
            }
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          {activeStep != 0 &&
               <Button
               color="inherit"
               onClick={handleBack}
               sx={{ mr: 1 }}
             >
               Back
             </Button>
            }
            
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && selectedVeterinarian == undefined &&
            <>
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            </>
            }
            {isStepOptional(activeStep) && selectedVeterinarian != undefined &&
            <>
            <Button color="inherit" disabled={true} onClick={handleSkip} sx={{ mr: 1 }}>
              Skip
            </Button>
            </>
            }
            {activeStep == 2 && selectedVeterinarian == undefined
            ?<>
            <Button onClick={handleNext} disabled={true}>
              {activeStep === steps.length - 1 ? 'Book' : 'Next'}
            </Button>
            </>
            :<>
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Book' : 'Next'}
            </Button>
            </>
            }
          </Box>
          
        </React.Fragment>
      )}




      </Card>
    </Box>
  );
}
