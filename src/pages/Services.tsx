import React from "react";
import { Box, Container } from "@mui/material";
import ServiceCard from "../components/ServiceCard";
import { Api, VetService, Pet } from "../apiClient/eVetApi";


const Services = () => {
    const [services, setServices] = React.useState<VetService[]>([]);
    React.useEffect(() => {
        const client = new Api();
        const getServices = async () => {
            const serviceResponse = await client.vetServices.getVetServicesUsingGet();
            const serviceData = await serviceResponse.json();
            //debugger;
            setServices(serviceData);
        };
        getServices();
    }, []);

    
    return (<Container>
        <h2>Our Services</h2>
        <Box sx={{
            display: 'column',
            p: 1,
            m: 1,
            bgcolor: 'background.paper',
            borderRadius: 1,
        }}>
        {services && services.map((service: VetService) => (
            <><ServiceCard service={service} /><br/></>)) }
        </Box>
    </Container>);
}

export default Services;