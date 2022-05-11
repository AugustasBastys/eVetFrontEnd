import { Avatar, Box, Button, List, ListItemButton, Select, Stack, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import React from "react";
import { VetService } from "../../apiClient/eVetApi";

export interface IPickServiceContainerProps {
    services: VetService[] | undefined;
    service: VetService | undefined;
    onChange: (event: any, value: any) => void | undefined;
    onNext: () => void;
    onBack: () => void;
}

export const PickServiceContainer = (props: IPickServiceContainerProps) => { 

return (
    <div className="PickPetContainer">
        {props.services && <Box>
            <Box display="flex" justifyContent="center" sx={{ width: '100%' }}>
                <h1>Pick a service</h1>
            </Box>
            <Box display="flex" justifyContent="center" sx={{ width: '100%', overflow: "auto", overflowY: "scroll" }} maxHeight="40vh">
                <List>
                    {props.services?.map((s) => (
                        <ListItemButton 
                            key={s.id}
                            disabled={props.service?.vetServiceCode === s.vetServiceCode}
                            onClick={() => props.onChange(undefined, props.services?.find(vs => vs.vetServiceCode === s.vetServiceCode))}
                            >
                            <div>
                            <Typography variant="h6" component="span">
                                {s.name}
                            </Typography>
                            <br />
                            <Typography variant="body1" component="div">
                                    <strong>from {s.price} Eur</strong>
                            </Typography>
                            </div></ListItemButton>
                    ))}
                </List>
            </Box>
        </Box>}
        {!props.services && <Box>
            <Box display="flex" justifyContent="center" sx={{ width: '100%' }}>
                <h1>Sorry, no services to show</h1>
                <p>Something went wrong...</p>
            </Box>            
        </Box>}
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing="3">
            <div><Button onClick={props.onBack}><h3>back</h3></Button></div>
            <div><Button onClick={props.onNext} disabled={!props.service}><h3>next</h3></Button></div>
        </Stack>
</div>
);
};