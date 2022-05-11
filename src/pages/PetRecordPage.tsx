import React from 'react'
import VisitsTable from '../components/tables/VisitsTable'
import VaccinationsTable from '../components/tables/VaccinationsTable'
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal, useIsAuthenticated } from "@azure/msal-react";
import { Api, PetRecord, Visit } from '../apiClient/eVetApi';
import { SilentRequest } from "@azure/msal-browser";
import { useParams } from "react-router-dom";
import SurgeriesTable from '../components/tables/SurgeriesTable';
import ConditionsTable from '../components/tables/ConditionsTable';

type Props = {}

export default function PetRecordPage() {

  const {petId} = useParams();
  const id: number = parseInt(petId!);

  const {instance, accounts} = useMsal();
  const [petRecord, setPetRecord] = React.useState<PetRecord>();
  const isAuthenticated = useIsAuthenticated();

  React.useEffect(() => {
    const client = new Api();
    const getPetRecord = async () => {
        const scopes : string = process.env.REACT_APP_SCOPES ?? "user.read";
        const request : SilentRequest = {
            account: accounts[0],
            scopes: [scopes]
        }

        const token = await instance.acquireTokenSilent(request);
        const requestParams = {headers: { Authorization: `Bearer ${token.accessToken}` }};

        const serviceResponse = await client.record.getPetRecordByPetIdUsingGet(id, requestParams);
        const serviceData = await serviceResponse.json();
        //debugger;
        setPetRecord(serviceData);

      //   if(petRecord){
      //     const tempVisits: Visit[] = petRecord.visits;
      //   setVisits(tempVisits);
      // }
    };
    getPetRecord();
},[isAuthenticated]);
  
  return (
    <div>
      
      {petRecord?.visits &&
      <>
      <h2>{petRecord?.pet?.name} Visits</h2>
      <VisitsTable visits={petRecord.visits}/>
      </>
      }
      
      {petRecord?.vaccinations &&
      <>
      <h2>{petRecord?.pet?.name} Vaccinations</h2>
      <VaccinationsTable vaccinations={petRecord.vaccinations}/>
      </>
      }
      {petRecord?.surgeries &&
      <>
      <h2>{petRecord?.pet?.name} Surgeries</h2>
      <SurgeriesTable surgeries={petRecord.surgeries}/>
      </>
      }
      {petRecord?.conditions &&
      <>
      <h2>{petRecord?.pet?.name} Conditions</h2>
      <ConditionsTable conditions={petRecord.conditions}/>
      </>
      }
    </div>
  )
}