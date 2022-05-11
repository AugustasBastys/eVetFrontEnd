import { parse } from 'node:path/win32';
import React, { useEffect } from 'react'
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal, useIsAuthenticated } from "@azure/msal-react";
import { useParams, useLocation } from 'react-router-dom';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import { de } from 'date-fns/locale';
import { Api, ApiConfig, Pet } from "../apiClient/eVetApi";
import { SilentRequest } from "@azure/msal-browser";
import { useNavigate } from 'react-router-dom';

export default function PetsInfo() {

  const {petId} = useParams();
  const id: number = parseInt(petId!);

  const [pet, setPet] = React.useState<Pet>({});
  const {instance, accounts} = useMsal();
  const isAuthenticated = useIsAuthenticated();

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

          const serviceResponse = await client.pets.getPetUsingGet(id, requestParams);
          const serviceData = await serviceResponse.json();
          //debugger;
          setPet(serviceData);
      };
      getPets();
  },[isAuthenticated]);

  const navigate = useNavigate();
  const navigateBack = React.useCallback(() => navigate(`/pets/`), [navigate]);
  const onClose = () => navigateBack();

  return (
    <Card elevation={4}>
    <div>
      <h2>Pet Information:</h2>
      <div>
        <h3>{pet.name} {pet.breed}</h3>
        <hr/>
        <h3>
          <>Gender: {pet.gender} <br/></>
          {pet.color &&
          <>Color: {pet.color} <br/></>
          }
          
          <>Sterelized:
          {pet.sterilized
          ? " Yes"
          : " No"
          }
          <br/>
          </>
          
          {pet.birthday &&
            <>Birthday: {pet.birthday?.substring(0, 10)}
            <br/>
            </>
          }
          {pet.hidden
          ?<>Hidden: Yes</>
          :<>Hidden: No</>
          }
        </h3>
        <div>
          <Button href={`/pets/${pet.id}/update`}>Edit Information</Button>
          <Button href={`/pets/${pet.id}/record`}>View Record</Button>
          <Button onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
    </Card>
    
  )
}
