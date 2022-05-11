import React from 'react'
import Card from '@mui/material/Card';
import { Button } from '@mui/material';
import { AuthenticatedTemplate } from '@azure/msal-react';
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { getService } from '../data/DataServices';

type Service = {
    code: string,
    name: string,
    rating: number,
    shortDesc: string,
    fullDesc: string,
    price: number
}

export default function FullService() {
    let {service_code} = useParams();
    let s: string = service_code!;
    let service: any = getService(s);

  return (
    <Card elevation={4}>
        <div>{service.fullDesc}</div>
    </Card>
  )
}

