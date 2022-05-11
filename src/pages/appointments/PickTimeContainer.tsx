import { Box, Button, List, ListItemButton, Stack, TextField, Typography } from "@mui/material";
import { LocalizationProvider, StaticDatePicker, StaticTimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import isWeekend from "date-fns/isWeekend";
import React from "react";
import { AvailableTime } from "../../apiClient/eVetApi";

export interface IPickTimeContainerProps {
    date: AvailableTime | undefined;
    dates: AvailableTime[] | undefined;
    onChange: (event: any, value: any) => void | undefined;
    onNext: () => void;
    onBack: () => void;
}

export const PickTimeContainer = (props: IPickTimeContainerProps) => {
    const [dateValue, setDateValue] = React.useState<Date | null>(null);
    const [timeValue, setTimeValue] = React.useState<string | null>(null);
    

    // const {disableDates} = React.useMemo(() => {



    // }, [props.dates]);


    const {minDate, maxDate} = React.useMemo(() => {
        const today = new Date();
        const minDate = new Date(today.getFullYear() - 100, today.getMonth(), today.getDate());
        const maxDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        
        return {minDate: minDate, 
          maxDate: maxDate};
      }, []);

     const prettyDate = (d: any) => {
            return d.substring(0,10) + " " + d.substring(11,16);
     };

    // note: demo only

    const randomTimes = React.useMemo(() => { 
        const hours = Array.from(Array(12).keys()).map(i => i + 8);
        const times: string[] = [];
        hours.forEach(h => {
            times.push(`${h}:00`);
            times.push(`${h}:30`);
        });
        return times;
    },[dateValue]);

    const selectionPreview = () => {
        return dateValue ? dateValue.toDateString() + " " + (timeValue ? timeValue : "") : "";
    }

    return (
        <div className="PickTimeContainer">
            
            <Box display="flex" justifyContent="center" sx={{ width: '100%' }}>
                <h1>Pick a Date and Time</h1>
            </Box>
            {/* <Box display="flex" justifyContent="center" maxHeight="40vh">
                <Stack direction="row" spacing={{ xs: 1, sm: 2, md: 4 }}>
                        <div>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <StaticDatePicker<Date>
                                orientation="landscape"
                                openTo="day"
                                value={dateValue}
                                shouldDisableDate={isWeekend}
                                minDate={new Date()}
                                onChange={(newValue) => { setDateValue(newValue); setTimeValue(null); }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                            </LocalizationProvider>
                        </div>
                        <div>
                            <h5>SELECT TIME</h5>
                            <Box display="flex" justifyContent="center" sx={{ width: '100%', overflow: "auto", overflowY: "scroll" }} maxHeight="30vh">
                                <List sx={{maxHeight:"25vh"}}>
                                    {randomTimes.map(t => ( <ListItemButton 
                                        key={t}
                                        disabled={timeValue===t} // disable by checking if available time is picked
                                        onClick={(e) => { setTimeValue(t); props.onChange(e, t)}} // todo: send event to the machine for selected time
                                        >
                                        <div>
                                        <Typography variant="body2" component="span">
                                            {t}
                                        </Typography>
                                        </div></ListItemButton>))}
                                </List>
                            </Box>
                        </div>
                </Stack>
            </Box>
            <Box display="flex" justifyContent="center" sx={{ width: '100%' }}>
                <h5>Selected: {selectionPreview()}</h5>
            </Box> */}


        {props.dates && <Box>
            <Box display="flex" justifyContent="center" sx={{ width: '100%' }}>
            </Box>
            <Box display="flex" justifyContent="center" sx={{ width: '100%', overflow: "auto", overflowY: "scroll" }} maxHeight="40vh">
                <List>
                    {props.dates?.map((s) => (
                        <ListItemButton 
                            key={s.id}
                             disabled={props.date?.id === s.id}
                            onClick={() => props.onChange(undefined, props.dates?.find(vs => vs.id === s.id))}
                            >
                            <div>
                            <Typography variant="h6" component="span">
                               {prettyDate(s.date)}
                            </Typography>
                            <br />
                            <Typography variant="body1" component="div">
                                    
                            </Typography>
                            </div></ListItemButton>
                    ))}
                </List>
            </Box>
        </Box>}
        {!props.dates && <Box>
            <Box display="flex" justifyContent="center" sx={{ width: '100%' }}>
                <h1>Sorry, no services to show</h1>
                <p>Something went wrong...</p>
            </Box>            
        </Box>}
        
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing="3">
                <div><Button onClick={props.onBack}><h3>back</h3></Button></div>
                <div><Button onClick={props.onNext} disabled={!props.date}><h3>next</h3></Button></div>
            </Stack>
        </div>
    );
}

/*

                <div className="PickDateContainer">
                    <h1>Pick a date</h1>
                    <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    onChange={(option, value) => {
                      send("SELECT", {data: value})
                    }
                  }
                    options = {state.context.dateList}
                    value={state.context.dateSelected}
                    getOptionLabel={(option: any) => option.date}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Date" />}
                    />
                    <Button onClick={() => send("BACK")}>BACK</Button>
                    <Button onClick={() => send("NEXT")}>NEXT</Button>
                </div>

*/