import * as React from "react";
import { IPublicClientApplication } from "@azure/msal-browser";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { Container } from "@mui/material";
import { useEffect, useMemo } from "react";
import { SignInButton } from "../components/SignInButton";


//todo: move to separate file
type UserInfoProps = {
    msalInstance : IPublicClientApplication
};

const UserInfo = (props: UserInfoProps) => {
    
    const acc = useMemo(() => props.msalInstance.getAllAccounts()[0], []);

    const username = acc.username;
    const name = acc.name;
    const accid = acc.idTokenClaims ?? {};
    const [token, setToken] = React.useState("");
    const [msg, setMsg] = React.useState("");

    useEffect(() => {
        const getToken = async () => {
            const t =  await props.msalInstance.acquireTokenSilent({ scopes: ["https://evetclinic.onmicrosoft.com/036d9c28-5afb-453d-b36f-61512a5ac0bb/app.read"], account: acc});
            setToken(t.accessToken);
            console.log(t.accessToken)
        };
        getToken();
    },[])

    useEffect(()=>{
        const getMessage = async() => {
            const m = await fetch("http://localhost:8080/read", {
                headers: {
                  Accept: 'text/plain;charset=UTF-8',
                  Authorization: 'Bearer ' + token
                }});
            const j = await m.text();
            setMsg(j);
        };
        getMessage();
    },[token])

    return (<>
        <div>HomeAccountId: {acc.homeAccountId}</div>
        <div>LocalAccountId: {acc.localAccountId}</div>
        <div>Token: {token}</div>
        <div>Message: {msg}</div>
        <br/>
        {Object.entries(accid).map(v => <div key={v[0]}>{v[0]}: {v[1]}</div>)}
    </>)
};


const Profile = () => {
    const {instance} = useMsal();
    return (<Container>
        <h2>My Profile</h2>
        <UnauthenticatedTemplate>
            <div>
                <>Here you can manage your profile:</>
                <hr/>
                <ul>
                    <li>View profile info</li>
                    <li>Edit profile info</li>
                </ul>
                <hr/>
            </div>
            <SignInButton/>
        </UnauthenticatedTemplate>
        <AuthenticatedTemplate>
            {<UserInfo msalInstance={instance} />}
        </AuthenticatedTemplate>

    </Container>);
}

export default Profile;