import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
import { Button, Card, Checkbox, Container, FormControl, FormControlLabel, Select } from '@mui/material';
import { Api, CreatePetCommand, Pet } from '../apiClient/eVetApi';
import { useNavigate } from 'react-router-dom';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { CheckBox, VerifiedTwoTone } from '@mui/icons-material';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useIsAuthenticated, useMsal } from '@azure/msal-react';
import { SignInButton } from '../components/SignInButton';
import { SilentRequest } from '@azure/msal-browser';
import { Form } from 'react-bootstrap';

const PetsNew = () => {

  const [pet, setPet] = React.useState<Pet>({});
  const {instance, accounts} = useMsal();
  const isAuthenticated = useIsAuthenticated();

  const navigate = useNavigate();
  const navigateBack = React.useCallback(() => navigate("/pets"), [navigate]);
  const onClose = () => navigateBack();

  const setPetPart = (part: keyof Pet, value: any) => { setPet({ ...pet, [part]: value }); };

  const onAdd = async () => {

    if(pet.breed == undefined || pet.name == undefined 
    || pet.gender == undefined) {
      alert("Fields Name, Breed, Gender must be filled");
    } else {


    const client = new Api();
    const scopes : string = process.env.REACT_APP_SCOPES ?? "user.read";
    const request : SilentRequest = {
        account: accounts[0],
        scopes: [scopes]
    }
    const token = await instance.acquireTokenSilent(request);
    const requestParams = {headers: { Authorization: `Bearer ${token.accessToken}` }};

    const createPetCommand : CreatePetCommand = {
      name: pet.name,
      birthDay: pet.birthday,
      breed: pet.breed,
      color: pet.color,
      genderType: pet.gender,
      sterilized: pet.sterilized
    };

    const serviceResponse = await client.pets.createPetUsingPost(createPetCommand, requestParams);
    const serviceData = await serviceResponse.json();
    navigateBack();
    }
  };

  const {minDate, maxDate} = React.useMemo(() => {
    const today = new Date();
    const minDate = new Date(today.getFullYear() - 100, today.getMonth(), today.getDate());
    const maxDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return {minDate: minDate, 
      maxDate: maxDate};
  }, []);
  


  return (
  
    <Container maxWidth="md" sx={{padding: 3}}>
      <UnauthenticatedTemplate>
        <div>
            <h2>You need to Sign In to create a Pet</h2>
            <br/>
            <SignInButton />
        </div>  
      </UnauthenticatedTemplate>
      <AuthenticatedTemplate>
        <Card sx={{p: 5 }}>
          <h2>Add a new pet</h2>
          <FormControl fullWidth sx={{pb: 5 }}>
            <TextField id="name-field" label="Name" autoComplete='off'
              variant="outlined"
              // {...register("firstName", { required: true, maxLength: 20 })}
              value={pet.name}
              onChange={e => setPetPart("name", e.target.value)}/>
            <p/>
            <Autocomplete id="breed-field" 
              aria-required={true}
              options={["Canine", "Cricetinae", "Feline", "Rabbit"]} 
              value={pet.breed}
              onChange={(e, v: any) => setPetPart("breed", v)}
              renderInput={(params) => 
                <TextField {...params} label="Breed" />}/>
            <p/>
            <Autocomplete id="gender-field" 
              aria-required={true}
              options={["Female","Male"]}
              value={pet.gender}
              onChange={(e, v: any) => setPetPart("gender", v)}
              renderInput={(params) => 
                <TextField {...params} label="Gender" />}/>
            <p/>
            <TextField id="color-field" 
              label="Color" 
              variant="outlined"  autoComplete='off'
              //required={true}
              value={pet.color} 
              onChange={e => setPetPart("color", e.target.value)}/>
            <p/>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Birthday"
                openTo="year"
                views={['year', 'month', 'day']}
                minDate={minDate}
                maxDate={maxDate}
                value={pet.birthday}
                onChange={d => setPetPart("birthday", d)}
                renderInput={(params) => <TextField {...params} />} />
            </LocalizationProvider>
            <p/>
            <Form.Check
            inline
            label="Sterilized"
            name="group1"
            type="checkbox"
            checked={pet.sterilized}
            onClick={e => setPetPart("sterilized", !pet.sterilized)}
            id={`inline-checkbox-1`}
            />

              
          </FormControl>
          <Button variant="contained" onClick={onAdd}>Add Pet</Button>{" "}
          <Button variant="outlined" onClick={onClose}>Close</Button>
        </Card>
        
      </AuthenticatedTemplate>

      
    </Container>

  )

}

export default  PetsNew;