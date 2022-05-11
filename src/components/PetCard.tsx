import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Api, Pet, UpdatePetCommand } from "../apiClient/eVetApi";
import { Avatar, Box, CardContent, CardMedia, Switch, Typography } from '@mui/material';
import { blueGrey } from '@mui/material/colors';
import React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal, useIsAuthenticated } from "@azure/msal-react";
import { SilentRequest } from '@azure/msal-browser';

type Props = {
  pet: Pet;
}

export default function PetCard(props: Props) {

    const {instance, accounts} = useMsal();
    const [pet, setPet] = React.useState<Pet>(props.pet);
    const petPhotoUrl = "https://www.petmd.com/sites/default/files/petmd-cat-happy-10.jpg"; //todo....
    // const onHide = () => { /* todo */ };
    const navigate = useNavigate();

    const onHide = async () => {

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
        hidden: !pet.hidden
      };
  
      const serviceResponse = await client.pets.updatePetUsingPut(updatePetCommand, requestParams);
      const serviceData = await serviceResponse.json();
      setPet(serviceData);
      // pet = serviceData;
    };

    return (
      <Card elevation={4} >
          <CardContent sx={{display:'flex'}}>
            <Box sx={{display:"inline"}} component="span">
                <Avatar
                  sx={{ bgcolor: blueGrey }}
                  alt={pet && pet.name ? pet.name.substring(0, 1) : "?"}
                  src={petPhotoUrl}
                />
            </Box>  
            <Box sx={{display:"inline", pl: 2}} component="span">
              <Box sx={{ display: 'block', flexDirection: 'column', pl: 1 }}>
                <Typography variant="h5" component="span">
                  {pet.name}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                  {pet.breed}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary" component="div">
                  {pet.birthday && new Date(pet.birthday).toDateString()}
                </Typography>
              </Box>
              <Box>
                <Button onClick={() => navigate(`/pets/${pet.id}`, {state: {pet: pet}})}>View Pet</Button>
                
                <Button href={`/pets/${pet.id}/update`} variant="text">Edit Info</Button>{" "}
                <Button href={`/pets/${pet.id}/record`} variant="text">View Record</Button>{" "}
                {/* maybe use switch instead? */}
                {/* <FormControlLabel control={<Switch sx={{m:2}} checked={pet.hidden} 
            onClick={onHide} />} label="Hidden" /> */}
              </Box>
            </Box> 
          </CardContent>
      </Card>);
}
