import { Box, Button, List, ListItemButton, Stack, TextField, Typography } from "@mui/material";
import { LocalizationProvider, StaticDatePicker, StaticTimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import isWeekend from "date-fns/isWeekend";
import React from "react";
import { AvailableTime } from "../../apiClient/eVetApi";

export interface IPickTimeContainerProps {
    note: string | undefined;
    onChange: (event: any, value: any) => void | undefined;
    onNext: () => void;
    onBack: () => void;
}

export const LeaveNoteContainer = (props: IPickTimeContainerProps) => {

   
    return (
        <div className="PickTimeContainer">
            
            <Box display="flex" justifyContent="center" sx={{ width: '100%' }}>
                <h1>Leave a Comment</h1>
            </Box>
          
        <Box>
            <Box display="flex" justifyContent="center" sx={{ width: '100%', overflow: "auto", overflowY: "scroll" }} maxHeight="40vh">
                
            <TextField
                    placeholder="Comment"
                    multiline
                    rows={4}
                    maxRows={4}
                    value={props.note}
                    onChange={(e) => props.onChange(undefined, e.target.value)}
                   style={{ width: 850 }}
                    />


            </Box>
        </Box>
      {/* <Box>
            <Box display="flex" justifyContent="center" sx={{ width: '100%' }}>
                <h1>Sorry, no services to show</h1>
                <p>Something went wrong...</p>
            </Box>            
        </Box> */}
        
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing="3">
                <div><Button onClick={props.onBack}><h3>back</h3></Button></div>
                <div><Button onClick={props.onNext} disabled={false}><h3>next</h3></Button></div>
            </Stack>
        </div>
    );
}
