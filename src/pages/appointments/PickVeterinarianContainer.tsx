import React from "react";
import { Avatar, Box, Button, List, ListItemButton, Select, Stack, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";


import { Veterinarian } from "../../apiClient/eVetApi";


export interface IPickVeterinarianContainerProps {
    veterinarians: Veterinarian[] | undefined;
    veterinarian: Veterinarian | undefined;
    onChange: (event: any, value: any) => void | undefined;
    onNext: () => void;
    onSkip: () => void;
    onBack: () => void;
};

export const PickVeterinarianContainer = (props: IPickVeterinarianContainerProps) => {
    
    const options = props.veterinarians?.map((veterinarian: Veterinarian) => <ToggleButton style={{minWidth:300}} value={veterinarian.name}>
        <Box display="flex" justifyContent="start" alignItems="start" sx={{paddingRight: 2}}><Avatar alt={veterinarian.name} src="/static/images/avatar/1.jpg" /></Box><h2>{veterinarian.name}</h2>
        </ToggleButton>);

    return (
        // <div className="PickPetContainer">
        //     {props.pets && <Box>
        //         <Box display="flex" justifyContent="center" sx={{ width: '100%', overflow: "auto", overflowY: "scroll" }} maxHeight="40vh">
        //             <h1>Pick a pet</h1>
        //         </Box>
        //         <Box sx={{padding: 1 }} display="flex" justifyContent="center" alignItems="start">
        //         <ToggleButtonGroup
        //             color="primary"
        //             orientation="vertical"
        //             value={props.pet?.name}
        //             exclusive
        //             onChange={ (event: any, value: any) => props.onChange(event, props.pets?.find(p => p.name === value))}
        //             >
        //             {options}
        //         </ToggleButtonGroup>
        //         </Box>     
        //     </Box>}
        //     {!props.pets && <Box>
        //         <Box display="flex" justifyContent="center" sx={{ width: '100%' }}>
        //             <h1>Sorry, no pet to pick</h1>
        //             <p>You can add a pet in the pets page</p>
        //         </Box>            
        //     </Box>}

        //     <Stack direction="row" justifyContent="flex-end" alignItems="flex-start" spacing="3">
        //         <Button onClick={props.onNext} disabled={!props.pet}><h3>next</h3></Button>
        //     </Stack>


            <div className="PickPetContainer">
        {props.veterinarians && <Box>
            <Box display="flex" justifyContent="center" sx={{ width: '100%' }}>
                <h1>Pick a Veterinarian</h1>
            </Box>
            <Box display="flex" justifyContent="center" sx={{ width: '100%', overflow: "auto", overflowY: "scroll" }} maxHeight="40vh">
                <List>
                    {props.veterinarians?.map((s) => (
                        <ListItemButton 
                            key={s.id}
                             disabled={props.veterinarian?.id === s.id}
                            onClick={() => props.onChange(undefined, props.veterinarians?.find(vs => vs.id === s.id))}
                            >
                            <div>
                            <Typography variant="h6" component="span">
                                {s.name}
                            </Typography>
                            <br />
                            <Typography variant="body1" component="div">
                                    
                            </Typography>
                            </div></ListItemButton>
                    ))}
                </List>
            </Box>
        </Box>}
        {!props.veterinarians && <Box>
            <Box display="flex" justifyContent="center" sx={{ width: '100%' }}>
                <h1>Sorry, no services to show</h1>
                <p>Something went wrong...</p>
            </Box>            
        </Box>}
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing="3">
            <div><Button onClick={props.onBack}><h3>back</h3></Button></div>
            {props.veterinarian == null
            ?<><div><Button onClick={props.onSkip} disabled={false}><h3>skip</h3></Button></div>
         <div><Button onClick={props.onNext} disabled={true}><h3>next</h3></Button></div>
            </>
            :<>
            <div><Button onClick={props.onSkip} disabled={true}><h3>skip</h3></Button></div>
            <div><Button onClick={props.onNext} disabled={false}><h3>next</h3></Button></div>
            </>
            }
        </Stack>
{/* </div> */}

        </div>)};