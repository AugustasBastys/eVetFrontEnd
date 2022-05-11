import React from "react";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal, useIsAuthenticated } from "@azure/msal-react";
import { Button, Container, Switch } from "@mui/material";
import { SignInButton } from "../components/SignInButton";
import FormControlLabel from '@mui/material/FormControlLabel';
import PetCard from "../components/PetCard";
import { Api, ApiConfig, Pet } from "../apiClient/eVetApi";
import { SilentRequest } from "@azure/msal-browser";


const Pets = () => {

    const {instance, accounts} = useMsal();
    const [pets, setPets] = React.useState<Pet[]>([]);
    const isAuthenticated = useIsAuthenticated();

    const [showHidden, setShowHidden] = React.useState<boolean>(true);

    const filterPets = () => {
        setShowHidden(state => !state);
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

            const serviceResponse = await client.pets.getPetsUsingGet(requestParams);
            const serviceData = await serviceResponse.json();
            //debugger;
            setPets(serviceData);
        };
        getPets();
    },[isAuthenticated]);
    return (<Container maxWidth="lg">
        <h2>My Pets</h2>
        <UnauthenticatedTemplate>
            <div>
                <>Here you can provide info about your pets and access their medical history:</>
                <ul>
                    <li>Add a new pet</li>
                    <li>View a list of your pets</li>
                    <li>Change your pet's info</li>
                    <li>View your pet's medical history (record)</li>
                    <li>Book an appointment for your pet</li>
                </ul>
                <SignInButton />
            </div>            
        </UnauthenticatedTemplate>
        <AuthenticatedTemplate>
            <Button variant="contained" href="/pets/new">Add a Pet</Button>
            
            
            <FormControlLabel control={<Switch sx={{m:2}}  
            onClick={filterPets} />} label="Show Hidden" />
            <br/>

        {pets && pets.length > 0 ? pets.map((pet: Pet) => (
            (!showHidden || !pet.hidden) &&
            (
            <div key={pet.id}>
                <PetCard pet={pet} />
                <br/>
            </div>)
            
            )) : <div>Nothing to display</div>
        }
        </AuthenticatedTemplate>
    </Container>);
}

export default Pets;