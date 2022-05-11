import * as React from 'react';
import { DataGrid, GridColDef, GridRowId } from "@mui/x-data-grid";
import { AvailableTime, Appointment, Api } from '../../apiClient/eVetApi';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useIsAuthenticated, useMsal } from '@azure/msal-react';
import { SilentRequest } from '@azure/msal-browser';
import { useParams } from "react-router-dom";
import "../../css/DataGrid.css";

type Props = {
  childToParent(arg: AvailableTime): void,
  appointment: Appointment | undefined
}

const columns: GridColDef[] = [
    { field: "date", headerName: "Date", width: 300, renderCell: (params) => {
        return <div className="rowitem">{params.row.date.substring(0, 10)}</div>;
      }},
      { field: "date1", headerName: "Time", width: 300, renderCell: (params) => {
        return <div className="rowitem">{params.row.date.substring(11, 19)}</div>;
      }},
    { field: "veterinarian", headerName: "Veterinarian", width: 270, renderCell: (params) => {
        return <div className="rowitem">{params.row.veterinarian.name}</div>;
      }}
  ];
  

export default function AvailableTimesTable(props: Props) {
    const [selectionModel, setSelectionModel] = React.useState<GridRowId[]>([]);
    const [availableTimes, setAvailableTimes] = React.useState<AvailableTime[]>([]);

    const [selectedTime, setSelectedTime] = React.useState<any>(); 

    const {appointmentId} = useParams();
    const id: number = parseInt(appointmentId!);

    const {instance, accounts} = useMsal();
    const isAuthenticated = useIsAuthenticated();


    let [n, setN] = React.useState<number | undefined | string>(); 
    

    const getTimeById = (id: any) => {
      let time: AvailableTime = {};

      availableTimes.forEach(element => {
        if(element.id == id){
          time = element;
          return time;
        }
      });

      return time;
    }

    React.useEffect(() => {
        
        const client = new Api();
        const getAvailableTimes = async () => {
          
            const scopes : string = process.env.REACT_APP_SCOPES ?? "user.read";
            const request : SilentRequest = {
                account: accounts[0],
                scopes: [scopes]
            }
  
            const token = await instance.acquireTokenSilent(request);
            const requestParams = {headers: { Authorization: `Bearer ${token.accessToken}` }};
           
            if(props.appointment){
            const serviceResponse = await client.availableTimes.getTimesByServiceUsingGet(props.appointment.vetService.id, requestParams);
            const serviceData = await serviceResponse.json();
            
            setAvailableTimes(serviceData);
            }
        };
        getAvailableTimes();
        
    },[isAuthenticated, props.appointment]);


  return (
    <div style={{ height: 500, width: "100%" }}>
{/*         
{rows.at(0)} */}

    <DataGrid
        rows={availableTimes}
        columns={columns}
        pageSize={7}
        checkboxSelection
        selectionModel={selectionModel}
        hideFooterSelectedRowCount
        onSelectionModelChange={(selection) => {
            const selectionSet = new Set(selectionModel);
            const result = selection.filter((s) => !selectionSet.has(s));
            
            // setSelectedTime(result); 
            props.childToParent(getTimeById(result));

            setSelectionModel(result);

        }}
      />
      
    </div>
    
  );
}