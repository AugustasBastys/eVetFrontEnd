import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";
import { IPublicClientApplication } from "@azure/msal-browser";
import { Button, Typography } from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';

function handleLogin(instance : IPublicClientApplication) {
    instance.loginPopup(loginRequest).catch((e : any)=> {
        console.error(e);
    });
}

/**
 * Renders a button which, when selected, will open a popup for login
 */
export const SignInButton = () => {
    const { instance } = useMsal();

    return (
        <>
            <div>You need to be signed in to access this page.</div>
            <div><Button variant="contained" onClick={() => handleLogin(instance)}><Typography>Sign In</Typography> <LoginIcon /></Button></div>
        </>
        
    );
}