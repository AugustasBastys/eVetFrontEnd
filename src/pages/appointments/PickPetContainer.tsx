import React from "react";
import { Avatar, Box, Button, List, ListItemButton, Select, Stack, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";


import { Pet } from "../../apiClient/eVetApi";


export interface IPickPetContainerProps {
    pets: Pet[] | undefined;
    pet: Pet | undefined;
    onChange: (event: any, value: any) => void | undefined;
    onNext: () => void;
    
    onBack: () => void;
};

export const PickPetContainer = (props: IPickPetContainerProps) => {
    
    const options = props.pets?.map((pet: Pet) => <ToggleButton style={{minWidth:300}} value={pet.name}>
        <Box display="flex" justifyContent="start" alignItems="start" sx={{paddingRight: 2}}><Avatar alt={pet.name} src="/static/images/avatar/1.jpg" /></Box><h2>{pet.name}</h2>
        </ToggleButton>);

    return (

            <div className="PickPetContainer">
        {props.pets && <Box>
            <Box display="flex" justifyContent="center" sx={{ width: '100%' }}>
                <h1>Pick Pet</h1>
            </Box>
            <Box display="flex" justifyContent="center" sx={{ width: '100%', overflow: "auto", overflowY: "scroll" }} maxHeight="40vh">
                <List>
                    {props.pets?.map((s) => (
                        
                        <ListItemButton 
                            key={s.id}
                             disabled={props.pet?.id === s.id}
                            onClick={() => props.onChange(undefined, props.pets?.find(vs => vs.id === s.id))}
                            >
                            <div>
                            <Typography variant="h6" component="span">
                                {s.name}
                            </Typography>
                            <br />
                            <Typography variant="body1" component="div">
                                    <strong>{s.breed}</strong>
                            </Typography>
                            </div></ListItemButton>

                    ))}
                </List>
            </Box>
        </Box>}
        {!props.pets && <Box>
            <Box display="flex" justifyContent="center" sx={{ width: '100%' }}>
                <h1>Sorry, no services to show</h1>
                <p>Something went wrong...</p>
            </Box>            
        </Box>}
        <Stack direction="row" justifyContent="flex-end" alignItems="flex-start" spacing="3">
            <div><Button onClick={props.onNext} disabled={!props.pet}><h3>next</h3></Button></div>
        </Stack>
{/* </div> */}

        </div>)};