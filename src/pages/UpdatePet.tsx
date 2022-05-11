import { parse } from 'node:path/win32';
import React, { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Button, Card, Checkbox, Container, FormControl, FormControlLabel, Select } from '@mui/material';
import { de } from 'date-fns/locale';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useIsAuthenticated, useMsal } from '@azure/msal-react';
import { SignInButton } from '../components/SignInButton';
import { SilentRequest } from '@azure/msal-browser';
import { useNavigate } from 'react-router-dom';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Api, CreatePetCommand, Pet, UpdatePetCommand } from '../apiClient/eVetApi';
import { Form } from 'react-bootstrap';

export default function UpdatePet() {


  const {petId} = useParams();
  const id: number = parseInt(petId!);


  const [pet, setPet] = React.useState<Pet>({
      name: '',
      color: '',
      sterilized: true
  });
  
  const [petUpdate, setPetUpdate] = React.useState<UpdatePetCommand>({});

  const {instance, accounts} = useMsal();
  const isAuthenticated = useIsAuthenticated();

  const navigate = useNavigate();
  const navigateBack = React.useCallback(() => navigate(`/pets/${id}`), [navigate]);
  const onClose = () => navigateBack();

  const [sterilizedTemp, setSterilizedTemp] = React.useState<any>(false);

  const {minDate, maxDate} = React.useMemo(() => {
    const today = new Date();
    const minDate = new Date(today.getFullYear() - 100, today.getMonth(), today.getDate());
    const maxDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return {minDate: minDate, 
      maxDate: maxDate};
  }, []);

  React.useEffect(() => {
      const client = new Api();
      const getPet = async () => {
          const scopes : string = process.env.REACT_APP_SCOPES ?? "user.read";
          const request : SilentRequest = {
              account: accounts[0],
              scopes: [scopes]
          }

          const token = await instance.acquireTokenSilent(request);
          const requestParams = {headers: { Authorization: `Bearer ${token.accessToken}` }};

          const serviceResponse = await client.pets.getPetUsingGet(id, requestParams);
          const serviceData = await serviceResponse.json();
          //debugger;
          setPet(serviceData);
          setSterilizedTemp(serviceData.sterilized);
      };
      getPet();
     
  },[isAuthenticated]);

  const setPetPart = (part: keyof UpdatePetCommand, value: any) => { setPet({ ...pet, [part]: value }); };

  const onAdd = async () => {
    const client = new Api();
    const scopes : string = process.env.REACT_APP_SCOPES ?? "user.read";
    const request : SilentRequest = {
        account: accounts[0],
        scopes: [scopes]
    }
    const token = await instance.acquireTokenSilent(request);
    const requestParams = {headers: { Authorization: `Bearer ${token.accessToken}` }};

    const updatePetCommand : UpdatePetCommand = {
      id: pet.id,
      name: pet.name,
      color: pet.color,
      sterilized: pet.sterilized,
      hidden: pet.hidden,
      birthday: pet.birthday
    };

    const serviceResponse = await client.pets.updatePetUsingPut(updatePetCommand, requestParams);
    const serviceData = await serviceResponse.json();
    navigateBack();
};

  return (

    <Card sx={{p: 5 }}>
          <h2>Update Pet</h2>
          <FormControl fullWidth sx={{pb: 5 }}>
            <TextField id="name-field-2" label="Name" 
              variant="outlined" 
              defaultValue={pet.name}
              value={pet.name}
              onChange={e => setPetPart("name", e.target.value)}/>
            <p/>
            
            <TextField id="color-field" InputLabelProps={{shrink:pet.color?true:false}}
              label="Color" 
              variant="outlined" 
              //required={true}
              defaultValue={pet.color}
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

            <>
            <Form.Check
            inline
            label="Sterilized"
            disabled={sterilizedTemp}
            name="group1"
            type="checkbox"
            checked={pet.sterilized}
            onClick={e => setPetPart("sterilized", !pet.sterilized)}
            id={`inline-checkbox-1`}
            />
            <br/>
            </>
            
            
            <Form.Check
            inline
            label="Hidden"
            name="group2"
            type="checkbox"
            checked={pet.hidden}
            onClick={e => setPetPart("hidden", !pet.hidden)}
            id={`inline-checkbox-2`}
            />

          </FormControl>
          
          <Button variant="contained" onClick={onAdd}>Update</Button>{" "}
          <Button variant="outlined" onClick={onClose}>Close</Button>
        </Card>
  )

}
