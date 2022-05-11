import { Container, Link, Paper } from "@mui/material";
import CallIcon from '@mui/icons-material/Call';
import ServiceInfoCard from "../components/ServiceInfoCard";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { IPublicClientApplication } from "@azure/msal-browser";


const Home = () => { // statecharts.io

    const isAuthenticated = useIsAuthenticated();
    const {instance} = useMsal();

    return (<Container>
        {/* <h2>Home</h2>
        <h3>[anonymous]</h3> */}
        <h1>Welcome to eVetClinic {isAuthenticated}</h1>
        {/* <GetServices msalInstance={instance}/> */}
        <Paper elevation={3} sx={{p: "1rem"}}>
            <ServiceInfoCard />
        </Paper>
        <br/>
        <Paper elevation={3} sx={{p: "1rem"}}>
            <h2>Call Us! 24/7</h2>
            <br/>
            <div><strong>Phone: </strong><>+35165165165165161</></div>
            <div><strong>Skype: </strong><>evet_on_skype</></div>
            <div><strong>WhatsApp: </strong><>eVetClinic</></div>
        </Paper>
        <br/>
        <Paper elevation={3} sx={{p: "1rem"}}>
            <h2>Visit Us!</h2>
            <strong>Work time</strong>
            <div>Mon-Sun 7AM-8PM</div>
            <div>(Emergency cases 24/7, phone reservation required)</div>
            <br/>
            <strong>Addres</strong>
            <div>Dogs & Cats str, Pet City</div>
            <div>Dogwille, Lithuania</div>
        </Paper>  
        <br/>
        <Paper elevation={3} sx={{p: "1rem"}}>
            <h2>Follow Us!</h2>
            <ul>
                <li>Youtube</li>
                <li>Facebook</li>
                <li>Tweeter</li>
                <li>Instagram</li>
            </ul>
        </Paper>  
        

    </Container>);
}

export default Home;